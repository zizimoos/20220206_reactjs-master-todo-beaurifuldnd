import { Droppable } from "react-beautiful-dnd";
import DraggableComp from "./DraggableComp";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ITodoUnitObject } from "../Recoil/atoms";
import { useRecoilState } from "recoil";
import { todoListState } from "../Recoil/atoms";

const Wrapper = styled.div`
  width: 300px;
  padding: 20px 10px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.colors.boardsColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

interface IForm {
  toDo: string;
}

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

interface IDraggableProps {
  boardId: string;
  todoArray: ITodoUnitObject[];
  index: number;
}

const DroppableComp = ({ boardId, todoArray, index }: IDraggableProps) => {
  const [allBoard, setAllBoard] = useRecoilState(todoListState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newTodoUnitObject: ITodoUnitObject = {
      id: Date.now(),
      text: toDo,
    };

    setAllBoard((allBoard) => {
      return {
        ...allBoard,
        [boardId]: [newTodoUnitObject, ...allBoard[boardId]],
      };
    });
    setValue("toDo", "");
  };
  localStorage.setItem("TODO_LIST", JSON.stringify(allBoard));

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
          >
            {todoArray.map((todo, index) => (
              <DraggableComp
                key={todo.id}
                todoId={todo.id}
                todoText={todo.text}
                index={index}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};
export default DroppableComp;

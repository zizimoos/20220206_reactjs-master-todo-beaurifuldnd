import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { todoListState } from "./Recoil/atoms";
import styled from "styled-components";
import DroppableComp from "./components/DroppableComp";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  background-color: ${(props) => props.theme.colors.boardsColor};
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.colors.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

function App() {
  const [todoObject, setTodoObject] = useRecoilState(todoListState);

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    if (destination.droppableId === source.droppableId) {
      const newTodoArray = [...todoObject[source.droppableId]];
      const target = newTodoArray.splice(source.index, 1);
      newTodoArray.splice(destination.index, 0, ...target);
      setTodoObject({ ...todoObject, [source.droppableId]: newTodoArray });
    }
    if (destination.droppableId !== source.droppableId) {
      const sourceTodoArray = [...todoObject[source.droppableId]];
      const target = sourceTodoArray.splice(source.index, 1);
      const newTodoArray = [...todoObject[destination.droppableId], ...target];
      setTodoObject({
        ...todoObject,
        [source.droppableId]: sourceTodoArray,
        [destination.droppableId]: newTodoArray,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(todoObject).map((boardId, index) => (
            <DroppableComp
              boardId={boardId}
              key={boardId}
              todoArray={todoObject[boardId]}
              index={index}
            />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;

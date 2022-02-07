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
  const [allBoards, setAllBoards] = useRecoilState(todoListState);

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    if (destination.droppableId === source.droppableId) {
      const newTodoArray = [...allBoards[source.droppableId]];
      const target = newTodoArray.splice(source.index, 1);
      newTodoArray.splice(destination.index, 0, ...target);
      setAllBoards({ ...allBoards, [source.droppableId]: newTodoArray });
    }
    if (destination.droppableId !== source.droppableId) {
      const sourceTodoArray = [...allBoards[source.droppableId]];
      const target = sourceTodoArray.splice(source.index, 1);
      const newTodoArray = [...allBoards[destination.droppableId], ...target];
      setAllBoards({
        ...allBoards,
        [source.droppableId]: sourceTodoArray,
        [destination.droppableId]: newTodoArray,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(allBoards).map((boardId, index) => (
            <DroppableComp
              boardId={boardId}
              key={boardId}
              todoArray={allBoards[boardId]}
              index={index}
            />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;

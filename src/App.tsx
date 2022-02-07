import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function App() {
  const onDragEnd = () => {
    return null;
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId="one">
          {(provided, snapshot) => (
            <Draggable draggableId="one" index={0}>
              {(provided, snapshot) => <div></div>}
            </Draggable>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;

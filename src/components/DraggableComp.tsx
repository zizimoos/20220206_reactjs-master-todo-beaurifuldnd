import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  padding: 10px;
  background-color: ${(props) =>
    props.isDragging ? "#e4f2ff" : props.theme.colors.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
`;

interface IDraggableProps {
  todoId: number;
  todoText: string;
  index: number;
}

const DraggableComp = ({ todoId, todoText, index }: IDraggableProps) => {
  return (
    <Draggable draggableId={todoText} key={todoText} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {todoText}
        </Card>
      )}
    </Draggable>
  );
};
export default React.memo(DraggableComp);

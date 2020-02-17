import React from "react";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline
} from "react-icons/md";
import "./TodoListItem.scss";
import cn from "classnames";

const TodoList = ({ todo, onRemove, onToggle, style }) => {
  const { id, text, checked } = todo;
  return (
    <div className="TodoListItem-virtualized" style={style}>
      <div className="TodoListItem">
        <div
          className={cn("checkbox", { checked })}
          onClick={() => onToggle(id)}
        >
          {checked ? (
            <MdCheckBox></MdCheckBox>
          ) : (
            <MdCheckBoxOutlineBlank></MdCheckBoxOutlineBlank>
          )}

          <div className="text">{text}</div>
        </div>
        <div className="remove" onClick={() => onRemove(id)}>
          <MdRemoveCircleOutline></MdRemoveCircleOutline>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TodoList);
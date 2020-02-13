import React, { useCallback } from "react";
import TodoListItem from "./TodoListItem";
import "./TodoList.scss";
import { List } from "react-virtualized";

const TodoList = ({ todos, onRemove, onToggle }) => {
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        ></TodoListItem>
      );
    },
    [onRemove, onToggle, todos]
  );

  return (
    <List
      className="TodoList"
      width={512}
      height={556}
      rowCount={todos.length}
      rowHeight={57}
      rowRenderer={rowRenderer}
      list={todos}
      style={{ outline: "none" }}
    ></List>
    // <div className="TodoList">
    //     {todos.map(todo => (
    //         <TodoListItem
    //             todo={todo}
    //             key={todo.id}
    //             onRemove={onRemove}
    //             onToggle={onToggle}
    //         ></TodoListItem>
    //     ))}
    // </div>
  );
};

export default React.memo(TodoList);

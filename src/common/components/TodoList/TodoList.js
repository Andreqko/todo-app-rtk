import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import classes from './todo-list.module.css';
import TodoItem from './TodoItem/TodoItem';
import { todoActions, todoSelectors } from '../../../features/todos';

const TodoList = () => {
  const [dragState, setDragState] = useState({ dragTodoId: null, dragOverTodoId: null });
  const todos = useSelector(todoSelectors.selectFilteredTodos);
  const dispatch = useDispatch();

  const handleCheckTodo = useCallback(
    (e, todoId) => dispatch(todoActions.toggleTodo(todoId)),
    [dispatch]
  );

  const handleDeleteTodo = useCallback(
    (e, todoId) => {
      e.stopPropagation();
      dispatch(todoActions.deleteTodo(todoId));
    },
    [dispatch]
  );

  const handleDragStart = useCallback((e, todoId) => {
    setDragState(prevState => ({
      ...prevState,
      dragTodoId: todoId,
    }));
  }, []);

  const handleDragOver = useCallback((e, todoId) => {
    e.preventDefault();

    setDragState(prevState => ({
      ...prevState,
      dragOverTodoId: todoId,
    }));
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragState(prevState => ({
      ...prevState,
      dragOverTodoId: null,
    }));
  }, []);

  const handleDrop = useCallback(
    (e, dropTodoId) => {
      const { dragTodoId } = dragState;
      // we are dropping on the same item we are dragging
      if (dropTodoId !== dragTodoId) {
        dispatch(todoActions.swapOrder(dragTodoId, dropTodoId));
      }

      setDragState({
        dragTodoId: null,
        dragOverTodoId: null,
      });
    },
    [dispatch, dragState]
  );

  if (todos.length === 0) {
    return <p className={classes.TodoPlaceholder}>No todos found</p>;
  }

  return (
    <div className={classes.TodoList}>
      {todos.map(({ id: todoId }) => (
        <TodoItem
          todoId={todoId}
          key={todoId}
          className={classNames(classes.TodoItem, {
            [classes.DraggedOver]: dragState.dragOverTodoId === todoId,
          })}
          onCheck={handleCheckTodo}
          onDelete={handleDeleteTodo}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
};

export default TodoList;

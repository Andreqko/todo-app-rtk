import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import classes from './todo-item.module.css';
import RoundedCheckbox from '../../RoundedCheckbox/RoundedCheckbox';
import { todoSelectors } from '../../../../features/todos';
import { TODO_STATUSES } from '../../../redux/constants';

const TodoItem = ({
  todoId,
  onCheck,
  onDelete,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  className,
}) => {
  const todo = useSelector(state => todoSelectors.selectTodoById(state, todoId)) ?? {};

  if (!todo) return null;

  const { text, status } = todo;
  const isCompleted = status === TODO_STATUSES.COMPLETED;

  return (
    <div
      className={classNames(classes.TodoItem, className, { [classes.Completed]: isCompleted })}
      onClick={e => onCheck(e, todoId)}
      draggable={true}
      onDragStart={e => onDragStart(e, todoId)}
      onDragLeave={e => onDragLeave(e)}
      onDragOver={e => onDragOver(e, todoId)}
      onDrop={e => onDrop(e, todoId)}
    >
      <div className={classes.RightBlock}>
        <RoundedCheckbox className={classes.RoundedCheckbox} checked={isCompleted} disabled />
        <span className={classes.TodoItemText}>{text}</span>
      </div>
      <button
        className={classes.TodoDeleteButton}
        onClick={e => onDelete(e, todoId)}
        title="Delete todo"
      >
        &#10005;
      </button>
    </div>
  );
};

TodoItem.propTypes = {
  todoId: PropTypes.string.isRequired,
  onCheck: PropTypes.func,
  onDelete: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDrop: PropTypes.func,
};

TodoItem.defaultProps = {
  onCheck: () => {},
  onDelete: () => {},
  onDragStart: () => {},
  onDragLeave: () => {},
  onDragOver: () => {},
  onDrop: () => {},
};

export default React.memo(TodoItem);

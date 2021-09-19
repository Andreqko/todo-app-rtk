import React from 'react';
import classNames from 'classnames';

import { useDispatch, useSelector } from 'react-redux';
import { todoActions, todoSelectors } from '../../../features/todos';
import { FILTER_STATUSES } from '../../redux/constants';
import { filtersActions, filtersSelectors } from '../../../features/filters';

import classes from './footer.module.css';

const Footer = () => {
  const currentStatusFilter = useSelector(filtersSelectors.selectStatusFilter);
  console.log('currentStatusFilter:', currentStatusFilter);
  const dispatch = useDispatch();
  const todos = useSelector(todoSelectors.selectTodoIds);
  const handleClearCompletedTodos = () => dispatch(todoActions.clearCompleted());
  const handleStatusFilterChange = status => dispatch(filtersActions.setStatusFilter(status));

  if (todos.length === 0) return null;

  return (
    <div className={classes.Footer}>
      <div>Items left</div>
      <ul className={classes.FiltersList}>
        {Object.values(FILTER_STATUSES).map(status => (
          <li
            className={classNames(classes.FiltersListItem, {
              [classes.Active]: status === currentStatusFilter,
            })}
            key={status}
          >
            <button
              className={classes.FilterButton}
              onClick={() => handleStatusFilterChange(status)}
            >
              {status}
            </button>
          </li>
        ))}
      </ul>
      <button className={classes.FilterButton} onClick={handleClearCompletedTodos}>
        Clear completed
      </button>
    </div>
  );
};

export default Footer;

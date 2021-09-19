import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import classes from './rounded-checkbox.module.css';
import useRandomId from '../../hooks/useRandomId';

const RoundedCheckbox = ({ onChange, checked, className, disabled }) => {
  const randomId = useRandomId();
  const inputId = `rounded-checkbox-${randomId}`;
  const title = `Mark as ${checked ? 'uncompleted' : 'completed'}`;

  return (
    <div className={classNames(className, classes.RoundedCheckbox)}>
      <input
        type="checkbox"
        onChange={onChange}
        id={inputId}
        checked={checked}
        disabled={disabled}
      />
      <label htmlFor={inputId} title={title} />
    </div>
  );
};

RoundedCheckbox.propTypes = {
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
};

RoundedCheckbox.defaultProps = {
  onChange: () => {},
  checked: false,
  disabled: false,
};

export default RoundedCheckbox;

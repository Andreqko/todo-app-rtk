import types from './types';

const actions = {
  setStatusFilter: newStatus => ({
    type: types.setStatusFilter,
    payload: newStatus,
  }),
};

export default actions;

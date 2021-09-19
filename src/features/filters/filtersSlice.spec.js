import filtersReducer from './index';
import { FILTER_STATUSES } from '../../common/redux/constants';
import { filtersActions } from './index';

describe('Filters reducer', () => {
  test('Should return the initial state', () => {
    expect(filtersReducer(undefined, {})).toEqual({
      status: FILTER_STATUSES.ALL,
    });
  });
  test('Should set new status filter', () => {
    const { status } = filtersReducer(
      undefined,
      filtersActions.setStatusFilter(FILTER_STATUSES.COMPLETED)
    );

    expect(status).toEqual(FILTER_STATUSES.COMPLETED);
  });
});

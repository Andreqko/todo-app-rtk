import todoReducer, { todoActions } from './index';
import generateRandomId from '../../common/lib/utils/generate-random-id';
import { LOADING_STATUS } from '../../api/constants';
import { TODO_STATUSES } from '../../common/redux/constants';
import { TODO_STATUSES_TOGGLING_MAP } from './utils';

const mockedTodoId = generateRandomId();
const mockedTodo = {
  id: mockedTodoId,
  text: 'Todo',
  status: TODO_STATUSES.ACTIVE,
  order: 1,
};
const mockedEntities = { [mockedTodoId]: mockedTodo };

describe('Todo reducer', () => {
  test('Should return the initial state', () => {
    expect(todoReducer(undefined, {})).toEqual({
      entities: {},
      loadingStatus: LOADING_STATUS.IDLE,
    });
  });

  test('Should add todo', () => {
    const text = mockedTodo.text;
    const status = mockedTodo.status;

    const { entities } = todoReducer(undefined, todoActions.addTodo({ text, status }));
    const todo = Object.values(entities)[0];

    expect(todo.text).toEqual(text);
    expect(todo.status).toEqual(status);
  });

  test('Should autoincrement order for newly added todo', () => {
    const { entities } = todoReducer(
      { entities: mockedEntities },
      todoActions.addTodo({ text: 'Text' })
    );
    const todo = Object.values(entities)[1];

    expect(todo.order).toEqual(mockedTodo.order + 1);
  });

  test('Should delete todo', () => {
    const { entities } = todoReducer(
      { entities: mockedEntities },
      todoActions.deleteTodo(mockedTodoId)
    );
    const entitiesCount = Object.values(entities).length;

    expect(entitiesCount).toEqual(0);
  });

  test('Should toggle todo', () => {
    const { entities } = todoReducer(
      { entities: mockedEntities },
      todoActions.toggleTodo(mockedTodoId)
    );
    const todo = Object.values(entities)[0];

    expect(todo.status).toEqual(TODO_STATUSES_TOGGLING_MAP[mockedTodo.status]);
  });

  test('Should clear completed todos', () => {
    const { entities } = todoReducer(
      { entities: { [mockedTodoId]: { ...mockedTodo, status: TODO_STATUSES.COMPLETED } } },
      todoActions.clearCompleted(mockedTodoId)
    );
    const todo = Object.values(entities)[0];

    expect(todo.status).toEqual(TODO_STATUSES.ACTIVE);
  });

  test('Should swap todos order', () => {
    const secondMockedTodoId = generateRandomId();
    const secondMockedTodo = {
      ...mockedTodo,
      id: secondMockedTodoId,
      order: mockedTodo.order + 1,
    };
    const { entities } = todoReducer(
      { entities: { ...mockedEntities, [secondMockedTodoId]: secondMockedTodo } },
      todoActions.swapOrder(mockedTodoId, secondMockedTodoId)
    );
    const [firstTodo, secondTodo] = Object.values(entities);

    expect(firstTodo.order).toEqual(secondMockedTodo.order);
    expect(secondTodo.order).toEqual(mockedTodo.order);
  });
});

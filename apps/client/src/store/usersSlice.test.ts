import { configureStore } from '@reduxjs/toolkit';
import { store as rootStore } from './index';
import { fetchUsers, usersReducer } from './usersSlice';

jest.mock('../config/config', () => ({
  config: {
    apiUrl: 'http://localhost:mock',
  },
}));

describe('usersSlice', () => {
  let store: typeof rootStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        users: usersReducer,
      },
    });
  });

  it('should handle initial state', () => {
    expect(store.getState().users).toEqual({
      users: [],
      status: 'idle',
      error: null,
    });
  });

  it('should handle fetchUsers.pending', () => {
    store.dispatch(fetchUsers.pending('users/fetchUsers'));
    expect(store.getState().users.status).toEqual('loading');
  });

  it('should handle fetchUsers.fulfilled', () => {
    const mockUsers = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
      },
    ];
    store.dispatch(fetchUsers.fulfilled(mockUsers, ''));
    expect(store.getState().users.status).toEqual('succeeded');
    expect(store.getState().users.users).toEqual(mockUsers);
  });

  it('should handle fetchUsers.rejected', () => {
    store.dispatch(fetchUsers.rejected(new Error('Failed to fetch'), ''));
    expect(store.getState().users.status).toEqual('failed');
    expect(store.getState().users.error).toEqual('Failed to fetch');
  });
});

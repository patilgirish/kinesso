import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { usersReducer } from '../../store/usersSlice';
import { UserList } from './UserList';

const mockStore = configureStore({
  reducer: {
    users: usersReducer,
  },
  preloadedState: {
    users: {
      users: [
        {
          _id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890',
        },
        {
          _id: '2',
          name: 'Jane Doe',
          email: 'jane@example.com',
          phone: '0987654321',
        },
      ],
      status: 'succeeded' as const,
      error: null,
    },
  },
});

describe('UserList', () => {
  it('renders user list', () => {
    render(
      <Provider store={mockStore}>
        <UserList />
      </Provider>
    );

    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  it('displays loading state while the users are being fetched', () => {
    const loadingStore = configureStore({
      reducer: {
        users: usersReducer,
      },
      preloadedState: {
        users: {
          users: [],
          status: 'loading' as const,
          error: null,
        },
      },
    });

    render(
      <Provider store={loadingStore}>
        <UserList />
      </Provider>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('displays error state', () => {
    const errorStore = configureStore({
      reducer: {
        users: usersReducer,
      },
      preloadedState: {
        users: {
          users: [],
          status: 'failed' as const,
          error: 'Failed to fetch users',
        },
      },
    });

    render(
      <Provider store={errorStore}>
        <UserList />
      </Provider>
    );

    expect(
      screen.getByText('Error: Failed to fetch users')
    ).toBeInTheDocument();
  });

  it('deletes a user', async () => {
    render(
      <Provider store={mockStore}>
        <UserList />
      </Provider>
    );

    const deleteButton = screen.getByTestId('button:delete:user-1');
    deleteButton.click();
    await waitFor(() =>
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    );
  });
});

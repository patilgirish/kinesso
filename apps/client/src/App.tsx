import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import React from 'react';
import { Provider } from 'react-redux';
import { UserList } from './components';
import { store } from './store';

const theme = createTheme({
  // You can customize your theme here
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <UserList />
        </Container>
      </ThemeProvider>
    </Provider>
  );
};

export default App;

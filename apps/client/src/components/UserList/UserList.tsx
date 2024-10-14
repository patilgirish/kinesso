import {
  Delete as DeleteIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { deleteUser, fetchUsers } from '../../store/usersSlice';

export const UserList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, status, error } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteUser(id));
  };

  if (status === 'loading') {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        data-testid="loading"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Box m={2}>
        <Alert severity="error">Error: {error}</Alert>
      </Box>
    );
  }

  return (
    <Box m={2}>
      <Typography variant="h4" component="h1" gutterBottom>
        Users
      </Typography>
      <Grid container spacing={2}>
        {users.map(user => (
          <Grid item xs={12} sm={6} md={4} key={user._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {user.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  display="flex"
                  alignItems="center"
                  gutterBottom
                >
                  <EmailIcon fontSize="small" style={{ marginRight: 8 }} />
                  {user.email}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  display="flex"
                  alignItems="center"
                >
                  <PhoneIcon fontSize="small" style={{ marginRight: 8 }} />
                  {user.phone}
                </Typography>
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(user._id)}
                    data-testid={`button:delete:user-${user._id}`}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

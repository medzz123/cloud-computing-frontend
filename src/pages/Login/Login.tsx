import FormikTextInput from '@components/FormikTextInput';
import { unauthenticatedFetch } from '@lib/fetch';
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { LockOutlined } from '@material-ui/icons';
import firebase from 'firebase/app';
import { Form, Formik } from 'formik';
import Cookie from 'js-cookie';
import React from 'react';
import { toast } from 'react-toastify';

import { useStyles } from './Login.styles';
import { validateCreateUser, validateLogIn } from './Login.validate';

const Login = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.modal}>
          <Formik
            initialValues={{ email: '', password: '', name: '' }}
            validate={validateCreateUser}
            onSubmit={async (values) => {
              try {
                await unauthenticatedFetch({
                  url: '/create-user',
                  method: 'POST',
                  body: {
                    ...values,
                  },
                });

                toast.success('Account created! You can login in now!');
                handleClose();
              } catch (e) {
                toast.error('Something went wrong, please try again.');
                console.log('Login failed', e);
              }
            }}
          >
            {(props) => (
              <Form className={classes.form} noValidate>
                <FormikTextInput name="email" label="Email" />
                <Box mt={2} />
                <FormikTextInput
                  name="password"
                  type="password"
                  autoComplete="password"
                  label="Password"
                />
                <FormikTextInput name="name" label="Name" />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={props.isSubmitting}
                >
                  Create Account
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={{ username: '', password: '' }}
            validate={validateLogIn}
            onSubmit={async (values) => {
              Cookie.remove('token');
              try {
                const auth = await firebase
                  .auth()
                  .signInWithEmailAndPassword(values.username, values.password);

                const token = await auth.user.getIdToken();

                Cookie.set('token', token);
                window.location.href = '/';
              } catch (e) {
                toast.error('Please check your credentials');
                console.log('Login failed', e);
              }
            }}
          >
            {(props) => (
              <Form className={classes.form} noValidate>
                <FormikTextInput
                  name="username"
                  label="Email"
                  variant="outlined"
                />
                <Box mt={2} />
                <FormikTextInput
                  name="password"
                  variant="outlined"
                  type="password"
                  autoComplete="password"
                  label="Password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={props.isSubmitting}
                >
                  Login
                </Button>
                <Button
                  type="button"
                  onClick={handleOpen}
                  fullWidth
                  className={classes.submit}
                >
                  Create Account!
                </Button>
              </Form>
            )}
          </Formik>
          <Box mt={5}>
            <Typography variant="body2" color="textSecondary" align="center">
              Copyright © RSVP Events {new Date().getFullYear()}.
            </Typography>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;

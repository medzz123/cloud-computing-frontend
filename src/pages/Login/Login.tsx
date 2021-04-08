import FormikTextInput from '@components/FormikTextInput';
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import firebase from 'firebase/app';
import { Form, Formik } from 'formik';
import Cookie from 'js-cookie';
import React from 'react';
import { toast } from 'react-toastify';

import { useStyles } from './Login.styles';
import { validateLogIn } from './Login.validate';

const Login = () => {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
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
                toast.error('Login failed, please check your credentials');
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

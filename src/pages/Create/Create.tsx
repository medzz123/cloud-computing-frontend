import FormikTextInput from '@components/FormikTextInput';
import { authenticatedFetch } from '@lib/fetch';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import router from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';

import { CreateEventValues } from './Create.models';
import { useCreateStyles } from './Create.styles';
import { createValidate } from './Create.validate';

const Create: NextPage = () => {
  const classes = useCreateStyles();
  return (
    <div className={classes.root}>
      <Typography gutterBottom variant="h4" component="h1">
        Create a new event!
      </Typography>

      <Formik<CreateEventValues>
        initialValues={{
          name: '',
          location: '',
          title: '',
          date: '',
          startTime: '',
          endTime: '',
          description: '',
          emails: '',
        }}
        onSubmit={async (values) => {
          const body = {
            ...values,
            emails: values.emails.split(',').map((e) => e.trim()),
          };

          try {
            await authenticatedFetch({ url: '/event', method: 'POST', body });

            router.push('/');
          } catch (error) {
            toast.error('Something went wrong, please try again ', error);
          }
        }}
        validate={createValidate}
      >
        {(props) => (
          <Form>
            <Card className={classes.cardRoot}>
              <CardContent>
                <div className={classes.dropArea}>
                  <Typography
                    gutterBottom
                    variant="h4"
                    color="textSecondary"
                    component="p"
                  >
                    Drop your image here (still fake)
                  </Typography>
                </div>
                <FormikTextInput placeholder="Event Name" name="name" />
                <FormikTextInput placeholder="Title" name="title" />
                <FormikTextInput placeholder="Location" name="location" />
                <FormikTextInput
                  placeholder="Description"
                  name="description"
                  multiline={true}
                />
                <FormikTextInput
                  placeholder="Date - Format DD/MM/YYYY"
                  name="date"
                />
                <FormikTextInput
                  placeholder="Start Time - Format 00:00 24h Format"
                  name="startTime"
                />
                <FormikTextInput
                  placeholder="End Time - Format 00:00 24h Format"
                  name="endTime"
                />
                <FormikTextInput
                  placeholder="Emails coma separated - e.g. email@aa.com, email@bb.com"
                  name="emails"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={props.isSubmitting}
                >
                  Create Event
                </Button>
              </CardContent>
            </Card>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Create;

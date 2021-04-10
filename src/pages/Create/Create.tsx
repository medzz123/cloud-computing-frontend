import FormikTextInput from '@components/FormikTextInput';
import { authenticatedFetch } from '@lib/fetch';
import { logout } from '@lib/logout';
import { sendFile } from '@lib/uploadImage';
import { Box, Button, Card, CardContent, Typography } from '@material-ui/core';
import { AxiosResponse } from 'axios';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import router from 'next/router';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

import { CreateEventValues } from './Create.models';
import { useCreateStyles } from './Create.styles';
import { createValidate } from './Create.validate';

const Create: NextPage = () => {
  const classes = useCreateStyles();

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: 'image/jpeg',
    maxFiles: 1,
    maxSize: 1000000,
  });

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
          try {
            let urls: AxiosResponse<{ get: string; put: string }>;
            if (acceptedFiles.length > 0) {
              urls = await authenticatedFetch({
                url: '/get-upload-urls',
                method: 'POST',
                body: {
                  name: values.name,
                },
              });

              await sendFile(acceptedFiles[0], urls.data.put);
            }

            const body = {
              ...values,
              emails: values.emails.split(',').map((e) => e.trim()),
              ...(urls && { image: urls.data.get }),
            };

            await authenticatedFetch({ url: '/event', method: 'POST', body });

            toast.success('New Event created!');
            router.push('/');
          } catch (error) {
            if (JSON.stringify(error)?.includes('401')) {
              toast.error(
                'Your session expired, you will be logged out shortly, please login again.'
              );
              logout();
            } else {
              toast.error('Something went wrong, please try again ', error);
            }
          }
        }}
        validate={createValidate}
      >
        {(props) => (
          <Form>
            <Card className={classes.cardRoot}>
              <CardContent>
                <div className={classes.dropArea}>
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <Typography
                      gutterBottom
                      variant="h5"
                      color="textSecondary"
                      align="center"
                      component="p"
                    >
                      {acceptedFiles.length
                        ? acceptedFiles[0]?.name
                        : 'Drop your image here'}
                    </Typography>
                  </div>
                </div>
                <Typography
                  gutterBottom
                  variant="caption"
                  color="error"
                  component="p"
                >
                  {fileRejections[0]?.errors[0]?.message}
                </Typography>
                <Box height="5px" />
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

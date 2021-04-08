import EventCard from '@components/EventCard';
import { unauthenticatedFetch } from '@lib/fetch';
import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import { NextPage } from 'next';
import Image from 'next/image';
import router from 'next/router';
import React, { useCallback, useState } from 'react';

import { useReply } from './Reply.hooks';
import { useReplyStyles } from './Reply.styles';

const Reply: NextPage = () => {
  const classes = useReplyStyles();
  const [replied, setReplied] = useState(false);

  const { state, loading } = useReply();

  const replyResponse = useCallback(async (attending) => {
    const params = router.query;

    await unauthenticatedFetch({
      url: `/reply`,
      method: 'POST',
      body: {
        id: params.id,
        event: params.event,
        token: params.token,
        attending,
      },
    });

    setReplied(true);
  }, []);

  return (
    <div className={classes.root}>
      {replied ? (
        <div className={classes.center}>
          <Image src="/assets/done.svg" width="400px" height="400px" />
          <Box height="20px" />
          <Typography align="center" variant="h5" component="h1">
            Thanks for replying!
          </Typography>
        </div>
      ) : loading ? (
        <div className={classes.center}>
          <CircularProgress />
        </div>
      ) : state ? (
        <EventCard
          title={state?.title}
          image={state?.image}
          date={state?.date}
          start={state?.startTime}
          location={state?.location}
          name={state?.name}
          end={state?.end}
          customComponent={
            <div className={classes.center}>
              <Typography align="center">
                Confirm attendance your attendance
              </Typography>
              <Box display="flex" justifyContent="space-evenly" padding="20px">
                <Button
                  type="button"
                  variant="contained"
                  disabled={loading}
                  color="primary"
                  onClick={() => {
                    replyResponse(true);
                  }}
                >
                  Attending
                </Button>
                <Button
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    replyResponse(false);
                  }}
                >
                  Not attending
                </Button>
              </Box>
            </div>
          }
        />
      ) : (
        <div className={classes.center}>
          <Image src="/assets/error.svg" width="400px" height="400px" />
          <Box height="20px" />
          <Typography align="center" variant="h5" component="h1">
            Something went wrong, please check your link is correct
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Reply;

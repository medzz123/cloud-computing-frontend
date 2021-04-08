import EventCard from '@components/EventCard';
import { useLoggedIn } from '@lib/redirect';
import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

import { useHomeHooks } from './Home.hooks';
import { useHomeStyles } from './Home.styles';

const Home: NextPage = () => {
  useLoggedIn();

  const { loading, state } = useHomeHooks();

  const classes = useHomeStyles();

  return (
    <div>
      <Typography gutterBottom variant="h4" component="h1">
        Your events!
      </Typography>

      {loading ? (
        <div className={classes.centerSpinner}>
          <CircularProgress />
        </div>
      ) : state.length === 0 ? (
        <div className={classes.auto}>
          <Typography gutterBottom variant="h5" align="center" component="h3">
            You don&apos;t have any events.
          </Typography>

          <Box marginTop="20px">
            <Link href="/create">
              <Button variant="contained" color="primary">
                Create event
              </Button>
            </Link>
          </Box>
        </div>
      ) : (
        <div className={classes.cardContainer}>
          {state.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              name={event.name}
              location={event.location}
              date={event.date}
              image={event.image}
              start={event.startTime}
              end={event.endTime}
              guests={event.attendees}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

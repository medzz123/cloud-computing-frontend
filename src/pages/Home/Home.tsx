import EventCard from '@components/EventCard';
import { useLoggedIn } from '@lib/redirect';
import { CircularProgress, Typography } from '@material-ui/core';
import { NextPage } from 'next';
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

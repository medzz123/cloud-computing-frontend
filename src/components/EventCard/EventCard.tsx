import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Collapse,
  Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';

import { EventCardProps } from './EventCard.models';
import { useEventCardStyles } from './EventCard.styles';

const EventCard: React.FunctionComponent<EventCardProps> = (props) => {
  const { image, title, name, location, date, start, end, guests } = props;
  const classes = useEventCardStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded((e) => !e);
  };

  return (
    <Card className={classes.cardRoot}>
      <CardMedia
        className={classes.media}
        image={image}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography gutterBottom variant="subtitle1" component="p">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Location: {location}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Date: {date}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Starts At: {start}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Ends At: {end}
        </Typography>

        <Box height="20px" />
        <Button
          onClick={handleExpandClick}
          aria-expanded={expanded}
          className={classes.buttonCenter}
          aria-label="show more"
          variant="outlined"
        >
          View guests
          <ExpandMore
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
          />
        </Button>
      </CardContent>

      <Collapse in={expanded} timeout="auto" unmountOnExit={true}>
        <CardContent>
          <Typography paragraph>
            You have 6 guests coming to your event.
          </Typography>
          {guests.map((guest) => (
            <Box
              key={guest.email}
              display="flex"
              justifyContent="space-between"
              marginBottom="20px"
            >
              <Typography paragraph>{guest.email}</Typography>
              <Typography paragraph>Replied: {guest.replied}</Typography>
              <Typography paragraph>Attending: {guest.attending}</Typography>
            </Box>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default EventCard;

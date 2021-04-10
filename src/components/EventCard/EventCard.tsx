import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Collapse,
  Typography,
} from '@material-ui/core';
import { Cancel, CheckCircle, ExpandMore } from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';

import { EventCardProps } from './EventCard.models';
import { useEventCardStyles } from './EventCard.styles';

const EventCard: React.FunctionComponent<EventCardProps> = (props) => {
  const {
    image,
    title,
    name,
    location,
    date,
    start,
    end,
    guests,
    customComponent,
    description,
  } = props;
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
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography
          gutterBottom={true}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {name}
        </Typography>
        <Typography gutterBottom={true} variant="body1" component="p">
          {description}
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

        {guests && (
          <Box marginTop="20px">
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
          </Box>
        )}
      </CardContent>

      {guests && (
        <Collapse in={expanded} timeout="auto" unmountOnExit={true}>
          <CardContent>
            <Typography paragraph>
              You have {guests.filter((g) => g.attending).length} guests coming
              to your event.
            </Typography>
            {guests.map((guest) => (
              <Box
                key={guest.email}
                display="flex"
                justifyContent="space-between"
                marginBottom="20px"
                flexWrap="wrap"
              >
                <Box width="300px">
                  <Typography paragraph>{guest.email}</Typography>
                </Box>

                <Box display="flex">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    marginRight="8px"
                  >
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      component="span"
                    >
                      Replied
                    </Typography>
                    {guest.replied ? (
                      <CheckCircle color="primary" />
                    ) : (
                      <Cancel color="error" />
                    )}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      component="span"
                    >
                      Attending
                    </Typography>
                    {guest.attending ? (
                      <CheckCircle color="primary" />
                    ) : (
                      <Cancel color="error" />
                    )}
                  </Box>
                </Box>
              </Box>
            ))}
          </CardContent>
        </Collapse>
      )}

      {customComponent}
    </Card>
  );
};

export default EventCard;

import { makeStyles } from '@material-ui/core';
import theme from '@theme/mui';

export const useEventCardStyles = makeStyles({
  cardRoot: {
    maxWidth: 600,
    margin: '20px auto',
  },
  media: {
    height: 300,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  buttonCenter: {
    display: 'flex',
    alignItems: 'center',
  },
});

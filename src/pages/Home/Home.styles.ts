import { makeStyles } from '@material-ui/core';

export const useHomeStyles = makeStyles({
  cardContainer: {
    width: '100%',
  },
  auto: {
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  centerSpinner: {
    display: 'flex',
    justifyContent: 'center',
  },
});

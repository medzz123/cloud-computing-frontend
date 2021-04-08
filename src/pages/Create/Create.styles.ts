import { makeStyles } from '@material-ui/core';
import theme from '@theme/mui';

export const useCreateStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  cardRoot: {
    maxWidth: 600,
    margin: '20px auto',
  },
  dropArea: {
    height: 200,
    border: `5px dashed ${theme.palette.grey[400]}`,
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

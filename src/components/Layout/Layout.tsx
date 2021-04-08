import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Create, EventAvailable, ExitToApp, Home } from '@material-ui/icons';
import firebase from 'firebase/app';
import Link from 'next/link';
import * as React from 'react';

import { LayoutProps } from './Layout.models';
import { useLayoutStyles } from './Layout.styles';

const withLayoutRoutes = ['/', '/create'];

const Layout: React.FunctionComponent<LayoutProps> = (props) => {
  const { children, currentRoute } = props;

  const classes = useLayoutStyles();

  if (!withLayoutRoutes.includes(currentRoute)) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  return (
    <div>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <EventAvailable />

            <Box marginLeft="20px">
              <Typography className={classes.title} variant="h6" noWrap>
                RSVP Events
              </Typography>
            </Box>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Link href="/create">
                <IconButton
                  type="button"
                  aria-label="account of current user"
                  color={currentRoute === '/' ? 'secondary' : 'inherit'}
                >
                  <Home />
                </IconButton>
              </Link>
              <Link href="/create">
                <IconButton
                  type="button"
                  aria-label="account of current user"
                  color={currentRoute === '/create' ? 'secondary' : 'inherit'}
                >
                  <Create />
                </IconButton>
              </Link>
              <IconButton
                aria-label="account of current user"
                onClick={() => {
                  firebase.auth().signOut();
                }}
              >
                <ExitToApp color="error" />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>

      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default Layout;

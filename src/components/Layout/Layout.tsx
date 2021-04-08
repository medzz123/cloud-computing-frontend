import { logout } from '@lib/logout';
import {
  AppBar,
  IconButton,
  Link as MaterialLink,
  Toolbar,
} from '@material-ui/core';
import { Create, EventAvailable, ExitToApp, Home } from '@material-ui/icons';
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
            <Link href="/">
              <MaterialLink className={classes.materialLink}>
                RSVP Events
              </MaterialLink>
            </Link>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Link href="/">
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
              <IconButton aria-label="account of current user" onClick={logout}>
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

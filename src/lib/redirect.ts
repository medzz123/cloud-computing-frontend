import Cookie from 'js-cookie';
import router from 'next/router';
import { useEffect } from 'react';

export const useLoggedIn = () => {
  useEffect(() => {
    if (Cookie.get('token')) {
      return;
    }

    router.push('/login');
  }, []);
};

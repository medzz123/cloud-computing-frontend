import { authenticatedFetch } from '@lib/fetch';
import { logout } from '@lib/logout';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const useHomeHooks = () => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState([]);
  useEffect(() => {
    const getEvents = async () => {
      setLoading(true);

      try {
        const response = await authenticatedFetch({ url: '/user' });

        if (response?.data) {
          setState(response.data.events);
        }
      } catch (error) {
        if (JSON.stringify(error)?.includes('401')) {
          toast.error(
            'Your session expired, you will be logged out shortly, please login again.'
          );
          logout();
        }
      }

      setLoading(false);
    };

    getEvents();
  }, []);

  return { state, loading };
};

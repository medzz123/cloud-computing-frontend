import { authenticatedFetch } from '@lib/fetch';
import { useEffect, useState } from 'react';

export const useHomeHooks = () => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState([]);
  useEffect(() => {
    const getEvents = async () => {
      setLoading(true);

      const response = await authenticatedFetch({ url: '/user' });

      if (response.data) {
        setState(response.data.events);
      }
      setLoading(false);
    };

    getEvents();
  }, []);

  return { state, loading };
};

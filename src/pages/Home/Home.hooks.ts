import { authenticatedFetch } from '@lib/fetch';
import { useEffect, useState } from 'react';

export const useHomeHooks = () => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState([]);
  useEffect(() => {
    const getEvents = async () => {
      setLoading(true);

      const response = await authenticatedFetch({ url: '/user' });

      setLoading(false);
      if (response) {
        setState(response.data.events);
      }
    };

    getEvents();
  }, []);

  return { state, loading };
};

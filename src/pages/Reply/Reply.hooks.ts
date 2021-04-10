import { unauthenticatedFetch } from '@lib/fetch';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

export const useReply = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const router = useRouter();

  const handler = useCallback((input) => {
    setLoading(input);
  }, []);

  const [state, setState] = useState(undefined);
  useEffect(() => {
    const getEvents = async () => {
      const params = router.query;
      setError(false);

      try {
        const response = await unauthenticatedFetch({
          url: `/get-reply?id=${params.id}&event=${params.event}&token=${params.token}`,
        });

        if (response?.data) {
          setState(response.data);
        }
      } catch {
        setError(true);
      }

      setLoading(false);
    };

    if (router.isReady) {
      getEvents();
    }
  }, [router.isReady]);

  return { state, loading, handler, error };
};

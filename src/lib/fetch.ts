import axios from 'axios';
import Cookies from 'js-cookie';

const baseUrl =
  'https://europe-west1-rsvp-events-9aec5.cloudfunctions.net/main';

export const authenticatedFetch = async ({
  url,
  body,
  method = 'GET',
}: {
  url: string;
  method?: 'GET' | 'POST';
  body?: unknown;
}) => {
  return axios.request({
    url: baseUrl + url,
    method,
    headers: {
      authorization: `Bearer ${Cookies.get('token')} `,
    },
    data: body,
  });
};

export const unauthenticatedFetch = async ({
  url,
  body,
  method = 'GET',
}: {
  url: string;
  method?: 'GET' | 'POST';
  body?: unknown;
}) => {
  return axios.request({
    url: baseUrl + url,
    method,
    data: body,
  });
};

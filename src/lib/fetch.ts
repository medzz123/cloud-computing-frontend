import axios from 'axios';
import firebase from 'firebase/app';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

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
  toast.dismiss();
  let response = undefined;
  try {
    response = await axios.request({
      url: baseUrl + url,
      method,
      headers: {
        authorization: `Bearer ${Cookies.get('token')} `,
      },
      data: body,
    });
  } catch (error) {
    if (JSON.stringify(error)?.includes('401')) {
      toast.error(
        'Your session expired, you will be logged out shortly, please login again.'
      );
      firebase.auth().signOut();
    }
  }

  return response;
};

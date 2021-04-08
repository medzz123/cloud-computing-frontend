import firebase from 'firebase/app';

export const initializeFirebase = () => {
  if (firebase.apps.length > 0) return;

  firebase.initializeApp({
    apiKey: 'AIzaSyCYhfQXK1hmDlp6af0JpxrQAKu3y3SzEjc',
    authDomain: 'rsvp-events-9aec5.firebaseapp.com',
    projectId: 'rsvp-events-9aec5',
    storageBucket: 'rsvp-events-9aec5.appspot.com',
    messagingSenderId: '418546343899',
    appId: '1:418546343899:web:124dba61181f14052351fe',
  });
};

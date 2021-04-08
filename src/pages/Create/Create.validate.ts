import { FormikErrors } from 'formik';

import { CreateEventValues } from './Create.models';

const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;

const dateRegex = /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

export const createValidate = (values: CreateEventValues) => {
  const { title, name, location, startTime, endTime, emails, date } = values;
  const errors: FormikErrors<CreateEventValues> = {};

  if (!title) {
    errors.title = 'Please add a title.';
  }

  if (!date) {
    errors.date = 'Please add a date.';
  } else if (!date.match(dateRegex)) {
    errors.date = 'Please specify a valid date/format.';
  }

  if (!name) {
    errors.name = 'Please add a name.';
  } else if (name.includes(' ')) {
    errors.name = 'Event name cannot have any white spaces.';
  }

  if (!location) {
    errors.location = 'Please add a location.';
  }

  if (!startTime) {
    errors.startTime = 'Please specify a time.';
  } else if (!startTime.match(timeRegex)) {
    errors.startTime = 'Please specify a valid time/format.';
  }
  if (!endTime) {
    errors.endTime = 'Please specify a time.';
  } else if (!endTime.match(timeRegex)) {
    errors.endTime = 'Please specify a valid time/format.';
  }

  if (!emails) {
    errors.emails = 'Please add emails.';
  } else {
    const splitEmails = emails.split(',').map((item) => item.trim());

    if (
      !splitEmails.every((email) => {
        return !!email.match(emailRegex);
      })
    ) {
      errors.emails = 'Please enter valid emails.';
    }
  }

  return errors;
};

import TextField from '@material-ui/core/TextField';
import { useField } from 'formik';
import React from 'react';

import { useStyles } from './FormikInput.styles';
import { FormikInputProps } from './FormikTextInput.models';

const FormikTextInput: React.FunctionComponent<FormikInputProps> = (props) => {
  const { name } = props;
  const [field, meta, helpers] = useField(name);

  const error = meta.touched && !!meta.error;

  const classes = useStyles();

  return (
    // @ts-ignore
    <TextField
      className={classes.input}
      autoComplete="off"
      error={error}
      onChange={(e) => {
        helpers.setValue(e.target.value);
      }}
      onBlur={() => {
        helpers.setTouched(true);
      }}
      value={field.value}
      helperText={error ? meta.error : ' '}
      fullWidth={true}
      {...props}
    />
  );
};

export default FormikTextInput;

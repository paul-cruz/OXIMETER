import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { app } from '../../resources/firebaseConfig';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(({
  root: {}
}));

const Password = ({ className, ...rest }) => {
  const alert = useAlert();
  const classes = useStyles();
  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });

  const updatePswd = () => {
    if (values.password === values.confirm) {
      app.auth()
        .currentUser.updatePassword(values.password)
        .then(function () {
          alert.show("Contraseña actualizada!", { title: "Logrado!" });
        }).catch((error) => { alert.show(error.message, { title: "Error!" }); })
    } else {
      alert.show("Las contraseñas no coinciden", { title: "Error!" });
    }
  }
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          title="Cambiar contraseña"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Nueva contraseña"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirmar contraseña"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={updatePswd}
          >
            Actualizar contraseña
          </Button>
        </Box>
      </Card>
    </form>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;

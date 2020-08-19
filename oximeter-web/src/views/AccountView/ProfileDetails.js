import React, { useState } from 'react';
import clsx from 'clsx';
import { useAlert } from 'react-alert';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { updateUserData } from '../../utils/firestore';

const tipos = [
  {
    value: 'A-p',
    label: 'A+'
  },
  {
    value: 'A-n',
    label: 'A-'
  },
  {
    value: 'B-p',
    label: 'B+'
  },
  {
    value: 'B-n',
    label: 'B-'
  },
  {
    value: 'AB-p',
    label: 'AB+'
  },
  {
    value: 'AB-n',
    label: 'AB-'
  },
  {
    value: 'O-p',
    label: 'O+'
  },
  {
    value: 'O-n',
    label: 'O-'
  }
];

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ uid, className, userdata, ...rest }) => {
  const alert = useAlert();
  const classes = useStyles();
  const [values, setValues] = useState(userdata);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = () => {

    updateUserData(uid, values)
      .then(function () {
        alert.show("Datos Actualizados.", { title: "Bien hecho!" });
      })
      .catch(function (error) {
        alert.show(error.message, { title: "Error!" });
      })
  }

  return (
    <form
      autoComplete="off"
      validate="true"
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          title="Perfil"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Nombre (s)"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Apellidos"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={3}
              xs={6}
            >
              <TextField
                fullWidth
                label="Edad"
                name="edad"
                type="number"
                onChange={handleChange}
                required
                value={values.edad}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={3}
              xs={6}
            >
              <TextField
                fullWidth
                label="Estatura"
                name="estatura"
                onChange={handleChange}
                type="number"
                value={values.estatura}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={3}
              xs={6}
            >
              <TextField
                fullWidth
                label="Peso"
                name="peso"
                onChange={handleChange}
                type="number"
                value={values.peso}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={3}
              xs={6}
            >
              <TextField
                fullWidth
                label="Tipo de sangre"
                name="sangre"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.sangre}
                variant="outlined"
              >
                {tipos.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
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
            onClick={handleSubmit}
          >
            Guardar
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;

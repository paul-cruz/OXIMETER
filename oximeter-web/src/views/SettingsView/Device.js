import React from 'react';
import PropTypes from 'prop-types';
import { useAlert } from 'react-alert';
import clsx from 'clsx';
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
import { updateUserData, updateDeviceData, getData } from '../../utils/firestore';

const useStyles = makeStyles(({
  root: {},
  item: {
    display: 'flex-row',
    flexDirection: 'row'
  }
}));

class DeviceC extends React.Component {

  constructor(props) {
    super();
    this.props = props;
    this.alert = props.alert;
    this.uid = props.uid;
    this.state = {
      serie_number: '',
    }
    getData(this.uid)
      .then(result => {
        if (result.exists) {
          this.setState({
            serie_number: result.data().serie_number ? result.data().serie_number : ''
          });
        }
      })
      .catch((error) => { this.alert.show(error.message, { title: "Error!" }); });
  }

  handleChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = () => {
    const uid = this.uid;
    const usr = {
      userID: this.uid
    }
    const data = this.state;
    const new_alert = this.alert;
    updateUserData(uid, data)
      .then(function () {
        updateDeviceData(data.serie_number, usr)
          .then(function () {
            new_alert.show("Datos Actualizados.", { title: "Bien hecho!" });
          })
          .catch((error) => { new_alert.show(error.message, { title: "Error!" }); });
      })
      .catch((error) => { this.alert.show(error.message, { title: "Error!" }); });
  }

  render() {
    const { classes } = this.props;
    return (
      <form
        className={clsx(classes.root, this.props.className)}
        {...this.props.rest}
      >
        <Card>
          <CardHeader
            title="Información del oxímetro"
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={6}
              wrap="wrap"
            >
              <Grid
                className={classes.item}
                item
                md={12}
                sm={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Número de serie"
                  margin="normal"
                  name="serie_number"
                  onChange={this.handleChange}
                  type="number"
                  value={this.state.serie_number}
                  variant="outlined"
                />
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
              onClick={this.handleSubmit}
            >
              Guardar
            </Button>
          </Box>
        </Card>
      </form>
    );
  }
}

const Device = ({ uid, className, ...rest }) => {
  const alert = useAlert();
  const classes = useStyles();
  return <DeviceC uid={uid} classes={classes} alert={alert} className={className} rest />
};

Device.propTypes = {
  className: PropTypes.string
};

export default Device;

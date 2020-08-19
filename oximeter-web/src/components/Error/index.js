import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from "../../images/404_v2.png";
import VerifyEmail from "../../images/Verify-email.png";
import background from "../../images/fondo.jpg";
import { makeStyles } from '@material-ui/core';
import Page from "../Page";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${background})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  height: '100vh',
  textAlign: 'center',
  }
}));

const Errors = {
  "404": PageNotFound,
  "Verify": VerifyEmail,
};

export default function Error({ err, msj }) {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="404">
      <Link to="/home">
        <img src={Errors[err]} alt={err} style={{ height: '50vh', margin: '5%' }} />
      </Link>
      <h2>{msj}</h2>
    </Page >
  );
}
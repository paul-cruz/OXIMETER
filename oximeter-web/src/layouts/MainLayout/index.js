import React from 'react';
import '../../styles/home.css';
import background from "../../images/fondo.jpg";
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    overflow: 'hidden',
    textAlign: 'center',
  },
}));

export default function MainLayout() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Outlet />
    </div>
  );
}
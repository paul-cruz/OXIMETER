import React, { useEffect, useContext, useState } from "react";
import { Outlet } from 'react-router-dom';
import { Auth } from "../../context/AuthContext";
import { makeStyles } from '@material-ui/core';
import { app } from '../../resources/firebaseConfig';
import { useNavigate } from "react-router";
import NavBar from './NavBar';
import TopBar from './TopBar';
import { regiterUser, getData } from '../../utils/firestore';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const DashboardLayout = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(Auth);
  const [name, setname] = useState(null);
  const [photourl, setphotourl] = useState(null);

  useEffect(() => {
    if (user === null) {
      navigate('/home', { replace: true });
    } else if (!user.emailVerified) {
      app
        .auth()
        .signOut()
        .then(() => {
          navigate('/VerifyEmail', { replace: true });
        });
    } else {
      getData(user.uid)
        .then((doc) => {
          if (!doc.exists) {
            regiterUser({
              uid: user.uid,
              name: user.displayName,
              email: user.email
            }).catch(error => {
              alert.show(error.message, { title: "Error!" });
            });
          }
        })
    }
    user ? user.displayName ? setname(user.displayName) : setname(user.email) : setname(null);
    user ? setphotourl(user.photoURL) : setphotourl(null);

  }, [navigate, user]);

  const LogOut = () => {
    app
      .auth()
      .signOut();
  };

  return (
    <div className={classes.root}>
      <TopBar onLogOut={() => LogOut()} onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        name={name}
        photourl={photourl}
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            {user ? <Outlet /> : <div></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

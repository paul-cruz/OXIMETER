import React, { useContext } from "react";
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { useAlert } from 'react-alert';
import { Auth } from "../../context/AuthContext";
import { app } from '../../resources/firebaseConfig';
import Page from '../../components/Page';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import Diseases from "./DiseasesDetails";
import { getData } from "../../utils/firestore";
import Loading from "../../components/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

class AccountC extends React.Component {

  constructor(props) {
    super();
    this.user = props.user;
    this.navigate = props.navigate;
    this.state = {
      name: null,
      photourl: null,
      userdata: null
    }
    if (this.user === null) {
      this.navigate('/home', { replace: true });
    } else if (!this.user.emailVerified) {
      app
        .auth()
        .signOut()
        .then(() => {
          this.navigate('/VerifyEmail', { replace: true });
        });
    } else {
      getData(this.user.uid)
        .then(result => {
          if (result.exists) {
            let apellido = result.data().lastName ? result.data().lastName : ''
            this.setState({
              userdata: result.data(),
              photourl: this.user.photoURL,
              name: result.data().name ? result.data().name + ' ' + apellido : this.user.displayName ? this.user.displayName : this.user.email
            });
          }
        })
        .catch((error) => { props.alert.show(error.message, { title: "Error!" }); });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Page
        className={classes.root}
        title="Account"
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <Profile name={this.state.name} photourl={this.state.photourl} />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              {this.state.userdata ? <ProfileDetails userdata={this.state.userdata} uid={this.user.uid} /> : <Loading />}
            </Grid>
          </Grid>
          {this.state.userdata ? <Diseases userdata={this.state.userdata} uid={this.user.uid} /> : <Loading />}
        </Container>
      </Page>
    );
  }
}

const Account = () => {
  const alert = useAlert();
  const classes = useStyles();
  const { user } = useContext(Auth);
  const { navigate } = useNavigate();

  return <AccountC user={user} classes={classes} navigate={navigate} alert={alert}/>
}

export default Account;
import React, { useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useAlert } from 'react-alert';
import { Auth } from "../../../context/AuthContext";
import Avatar from '@material-ui/core/Avatar';
import {
    app,
    googleAuthProvider,
} from "../../../resources/firebaseConfig";
import { green, red, blue } from '@material-ui/core/colors';
import { IoLogoGoogle, IoLogoFacebook, IoLogoWindows } from "react-icons/io";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
    },
    social_icon: {
        width: "10%",
        height: "10%",
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(1)
    },
    google_icon: {
        color: theme.palette.getContrastText(red[600]),
        backgroundColor: red[600],
    },
    facebook_icon: {
        color: theme.palette.getContrastText(blue[900]),
        backgroundColor: blue[900],
    },
    windows_icon: {
        color: theme.palette.getContrastText(green["A400"]),
        backgroundColor: green["A400"],
    }
}));

const SignIn = () => {
    const navigate = useNavigate();
    const alert = useAlert();
    const classes = useStyles();
    const { user } = useContext(Auth);

    useEffect(() => {
        if (user) {
            if (!user.emailVerified) {
                alert.show('Aún no verifica su correo, para reenviar el correo de verificación presione "Reenviar correo"', {
                    title: "Correo no verificado!",
                    closeCopy: "Cancelar",
                    actions: [
                        {
                            copy: "Reenviar correo",
                            onClick: () => {
                                app.auth().currentUser.sendEmailVerification({ url: process.env.REACT_APP_URL, });
                            }
                        }
                    ]
                });
                app.auth().signOut();
            } else {
                navigate('/', { replace: true });
            }
        }
    }, [navigate, user, alert]);


    const simpleSignIn = async e => {
        e.preventDefault();
        const { email, password } = e.target.elements;

        await app
            .auth()
            .signInWithEmailAndPassword(email.value, password.value)
            .then(() => {
                navigate('/', { replace: true });
            })
            .catch(error => {
                alert.show(error.message, { title: "Error!" });
            });
    };

    const socialLogin = async (provider) => {
        await app
            .auth()
            .signInWithPopup(provider)
            .then(() => { navigate('/', { replace: true }); })
            .catch(error => {
                alert.show(error.message, { title: "Error!" });
            });
    };

    return (
        <div className={classes.paper} name="SignIn">
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <form className={classes.form} onSubmit={simpleSignIn}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Correo electronico"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                {/*<FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Recordarme"
                />*/}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    {"Iniciar Sesion"}
                </Button>
            </form>
            <Grid container
                direction="row"
                justify="center"
                alignItems="center">
                <Grid item className={classes.social_icon}>
                    <Avatar className={classes.google_icon} onClick={() => socialLogin(googleAuthProvider)}><IoLogoGoogle /></Avatar>
                </Grid>
                <Grid item className={classes.social_icon}>
                    <Avatar className={classes.facebook_icon}><IoLogoFacebook /></Avatar>
                </Grid>
                <Grid item className={classes.social_icon}>
                    <Avatar className={classes.windows_icon}><IoLogoWindows /></Avatar>
                </Grid>
            </Grid>
        </div>
    );
}

export default SignIn;
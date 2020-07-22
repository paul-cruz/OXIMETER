import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { green, red, blue } from '@material-ui/core/colors';
import { IoLogoGoogle, IoLogoFacebook, IoLogoWindows } from "react-icons/io";
import Copyright from './../../resources/copyright';
import SignIn from './SignIn';
import { useAlert } from 'react-alert';
import SignUp from './SignUp';
import { withRouter } from "react-router";
import PasswdRecovery from './PasswdRecovery';
import {
    app,
    googleAuthProvider,
} from "../../resources/firebaseConfig";

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

const MenuIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill={props.fill} className={props.class} version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 2674 1328.5" enableBackground="new 0 0 2674 1328.5"> <path fill="None" stroke={props.fill} strokeWidth="41.25" strokeLinejoin="round" strokeMiterlimit="10" d="M57,687.5h277.3 l49.3-178.7l116,770.7l100-1228L669,806.2l70.7-116l428.4-0.5C997.2,535.3,876.3,379.1,912,225.5 c25.9-111.6,108.1-168.8,203.8-175.1c6.6-0.4,13.1-0.7,19.5-0.7c96.2,0,162.2,49.1,200.9,124.9c37-72.6,101.7-125.7,192.7-125.7 c8.6,0,17.5,0.5,26.6,1.5c104.7,11.3,180.7,71,204.9,165.2c38.1,148.5-75.8,315.2-251.5,474.4l460.1,1.5l65.3,118.7l73.3-738.7 l97.3,1196l116-752l48,170.7h248" /> </svg>
)


const Product = ({ history }) => {
    const classes = useStyles();
    const alert = useAlert();
    const signin = <SignIn />;
    const signup = <SignUp />;
    const passwdrecovery = <PasswdRecovery />;

    const [form, setform] = useState(signin);
    const [acciontext, setacciontext] = useState("Aún no tienes cuenta? Registrate");
    const [passwddisplay, setpasswddisplay] = useState(true);

    function onhandleform() {
        if (form.type.WrappedComponent.name === "SignIn") {
            setform(signup);
            setpasswddisplay(false);
            setacciontext("Ya tienes cuenta? Inicia Sesión");
        } else {
            setform(signin);
            setpasswddisplay(true);
            setacciontext("Aún no tienes cuenta? Registrate");
        }
    }

    function onhandlepasswd() {
        setform(passwdrecovery);
        setpasswddisplay(false);
        setacciontext("Regresar a Iniciar Sesión");
    }

    const socialLogin = async (provider) => {
        await app
            .auth()
            .signInWithPopup(provider)
            .then(() => {
                history.push("/");
            })
            .catch(error => {
                alert.show(error.message, { title: "Error!" });
            });
    };

    return (
        <Grid container spacing={3} direction="row" justify="center" alignItems="center">
            <Grid item lg={5} sm={3}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    {form}
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
                    <Grid container>
                        <Grid item xs>
                            <Link onClick={onhandlepasswd} variant="body2" style={{ cursor: "pointer", display: passwddisplay === true ? "block" : "none" }}>
                                {"Olvidaste tu contraseña?"}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link onClick={onhandleform} variant="body2" style={{ cursor: "pointer" }}>
                                {acciontext}
                            </Link>
                        </Grid>
                    </Grid>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </Container>
            </Grid>
            <Grid item lg={7} sm={3}>
                <MenuIcon fill="#1698C2" />
            </Grid>
        </Grid>
    );
};

export default withRouter(Product);
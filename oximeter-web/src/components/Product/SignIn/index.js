import React, { useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useAlert } from 'react-alert';
import { withRouter } from "react-router";
import { app } from "../../../resources/firebaseConfig";
import { Auth } from "../../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
    },
}));

const SignIn = ({ history }) => {
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
                history.push("/");
            }
        }
    }, [history, user, alert]);


    const simpleSignIn = async e => {
        e.preventDefault();
        const { email, password } = e.target.elements;

        await app
            .auth()
            .signInWithEmailAndPassword(email.value, password.value)
            .then(() => {
                history.push("/");                
            })
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
        </div>
    );
}

export default withRouter(SignIn);
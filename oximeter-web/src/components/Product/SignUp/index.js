import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { app } from '../../../resources/firebaseConfig';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { regiterUser } from '../../../utils/firestore';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
    },
    submit: {
        margin: theme.spacing(1, 0, 2),
    },
}));

const SignUp = ({ setsignup }) => {
    const alert = useAlert();
    const classes = useStyles();
    const navigate = useNavigate();

    const handleSignUp = async e => {
        e.preventDefault();
        const { name, email, password, password_ver } = e.target.elements;

        if (password.value === password_ver.value) {
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value)
                .then(result => {
                    console.log(result);
                    app.auth().currentUser.sendEmailVerification({ url: process.env.REACT_APP_URL, })
                        .then(() => {
                            regiterUser({ uid: app.auth().currentUser.uid, name: name.value, email: email.value })
                                .then(() => {
                                    app
                                        .auth()
                                        .signOut()
                                        .then(() => {
                                            navigate('/VerifyEmail', { replace: true });
                                        });
                                }).catch(error => {
                                    alert.show(error.message, { title: "Error!" });
                                });
                        }).catch((err) => { alert.show(err.message, { title: "Error!" }); })
                })
                .catch(error => {
                    alert.show(error.message, { title: "Error!" });
                });
        } else {
            alert.show("Las contraseñas deben coincidir", { title: "Error!" });
        }
    };

    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <form className={classes.form} onSubmit={handleSignUp}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Nombre"
                    name="name"
                    autoComplete="name"
                    autoFocus
                />
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
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password_ver"
                    label="Repertir Contraseña"
                    type="password"
                    id="password_ver"
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    {"Registrarse"}
                </Button>
            </form>
        </div>
    );
}

export default SignUp;
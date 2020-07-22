import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useAlert } from 'react-alert';
import { app } from "../../../resources/firebaseConfig";

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

const PasswdRecovery = () => {
    const alert = useAlert();
    const classes = useStyles();

    const resetPasswd = async e => {
        e.preventDefault();
        const { email } = e.target.elements;
        await app.auth().sendPasswordResetEmail(email.value).then(function () {
            alert.show("Te hemos enviado un correo de recueración", { title: "Enviado!" });
        }).catch(function (error) {
            alert.show(error.message, { title: "Error!" });
        });
    }
    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Password Recovery
            </Typography>
            <form className={classes.form} onSubmit={resetPasswd}>
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
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    {"Recuperar contraseña"}
                </Button>
            </form>
        </div>
    );
}

export default PasswdRecovery;
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

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

const FormContact = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
            Contactanos
            </Typography>
            <form className={classes.form} onSubmit={props.handleSend}>
            <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="name"
                        label="Nombre"
                        name="name"
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
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="message"
                        defaultValue='Me interesa pedir informes para adquirir un Oxímetro de Mexbalia.'
                        label="Mensaje"
                        name="message"
                        multiline
                        rows={5}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        {"Enviar"}
                    </Button>
            </form>
        </div>
    );
}

export default FormContact;
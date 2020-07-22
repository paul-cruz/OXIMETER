import React from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from './../../resources/copyright';
import { withRouter } from "react-router";
import { useAlert } from 'react-alert';
import FormContact from './formContact';

const useStyles = makeStyles((theme) => ({
    contact: {
        paddingLeft: theme.spacing(20)
    }
}));

const Contact = ({ history }) => {
    const classes = useStyles();
    const alert = useAlert();

    const handleSend = e => {
        e.preventDefault();
        const { email, name, message } = e.target.elements;
        const variables = {message_html: message.value, from_name:name.value, from_email: email.value }
        window.emailjs.send(
            'gmail','template_othCe6kw', variables
        ).then(res=>{
            alert.show('Se ha enviado el correo con éxito, pronto estaremos en contacto contigo!');
        });   
    }

    return (
        <Grid container spacing={3} direction="row" justify="center" alignItems="center">
            <Grid item lg={5} sm={3}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                        <FormContact handleSend={handleSend}/>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </Container>
            </Grid>
            <Grid item lg={7} sm={3}>
                <img className={classes.contact} alt='Contact' src='https://images.vexels.com/media/users/3/154699/isolated/preview/c93db465dcc07a3343537bf142adece5---cono-de-contacto-de-l--piz-y-papel-by-vexels.png' />
            </Grid>
        </Grid>
    );
};

export default withRouter(Contact);
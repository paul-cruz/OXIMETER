import React from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import FormContact from './formContact';
import Container from '@material-ui/core/Container';
import Copyright from './../../resources/copyright';
import { useAlert } from 'react-alert';


const ContactUsIcon = (props) => (
    <svg version="1.1" id="Capa_1" fill={props.fill} className={props.class} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 511.999 511.999" enableBackground="new 0 0 511.999 511.999" width="60%">
        <g>
            <g>
                <path d="M467,150.991H362v-75c0-24.813-20.187-45-45-45H45c-24.813,0-45,20.187-45,45v180c0,24.813,20.187,45,45,45h15v45
			c0,12.013,13.418,19.081,23.32,12.481L150,314.019v61.972c0,24.813,20.187,45,45,45h147.458l86.221,57.481
			c9.916,6.611,23.32-0.465,23.32-12.481v-45h15c24.813,0,45-20.187,45-45v-180C512,171.178,491.813,150.991,467,150.991z
			 M156.638,273.538c-0.014,0.01-0.029,0.019-0.043,0.028L90,317.963v-31.972c0-8.284-6.716-15-15-15H45c-8.271,0-15-6.729-15-15
			v-180c0-8.271,6.729-15,15-15h272c8.271,0,15,6.729,15,15v180c0,8.271-6.729,15-15,15H165
			C162.097,270.991,159.097,271.889,156.638,273.538z M482,375.991c0,8.271-6.729,15-15,15h-30c-8.284,0-15,6.716-15,15v31.972
			l-66.68-44.453c-2.464-1.643-5.359-2.519-8.32-2.519H195c-8.271,0-15-6.729-15-15v-75h137c24.813,0,45-20.187,45-45v-75h105
			c8.271,0,15,6.729,15,15V375.991z"/>
            </g>
            <g>
                <path d="M195,180.991H75c-8.284,0-15,6.716-15,15s6.716,15,15,15h120c8.284,0,15-6.716,15-15S203.284,180.991,195,180.991z" />
            </g>
            <g>
                <path d="M287,120.991H75c-8.284,0-15,6.716-15,15s6.716,15,15,15h212c8.284,0,15-6.716,15-15S295.284,120.991,287,120.991z" />
            </g>
        </g>
    </svg>
)


const Contact = () => {
    const alert = useAlert();

    const handleSend = e => {
        e.preventDefault();
        const { email, name, message } = e.target.elements;
        const variables = { message_html: message.value, from_name: name.value, from_email: email.value }
        window.emailjs.send(
            'gmail', 'template_othCe6kw', variables
        ).then(res => {
            alert.show('Se ha enviado el correo con éxito, pronto estaremos en contacto contigo!');
        });
    }

    return (
        <Grid container spacing={3} direction="row" justify="center" alignItems="center">
            <Grid item lg={5} sm={3}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <FormContact handleSend={handleSend} />
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </Container>
            </Grid>
            <Grid item lg={7} sm={3}>
                <ContactUsIcon fill="#1698C2" />
            </Grid>
        </Grid>
    );
};

export default Contact;
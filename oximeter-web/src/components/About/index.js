import React from 'react';
import {
    Grid,
    Container,
    CssBaseline
} from '@material-ui/core/';

const MenuIcon = (props) => (
    <svg version="1.1" id="Capa_1" fill={props.fill} className={props.class} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        viewBox="0 0 512 512" enableBackground="new new 0 0 512 512" width="50%">
        <g>
            <g>
                <path d="M386.172,85.053l-17.333-73.667C367.268,4.715,361.315,0,354.462,0H196.923c-6.854,0-12.807,4.715-14.376,11.386
			l-17.333,73.666c-24.094,5.483-42.137,27.064-42.137,52.794v64.28c-22.122,2.458-39.385,21.261-39.385,44.028
			c0,22.767,17.262,41.569,39.385,44.028v83.972c0,25.73,18.043,47.311,42.137,52.793l17.333,73.666
			c1.57,6.672,7.522,11.387,14.376,11.387h157.538c6.854,0,12.807-4.715,14.377-11.386l17.333-73.667
			c24.094-5.483,42.136-27.063,42.136-52.793V137.846C428.308,112.116,410.266,90.536,386.172,85.053z M123.077,260.079
			c-5.73-2.031-9.846-7.507-9.846-13.925s4.116-11.894,9.846-13.926V260.079z M208.62,29.538h134.144l12.741,54.154H195.878
			L208.62,29.538z M342.764,482.462H208.62l-12.742-54.154h159.628L342.764,482.462z M398.769,374.154
			c0,13.573-11.042,24.615-24.615,24.615H177.231c-13.573,0-24.615-11.042-24.615-24.615V137.846
			c0-13.573,11.042-24.615,24.615-24.615h196.923c13.573,0,24.615,11.042,24.615,24.615V374.154z"/>
            </g>
        </g>
        <g>
            <g>
                <path d="M374.154,241.231h-19.692c-4.162,0-8.129,1.756-10.929,4.834l-9.015,9.916l-28.438-29.859
			c-3.096-3.249-7.496-4.913-11.971-4.529c-4.471,0.389-8.523,2.787-11.013,6.522l-23.811,35.715l-28.958-72.393
			c-2.301-5.754-7.95-9.478-14.147-9.277c-6.195,0.182-11.617,4.212-13.578,10.092l-16.325,48.979h-9.047
			c-8.157,0-14.769,6.613-14.769,14.769s6.613,14.769,14.769,14.769h19.692c6.358,0,12-4.068,14.011-10.099l6.942-20.827
			l24.411,61.026c2.037,5.092,6.728,8.636,12.184,9.204c0.513,0.054,1.024,0.08,1.532,0.08c4.902,0,9.529-2.442,12.286-6.577
			l29.139-43.709l26.647,27.979c2.789,2.929,6.656,4.583,10.695,4.583c0.057,0,0.114,0,0.171-0.001
			c4.101-0.047,7.998-1.798,10.758-4.833l15.298-16.826h13.158c8.157,0,14.769-6.613,14.769-14.769S382.31,241.231,374.154,241.231z
			"/>
            </g>
        </g>
    </svg>
)

const About = () => {

    return (
        <Grid container spacing={3} direction="row" justify="center" alignItems="center">
            <Grid item lg={5} sm={3}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <h4>
                        <p>
                            El oxímetro es un dispositivo electrónico para medir el porcentaje de oxigenación de la sangre y los pulsos por minuto en los seres humanos.
                        </p>
                        <br/>
                        <p>
                            Estos dispositivos son muy importantes en el día a día para tener un control de lo que sucede en nuestro cuerpo, pero se vuelven indispensables cuando por alguna situación o enfermedad como el SARS-CoV-2 (COVID-19) se deben dar seguimiento a los indicadores comentados anteriormente.
                        </p>
                        <br/>
                        <p>
                            Por esto en Mexbalia estamos comprometidos contigo y hemos desarrollado un oximetro que se comunica con esta plataforma, en la cual también puedes llevar tu historial médico para cualquier situación de emergencia. Así que ¡ve a contacto para adquirir el tuyo!
                        </p>
                    </h4>
                </Container>
            </Grid>
            <Grid item lg={7} sm={3}>
                <MenuIcon fill="#1698C2" />
            </Grid>
        </Grid>
    );
};

export default About;
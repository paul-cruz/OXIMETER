import React from 'react';
import '../../styles/home.css'
import Spinner from 'react-bootstrap/Spinner';
import Grid from '@material-ui/core/Grid';
import background from "../../images/fondo.jpg";

const back_style = {
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
}

export default function Loading() {
    return (
        <div className="root" style={back_style}>
            <Grid container spacing={0} direction="row" justify="center" alignItems="center">
                <Spinner animation="grow" variant="primary" />
            </Grid>
        </div>
    );
}
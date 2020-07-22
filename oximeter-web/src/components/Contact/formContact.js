import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router";

class FormContact extends React.Component {
    render() {
        return( 
            <div >
                <Typography component="h1" variant="h5">
                    Contactanos
                </Typography>
                <form onSubmit={this.props.handleSend}>
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
                        rows={10}
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
    };  
};

export default withRouter(FormContact);
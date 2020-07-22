import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Error from "./components/Error";
import Dashboard from "./views/Dashboard";
import { positions, Provider } from "react-alert";
import AlertMUITemplate from 'react-alert-template-mui';
import Home from './views/Home';

const alert_options = {
    position: positions.MIDDLE
};

function App() {
    return (
        <AuthContext>
            <Router>
                <Switch>
                    <Route exact path="/home">
                        <Provider template={AlertMUITemplate} {...alert_options}>
                            <Home />
                        </Provider>
                    </Route>
                    <Route exact path="/">
                        <Dashboard />
                    </Route>
                    <Route exact path="/VerifyEmail">
                        <Error err="Verify" msj="Por favor verifica tu correo electronico, puedes volver dado click a la imagen." />
                    </Route>
                    <Route path="*">
                        <Error err="404" />
                    </Route>
                </Switch>
            </Router>
        </AuthContext>
    );
}

export default App;

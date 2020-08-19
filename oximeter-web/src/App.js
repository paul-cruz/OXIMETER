import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import "./App.css";
import { useRoutes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { ThemeProvider } from '@material-ui/core';
import routes from './routes';
import theme from './theme';
import GlobalStyles from './utils/GlobalStyles';

function App() {
    const routing = useRoutes(routes);

    return (
        <AuthContext>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                {routing}
            {/*<Router>
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
            </Router>*/}
            </ThemeProvider>
        </AuthContext>
    );
}

export default App;

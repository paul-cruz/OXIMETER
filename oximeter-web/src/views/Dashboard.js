import React, { useEffect, useContext, useState } from "react";
import { Auth } from "../context/AuthContext";
import { withRouter } from "react-router";
import Button from 'react-bootstrap/Button';
import { Container } from "@material-ui/core";
import { app } from '../resources/firebaseConfig';

const Dashboard = ({ history }) => {
    const { user } = useContext(Auth);
    const [name, setname] = useState(null)

    useEffect(() => {
        if (user === null) {
            history.push("/home");
        } else if (!user.emailVerified) {
            app
                .auth()
                .signOut()
                .then(() => {
                    history.push("/VerifyEmail");
                });
        }

        user ? user.displayName ? setname(user.displayName) : setname(user.email) : setname(null)

    }, [history, user]);

    const LogOut = () => {
        app
            .auth()
            .signOut();
    };
    return (
        <div style={{ height: "100vh" }}>
            <Container style={{ padding: "0 50px", marginTop: 40 }}>
                <div
                    style={{
                        background: "#fff",
                        padding: 24,
                        minHeight: "80vh"
                    }}
                >
                    Hola {name} :)
                    </div>
                <Button variant="outline-primary" onClick={LogOut}>Log Out</Button>
            </Container>
            <footer style={{ textAlign: "center" }}>
                Creado por Mexbalia
                </footer>
        </div>
    );

}
export default withRouter(Dashboard);
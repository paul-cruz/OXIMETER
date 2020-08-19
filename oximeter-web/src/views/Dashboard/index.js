import React, { useContext } from "react";
import {
    Container,
    Grid,
    makeStyles
} from '@material-ui/core';
import { Auth } from "../../context/AuthContext";
import Page from '../../components/Page';
import BPM from './BPM';
import SPO2 from "./SPO2";
import Timestamp from "./Timestamp";
import History from "./History";
import { getUserRef } from "../../utils/firestore";
import { useAlert } from "react-alert";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

class DashboardC extends React.Component {
    constructor(props) {
        super();
        this.props = props;
        this.state = ({
            history: [],
            last_data: {}
        });

    //.onSnapshot((doc)=>doc)
        getUserRef(this.props.uid)
            .onSnapshot(result => {
                if (result.exists) {
                    this.setState({
                        history: result.data().history ? result.data().history : [],
                        last_data: result.data().history ? result.data().history[result.data().history.length - 1] ? result.data().history[result.data().history.length - 1] : {} : {}
                    });
                }
            }, (error) => { this.props.alert.show(error.message, { title: "Error!" }); }
            );
    }

    render() {
        const timestamp = this.state.last_data.timestamp ? this.state.last_data.timestamp.seconds : ''
        const { classes } = this.props;
        return (
            <Page
                className={classes.root}
                title="Dashboard"
            >
                <Container maxWidth={false}>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={4}
                            sm={4}
                            xl={4}
                            xs={12}
                        >
                            <BPM value={this.state.last_data.bpm} />
                        </Grid>
                        <Grid
                            item
                            lg={4}
                            sm={4}
                            xl={4}
                            xs={12}
                        >
                            <SPO2 value={this.state.last_data.spo2} />
                        </Grid>
                        <Grid
                            item
                            lg={4}
                            sm={4}
                            xl={4}
                            xs={12}
                        >
                            <Timestamp value={new Date(timestamp * 1000).toLocaleDateString()} />
                        </Grid>
                        <Grid
                            item
                            lg={12}
                            md={12}
                            xl={12}
                            xs={12}
                        >
                            <History data={this.state.history} />
                        </Grid>
                    </Grid>
                </Container>
            </Page>
        );
    };
}

const Dashboard = () => {
    const classes = useStyles();
    const alert = useAlert();
    const { user } = useContext(Auth);

    return <DashboardC classes={classes} uid={user.uid} alert={alert} />
};

export default Dashboard;
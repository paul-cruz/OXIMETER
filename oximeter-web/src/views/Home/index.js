import React from 'react';
import '../../styles/home.css'
import PropTypes from 'prop-types';
import {
    Box,
    AppBar,
    Tabs,
    Tab,
    Grid,
    Toolbar,
    makeStyles
} from '@material-ui/core';
import Product from '../../components/Product';
import Contact from '../../components/Contact';
import Page from "../../components/Page";
import Logo from '../../images/Mexbalia_logo.png';
import About from '../../components/About';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
    }
}));


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`home-tabpanel-${index}`}
            aria-labelledby={`home-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `home-tab-${index}`,
        'aria-controls': `home-tabpanel-${index}`,
    };
}


export default function Home() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Page title="home" className={classes.root}>
            <Grid container spacing={0} direction="row" justify="center" alignItems="center">
                <Grid item lg={12} sm={12}>
                    <AppBar position="static" className="appbar" color="inherit" >
                        <Toolbar>
                            <Grid container justify={"center"}>
                                <Grid item xs>
                                    <img src={Logo} alt="Mexbalia logo" style={{ width: "2.5em" }} />
                                </Grid>
                            </Grid>
                            <Grid item xs>
                                <Grid container justify={"center"}>
                                    <Tabs value={value} onChange={handleChange} className="tabs" indicatorColor="primary">
                                        <Tab label="Producto" {...a11yProps(0)} />
                                        <Tab label="Acerca de" {...a11yProps(1)} />
                                        <Tab label="Contacto" {...a11yProps(2)} />
                                    </Tabs>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                </Grid>
                <Grid item lg={12} sm={12}>
                    <TabPanel value={value} index={0} className="tab">
                        <Product />
                    </TabPanel>
                    <TabPanel value={value} index={1} className="tab">
                        <About />
                    </TabPanel>
                    <TabPanel value={value} index={2} className="tab">
                        <Contact />
                    </TabPanel>
                </Grid>
            </Grid>
        </Page>
    );
}
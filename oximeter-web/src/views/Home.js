import React from 'react';
import '../styles/home.css'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Product from '../components/Product';
import background from "../images/fondo.jpg";
import Logo from '../images/Mexbalia_logo.png';

const back_style = {
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
}


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
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="root" style={back_style}>
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

                    </TabPanel>
                    <TabPanel value={value} index={2} className="tab">

                    </TabPanel>
                </Grid>
            </Grid>
        </div>
    );
}
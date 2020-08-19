import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAlert } from 'react-alert';
import clsx from 'clsx';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    Divider,
    FormControlLabel,
    Grid,
    Typography,
    makeStyles
} from '@material-ui/core';
import { updateUserData } from '../../utils/firestore';

const useStyles = makeStyles(({
    root: {},
    item: {
        display: 'flex',
        flexDirection: 'column'
    },
    item2: {
        display: 'flex-row',
        flexDirection: 'row'
    },
}));

const Diseases = ({ uid, className, userdata, ...rest }) => {
    const alert = useAlert();
    const classes = useStyles();
    const [values, setValues] = useState({
        hipertension: false,
        cardiopatia_coronaria: false,
        insuficiencia_cardiaca: false,
        miocardiopatias: false,
        cardiopatia_congenita: false,
        cancer_pulmon: false,
        cancer_mama: false,
        cancer_colorrectal: false,
        cancer_prostata: false,
        cancer_piel: false,
        cancer_estomago: false,
        diabetes_1: false,
        diabetes_2: false,
        diabetes_gestacional: false,
        epoc: false,
        erc: false,
        inmunodepresion: false,
        obesidad: false,
        fibrosis_quistica: false,
        ...userdata.diseases
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.checked
        });
        //console.log(event.target.name, event.target.checked);
    };

    const handleSubmit = () => {
        var diseases = {
            diseases: values
        }
        updateUserData(uid, diseases)
            .then(function () {
                alert.show("Datos Actualizados.", { title: "Bien hecho!" });
            })
            .catch(function (error) {
                alert.show(error.message, { title: "Error!" });
            })
    };

    return (
        <form
            className={clsx(classes.root, className)}
            {...rest}
        >
            <Card>
                <CardHeader
                    title="Historial médico"
                />
                <Divider />
                <CardContent>
                    <Grid
                        container
                        spacing={6}
                        wrap="wrap"
                    >
                        <Grid
                            className={classes.item}
                            item
                            md={4}
                            sm={6}
                            xs={12}
                        >
                            <Typography
                                color="textPrimary"
                                gutterBottom
                                variant="h6"
                            >
                                Cardiovasculares
              </Typography>
                            <FormControlLabel
                                control={(
                                    <Checkbox name="hipertension" onChange={handleChange} checked={values.hipertension} />
                                )}
                                label="Hipertensión"
                            />
                            <FormControlLabel
                                control={(
                                    <Checkbox name="cardiopatia_coronaria" onChange={handleChange} checked={values.cardiopatia_coronaria} />
                                )}
                                label="Cardiopatía coronaria"
                            />
                            <FormControlLabel
                                control={<Checkbox name="insuficiencia_cardiaca" onChange={handleChange} checked={values.insuficiencia_cardiaca}/>}
                                label="Insuficiencia cardiaca"
                            />
                            <FormControlLabel
                                control={(
                                    <Checkbox name="miocardiopatias" onChange={handleChange} checked={values.miocardiopatias}/>
                                )}
                                label="Miocardiopatías"
                            />
                            <FormControlLabel
                                control={(
                                    <Checkbox name="cardiopatia_congenita" onChange={handleChange} checked={values.cardiopatia_congenita}/>
                                )}
                                label="Cardiopatía congénita"
                            />
                        </Grid>
                        <Grid
                            className={classes.item}
                            item
                            md={4}
                            sm={6}
                            xs={12}
                        >
                            <Typography
                                color="textPrimary"
                                gutterBottom
                                variant="h6"
                            >
                                Cáncer
              </Typography>
                            <FormControlLabel
                                control={(
                                    <Checkbox name="cancer_pulmon" onChange={handleChange} checked={values.cancer_pulmon} />
                                )}
                                label="De pulmón"
                            />
                            <FormControlLabel
                                control={<Checkbox name="cancer_mama" onChange={handleChange} checked={values.cancer_mama}/>}
                                label="De mama"
                            />
                            <FormControlLabel
                                control={(
                                    <Checkbox name="cancer_colorrectal" onChange={handleChange} checked={values.cancer_colorrectal}/>
                                )}
                                label="Colorrectal"
                            />
                            <FormControlLabel
                                control={(
                                    <Checkbox name="cancer_prostata" onChange={handleChange} checked={values.cancer_prostata}/>
                                )}
                                label="De próstata"
                            />
                            <FormControlLabel
                                control={(
                                    <Checkbox name="cancer_piel" onChange={handleChange} checked={values.cancer_piel}/>
                                )}
                                label="De piel"
                            />
                            <FormControlLabel
                                control={(
                                    <Checkbox name="cancer_estomago" onChange={handleChange} checked={values.cancer_estomago}/>
                                )}
                                label="De estómago"
                            />
                        </Grid>
                        <Grid
                            className={classes.item}
                            item
                            md={4}
                            sm={6}
                            xs={12}
                        >
                            <Typography
                                color="textPrimary"
                                gutterBottom
                                variant="h6"
                            >
                                Diabetes
              </Typography>
                            <FormControlLabel
                                control={(
                                    <Checkbox name="diabetes_1" onChange={handleChange} checked={values.diabetes_1}/>
                                )}
                                label="Tipo 1"
                            />
                            <FormControlLabel
                                control={<Checkbox name="diabetes_2" onChange={handleChange} checked={values.diabetes_2}/>}
                                label="Tipo 2"
                            />
                            <FormControlLabel
                                control={(
                                    <Checkbox name="diabetes_gestacional" onChange={handleChange} checked={values.diabetes_gestacional}/>
                                )}
                                label="Gestacional"
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={6}
                        wrap="wrap"
                    >
                        <Grid
                            className={classes.item2}
                            item
                            md={12}
                            sm={12}
                            xs={12}
                        >
                            <Typography
                                color="textPrimary"
                                gutterBottom
                                variant="h6"
                            >
                                Otras
              </Typography>
                            <FormControlLabel
                                control={(
                                    <Checkbox name="epoc" onChange={handleChange} checked={values.epoc}/>
                                )}
                                label="EPOC"
                            />
                            <FormControlLabel
                                control={(
                                    <Checkbox name="erc" onChange={handleChange} checked={values.erc}/>
                                )}
                                label="Enfermedad renal crónica"
                            />
                            <FormControlLabel
                                control={<Checkbox name="inmunodepresion" onChange={handleChange} checked={values.inmunodepresion}/>}
                                label="Inmunodepresión"
                            />
                            <FormControlLabel
                                control={(
                                    <Checkbox name="obesidad" onChange={handleChange} checked={values.obesidad}/>
                                )}
                                label="Obesidad"
                            />
                            <FormControlLabel
                                control={(
                                    <Checkbox name="fibrosis_quistica" onChange={handleChange} checked={values.fibrosis_quistica}/>
                                )}
                                label="Fibrosis quística"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    p={2}
                >
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Guardar
          </Button>
                </Box>
            </Card>
        </form>
    );
};

Diseases.propTypes = {
    className: PropTypes.string
};

export default Diseases;
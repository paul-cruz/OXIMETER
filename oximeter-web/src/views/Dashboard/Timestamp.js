import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import TodayIcon from '@material-ui/icons/Today';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56
  }
}));

const Timestamp = ({ value, className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              Fecha
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {value}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <TodayIcon/>
            </Avatar>
          </Grid>
        </Grid>
        </CardContent>
    </Card>
  );
};

Timestamp.propTypes = {
  className: PropTypes.string
};

export default Timestamp;

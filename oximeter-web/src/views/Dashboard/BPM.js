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
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.blue[600],
    height: 56,
    width: 56
  }
}));

const BPM = ({ value, className, ...rest }) => {
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
              BPM
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {value} bpm
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <FavoriteBorderIcon />
            </Avatar>
          </Grid>
        </Grid>
        </CardContent>
    </Card>
  );
};

BPM.propTypes = {
  className: PropTypes.string
};

export default BPM;

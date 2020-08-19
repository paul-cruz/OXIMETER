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
import BubbleChartIcon from '@material-ui/icons/BubbleChart';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  }
}));

const SPO2 = ({ value, className, ...rest }) => {
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
              SPO2
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {value} %
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <BubbleChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        </CardContent>
    </Card>
  );
};

SPO2.propTypes = {
  className: PropTypes.string
};

export default SPO2;

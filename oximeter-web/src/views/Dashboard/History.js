import React from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const History = ({ data, className, ...rest }) => {
  const classes = useStyles();
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Historial de mediciones" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Pulso
                </TableCell>
                <TableCell>
                  Saturación de oxígeno
                </TableCell>
                <TableCell>
                  Fecha de la prueba
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow
                  hover
                  key={index}
                >
                  <TableCell>
                    {item.bpm} bpm
                  </TableCell>
                  <TableCell>
                    {item.spo2} %
                  </TableCell>
                  <TableCell>
                    { new Date(item.timestamp.seconds*1000).toString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

History.propTypes = {
  className: PropTypes.string
};

export default History;

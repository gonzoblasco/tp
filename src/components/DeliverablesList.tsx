import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { fetchDeliverables } from '../api';
import { Deliverable } from '../types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  CircularProgress,
  Grid,
} from '@mui/material';

const DeliverablesList: React.FC = () => {
  const { data: deliverables, error, isLoading } = useQuery<Deliverable[], Error>('deliverables', fetchDeliverables);

  if (isLoading) return <Grid container justifyContent="center"><CircularProgress /></Grid>;
  if (error) return <Typography>Error: {error.message}</Typography>;
  if (!deliverables || deliverables.length === 0) return <Typography>No deliverables found</Typography>;

  return (
    <TableContainer component={Paper} className="container mx-auto p-4">
      <Typography variant="h4" component="h2" gutterBottom>
        Deliverables
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Actual Name</TableCell>
            <TableCell>Client Name</TableCell>
            <TableCell>Client Number</TableCell>
            <TableCell>Status ID</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deliverables.map((deliverable) => (
            <TableRow key={deliverable.id}>
              <TableCell>{deliverable.name}</TableCell>
              <TableCell>{deliverable.actualName}</TableCell>
              <TableCell>{deliverable.clientName}</TableCell>
              <TableCell>{deliverable.clientNumber}</TableCell>
              <TableCell>{deliverable.statusId}</TableCell>
              <TableCell>{deliverable.endDate}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" component={Link} to={`/deliverable/${deliverable.id}`}>
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DeliverablesList;
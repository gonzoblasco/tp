import React, { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import useDeliverables from '../hooks/useDeliverables';
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
} from '@mui/material';

const DeliverablesList: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: deliverables, error, isLoading } = useDeliverables();

  useEffect(() => {
    if (deliverables) {
      deliverables.forEach((deliverable: Deliverable) => {
        queryClient.prefetchQuery(['deliverable', deliverable.id], () => deliverable);
      });
    }
  }, [deliverables, queryClient]);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {(error as Error).message}</Typography>;

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
          {deliverables?.map((deliverable) => (
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
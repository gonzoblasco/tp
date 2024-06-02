import React from 'react';
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
import { Container, Box } from '@mui/system';

const DeliverablesList: React.FC = () => {
  const { data: deliverables, error, isLoading } = useQuery<Deliverable[], Error>('deliverables', fetchDeliverables);

  if (isLoading) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <CircularProgress role="status" aria-label="Loading" />
      </Grid>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error" gutterBottom role="alert">
          Error: {error.message}
        </Typography>
      </Container>
    );
  }

  if (!deliverables || deliverables.length === 0) {
    return (
      <Container>
        <Typography variant="h6" gutterBottom>
          No deliverables found
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box mt={4} mb={2}>
        <Typography variant="h4" component="h2" gutterBottom>
          Deliverables
        </Typography>
      </Box>
      <TableContainer component={Paper} role="table" aria-label="Deliverables table">
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
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/deliverable/${deliverable.id}`}
                    aria-label={`View details for ${deliverable.name}`}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default DeliverablesList;
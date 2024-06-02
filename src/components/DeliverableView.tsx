import React from 'react';
import { Deliverable } from '../types';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button } from '@mui/material';

interface DeliverableViewProps {
  deliverable: Deliverable;
  onEdit: () => void;
}

const DeliverableView: React.FC<DeliverableViewProps> = ({ deliverable, onEdit }) => (
  <div>
    <Button variant="contained" color="primary" onClick={onEdit} style={{ marginBottom: '16px' }}>
      Edit
    </Button>
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>{deliverable.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Actual Name</TableCell>
            <TableCell>{deliverable.actualName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Client Name</TableCell>
            <TableCell>{deliverable.clientName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Client Number</TableCell>
            <TableCell>{deliverable.clientNumber}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Status ID</TableCell>
            <TableCell>{deliverable.statusId}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>End Date</TableCell>
            <TableCell>{deliverable.endDate}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </div>
);

export default DeliverableView;
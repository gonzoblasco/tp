import React from 'react';
import { Deliverable } from '../types';
import { Button, Grid, Typography, Card, CardContent, CardActions } from '@mui/material';

interface DeliverableViewProps {
  deliverable: Deliverable;
  onEdit: () => void;
}

const DeliverableView: React.FC<DeliverableViewProps> = ({ deliverable, onEdit }) => {
  return (
    <Card role="article" aria-labelledby="deliverable-details">
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" id="deliverable-details">
              Name
            </Typography>
            <Typography>{deliverable.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Actual Name</Typography>
            <Typography>{deliverable.actualName}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Client Name</Typography>
            <Typography>{deliverable.clientName}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Client Number</Typography>
            <Typography>{deliverable.clientNumber}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Status ID</Typography>
            <Typography>{deliverable.statusId}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">End Date</Typography>
            <Typography>{deliverable.endDate}</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" onClick={onEdit} aria-label={`Edit ${deliverable.name}`}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default DeliverableView;
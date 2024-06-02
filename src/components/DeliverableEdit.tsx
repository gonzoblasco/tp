import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DeliverableFormData } from '../types';
import { deliverableSchema } from '../validationSchema';
import { Button, TextField, Grid, Box } from '@mui/material';

interface DeliverableEditProps {
  formData: DeliverableFormData;
  onSave: (data: DeliverableFormData) => void;
  onCancel: () => void;
}

const DeliverableEdit: React.FC<DeliverableEditProps> = ({ formData, onSave, onCancel }) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<DeliverableFormData>({
    defaultValues: formData,
    resolver: yupResolver(deliverableSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSave)} aria-labelledby="edit-deliverable-form">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                aria-required="true"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="actualName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Actual Name"
                fullWidth
                error={!!errors.actualName}
                helperText={errors.actualName?.message}
                aria-required="true"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="clientName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Client Name"
                fullWidth
                error={!!errors.clientName}
                helperText={errors.clientName?.message}
                aria-required="true"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="clientNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Client Number"
                fullWidth
                error={!!errors.clientNumber}
                helperText={errors.clientNumber?.message}
                aria-required="true"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="statusId"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Status ID"
                fullWidth
                error={!!errors.statusId}
                helperText={errors.statusId?.message}
                aria-required="true"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="End Date"
                fullWidth
                error={!!errors.endDate}
                helperText={errors.endDate?.message}
                aria-required="true"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default DeliverableEdit;
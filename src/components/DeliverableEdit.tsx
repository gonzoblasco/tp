import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DeliverableFormData } from '../types';
import { deliverableSchema } from '../validationSchema';
import { TextField, Button, Container } from '@mui/material';

interface DeliverableEditProps {
  formData: DeliverableFormData;
  onSave: (data: DeliverableFormData) => void;
  onCancel: () => void;
}

const DeliverableEdit: React.FC<DeliverableEditProps> = ({ formData, onSave, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<DeliverableFormData>({
    defaultValues: formData,
    resolver: yupResolver(deliverableSchema),
  });

  const onSubmit: SubmitHandler<DeliverableFormData> = (data) => {
    onSave(data);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '16px' }}>
          <TextField
            label="Name"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ''}
            fullWidth
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <TextField
            label="Actual Name"
            {...register('actualName')}
            error={!!errors.actualName}
            helperText={errors.actualName ? errors.actualName.message : ''}
            fullWidth
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <TextField
            label="Client Name"
            {...register('clientName')}
            error={!!errors.clientName}
            helperText={errors.clientName ? errors.clientName.message : ''}
            fullWidth
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <TextField
            label="Client Number"
            {...register('clientNumber')}
            error={!!errors.clientNumber}
            helperText={errors.clientNumber ? errors.clientNumber.message : ''}
            fullWidth
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <TextField
            label="Status ID"
            {...register('statusId')}
            error={!!errors.statusId}
            helperText={errors.statusId ? errors.statusId.message : ''}
            fullWidth
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <TextField
            label="End Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            {...register('endDate')}
            error={!!errors.endDate}
            helperText={errors.endDate ? errors.endDate.message : ''}
            fullWidth
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
          <Button variant="contained" color="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default DeliverableEdit;
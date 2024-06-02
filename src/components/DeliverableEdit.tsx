// DeliverableEdit.tsx
import React, { ChangeEvent } from 'react';
import { Deliverable } from '../types';

interface DeliverableEditProps {
  formData: Deliverable;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
}

const DeliverableEdit: React.FC<DeliverableEditProps> = ({ formData, onChange, onSave, onCancel }) => (
  <div>
    <div className="mb-4">
      <button onClick={onCancel} className="bg-blue-500 text-white px-4 py-2 rounded">Cancel</button>
      <button onClick={onSave} className="bg-green-500 text-white px-4 py-2 rounded ml-2">Save</button>
    </div>
    <table className="min-w-full bg-white">
      <tbody>
      <tr>
        <td className="border px-4 py-2 font-bold">Name</td>
        <td className="border px-4 py-2">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            className="border px-2 py-1 w-full"
          />
        </td>
      </tr>
      <tr>
        <td className="border px-4 py-2 font-bold">Actual Name</td>
        <td className="border px-4 py-2">
          <input
            type="text"
            name="actualName"
            value={formData.actualName}
            onChange={onChange}
            className="border px-2 py-1 w-full"
          />
        </td>
      </tr>
      <tr>
        <td className="border px-4 py-2 font-bold">Client Name</td>
        <td className="border px-4 py-2">
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={onChange}
            className="border px-2 py-1 w-full"
          />
        </td>
      </tr>
      <tr>
        <td className="border px-4 py-2 font-bold">Client Number</td>
        <td className="border px-4 py-2">
          <input
            type="text"
            name="clientNumber"
            value={formData.clientNumber}
            onChange={onChange}
            className="border px-2 py-1 w-full"
          />
        </td>
      </tr>
      <tr>
        <td className="border px-4 py-2 font-bold">Status ID</td>
        <td className="border px-4 py-2">
          <input
            type="text"
            name="statusId"
            value={formData.statusId}
            onChange={onChange}
            className="border px-2 py-1 w-full"
          />
        </td>
      </tr>
      <tr>
        <td className="border px-4 py-2 font-bold">End Date</td>
        <td className="border px-4 py-2">
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={onChange}
            className="border px-2 py-1 w-full"
          />
        </td>
      </tr>
      </tbody>
    </table>
  </div>
);

export default DeliverableEdit;
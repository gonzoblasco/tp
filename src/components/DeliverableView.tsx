// DeliverableView.tsx
import React from 'react';
import { Deliverable } from '../types';

interface DeliverableViewProps {
  deliverable: Deliverable;
  onEdit: () => void;
}

const DeliverableView: React.FC<DeliverableViewProps> = ({ deliverable, onEdit }) => (
  <div>
    <div className="mb-4">
      <button onClick={onEdit} className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
    </div>
    <table className="min-w-full bg-white">
      <tbody>
      <tr>
        <td className="border px-4 py-2 font-bold">Name</td>
        <td className="border px-4 py-2">{deliverable.name}</td>
      </tr>
      <tr>
        <td className="border px-4 py-2 font-bold">Actual Name</td>
        <td className="border px-4 py-2">{deliverable.actualName}</td>
      </tr>
      <tr>
        <td className="border px-4 py-2 font-bold">Client Name</td>
        <td className="border px-4 py-2">{deliverable.clientName}</td>
      </tr>
      <tr>
        <td className="border px-4 py-2 font-bold">Client Number</td>
        <td className="border px-4 py-2">{deliverable.clientNumber}</td>
      </tr>
      <tr>
        <td className="border px-4 py-2 font-bold">Status ID</td>
        <td className="border px-4 py-2">{deliverable.statusId}</td>
      </tr>
      <tr>
        <td className="border px-4 py-2 font-bold">End Date</td>
        <td className="border px-4 py-2">{deliverable.endDate}</td>
      </tr>
      </tbody>
    </table>
  </div>
);

export default DeliverableView;
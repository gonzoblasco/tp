// DeliverablesList.tsx
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeliverables } from '../api';
import { setDeliverables } from '../slices/deliverablesSlice';
import { RootState } from '../store';
import { Link } from 'react-router-dom';

const DeliverablesList: React.FC = () => {
  const dispatch = useDispatch();
  const deliverables = useSelector((state: RootState) => state.deliverables.deliverables);
  const { data, error, isLoading } = useQuery('deliverables', fetchDeliverables);

  useEffect(() => {
    if (data) {
      dispatch(setDeliverables(data));
    }
  }, [data, dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message ?? 'Unknown error'}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Deliverables</h2>
      <table className="min-w-full bg-white">
        <thead>
        <tr>
          <th className="py-2">Name</th>
          <th className="py-2">Actual Name</th>
          <th className="py-2">Client Name</th>
          <th className="py-2">Client Number</th>
          <th className="py-2">Status ID</th>
          <th className="py-2">End Date</th>
          <th className="py-2">Actions</th>
        </tr>
        </thead>
        <tbody>
        {deliverables && deliverables.map((deliverable) => (
          <tr key={deliverable.id}>
            <td className="border px-4 py-2">{deliverable.name}</td>
            <td className="border px-4 py-2">{deliverable.actualName}</td>
            <td className="border px-4 py-2">{deliverable.clientName}</td>
            <td className="border px-4 py-2">{deliverable.clientNumber}</td>
            <td className="border px-4 py-2">{deliverable.statusId}</td>
            <td className="border px-4 py-2">{deliverable.endDate}</td>
            <td className="border px-4 py-2">
              <Link to={`/deliverable/${deliverable.id}`} className="text-blue-500 hover:text-blue-700">
                View
              </Link>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliverablesList;
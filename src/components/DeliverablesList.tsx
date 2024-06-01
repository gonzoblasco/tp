import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getDeliverables } from '../slices/deliverablesSlice';
import { Deliverable } from '../types';

/**
 * Component for displaying a list of deliverables.
 * Fetches deliverables from the server and displays them in a table.
 * @returns {JSX.Element} The DeliverablesList component.
 */
const DeliverablesList: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const deliverables = useAppSelector(state => state.deliverables.deliverables);
  const loading = useAppSelector(state => state.deliverables.loading);
  const error = useAppSelector(state => state.deliverables.error);

  /**
   * Fetches deliverables when the component is mounted.
   */
  useEffect(() => {
    dispatch(getDeliverables());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
        {deliverables.map((deliverable: Deliverable) => (
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
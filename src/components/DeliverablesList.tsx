import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchDeliverables } from '../api';

interface Deliverable {
  id: string;
  name: string;
  actualName: string;
  clientName: string;
  clientNumber: string;
  statusId: string;
  endDate: string;
}

/**
 * Component for displaying a list of deliverables.
 * @returns {JSX.Element} The DeliverablesList component.
 */
const DeliverablesList: React.FC = (): JSX.Element => {
  const { data, error, isLoading } = useQuery<Deliverable[], Error>('deliverables', fetchDeliverables);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Deliverables List</h2>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
        <tr>
          <th className="w-1/6 py-2">Name</th>
          <th className="w-1/6 py-2">Actual Name</th>
          <th className="w-1/6 py-2">Client Name</th>
          <th className="w-1/6 py-2">Client Number</th>
          <th className="w-1/6 py-2">Status ID</th>
          <th className="w-1/6 py-2">End Date</th>
          <th className="w-1/6 py-2">Actions</th>
        </tr>
        </thead>
        <tbody className="text-gray-700">
        {data?.map((deliverable) => (
          <tr key={deliverable.id} className="hover:bg-gray-100">
            <td className="text-center py-2 border">{deliverable.name}</td>
            <td className="text-center py-2 border">{deliverable.actualName}</td>
            <td className="text-center py-2 border">{deliverable.clientName}</td>
            <td className="text-center py-2 border">{deliverable.clientNumber}</td>
            <td className="text-center py-2 border">{deliverable.statusId}</td>
            <td className="text-center py-2 border">{deliverable.endDate}</td>
            <td className="text-center py-2 border">
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

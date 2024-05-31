import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Deliverables Management</h1>
        <nav className="space-x-4">
          <Link to="/" className="text-lg hover:text-gray-300">
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

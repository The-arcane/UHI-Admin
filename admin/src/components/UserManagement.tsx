import React, { useState } from 'react';

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Patient' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Doctor' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Patient' },
];

function UserManagement() {
  const [users, setUsers] = useState(mockUsers);

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">
                <button 
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const SuperAdminDashboard = () => {
  const [admins, setAdmins] = useState([]);
  const [editModeAdminId, setEditModeAdminId] = useState(null); // Track admin id in edit mode
  const [updatedUsername, setUpdatedUsername] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/admins');
        setAdmins(response.data);
      } catch (error) {
        console.error('Error fetching admins', error);
        toast.error('Error fetching admins');
      }
    };

    fetchAdmins();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/user/admin/delete/${id}`);
      setAdmins(admins.filter(admin => admin._id !== id));
      toast.success('Admin deleted successfully');
    } catch (error) {
      console.error('Error deleting admin', error);
      toast.error('Error deleting admin');
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/user/admin/update/${id}`, {
        username: updatedUsername,
        email: updatedEmail,
      });
      setAdmins(admins.map(admin => (admin._id === id ? response.data : admin)));
      toast.success('Admin updated successfully');
      exitEditMode(); // Exit edit mode after successful update
    } catch (error) {
      console.error('Error updating admin', error);
      toast.error('Error updating admin');
    }
  };

  const enterEditMode = (id, currentUsername, currentEmail) => {
    setEditModeAdminId(id);
    setUpdatedUsername(currentUsername);
    setUpdatedEmail(currentEmail);
  };

  const exitEditMode = () => {
    setEditModeAdminId(null);
    setUpdatedUsername('');
    setUpdatedEmail('');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">SuperAdmin Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="text-left p-4">Username</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Profile Picture</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(admin => (
              <tr key={admin._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4">
                  {editModeAdminId === admin._id ? (
                    <input
                      type="text"
                      value={updatedUsername}
                      onChange={(e) => setUpdatedUsername(e.target.value)}
                      className="border border-gray-300 p-1 rounded"
                      placeholder="New Username"
                    />
                  ) : (
                    admin.username
                  )}
                </td>
                <td className="p-4">
                  {editModeAdminId === admin._id ? (
                    <input
                      type="email"
                      value={updatedEmail}
                      onChange={(e) => setUpdatedEmail(e.target.value)}
                      className="border border-gray-300 p-1 rounded"
                      placeholder="New Email"
                    />
                  ) : (
                    admin.email
                  )}
                </td>
                <td className="p-4">
                  <img src={admin.profilePicture} alt={admin.username} className="w-12 h-12 rounded-full object-cover" />
                </td>
                <td className="p-4">
                  {editModeAdminId === admin._id ? (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleUpdate(admin._id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={exitEditMode}
                        className="bg-gray-500 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => enterEditMode(admin._id, admin.username, admin.email)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(admin._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;

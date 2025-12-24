import { useEffect, useState } from "react";
import { fetchUsers } from "../api/userApi";
import { Link } from "react-router-dom";

function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then(data => setUsers(data));
  }, []);
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "DELETE"
    });

    setUsers(users.filter(user => user._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="w-full">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              User Management
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage your organization’s users and their profile details
            </p>
          </div>

          <Link
            to="/add"
            className="bg-indigo-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-600 transition"
          >
            + Add New User
          </Link>
        </div>

        {/* Users Table Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  User
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Company
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Location
                </th>
                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map(user => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {/* User Info */}
                  <td className="px-6 py-4 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </td>

                  {/* Company */}
                  <td className="px-6 py-4 text-gray-700">
                    {user.company}
                  </td>

                  {/* Location */}
                  <td className="px-6 py-4 text-gray-700">
                    {user.address.city}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-center space-x-4">
                    <Link
                      to={`/users/${user._id}`}
                      className="text-indigo-600 font-medium hover:underline"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-500 font-medium hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-8 text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );


}

export default Dashboard;

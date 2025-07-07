import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../components/Loader";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const User = () => {
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const backUser = auth?.user?.data || null;

  const [approvedUsers, setApprovedUsers] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BACKEND_BASE_URL}/user/allCandidates`);
      const allUsers = res.data?.data || [];

      const approved = allUsers.filter(user => user.isApproved === true);
      const pending = allUsers.filter(user => !user.isApproved);

      setApprovedUsers(approved);
      setPendingUsers(pending);
    } catch (err) {
      console.error("Failed to fetch users", err);
      toast.error("Failed to fetch users.", { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      setLoading(true);
      await axios.delete(`${BACKEND_BASE_URL}/user/delete/${userId}`);
      setApprovedUsers(prev => prev.filter(user => user._id !== userId));
      setPendingUsers(prev => prev.filter(user => user._id !== userId));
      toast.success("User deleted successfully!", { autoClose: 2000 });
    } catch (err) {
      console.error("Failed to delete user", err);
      toast.error("Failed to delete user", { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId) => {
    try {
      setLoading(true);
      await axios.patch(`${BACKEND_BASE_URL}/user/approveUser/${userId}`);
      toast.success("User approved successfully!", { autoClose: 2000 });
      await fetchUsers();
    } catch (err) {
      console.error("Failed to approve user", err);
      toast.error("Failed to approve user", { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  const renderUserTable = (users, showApprove = false) => (
    <div className="overflow-x-auto mb-12">
      <table className="w-full border border-gray-300 shadow-sm">
        <thead>
          <tr className="bg-blue-100 text-gray-700 text-sm uppercase">
            <th className="py-3 px-4 border">Avatar</th>
            <th className="py-3 px-4 border">Name</th>
            <th className="py-3 px-4 border">Age</th>
            <th className="py-3 px-4 border">Email</th>
            <th className="py-3 px-4 border">Contact</th>
            <th className="py-3 px-4 border">Vehicle</th>
            {!showApprove && <th className="py-3 px-4 border">Logsheet</th>}
            {backUser?.role === "Instructor" && (
              <th className="py-3 px-4 border">Actions</th>
            )}
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {users.map(user => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border">
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </td>
              <td className="py-3 px-4 border">{user.name}</td>
              <td className="py-3 px-4 border">{user.age}</td>
              <td className="py-3 px-4 border">{user.email}</td>
              <td className="py-3 px-4 border">{user.contactNumber}</td>
              <td className="py-3 px-4 border">
                {user.vehicleToLearn?.join(", ")}
              </td>
              {!showApprove && (
                <td className="py-3 px-4 border">
                  <Link
                    to={`/logsheet/${user._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View
                  </Link>
                </td>
              )}
              {backUser?.role === "Instructor" && (
                <td className="py-3 px-4 border text-center">
                  <div className="flex justify-center gap-2">
                    {showApprove && (
                      <button
                        onClick={() => handleApprove(user._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded shadow"
                        disabled={loading}
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow"
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            User Management
          </h2>

          {loading ? (
            <Loader />
          ) : (
            <>
              <h3 className="text-2xl font-semibold mb-4 text-green-700">
                Approved Users
              </h3>
              {approvedUsers.length === 0 ? (
                <p className="text-gray-500 mb-8">No approved users found.</p>
              ) : (
                renderUserTable(approvedUsers)
              )}

              <h3 className="text-2xl font-semibold mb-4 text-yellow-600">
                Pending Users
              </h3>
              {pendingUsers.length === 0 ? (
                <p className="text-gray-500">No pending users found.</p>
              ) : (
                renderUserTable(pendingUsers, true)
              )}
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default User;

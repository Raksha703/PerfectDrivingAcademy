import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader, SummaryUserCard, UserSection } from "../components/components.js";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const User = () => {
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const backUser = auth?.user?.data || null;

  const [approvedUsers, setApprovedUsers] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [showSection, setShowSection] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BACKEND_BASE_URL}/user/allCandidates`);
      const allUsers = res.data?.data || [];

      const approved = allUsers.filter(user => user.isApproved);
      const pending = allUsers.filter(user => !user.isApproved);

      setApprovedUsers((approved).reverse());
      setPendingUsers((pending).reverse());
    } catch (err) {
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
      toast.error("Failed to approve user", { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className=" shadow-2xl rounded-3xl p-10 border border-gray-200">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-10 tracking-tight">
            👥 User Management Panel
          </h2>

          {loading ? (
            <Loader />
          ) : (
            <>
              {/* Summary Cards */}
              <div className="flex flex-wrap gap-8 justify-center mb-12">
                <SummaryUserCard
                  title="✅ Approved Users"
                  count={approvedUsers.length}
                  onClick={() => setShowSection("approved")}
                />
                <SummaryUserCard
                  title="⏳ Pending Users"
                  count={pendingUsers.length}
                  onClick={() => setShowSection("pending")}
                />
              </div>

              {/* User Table Sections */}
              {showSection === "approved" && (
                <UserSection
                  title="✅ Approved Users List"
                  users={approvedUsers}
                  showApprove={false}
                  onApprove={handleApprove}
                  onDelete={handleDelete}
                  backUserRole={backUser?.role}
                />
              )}
              {showSection === "pending" && (
                <UserSection
                  title="⏳ Pending Users List"
                  users={pendingUsers}
                  showApprove={true}
                  onApprove={handleApprove}
                  onDelete={handleDelete}
                />
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

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { LogsheetModal, Loader } from '../components/components.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const LogsheetPage = () => {
  const { userId: paramUserId } = useParams();
  const { user: authUser } = useAuth();

  const [logsheets, setLogsheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editLog, setEditLog] = useState(null);
  const [error, setError] = useState('');

  const user = authUser?.data;
  const userId = paramUserId || user?._id;
  
  if (!userId) {
    return <div className="text-center p-4 text-gray-600">Loading user...</div>;
  }

  const isCandidate = user?.role === 'Candidate';

  const fetchLogsheets = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_BASE_URL}/user/logsheet/${userId}`);
      setLogsheets(res.data.data || []);
      setError('');
    } catch (err) {
      setLoading(false);
      console.error(err);
      toast.error("Failed to load logsheets.", {
        autoClose: 2000
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchLogsheets();
  }, [userId]);

  const handleDelete = async (logId) => {
    try {
      await axios.delete(`${BACKEND_BASE_URL}/user/logsheet/delete/${userId}/${logId}`);
      fetchLogsheets();
    } catch (err) {
      setLoading(false);
      console.error(err);
      toast.error("Failed to delete logsheets.", {
        autoClose: 2000
      });
    }
  };

  const handleModalSubmit = async (formData) => {
    try {
      if (editLog) {
        await axios.put(`${BACKEND_BASE_URL}/user/logsheet/update/${userId}/${editLog._id}`, formData);
        toast.success("Logsheet updated successfully!", {
          autoClose: 2000
        });
      } else {
        await axios.post(`${BACKEND_BASE_URL}/user/logsheet/upload/${userId}`, formData);
        toast.success("Logsheet uploaded successfully!", {
          autoClose: 2000
        });
      }
      closeLogsheetModal();
      fetchLogsheets()
    } catch (err) {
      setLoading(false);
      console.error(err);
      toast.error("Failed to submit logsheets.", {
        autoClose: 2000
      });
    }
  };

  const openLogsheetModal = (log = null) => {
    setEditLog(log);
    setModalOpen(true);
  };

  const closeLogsheetModal = () => {
    setEditLog(null);
    setModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    {
      loading ? <Loader /> :
      <>
        {isCandidate ? (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Your Driving Logsheet
          </h2>
          <button
            onClick={() => openLogsheetModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
          >
            + Upload Logsheet
          </button>
        </div>
      ) : (
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            {user?.name}'s Logsheet
          </h2>
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-500">Loading logsheets...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : logsheets.length === 0 ? (
        <p className="text-center text-gray-400">No logsheets found.</p>
      ) : (
        <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-md">
          <table className="min-w-full text-sm text-left text-gray-700 border-collapse">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-4 py-2 border border-gray-400">Day</th>
                <th className="px-4 py-2 border border-gray-400">Date</th>
                <th className="px-4 py-2 border border-gray-400">From</th>
                <th className="px-4 py-2 border border-gray-400">To</th>
                <th className="px-4 py-2 border border-gray-400">Km Covered</th>
                <th className="px-4 py-2 border border-gray-400">Learning</th>
                {isCandidate && <th className="px-4 py-2 border border-gray-400">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {logsheets.map((log, index) => (
                <tr key={log._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    {new Date(log.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {new Date(log.timingFrom).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {new Date(log.timingTo).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">{log.kmCovered} km</td>
                  <td className="px-4 py-2 border border-gray-300">{log.learning}</td>
                  {isCandidate && (
                    <td className="px-4 py-2 border border-gray-300">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => openLogsheetModal(log)}
                          className="px-3 py-1 text-sm rounded bg-yellow-500 hover:bg-yellow-600 text-white"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(log._id)}
                          className="px-3 py-1 text-sm rounded bg-red-500 hover:bg-red-600 text-white"
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
      )}

      {modalOpen && (
        <LogsheetModal
          isOpen={modalOpen}
          onClose={closeLogsheetModal}
          onSubmit={handleModalSubmit}
          initialData={editLog}
        />
      )}
      </>
    }
      
    </div>
  );
};

export default LogsheetPage;

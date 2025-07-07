import { useState, useEffect } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Mail, Phone, MapPin, BadgeCheck, CarFront } from 'lucide-react';
import Loader from '../components/Loader';

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const Instructor = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axios
      .get(`${BACKEND_BASE_URL}/user/allInstructors`)
      .then((res) => {
        setUsers(res.data.data);
        setLoading(false); // ✅ Make sure to stop loader here
      })
      .catch(() => {
        setLoading(false);
        toast.error("Failed to fetch users.", {
          autoClose: 2000,
        });
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen py-16 px-4 md:px-10">
      {loading ? (
        <Loader />
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        users.map((user, index) => (
          <div
            key={index}
            className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-3 mb-12"
          >
            {/* Left - Photo & Info */}
            <div className="bg-blue-950 text-white flex flex-col items-center justify-center p-10 md:p-12">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover shadow-lg border-4 border-white"
              />
              <h2 className="text-2xl font-bold mt-6">{user.name}</h2>
              <p className="text-sm text-blue-100 mt-1">
                {user.experience}+ years Experience
              </p>

              <h3 className="text-white text-lg font-semibold mb-3 text-center mt-4">
                Specialties
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {Array.isArray(user.specialties) &&
                  user.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="bg-white text-blue-900 font-semibold px-4 py-2 text-sm rounded-full shadow-md hover:bg-blue-100 transition duration-200"
                    >
                      {spec.trim()}
                    </span>
                  ))}
              </div>
            </div>

            {/* Right - Details */}
            <div className="md:col-span-2 p-10 space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
                Instructor Overview
              </h1>
              <p className="text-gray-700 leading-relaxed text-base">{user.bio}</p>

              <div className="grid sm:grid-cols-2 gap-6 text-blue-950 font-medium mt-6">
                <div className="flex items-center gap-3">
                  <BadgeCheck size={20} />
                  <span>License: {user.license}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CarFront size={20} />
                  <span>Experience: {user.experience}+ years</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={20} />
                  <span>{user.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={20} />
                  <span>{user.contactNumber}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={20} />
                  <span>{user.email}</span>
                </div>
              </div>

              <div className="pt-6">
                <button className="bg-blue-950 hover:bg-blue-900 text-white px-6 py-3 rounded-xl shadow transition duration-300">
                  {`Book Session with ${user.name}`}
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Instructor;

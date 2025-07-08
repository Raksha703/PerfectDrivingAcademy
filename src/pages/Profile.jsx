import { useState } from 'react';
import axios from "axios";
import { Mail, Phone, MapPin, BadgeCheck, CarFront } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader';

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

function Profile() {
  const [loading, setLoading] = useState(false)
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const userData = user?.data;

  const [formData, setFormData] = useState(() => ({
    name: userData?.name || '',
    bio: userData?.bio || '',
    address: userData?.address || '',
    contactNumber: userData?.contactNumber || '',
    specialties: userData?.specialties?.join(', ') || '',
    license: userData?.license || '',
    experience: userData?.experience || '',
  }));

  if (!userData) {
    return <div className="text-center py-10 text-lg font-semibold">Loading profile...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    setLoading(true)
    try {
      
      const updated = {
        ...formData,
        userId: userData._id,
        specialties: formData.specialties.split(',').map(s => s.trim()),
      };

      const res = await axios.put(`${BACKEND_BASE_URL}/user/update`, updated);
      setShowModal(false);

      toast.success("User updated successfully!", {
        autoClose: 2000,
      });
      window.location.reload()
      
    } catch (error) {
      console.error('Update failed', error);
      toast.error("Failed to update user.", {
        autoClose: 2000,
      });
    } finally{
      setLoading(true)
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 md:px-10">
    {
      loading ? <Loader /> : (
        <>
          <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-3 mb-12">
            {/* Left - Photo & Info */}
            <div className="bg-blue-950 text-white flex flex-col items-center justify-center p-10 md:p-12">
          <img
            src={userData.avatar}
            alt={userData.name}
            className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover shadow-lg border-4 border-white"
          />
          <h2 className="text-2xl font-bold mt-6">{userData.name}</h2>

          {userData.role === 'Instructor' && (
            <>
              <h3 className="text-white text-lg font-semibold mb-3 text-center">Specialties</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {userData.specialties?.map((spec, i) => (
                  <span
                    key={i}
                    className="bg-white text-blue-900 font-semibold px-4 py-2 text-sm rounded-full shadow-md hover:bg-blue-100 transition duration-200"
                  >
                    {spec.trim()}
                  </span>
                ))}
              </div>
            </>
          )}
            </div>

            {/* Right - Details */}
            <div className="md:col-span-2 p-10 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">{userData.role} Overview</h1>
          <p className="text-gray-700 leading-relaxed text-base">{userData.bio}</p>

          <div className="grid sm:grid-cols-2 gap-6 text-blue-950 font-medium mt-6">
            {userData.role === "Instructor" && (
              <>
                <div className="flex items-center gap-3">
                  <BadgeCheck size={20} />
                  <span>License: {userData.license}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CarFront size={20} />
                  <span>Experience: {userData.experience}+ years</span>
                </div>
              </>
            )}
            <div className="flex items-center gap-3">
              <MapPin size={20} />
              <span>{userData.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={20} />
              <span>+91 - {userData.contactNumber}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={20} />
              <span>{userData.email}</span>
            </div>
          </div>

          <div className="pt-6 space-y-4">
            {userData.role === "Candidate" && (
              <>
              <Link to={`/logsheet/${userData._id}`}>
                <button className="bg-blue-950 hover:bg-blue-900 text-white px-6 py-3 rounded-xl shadow transition duration-300 w-full">
                  Logsheet
                </button>
              </Link>
              <Link to={`/logsheet/${userData._id}`}>
                <button className="bg-blue-950 hover:bg-blue-900 text-white px-6 py-3 rounded-xl shadow transition duration-300 w-full">
                  Form for certificate
                </button>
              </Link>
              </>
            )}

            <button
              onClick={() => setShowModal(true)}
              className="border border-blue-950 text-blue-950 hover:bg-blue-50 px-6 py-3 rounded-xl shadow transition duration-300 w-full"
            >
              Edit Profile
            </button>
          </div>
            </div>
          </div>

          {/* Modal */}
          {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 overflow-y-auto pt-[120px] px-4">
          <div className="mx-auto bg-white p-6 rounded-xl w-full max-w-xl shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-blue-900">Edit Profile</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <input
                  type="text"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Bio"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Enter number"
                />
              </div>

              {userData.role === 'Instructor' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specialties (comma separated)</label>
                    <input
                      type="text"
                      name="specialties"
                      value={formData.specialties}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-4 py-2"
                      placeholder="e.g., Car, Bike"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">License</label>
                    <input
                      type="text"
                      name="license"
                      value={formData.license}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-4 py-2"
                      placeholder="License Number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-4 py-2"
                      placeholder="e.g., 5 years"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-black hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded-lg bg-blue-950 text-white hover:bg-blue-900"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
          )}
        </>
      )
    }
      
    </div>
  );
}

export default Profile;

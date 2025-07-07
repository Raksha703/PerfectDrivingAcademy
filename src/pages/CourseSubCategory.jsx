import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {Loader, CourseCard, CourseFormModal} from "../components/components.js";
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const CourseSubCategory = () => {
  const [loading, setLoading] = useState(true);

  let {user} = useAuth();
  console.log(user)

  let role = user ? user.data.role : "Candidate";
  
  const { category } = useParams();
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const initialState = {
    name: '',
    description: '',
    timing: '',
    kmPerDay: '',
    days: '',
    features: '',
    category: category
  };

  const [formData, setFormData] = useState(initialState);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${BACKEND_BASE_URL}/course/all/${category}`);
      setLoading(false);
      setCourses(res.data.data || []);
    } catch (err) {
      setLoading(false);
      toast.error("Error fetching courses", {
        autoClose: 2000
      });
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      category,
      features: formData.features.split(',').map(f => f.trim()).filter(Boolean),
    };

    try {
      if (editId) {
        setLoading(true)
        await axios.put(`${BACKEND_BASE_URL}/course/update/${editId}`, payload);
        setLoading(false)
        toast.success("Course updated successfully!", {
          autoClose: 2000
        });
        setTimeout(()=>{
          window.location.reload()
        }, 2000)
        
      } else {
        setLoading(true)
        await axios.post(`${BACKEND_BASE_URL}/course/upload`, payload);
        setLoading(false)
        toast.success("Course created successfully!", {
          autoClose: 2000
        });
        setTimeout(()=>{
          window.location.reload()
        }, 2000)
        
      }
      setShowModal(false);
      fetchCourses();
      resetForm();
    } catch (err) {
      setLoading(false);
      console.error('Error submitting course:', err);
      toast.error("Error submitting course", {
        autoClose: 2000
      });
        
    }
  };

  const resetForm = () => {
    setFormData(initialState);
    setEditId(null);
  };

  const handleClose = () => {
    setShowModal(false);
    resetForm();
  };

  const onUpdate = (course) => {
    setEditId(course._id);
    setFormData({
      name: course.name || '',
      description: course.description || '',
      timing: course.timing || '',
      kmPerDay: course.kmPerDay || '',
      days: course.days || '',
      features: (course.features || []).join(', '),
      category: course.category || category,
    });
    setShowModal(true);
  };

  const onDelete = async (course) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${course.name}"?`);
    if (confirmDelete) {
      setLoading(true)
      try {
        await axios.delete(`${BACKEND_BASE_URL}/course/delete/${course._id}`);
        setLoading(false)
        toast.success("Course deleted successfully!", {
          autoClose: 2000
        });
        setTimeout(()=>{
          window.location.reload()
        }, 2000)
        
      } catch (err) {
        console.error('Error deleting course:', err);
        toast.error("Failed to delete course.", {
          autoClose: 2000
        });
      } finally{
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
    
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-bold capitalize text-blue-800">
              {category} Courses
            </h1>

            {role === 'Instructor' && (
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl shadow transition"
              onClick={() => setShowModal(true)}
            >
              + Upload Course
            </button>)}
            
          </div>

          {
      loading ? 
      <Loader />
      :
      (
        <>
            
          {/* Courses Grid */}
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course._id}
              >
                <CourseCard
                  course={course}
                  onEdit={onUpdate}
                  onDelete={onDelete}
                  isAdmin={role === 'Instructor'}
                />
              </div>
            ))}
          </div>
          
          {/* Modal for Upload/Edit */}
          <CourseFormModal
            show={showModal}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            formData={formData}
            setFormData={setFormData}
            editId={editId}
          />
        </>
      )
    }
      
    </div>
  );
};

export default CourseSubCategory;

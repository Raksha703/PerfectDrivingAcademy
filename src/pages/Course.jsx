import React from 'react';
import { useNavigate } from 'react-router-dom';
import { car, scooty, bike } from '../assets/assets';
import CourseCard from '../components/CourseCard';
import 'react-toastify/dist/ReactToastify.css'; // Ensure this path is correct

const courseData = [
  {
    category:"car",
    name: 'Car Driving',
    image: car,
    description: 'Learn to drive a car with expert instructors and practical sessions.'
  },
  {
    category:"bike",
    name: 'Bike Driving',
    image: bike,
    description: 'Master two-wheeler control and safety rules for city driving.'
  },
  {
    category:"scooty",
    name: 'Scooty Driving',
    image: scooty,
    description: 'A quick and safe course to learn scooty riding with confidence.'
  },
];


const Course = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/coursesubcategory/${category}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-18 py-10 text-blue-800">Choose Course Category</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {courseData.map((course) => (
          <CourseCard
            course={course}
            onClick={() => handleCategoryClick(course.category)}
          />
        ))}
      </div>
    </div>
  );
};

export default Course;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Pencil, Trash2 } from 'lucide-react';

const CourseCard = ({ course, onClick, onEdit, onDelete, isAdmin }) => {
  return (
    <div
      className="card h-100 border border-light-subtle shadow-sm rounded-4 d-flex flex-column justify-between"
      onClick={onClick}
      style={{
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.04)';
      }}
    >
      {/* Image (optional) */}
      {course.image && (
        <img
          src={course.image}
          alt={course.name}
          className="card-img-top rounded-top-4"
          style={{ height: '200px', objectFit: 'cover' }}
        />
      )}

      <div className="card-body p-4 d-flex flex-column justify-content-between">
        {/* Course Title */}
        <h5 className="fw-semibold text-primary mb-2">{course.name}</h5>

        {/* Description */}
        {course.description && (
          <p className="text-muted mb-3 small">{course.description}</p>
        )}

        {/* Info Section */}
        <div className="mb-3">
          <p className="fw-semibold text-secondary mb-1 small">Course Details</p>
          <ul className="list-unstyled mb-0 small text-dark">
            {course.timing && <li><strong>Timing:</strong> {course.timing}</li>}
            {course.kmPerDay && <li><strong>Distance:</strong> {course.kmPerDay} km/day</li>}
            {course.days && <li><strong>Duration:</strong> {course.days} days</li>}
          </ul>
        </div>

        {/* Features List */}
        {course.features?.length > 0 && (
          <div>
            <p className="fw-semibold text-secondary mb-1 small">Key Features</p>
            <ul className="ps-3 mb-0 small text-dark">
              {course.features.map((feature, index) => (
                <li key={index} className="mb-1">{feature}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Admin-only Buttons */}
      {isAdmin && (
        <div className="card-footer bg-white border-0 px-4 pb-4 pt-2 d-flex justify-content-end gap-2">
          <button
            className="btn btn-sm btn-warning d-flex align-items-center gap-1"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(course);
            }}
          >
            <Pencil size={16} /> Edit
          </button>
          <button
            className="btn btn-sm btn-danger d-flex align-items-center gap-1"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(course);
            }}
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseCard;

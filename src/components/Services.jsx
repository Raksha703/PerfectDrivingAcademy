import React from 'react';
import { feature1, feature2, feature3 } from '../assets/assets';

const features = [
  {
    title: 'Multiple Flexible Driving Courses',
    subtitle: 'for Every Need',
    description:
      'Choose from a variety of driving plans – 15-day gradual training, intensive 8-day course, or 1-day express learning with 300 km real-road experience. Each course is structured for maximum learning with real market exams.',
    img: feature1 ,
    alt: 'Flexible Courses',
    reverse: false,
  },
  {
    title: 'Certified Instructors',
    subtitle: 'With Road-Tested Experience',
    description:
      'Learn from professionals who provide practical, real-world driving skills including highway, single-lane, and market scenarios. Safety, discipline, and confidence are at the core of our instruction.',
    img: feature2,
    alt: 'Expert Instructors',
    reverse: true,
  },
  {
    title: 'Track Your Journey',
    subtitle: 'With Digital Logsheets',
    description:
      'Students receive personalized daily progress tracking. Logsheets help monitor what was taught each day, with easy access to feedback, helping you and your instructor stay on the same page.',
    img: feature3,
    alt: 'Logsheet Tracking',
    reverse: false,
  },
];

function Services() {
  return (
    <div className="container my-5 px-3">
      <h2 className="pb-2 border-bottom px-4 py-5 text-center">OUR SERVICES</h2>

      {features.map((feature, index) => (
        <div key={index} className="row featurette mb-5">
          <div
            className={`col-md-7 align-self-center ${
              feature.reverse ? 'order-md-2' : ''
            }`}
          >
            <h2 className="featurette-heading fw-normal lh-1">
              {feature.title}{' '}
              <span className="text-body-secondary">{feature.subtitle}</span>
            </h2>
            <p className="lead">{feature.description}</p>
          </div>
          <div
            className={`col-md-5 ${feature.reverse ? 'order-md-1' : ''}`}
          >
            <img
              src={feature.img}
              alt={feature.alt}
              className="img-fluid rounded"
            />
          </div>
        </div>
      ))}

      <div className="text-center mt-4">
        <a href="/course" className="btn btn-dark px-5 py-2">
          Know More
        </a>
      </div>
    </div>
  );
}

export default Services;

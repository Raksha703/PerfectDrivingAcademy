import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        <div>
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">
            Perfect Car Driving Training Academy
          </h2>
          <p className="text-gray-400 text-sm leading-6">
            Learn to drive confidently and safely with our certified instructors. Flexible timings, modern vehicles, and a personalized training approach.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <div className="flex flex-col gap-2 text-sm text-gray-300">
            <a href="/" className="hover:text-yellow-400 transition">Home</a>
            <a href="/course" className="hover:text-yellow-400 transition">Courses</a>
            <a href="/gallery" className="hover:text-yellow-400 transition">Gallery</a>
            <a href="/instructor" className="hover:text-yellow-400 transition">Instructor</a>
            <a href="/contact" className="hover:text-yellow-400 transition">Contact Us</a>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <div className="flex flex-col gap-3 text-sm text-gray-300">
            <div className="flex items-start gap-2">
              <FaPhoneAlt className="mt-1" /> <span>+91 98068 07575</span>
            </div>
            <div className="flex items-start gap-2">
              <FaEnvelope className="mt-1" /> <span>maxpro.mp55@gmail.com</span>
            </div>
            <div className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1" />
              <span>Moti Niwa House no. 202 A.B. Road Guljhara Dhamnod <br/>Tehsil: Dharampuri <br/>Dist: Dhar <br/>M.P. 454552</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Social Media Handles</h3>
          <div className="flex space-x-4 mt-2">
            <a href="https://instagram.com" className="hover:text-yellow-400 transition">
              <FaInstagram size={20} />
            </a>
            <a href="https://facebook.com" className="hover:text-yellow-400 transition">
              <FaFacebookF size={20} />
            </a>
            <a href="https://youtube.com" className="hover:text-yellow-400 transition">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-gray-400 text-sm">
        © 2025 Perfect Car Driving Training Academy. All rights reserved.
        <br/>
        © Website by Raksha Agrawal. For more information, contact: 9644350589.
      </div>
    </footer>
  );
}

export default Footer;

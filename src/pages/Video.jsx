import React, { useState, useEffect } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader';

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const gridLayout = [
  { col: 'span 2', row: 'span 2' },
  { col: 'span 1', row: 'span 1' },
  { col: 'span 1', row: 'span 1' },
  { col: 'span 2', row: 'span 1' },
  { col: 'span 1', row: 'span 2' },
  { col: 'span 1', row: 'span 1' },
  { col: 'span 2', row: 'span 1' },
  { col: 'span 1', row: 'span 1' },
  { col: 'span 1', row: 'span 1' },
];

const Video = ({ adminMode = false, onDelete, onUpdate, onlyFeedback=false }) => {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);

  const filteredVideos = onlyFeedback ? 
    videos.filter((v) => v.description==="feedback")
    : videos.filter((v)=> v.description!=="feedback")

  const fetchVideos = async () => {
    try {
      const res = await axios.get(`${BACKEND_BASE_URL}/video/all`);
      setVideos((res.data.data || []).reverse());
    } catch (err) {
      console.error('Error fetching videos:', err);
      toast.error("Error fetching videos.", { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen p-4">
      {!adminMode && (
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {onlyFeedback ? "Feedback Gallery" : "Student Video Gallery"}
        </h2>
      )}

      {filteredVideos.length === 0 ? (
        <p className="text-center text-gray-500">No videos uploaded yet.</p>
      ) : (
        <div
          className="grid gap-2"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gridAutoRows: '150px',
            gridAutoFlow: 'dense',
          }}
        >
          {filteredVideos.map((video, index) => {
            const layout = gridLayout[index % gridLayout.length];

            return (
              <div
                key={video._id}
                style={{
                  gridColumn: layout.col,
                  gridRow: layout.row,
                  overflow: 'hidden',
                  borderRadius: '10px',
                  position: 'relative',
                }}
                className="group"
              >
                <video
                  src={video.video}
                  controls
                  muted
                  className="w-full h-full object-cover rounded"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs px-3 py-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-4">
                  <span className="font-medium truncate">{video.candidate}</span>
                  {!onlyFeedback && video.description && (
                    <span className="italic text-gray-300 truncate">{video.description}</span>
                  )}

                  {adminMode && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => onUpdate(video._id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => onDelete(video._id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Video;

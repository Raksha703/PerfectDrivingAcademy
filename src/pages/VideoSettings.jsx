import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import Video from './Video';
import axios from 'axios';
import { Loader, VideoModal } from '../components/components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const initialFormData = {
  candidate: '',
  description: "feedback",
  video: null,
  file: null,
};

const VideoSettings = ( {feedback} ) => {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [modal, setModal] = useState({ show: false, mode: 'upload' });
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_BASE_URL}/video/all`);
      setVideos(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch videos.", { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${BACKEND_BASE_URL}/video/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success("Video uploaded successfully!", { autoClose: 2000 });
      handleModalClose();
      fetchVideos(); // No reload needed
    } catch (err) {
      toast.error("Failed to upload video.", { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!selectedVideoId) return;
    setLoading(true);
    try {
      await axios.put(`${BACKEND_BASE_URL}/video/update/${selectedVideoId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success("Video updated successfully!", { autoClose: 2000 });
      handleModalClose();
      fetchVideos(); // Refresh list
    } catch (err) {
      toast.error("Failed to update video.", { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    setLoading(true);
    try {
      await axios.delete(`${BACKEND_BASE_URL}/video/delete/${id}`);
      toast.success("Video deleted successfully!", { autoClose: 2000 });
      fetchVideos();
    } catch (err) {
      console.error('Delete failed:', err);
      toast.error("Failed to delete video.", { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClick = (id) => {
    const selected = videos.find((v) => v._id === id);
    setSelectedVideoId(id);
    setFormData({
      candidate: selected?.candidate || '',
      description: selected?.description || '',
      video: null,
      file: null,
    });
    setModal({ show: true, mode: 'update' });
  };

  const handleModalClose = () => {
    setModal({ show: false, mode: 'upload' });
    setSelectedVideoId(null);
    setFormData(initialFormData);
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Gallery</h3>
        <Button onClick={() => setModal({ show: true, mode: 'upload' })}>+ Upload Video</Button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <Video
            adminMode={true}
            onDelete={handleDelete}
            onUpdate={handleUpdateClick}
            onlyFeedback={feedback}
          />

          <VideoModal
            show={modal.show}
            onHide={handleModalClose}
            onSubmit={modal.mode === 'update' ? handleUpdate : handleUpload}
            formData={formData}
            setFormData={setFormData}
            mode={feedback ? "feedback" : modal.mode}
          />
        </>
      )}
    </Container>
  );
};

export default VideoSettings;

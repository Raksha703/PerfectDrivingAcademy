import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const VideoModal = ({ show, onHide, onSubmit, formData, setFormData, mode }) => {
  const isUpdate = mode === 'update';

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{isUpdate ? 'Update Video' : 'Upload Video'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Candidate Name</Form.Label>
          <Form.Control
            value={formData.candidate}
            onChange={(e) => setFormData({ ...formData, candidate: e.target.value })}
            placeholder="Enter candidate name"
          />
        </Form.Group>

      {mode !== 'feedback' && (
        <Form.Group className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter description"
          />
        </Form.Group>
      )
      }

        <Form.Group className="mt-3">
          <Form.Label>{isUpdate ? 'Replace Video File (optional)' : 'Video File'}</Form.Label>
          <Form.Control
            type="file"
            accept="video/*"
            onChange={(e) =>
              setFormData({
                ...formData,
                [isUpdate ? 'file' : 'video']: e.target.files[0],
              })
            }
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={onSubmit}>{isUpdate ? 'Update' : 'Upload'}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VideoModal;

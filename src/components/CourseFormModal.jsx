import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const CourseFormModal = ({
  show,
  handleClose,
  handleSubmit,
  formData,
  setFormData,
  editId,
}) => {
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{editId ? 'Edit Course' : 'Add New Course'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {[
            ['name', 'Name'],
            ['description', 'Description'],
            ['timing', 'Timing'],
            ['kmPerDay', 'KM per Day'],
            ['days', 'Number of Days'],
          ].map(([field, label]) => (
            <Form.Group key={field} className="mb-3">
              <Form.Label>{label}</Form.Label>
              <Form.Control
                type="text"
                value={formData[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                required={['name'].includes(field)}
              />
            </Form.Group>
          ))}

          <Form.Group className="mb-3">
            <Form.Label>Features (comma-separated)</Form.Label>
            <Form.Control
              type="text"
              value={formData.features}
              onChange={(e) => handleChange('features', e.target.value)}
              placeholder="e.g., Power steering, Dual Airbags"
            />
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {editId ? 'Update Course' : 'Create Course'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CourseFormModal;

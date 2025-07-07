import React, { useState } from 'react';

const LogsheetModal = ({ onClose, onSubmit, initialData }) => {
  // Format functions for pre-filling form
  const formatDate = (dateStr) => dateStr || '';
  const formatTime = (date) => date ? new Date(date).toISOString().substr(11, 5) : '';

  const [form, setForm] = useState({
    date: formatDate(initialData?.date),
    kmCovered: initialData?.kmCovered || '',
    learning: initialData?.learning || '',
    timingFrom: formatTime(initialData?.timingFrom),
    timingTo: formatTime(initialData?.timingTo),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const payload = {
      ...form,
      date: form.date, // Already string in format 'YYYY-MM-DD'
      timingFrom: new Date(`1970-01-01T${form.timingFrom}:00Z`),
      timingTo: new Date(`1970-01-01T${form.timingTo}:00Z`)
    };
    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 pt-30 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? 'Update Logsheet' : 'Upload Logsheet'}
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="date" className="block font-medium mb-1">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label htmlFor="kmCovered" className="block font-medium mb-1">Kilometers Covered</label>
            <input
              type="number"
              id="kmCovered"
              name="kmCovered"
              placeholder="Enter kilometers covered"
              value={form.kmCovered}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label htmlFor="learning" className="block font-medium mb-1">Learning</label>
            <input
              type="text"
              id="learning"
              name="learning"
              placeholder="Enter learning summary"
              value={form.learning}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label htmlFor="timingFrom" className="block font-medium mb-1">Start Time</label>
            <input
              type="time"
              id="timingFrom"
              name="timingFrom"
              value={form.timingFrom}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label htmlFor="timingTo" className="block font-medium mb-1">End Time</label>
            <input
              type="time"
              id="timingTo"
              name="timingTo"
              value={form.timingTo}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-row justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {initialData ? 'Update' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogsheetModal;

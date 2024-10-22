import React, { useState } from 'react';
import fs from 'fs';
import path from 'path';

const AddActivityForm = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeStart, setTimeStart] = useState(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
  const [timeEnd, setTimeEnd] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const currentDate = new Date();
    const selectedDate = new Date(date);
    const selectedTimeStart = new Date(`${date}T${timeStart}`);
    const selectedTimeEnd = timeEnd ? new Date(`${date}T${timeEnd}`) : null;

    if (selectedDate > currentDate) {
      newErrors.date = 'Date cannot be in the future';
    }

    if (selectedTimeStart > currentDate) {
      newErrors.timeStart = 'Start time cannot be in the future';
    }

    if (selectedTimeEnd && selectedTimeEnd < selectedTimeStart) {
      newErrors.timeEnd = 'End time cannot be before start time';
    }

    if (!customerName || /[^a-zA-Z0-9 ]/.test(customerName)) {
      newErrors.customerName = 'Customer name cannot be empty or contain special characters';
    }

    if (description.length > 500) {
      newErrors.description = 'Description cannot exceed 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const activity = { date, timeStart, timeEnd, customerName, description };
    const filePath = path.join(process.cwd(), 'activities.json');
    const activities = JSON.parse(fs.readFileSync(filePath, 'utf8') || '[]');
    activities.push(activity);
    fs.writeFileSync(filePath, JSON.stringify(activities, null, 2));
    alert('Activity added successfully!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        {errors.date && <span>{errors.date}</span>}
      </div>
      <div>
        <label>Time Start:</label>
        <input type="time" value={timeStart} onChange={(e) => setTimeStart(e.target.value)} />
        {errors.timeStart && <span>{errors.timeStart}</span>}
      </div>
      <div>
        <label>Time End (optional):</label>
        <input type="time" value={timeEnd} onChange={(e) => setTimeEnd(e.target.value)} />
        {errors.timeEnd && <span>{errors.timeEnd}</span>}
      </div>
      <div>
        <label>Customer Name:</label>
        <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
        {errors.customerName && <span>{errors.customerName}</span>}
      </div>
      <div>
        <label>Description (optional):</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        {errors.description && <span>{errors.description}</span>}
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddActivityForm;

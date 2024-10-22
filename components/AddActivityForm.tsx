"use client";

import React, { useState } from 'react';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const activity = { date, timeStart, timeEnd, customerName, description };
    const response = await fetch('/api/addActivity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activity),
    });

    if (response.ok) {
      alert('Activity added successfully!');
    } else {
      alert('Failed to add activity.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
      <div>
        <label className="block mb-1">Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border p-2 w-full focus:ring" />
        {errors.date && <span className="text-red-500">{errors.date}</span>}
      </div>
      <div>
        <label className="block mb-1">Time Start:</label>
        <input type="time" value={timeStart} onChange={(e) => setTimeStart(e.target.value)} className="border p-2 w-full focus:ring" />
        {errors.timeStart && <span className="text-red-500">{errors.timeStart}</span>}
      </div>
      <div>
        <label className="block mb-1">Time End (optional):</label>
        <input type="time" value={timeEnd} onChange={(e) => setTimeEnd(e.target.value)} className="border p-2 w-full focus:ring" />
        {errors.timeEnd && <span className="text-red-500">{errors.timeEnd}</span>}
      </div>
      <div>
        <label className="block mb-1">Customer Name:</label>
        <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="border p-2 w-full focus:ring" />
        {errors.customerName && <span className="text-red-500">{errors.customerName}</span>}
      </div>
      <div>
        <label className="block mb-1">Description (optional):</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 w-full focus:ring" />
        {errors.description && <span className="text-red-500">{errors.description}</span>}
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4">Add</button>
    </form>
  );
};

export default AddActivityForm;

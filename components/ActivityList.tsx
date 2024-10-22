'use client'

import React, { useState, useEffect } from 'react';

const ActivityList = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await fetch('/api/loadActivities');
      const data = await response.json();
      const filteredActivities = data.filter(activity => activity.date === selectedDate);
      setActivities(filteredActivities);
    };

    fetchActivities();
  }, [selectedDate]);

  return (
    <div>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="border p-2 w-full focus:ring"
      />
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>
            {activity.timeStart} - {activity.timeEnd} | {activity.customerName} | {activity.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityList;

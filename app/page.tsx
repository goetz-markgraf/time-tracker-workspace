"use client"

import AddActivityForm from "../components/AddActivityForm";
import ActivityList from "../components/ActivityList";
import { useState } from "react";

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold">Time Tracker App</h1>
        <ActivityList />
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          {showForm ? "Hide Form" : "Show Form"}
        </button>
        {showForm && <AddActivityForm />}
      </main>
    </div>
  );
}

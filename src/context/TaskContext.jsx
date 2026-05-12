import React, { createContext, useEffect, useRef, useState, useCallback } from "react";

export const TaskContext = createContext(null);

const API_URL = "http://localhost:6001";

// Helper: merge two task arrays, dedupe by id
function mergeById(existing, incoming) {
  const map = new Map();
  [...existing, ...incoming].forEach((t) => {
    if (t && typeof t.id !== "undefined") map.set(t.id, t);
  });
  return Array.from(map.values());
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const didLoadRef = useRef(false);

  useEffect(() => {
    if (didLoadRef.current) return;
    didLoadRef.current = true;

    fetch(`${API_URL}/tasks`)
      .then((r) => r.json())
      .then((data) => {
        const incoming = Array.isArray(data) ? data : [];
        // ✅ IMPORTANT: do not overwrite tasks if user already added something
        setTasks((prev) => mergeById(prev, incoming));
      })
      .catch(() => setTasks((prev) => prev));
  }, []);

  const addTask = useCallback(async (title) => {
    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed: false }),
    });

    const created = await res.json();
    setTasks((prev) => mergeById(prev, [created]));
    return created;
  }, []);

  const toggleComplete = useCallback(
    async (id) => {
      const current = tasks.find((t) => t.id === id);
      if (!current) return;

      const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !current.completed }),
      });

      const updated = await res.json();

      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: updated.completed } : t))
      );

      return updated;
    },
    [tasks]
  );

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleComplete }}>
      {children}
    </TaskContext.Provider>
  );
}
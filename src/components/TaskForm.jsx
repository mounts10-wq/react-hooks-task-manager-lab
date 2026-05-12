import React, { useState, useId, useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskForm() {
  const [taskName, setTaskName] = useState("");
  const inputId = useId();
  const { addTask } = useContext(TaskContext);

  async function handleSubmit(e) {
    e.preventDefault();
    const title = taskName.trim();
    if (!title) return;

    await addTask(title);
    setTaskName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={inputId}>New Task:</label>
      <input
        id={inputId}
        type="text"
        placeholder="Add a new task..."
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;

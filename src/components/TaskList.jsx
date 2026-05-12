import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskList({ query = "" }) {
  const { tasks, toggleComplete } = useContext(TaskContext);

  const normalized = query.toLowerCase().trim();
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(normalized)
  );

  return (
    <ul>
      {filteredTasks.map((task) => (
        <li key={task.id}>
          <span className={task.completed ? "completed" : ""}>{task.title}</span>
          <button
            className="complete-btn"
            data-testid={String(task.id)}
            onClick={() => toggleComplete(task.id)}
          >
            {task.completed ? "Undo" : "Complete"}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
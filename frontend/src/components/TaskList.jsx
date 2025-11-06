import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/projects/projectSlice';
import TaskItem from './TaskItem';
import { toast } from 'react-toastify';

const TaskList = ({ tasks, projectId }) => {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const dispatch = useDispatch();

  const onTaskSubmit = (e) => {
    e.preventDefault();
    if (!taskName) {
      toast.error('Task name is required');
      return;
    }

    const taskData = { name: taskName, dueDate: dueDate || null };
    dispatch(addTask({ projectId, taskData }));

    // Clear form
    setTaskName('');
    setDueDate('');
    toast.success('New task added!');
  };

  return (
    <div className="task-list-container">
      <h3>Tasks</h3>
      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem key={task._id} task={task} projectId={projectId} />
          ))
        ) : (
          <p>No tasks for this project yet.</p>
        )}
      </div>

      {/* Add Task Form */}
      <form onSubmit={onTaskSubmit} className="add-task-form">
        <input
          type="text"
          placeholder="New task name..."
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit" className="btn btn-small">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskList;
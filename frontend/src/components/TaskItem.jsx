import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../features/projects/projectSlice';
import { toast } from 'react-toastify';

const TaskItem = ({ task, projectId }) => {
  const dispatch = useDispatch();

  const onToggle = () => {
    // Dispatch updateTask with the toggled isCompleted status
    dispatch(
      updateTask({
        projectId,
        taskId: task._id,
        taskData: { isCompleted: !task.isCompleted },
      })
    );
    toast.success('Task status updated!');
  };

  const onDelete = () => {
    dispatch(deleteTask({ projectId, taskId: task._id }));
    toast.success('Task deleted!');
  };

  return (
    <div className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
      <div className="task-item-main">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={onToggle}
          id={`task-${task._id}`}
        />
        <label htmlFor={`task-${task._id}`}>{task.name}</label>
      </div>
      <div className="task-item-actions">
        {task.dueDate && (
          <span className="task-due-date">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
        <button onClick={onDelete} className="btn-delete">
          &times;
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
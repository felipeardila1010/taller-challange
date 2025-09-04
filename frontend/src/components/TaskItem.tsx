import React, { useState } from 'react';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  isDeleting?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onEdit,
  onDelete,
  isDeleting = false,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    onDelete(task.id);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="task-item">
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        <div className="task-meta">
          <span className="task-id">ID: {task.id}</span>
        </div>
      </div>

      <div className="task-actions">
        <button
          onClick={() => onEdit(task)}
          className="btn btn-edit"
          disabled={isDeleting}
        >
          Edit
        </button>

        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="btn btn-delete"
            disabled={isDeleting}
          >
            Delete
          </button>
        ) : (
          <div className="delete-confirm">
            <span className="confirm-message">Are you sure?</span>
            <button
              onClick={handleDelete}
              className="btn btn-danger"
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Yes'}
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="btn btn-secondary"
              disabled={isDeleting}
            >
              No
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;

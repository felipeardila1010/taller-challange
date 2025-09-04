import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../types/Task';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
  deletingTaskId?: number;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEdit,
  onDelete,
  isLoading = false,
  deletingTaskId,
}) => {
  if (isLoading) {
    return (
      <div className="task-list loading">
        <div className="loading-message">Loading tasks...</div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list empty">
        <div className="empty-message">
          <h3>No tasks found</h3>
          <p>Create your first task to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list">
      <div className="task-count">
        {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
      </div>
      
      <div className="tasks-container">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            isDeleting={deletingTaskId === task.id}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;

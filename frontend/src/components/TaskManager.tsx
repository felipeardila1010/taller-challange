import React, { useState } from 'react';
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask } from '../hooks/useTasks';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { Task, CreateTaskRequest, UpdateTaskRequest } from '../types/Task';

const TaskManager: React.FC = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // React Query hooks
  const { data: tasks = [], isLoading, error } = useTasks();
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  const handleCreateTask = async (taskData: CreateTaskRequest) => {
    try {
      await createTaskMutation.mutateAsync(taskData);
      setShowCreateForm(false);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleUpdateTask = async (taskData: UpdateTaskRequest) => {
    if (!editingTask) return;
    
    try {
      await updateTaskMutation.mutateAsync({
        id: editingTask.id,
        ...taskData,
      });
      setEditingTask(null);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTaskMutation.mutateAsync(id);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowCreateForm(false);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
  };

  if (error) {
    return (
      <div className="task-manager error">
        <div className="error-message">
          <h2>Error loading tasks</h2>
          <p>Please check your connection and try again.</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="task-manager">
      <header className="task-manager-header">
        <h1>Task Manager</h1>
        
        {!showCreateForm && !editingTask && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="btn btn-primary"
          >
            Create New Task
          </button>
        )}
      </header>

      <main className="task-manager-content">
        {showCreateForm && (
          <div className="form-section">
            <h2>Create New Task</h2>
            <TaskForm
              onSubmit={handleCreateTask}
              onCancel={handleCancelCreate}
              isLoading={createTaskMutation.isPending}
              submitButtonText="Create Task"
            />
          </div>
        )}

        {editingTask && (
          <div className="form-section">
            <h2>Edit Task</h2>
            <TaskForm
              initialValues={{
                title: editingTask.title,
                description: editingTask.description,
              }}
              onSubmit={handleUpdateTask}
              onCancel={handleCancelEdit}
              isLoading={updateTaskMutation.isPending}
              submitButtonText="Update Task"
            />
          </div>
        )}

        <div className="list-section">
          <TaskList
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            isLoading={isLoading}
            deletingTaskId={deleteTaskMutation.isPending ? deleteTaskMutation.variables : undefined}
          />
        </div>
      </main>
    </div>
  );
};

export default TaskManager;

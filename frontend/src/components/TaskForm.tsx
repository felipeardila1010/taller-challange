import React, { useState } from 'react';
import { CreateTaskRequest, UpdateTaskRequest } from '../types/Task';

interface TaskFormProps {
  initialValues?: {
    title: string;
    description?: string;
  };
  onSubmit: (task: CreateTaskRequest | UpdateTaskRequest) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  submitButtonText?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({
  initialValues = { title: '', description: '' },
  onSubmit,
  onCancel,
  isLoading = false,
  submitButtonText = 'Create Task',
}) => {
  const [formData, setFormData] = useState({
    title: initialValues.title,
    description: initialValues.description || '',
  });

  const [errors, setErrors] = useState<{ title?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: { title?: string } = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit({
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
    });
  };

  const handleChange = (field: 'title' | 'description') => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
    
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={handleChange('title')}
          disabled={isLoading}
          className={errors.title ? 'error' : ''}
          placeholder="Enter task title"
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={handleChange('description')}
          disabled={isLoading}
          placeholder="Enter task description (optional)"
          rows={3}
        />
      </div>

      <div className="form-actions">
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary"
        >
          {isLoading ? 'Saving...' : submitButtonText}
        </button>
        
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;

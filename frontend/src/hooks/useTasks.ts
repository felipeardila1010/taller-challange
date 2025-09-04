import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskApi } from '../services/taskApi';
import { Task, UpdateTaskRequest } from '../types/Task';

// Query keys
export const QUERY_KEYS = {
  TASKS: ['tasks'] as const,
  TASK: (id: number) => ['tasks', id] as const,
};

// Hook to get all tasks
export const useTasks = () => {
  return useQuery({
    queryKey: QUERY_KEYS.TASKS,
    queryFn: taskApi.getTasks,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to create a task
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskApi.createTask,
    onSuccess: () => {
      // Invalidate and refetch tasks
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TASKS });
    },
    onError: (error) => {
      console.error('Error creating task:', error);
    },
  });
};

// Hook to update a task
export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...task }: { id: number } & UpdateTaskRequest) =>
      taskApi.updateTask(id, task),
    onSuccess: (updatedTask, variables) => {
      // Update the cache with the new task data
      queryClient.setQueryData<Task[]>(QUERY_KEYS.TASKS, (oldData) => {
        if (!oldData) return oldData;
        return oldData.map((task) =>
          task.id === variables.id ? { ...task, ...updatedTask } : task
        );
      });
    },
    onError: (error) => {
      console.error('Error updating task:', error);
    },
  });
};

// Hook to delete a task
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskApi.deleteTask,
    onSuccess: (_, deletedId) => {
      // Remove the task from the cache
      queryClient.setQueryData<Task[]>(QUERY_KEYS.TASKS, (oldData) => {
        if (!oldData) return oldData;
        return oldData.filter((task) => task.id !== deletedId);
      });
    },
    onError: (error) => {
      console.error('Error deleting task:', error);
    },
  });
};

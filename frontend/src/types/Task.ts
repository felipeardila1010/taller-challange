export interface Task {
  id: number;
  title: string;
  description?: string;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
}

export interface UpdateTaskRequest {
  title: string;
  description?: string;
}

export interface ApiResponse<T> {
  message?: string;
  task?: T;
  tasks?: T[];
  task_id?: number;
}

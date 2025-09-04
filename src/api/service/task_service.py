from api.domain.task import Task, TaskCreate
from api.infrastructure.repositories.task_repository import TaskRepository

class TaskService:
    def __init__(self):
        self.repository = TaskRepository()

    def get_tasks(self):
        return self.repository.get_all_tasks()

    def create_task(self, task_data: TaskCreate):
        return self.repository.create_task(task_data)

    def update_task(self, task_id: int, task_data: Task):
        return self.repository.update_task(task_id, task_data)

    def delete_task(self, task_id: int):
        return self.repository.delete_task(task_id)

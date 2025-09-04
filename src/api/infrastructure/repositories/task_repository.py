
import os
import psycopg
from api.domain.task import Task

class TaskRepository:
    def __init__(self):
        self.connection = psycopg.connect(
            dbname=os.getenv("POSTGRESDB_DBNAME", "postgres"),
            user=os.getenv("POSTGRESDB_USER", "postgres"),
            password=os.getenv("POSTGRESDB_PASSWORD", "password"),
            host=os.getenv("POSTGRESDB_HOST", "localhost"),
            port=os.getenv("POSTGRESDB_PORT", "5432")
        )

    def get_all_tasks(self):
        with self.connection.cursor() as cursor:
            cursor.execute("SELECT id, title, description FROM tasks;")
            rows = cursor.fetchall()
        return [Task(id=row[0], title=row[1], description=row[2]) for row in rows]

    def create_task(self, task: Task):
        with self.connection.cursor() as cursor:
            cursor.execute(
                "INSERT INTO tasks (title, description) VALUES (%s, %s) RETURNING id;",
                (task.title, task.description)
            )
            task_id = cursor.fetchone()[0]
            self.connection.commit()
        return task_id

    def update_task(self, task_id: int, task: Task):
        with self.connection.cursor() as cursor:
            cursor.execute(
                "UPDATE tasks SET title = %s, description = %s WHERE id = %s;",
                (task.title, task.description, task_id)
            )
            self.connection.commit()

    def delete_task(self, task_id: int):
        with self.connection.cursor() as cursor:
            cursor.execute("DELETE FROM tasks WHERE id = %s;", (task_id,))
            self.connection.commit()
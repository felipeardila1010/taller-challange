import psycopg2

class TaskRepository:
    def __init__(self):
        self.connection = psycopg2.connect(
            database="my-postgres",
            user="postgres",
            password="your_secure_password",
            host="localhost",
            port="5432" 
        )

    def get_all_tasks(self):
        with self.connection.cursor() as cursor:
            cursor.execute("SELECT id, title, description FROM tasks;")
            tasks = cursor.fetchall()
        return tasks

    def create_task(self, title, description):
        with self.connection.cursor() as cursor:
            cursor.execute(
                "INSERT INTO tasks (title, description) VALUES (%s, %s) RETURNING id;",
                (title, description)
            )
            task_id = cursor.fetchone()[0]
            self.connection.commit()
        return task_id

    def update_task(self, task_id, title, description):
        with self.connection.cursor() as cursor:
            cursor.execute(
                "UPDATE tasks SET title = %s, description = %s WHERE id = %s;",
                (title, description, task_id)
            )
            self.connection.commit()

    def delete_task(self, task_id):
        with self.connection.cursor() as cursor:
            cursor.execute("DELETE FROM tasks WHERE id = %s;", (task_id,))
            self.connection.commit()
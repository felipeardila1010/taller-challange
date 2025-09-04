from flask import Flask, request
from backend.infrastructure.repositories.task_repository import TaskRepository

app = Flask(__name__)

# Initialize task repository class
taskRepository = TaskRepository()

@app.route("/")
def hello():
    return "Hello, World!"

@app.get("/tasks")
def get_tasks():
    return "List of tasks"

@app.post("/tasks")
def post_tasks():
    task = request.json
    print('Task received:', task)
    return "Task created"

@app.put("/tasks/<int:task_id>")
def put_tasks(task_id: int):
    task = request.json
    print('Task task_id', task_id)
    return f"Task {task_id} updated"

@app.delete("/tasks/<int:task_id>")
def delete_task(task_id: int):
    print('Task task_id', task_id)
    return f"Task {task_id} deleted"
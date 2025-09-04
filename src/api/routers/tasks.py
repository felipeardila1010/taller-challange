from fastapi import APIRouter, HTTPException
from api.service.task_service import TaskService
from api.domain.task import Task
from pydantic import ValidationError

router = APIRouter()

# instances
taskService = TaskService()

@router.get("/api/tasks")
async def get_tasks(
):
    tasks = taskService.get_tasks()
    return {"tasks": tasks}

@router.post("/api/tasks")
async def create_task(
    task: dict
):
    try:
        validated_task = Task(**task)
    except ValidationError as e:
        raise HTTPException(status_code=400, detail=e.errors())
    task = taskService.create_task(validated_task)
    return {"message": "Task created", "task": task}

@router.put("/api/tasks/{task_id}")
async def update_task(
    task_id: int,
    task: dict
):
    try:
        validated_task = Task(id=task_id, **task)
    except ValidationError as e:
        raise HTTPException(status_code=400, detail=e.errors())
    taskService.update_task(task_id, validated_task)
    return {"message": "Task updated", "task_id": task_id, "task": validated_task}

@router.delete("/api/tasks/{task_id}")
async def delete_task(
    task_id: int
):
    taskService.delete_task(task_id)
    return {"message": "Task deleted", "task_id": task_id}

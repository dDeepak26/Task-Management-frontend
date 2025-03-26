import { useEffect, useState } from "react";
import { Button, Container, Textarea, TextInput } from "@mantine/core";
import { getTasks, createTask, updateTask, deleteTask } from "../api";
import { tasksType } from "../types";
import TaskCard from "./TaskCard";

const Tasks = () => {
  const [tasks, setTasks] = useState<tasksType[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [editingId, setEditingId] = useState<string>("");
  const [error, setError] = useState<string>("");

  // fetch all tasks
  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Cannot get Tasks", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create task
  const handleCreate = async () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    } else {
      setError("");
    }
    try {
      await createTask({ title, description });
      fetchTasks();
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error in Creating Task", error);
    }
  };

  // Mark Complete/Incomplete
  const handleMarkComplete = async (id: string) => {
    const taskToMarkComplete = await tasks.find((task) => task?._id === id);
    if (taskToMarkComplete) {
      await updateTask(id, {
        title: taskToMarkComplete.title,
        description: taskToMarkComplete.description,
        completed: !taskToMarkComplete?.completed,
      });
      fetchTasks();
    }
  };

  // Update task
  const handleUpdate = async (id: string) => {
    const taskToUpdate = await tasks.find((task) => task._id === id);
    setTitle(taskToUpdate?.title || "");
    setDescription(taskToUpdate?.description || "");
    setEditingId(id);
  };
  const handleSaveUpdate = async () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    } else {
      setError("");
    }
    try {
      await updateTask(editingId, { title, description });
      fetchTasks();
      setTitle("");
      setDescription("");
      setEditingId("");
    } catch (error) {
      console.error("Error in Updating task", error);
    }
  };

  // Delete task
  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error("Error in deleting task", error);
    }
  };

  return (
    <Container className="space-y-3">
      <TextInput
        label="Enter Task Title"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required={true}
        withAsterisk
        error={error}
      />
      <Textarea
        label="Enter Tasks Description (optional)"
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        resize="vertical"
      />
      <Button
        variant="filled"
        fullWidth
        onClick={editingId ? handleSaveUpdate : handleCreate}
      >
        {editingId ? "Update Task" : "Add Task"}
      </Button>
      {tasks.map((tasks) => {
        return (
          <TaskCard
            key={tasks._id}
            tasks={tasks}
            onComplete={() => handleMarkComplete(tasks._id || "")}
            isComplete={tasks.completed ?? false}
            onUpdate={() => handleUpdate(tasks._id || "")}
            onDelete={() => handleDelete(tasks._id || "")}
          />
        );
      })}
    </Container>
  );
};

export default Tasks;

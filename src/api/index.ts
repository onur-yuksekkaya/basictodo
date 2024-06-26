'use server';
import { Task, TaskStatus } from '@/types';
import { promises as fs } from 'fs';
import { revalidateTag } from 'next/cache';
import path from 'path';

export async function getTasks(): Promise<Task[]> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks`;
  const response = await fetch(url, { next: { tags: ['tasks'] }, cache: 'no-store' });
  const data = await response.json();
  return data;
}

export async function updateTaskStatus(title: string, newStatus: TaskStatus): Promise<{ message: string }> {
  const filePath = path.join(process.cwd(), 'public/data.json');
  const file = await fs.readFile(filePath, 'utf8');
  const data: Task[] = JSON.parse(file);
  const taskIndex = data.findIndex((task) => task.title === title);
  if (taskIndex !== -1) {
    data[taskIndex].status = newStatus;
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    revalidateTag('tasks');
    return { message: 'Task status updated successfully' };
  } else {
    return { message: 'Task not found' };
  }
}

export async function addTask({
  title,
  description,
  status,
  assignee,
}: {
  title: string;
  description: string;
  status: TaskStatus;
  assignee: string;
}): Promise<{ message: string; type: 'error' | 'success' }> {
  const filePath = path.join(process.cwd(), 'public/data.json');
  const file = await fs.readFile(filePath, 'utf8');
  const data: Task[] = JSON.parse(file);
  if (data.find((task) => task.title === title)) {
    return { message: 'Task already exists', type: 'error' };
  }
  data.push({ title, description, status, assignee });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  revalidateTag('tasks');
  return { message: 'Task added successfully', type: 'success' };
}

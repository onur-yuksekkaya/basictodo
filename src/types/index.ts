export interface Task {
  title: string;
  description: string;
  status: TaskStatus;
  assignee: string;
}

export type Tasks = Task[];

export type TaskStatus = 'To Do' | 'In Progress' | 'Done';

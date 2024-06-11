'use client';
import { Tasks, TaskStatus } from '@/utils/types';
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Modal from '../Modal';
import TaskColumn from '../TaskColumn';

// Board component
const Board = ({ tasks }: { tasks: Tasks }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }
    acc[task.status].push(task);
    return acc;
  }, {} as { [key in TaskStatus]: Tasks });

  const allStatuses: TaskStatus[] = ['To Do', 'In Progress', 'Done'];
  allStatuses.forEach((status) => {
    if (!groupedTasks[status]) {
      groupedTasks[status] = [];
    }
  });

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          data-cy="create-task-button"
          className="bg-jiraBlue text-white rounded-md px-4 py-2"
          onClick={openModal}
        >
          Create Task
        </button>
        <Modal isOpen={isModalOpen} onClose={closeModal} />
      </div>
      <div className="flex justify-center gap-5">
        <DndProvider backend={HTML5Backend}>
          {allStatuses.map((status) => (
            <TaskColumn key={status} status={status} tasksByStatus={groupedTasks[status]} />
          ))}
        </DndProvider>
      </div>
    </>
  );
};

export default Board;

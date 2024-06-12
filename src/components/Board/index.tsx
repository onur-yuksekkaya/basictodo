'use client';
import { Tasks, TaskStatus } from '@/types';
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BaseButton from '../BaseButton';
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
      <div className="flex flex-col items-center p-4">
        <BaseButton dataCy="create-task-button" className="bg-jiraBlue text-white mb-4 md:mb-0" onClick={openModal}>
          Create Task
        </BaseButton>
        {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal} />}
      </div>
      <div className="w-full flex flex-col md:flex-row justify-center md:gap-5 p-4">
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

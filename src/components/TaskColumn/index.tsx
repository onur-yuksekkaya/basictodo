import { updateTaskStatus } from '@/api';
import { Task, TaskStatus } from '@/types';
import { useDrop } from 'react-dnd';
import TaskCard from '../TaskCard';

// TaskColumn component
const TaskColumn = ({ status, tasksByStatus }: { status: TaskStatus; tasksByStatus: Task[] }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: 'card',
    drop: (item: Task) => {
      updateTaskStatus(item.title, status);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={dropRef as any}
      className={`bg-gray-100 mt-4 rounded pb-1 md:w-108 ${isOver ? 'bg-gray-100' : 'bg-blue-100'}`}
    >
      <div className="flex justify-between px-1 text-center items-center">
        <div className="flex px-3 py-1 self-center text-sm font-medium text-gray-800 antialiased rounded-md focus:outline-none hover:bg-blue-100 text-blue-500 focus:bg-blue-100">
          <a href="#" className="">
            {status}
          </a>
        </div>
      </div>
      <div className="mx-2 bg-white rounded">
        <div className="overflow-auto flex-col gap-10 h-full my-10">
          {tasksByStatus.map((task: Task) => (
            <TaskCard key={task.title} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskColumn;

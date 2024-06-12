import { Task } from '@/types';
import { useDrag } from 'react-dnd';

// TaskCard component
const TaskCard = ({ task }: { task: Task }) => {
  const assigneeFirstLetter = task.assignee.split(' ')[0].charAt(0);

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'card',
    item: task,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef as any}
      className={`flex-col cursor-pointer rounded hover:bg-blue-100 w-full md:w-96 ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="py-3 px-3 cursor-pointer text-gray-700 rounded text-sm font-normal antialiased tracking-normal">
        {task.title}
      </div>
      <div className="px-3 pb-3 text-gray-500 text-xs">{task.description}</div>
      <div className="flex px-3 justify-between">
        <div className="flex">
          <div className="bg-red-500 rounded h-4 w-4 p-1">
            <svg
              className="h-2 w-2 text-white"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M10 3a7 7 0 10.001 13.999A7 7 0 0010 3z" />
            </svg>
          </div>
          <div className="font-bold text-gray-500 ml-1 text-xs">High Priority</div>
        </div>
        <button className="flex rounded-full p-1 pb-1 h-6 w-6 bg-orange-500 justify-around">
          <span className="text-xs font-bold">{assigneeFirstLetter}</span>
        </button>
      </div>
      <div className="border mt-3"></div>
    </div>
  );
};

export default TaskCard;

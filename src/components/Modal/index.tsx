import { addTask } from '@/api';
import { TaskStatus } from '@/types';
import { useEffect, useState } from 'react';
import BaseButton from '../BaseButton';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [status, setStatus] = useState<TaskStatus>('To Do');

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    assignee: '',
    status: '',
  });

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (isValid(newErrors)) {
      await submitTask();
    }
  };

  const validateForm = () => {
    const newErrors = {
      title: '',
      description: '',
      assignee: '',
      status: '',
    };

    if (!title) newErrors.title = 'Title is required';
    if (!description) newErrors.description = 'Description is required';
    if (!assignee) newErrors.assignee = 'Assignee is required';

    return newErrors;
  };

  const isValid = (errors: any) => {
    return !errors.title && !errors.description && !errors.assignee;
  };

  const submitTask = async () => {
    try {
      const response = await addTask({ title, description, status, assignee });
      if (response?.message === 'Task already exists') {
        setErrors({ ...errors, title: 'Task already exists' });
      } else {
        onClose();
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div data-cy="modal" className="fixed inset-0 flex items-center justify-center z-50">
      <div data-cy="close-modal-background" className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg overflow-hidden shadow-jira transform transition-all sm:max-w-lg sm:w-full p-6">
        <h2 className="text-2xl font-semibold mb-4 text-jiraBlue">Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              data-cy="task-title"
              type="text"
              className="w-full border border-gray-300 rounded-md p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              data-cy="task-description"
              className="w-full border border-gray-300 rounded-md p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
            <input
              data-cy="task-assignee"
              type="text"
              className="w-full border border-gray-300 rounded-md p-2"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
            />
            {errors.assignee && <p className="text-red-500 text-sm">{errors.assignee}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              className="w-full border border-gray-300 rounded-md p-2"
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              data-cy="task-status"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="flex justify-end">
            <BaseButton dataCy="close-modal" className="bg-jiraGray text-jiraBlue" onClick={onClose}>
              Cancel
            </BaseButton>
            <BaseButton dataCy="save-task" type="submit" className="bg-jiraGreen text-white ml-2">
              Create
            </BaseButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;

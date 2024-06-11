import { getTasks } from '@/api';
import Board from '@/components/Board';
import { Tasks } from '@/utils/types';

export default async function Home() {
  const tasks: Tasks = await getTasks();
  return <Board tasks={tasks} />;
}

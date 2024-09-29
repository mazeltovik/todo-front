import { useEffect } from 'react';
import CompletedTask from './completedTask';
import { TaskType } from '../types/activeTackType';
import { Flex, Typography, Card } from 'antd';
const { Text } = Typography;
import useFetch from '../hooks/useFetch';
import { DeleteTaskType } from '../types/deleteTaskType';

export default function AllDoneTask({
  allDoneTask,
  isLoading,
  setDoneTask,
}: {
  allDoneTask: TaskType[];
  setDoneTask: React.Dispatch<React.SetStateAction<TaskType[]>>;
  isLoading: boolean;
}) {
  const { data, request } = useFetch<TaskType>('http://localhost:3000/tasks');
  useEffect(() => {
    if (data) {
      setDoneTask(allDoneTask.filter((task) => task.id !== data.id));
    }
  }, [data]);
  return (
    <Card
      title={
        isLoading ? 'Loading...' : `You have: ${allDoneTask.length} done tasks`
      }
      style={{ background: '#c0bcbc' }}
      loading={isLoading}
    >
      {allDoneTask.length > 0 ? (
        <Flex
          vertical={true}
          gap={'small'}
          onClick={(event) => {
            const target = event.target as HTMLElement;
            const tagName = target.tagName;
            if (tagName == 'SPAN' || tagName == 'BUTTON') {
              const card = target.closest('div .ant-card');
              if (card) {
                const [type, id] = card.id.split('_');
                request<DeleteTaskType>('delete', { type, id });
              }
            } else return;
          }}
        >
          {allDoneTask.map(({ id, task }) => {
            return <CompletedTask task={task} id={id} key={id} />;
          })}
        </Flex>
      ) : (
        <Flex>
          <Text>{'You haven`t any done task'}</Text>
        </Flex>
      )}
    </Card>
  );
}

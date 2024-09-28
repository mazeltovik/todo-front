import { useEffect, useState } from 'react';
import ActiveTask from './activeTask';
import { TaskType } from '../types/activeTackType';
import { Flex, Typography, Card } from 'antd';
const { Text } = Typography;
import useFetch from '../hooks/useFetch';
import { DeleteTaskType } from '../types/deleteTaskType';

export default function AllActiveTask({
  allActiveTask,
  doneTask,
  isLoading,
  setActiveTask,
  setDoneTask,
}: {
  allActiveTask: TaskType[];
  doneTask: TaskType[];
  isLoading: boolean;
  setActiveTask: React.Dispatch<React.SetStateAction<TaskType[]>>;
  setDoneTask: React.Dispatch<React.SetStateAction<TaskType[]>>;
}) {
  const [method, setMethod] = useState('');
  const { data, request } = useFetch<TaskType>('http://localhost:3000/tasks');
  useEffect(() => {
    if (data) {
      if (method == 'delete') {
        setActiveTask(allActiveTask.filter((task) => task.id !== data.id));
      } else {
        setActiveTask(allActiveTask.filter((task) => task.id !== data.id));
        setDoneTask([...doneTask, data]);
      }
    }
  }, [data]);
  return (
    <Card
      title={
        isLoading
          ? 'Loading...'
          : `You have: ${allActiveTask.length} active tasks`
      }
      style={{ background: '#c0bcbc' }}
      loading={isLoading}
    >
      {allActiveTask.length > 0 ? (
        <Flex
          vertical={true}
          gap={'small'}
          onClick={(event) => {
            const target = event.target as HTMLElement;
            const tagName = target.tagName;
            if (tagName == 'SPAN' || tagName == 'BUTTON') {
              const operation =
                tagName == 'BUTTON'
                  ? target.id
                  : (target.parentNode as HTMLElement).id;
              const method = operation == 'done' ? 'put' : 'delete';
              const card = target.closest('div .ant-card');
              if (card) {
                const [type, id] = card.id.split('_');
                console.log(type, id);
                if (method == 'put') {
                  setMethod('put');
                  request<{ id: string }>(method, { id });
                } else {
                  setMethod('delete');
                  request<DeleteTaskType>(method, { type, id });
                }
              }
            } else return;
          }}
        >
          {allActiveTask.map(({ id, task }) => {
            return <ActiveTask task={task} id={id} key={id} />;
          })}
        </Flex>
      ) : (
        <Flex>
          <Text>{'You haven`t any active task'}</Text>
        </Flex>
      )}
    </Card>
  );
}

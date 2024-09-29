import { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { Input, Button, Space } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { CreateTask } from '../types/createTaskType';
import { TaskType } from '../types/activeTackType';

export default function CreateTaskInput({
  activeTask,
  setActiveTask,
}: CreateTask) {
  const [isVisible, setIsVisible] = useState(false);
  const [task, setTask] = useState('');
  const { data, isLoading, request } = useFetch<TaskType>(
    'http://localhost:3000/tasks'
  );
  useEffect(() => {
    if (data) {
      setTask('');
      setIsVisible(false);
      setActiveTask([...activeTask, data]);
    }
  }, [data]);
  return (
    <Space.Compact
      style={{
        width: '100%',
      }}
    >
      <Input
        placeholder="Create task"
        suffix={
          isVisible ? (
            <CloseOutlined
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setTask('');
                setIsVisible(false);
              }}
            />
          ) : (
            <></>
          )
        }
        value={task}
        onChange={(event: React.FormEvent<HTMLInputElement>) => {
          if (event.currentTarget.value.length > 0) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
          setTask(event.currentTarget.value);
        }}
      />
      <Button
        type="primary"
        disabled={isLoading}
        onClick={() => {
          request<Omit<TaskType, 'id'>>('post', { task, isCompleted: false });
        }}
      >
        Submit
      </Button>
    </Space.Compact>
  );
}

// import './main.scss';
import { useState, useEffect } from 'react';
import { Flex } from 'antd';
import CreateTaskInput from './components/createTask';
import AllActiveTask from './components/allActiveTask';
import AllDoneTask from './components/allDoneTask';
import { TaskType } from './types/activeTackType';
import { AllTask } from './types/allTaskType';
import axios from 'axios';

export const App = () => {
  const [activeTask, setActiveTask] = useState<TaskType[]>([]);
  const [doneTask, setDoneTask] = useState<TaskType[]>([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    async function getAll() {
      try {
        setLoading(true);
        const response = await axios.get<AllTask>(
          'http://localhost:3000/tasks'
        );
        if (response) {
          setActiveTask(response.data.activeTask);
          setDoneTask(response.data.doneTask);
        }
      } finally {
        setLoading(false);
      }
    }
    getAll();
  }, []);
  return (
    <Flex justify="center">
      <Flex
        style={{ width: '80%' }}
        justify="center"
        vertical={true}
        gap={'small'}
      >
        <CreateTaskInput
          activeTask={activeTask}
          setActiveTask={setActiveTask}
        />
        <AllActiveTask
          allActiveTask={activeTask}
          isLoading={isLoading}
          setActiveTask={setActiveTask}
          doneTask={doneTask}
          setDoneTask={setDoneTask}
        />
        <AllDoneTask
          allDoneTask={doneTask}
          isLoading={isLoading}
          setDoneTask={setDoneTask}
        />
      </Flex>
    </Flex>
  );
};

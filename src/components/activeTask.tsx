import { Card, Button, Flex, Typography } from 'antd';

import { TaskType } from '../types/activeTackType';

const { Text } = Typography;

export default function ActiveTask({
  id,
  task,
}: Omit<TaskType, 'isCompleted'>) {
  return (
    <Card styles={{ body: { padding: '6px' } }} id={`active_${id}`}>
      <Flex
        align="center"
        justify="space-between"
        style={{ marginBottom: '1rem' }}
      >
        <Text>{task}</Text>
      </Flex>
      <Flex gap={'small'} justify="flex-end">
        <Button style={{ background: '#41d219' }} type="primary" id="done">
          Done!
        </Button>
        <Button style={{ background: '#c72222' }} type="primary" id="remove">
          Remove task
        </Button>
      </Flex>
    </Card>
  );
}

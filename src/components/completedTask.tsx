import { Card, Flex, Typography, Button } from 'antd';
import { TaskType } from '../types/activeTackType';

const { Text } = Typography;

export default function CompletedTask({
  id,
  task,
}: Omit<TaskType, 'isCompleted'>) {
  return (
    <Card styles={{ body: { padding: '6px' } }} id={`done_${id}`}>
      <Flex
        align="center"
        justify="space-between"
        style={{ marginBottom: '1rem' }}
      >
        <Text delete>{task}</Text>
      </Flex>
      <Flex gap={'small'} justify="flex-end">
        <Button style={{ background: '#c72222' }} type="primary" id="remove">
          Remove task
        </Button>
      </Flex>
    </Card>
  );
}

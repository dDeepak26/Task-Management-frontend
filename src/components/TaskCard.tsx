import { Card, Text, Button, Group } from "@mantine/core";
import {
  onCompleteType,
  onDeleteType,
  onUpdateType,
  tasksType,
} from "../types";

const TaskCard = ({
  tasks,
  onComplete,
  isComplete,
  onUpdate,
  onDelete,
}: {
  tasks: tasksType;
  onComplete: onCompleteType;
  isComplete: boolean;
  onUpdate: onUpdateType;
  onDelete: onDeleteType;
}) => {
  return (
    <Card p="lg" mb={"sm"} w={"full"} withBorder key={tasks._id}>
      <Text size="xl" fw={500} td={isComplete ? "line-through" : ""}>
        {tasks.title}
      </Text>
      {tasks.description && (
        <Text
          className="text-gray-600 mb-4"
          td={isComplete ? "line-through" : ""}
        >
          {tasks.description}
        </Text>
      )}

      <Group justify="space-between" className="mt-4">
        <Button color="green" radius={"md"} onClick={onComplete}>
          {isComplete ? "Mark as Incomplete" : "Mark as Complete"}
        </Button>
        <Button
          color="blue"
          radius={"md"}
          onClick={onUpdate}
          disabled={isComplete ? true : false}
        >
          Update
        </Button>
        <Button color="red" radius={"md"} onClick={onDelete}>
          Delete
        </Button>
      </Group>
    </Card>
  );
};

export default TaskCard;

import { Text } from "@mantine/core";
import Tasks from "./components/Tasks";

const App = () => {
  return (
    <div className="bg-gray-100">
      <div className="flex justify-center item-center">
        <Text size="xl" fw={700} c={"blue"} p={"md"} tt={"uppercase"}>
          Task Management
        </Text>
      </div>
      <Tasks />
    </div>
  );
};

export default App;

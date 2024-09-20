import { Box, Grid, Heading } from "@chakra-ui/react";
import CardTodo from "./components/CardTodo";
import useStore from "./store";
import ButtonNewTask from "./components/ButtonNewTask";

function App() {
  const todos = useStore((state) => state.todos);
  const inProgress = useStore((state) => state.inProgress);
  const completed = useStore((state) => state.completed);

  return (
    <>
      <Box
        as="header"
        borderBottom="1px solid #E0E0E0"
        display="flex"
        alignItems="center"
        padding="10px 0"
        paddingLeft="18px"
      >
        <Heading as="h2" fontSize={18} marginRight="20px" lineHeight="28px">
          TODO - List Board
        </Heading>
        <ButtonNewTask />
      </Box>
      <Box
        height="auto"
        padding="24px"
        display="flex"
        flexFlow={{ base: "column", lg: "row" }}
        gap={5}
        width="100%"
      >
        <CardTodo title={"TODO"} items={todos} />
        <CardTodo title={"In Progress"} items={inProgress} />
        <CardTodo title={"Completed"} items={completed} />
      </Box>
    </>
  );
}

export default App;

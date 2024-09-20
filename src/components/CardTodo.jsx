import { GridItem, Heading, Box } from "@chakra-ui/react";
import CardTaskItem from "./CardTaskItem";

// eslint-disable-next-line react/prop-types
const CardTodo = ({ title, items }) => {
  return (
    <>
      <GridItem
        width="326px"
        border={`1px solid #4DB5BC`}
        padding="16px"
        borderRadius="4px"
        display="flex"
        flexFlow="column"
        gap={2}
        height="fit-content"
      >
        <Box
          border={`1px solid #4DB5BC`}
          width="125px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding="8px"
          borderRadius="4px"
        >
          <Heading as="h4" color={`#212121`} fontSize="14px" fontWeight="400">
            {title}
          </Heading>
        </Box>
        <CardTaskItem items={items} title={title} />
      </GridItem>
    </>
  );
};

export default CardTodo;

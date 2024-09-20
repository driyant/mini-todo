/* eslint-disable react/prop-types */
// import React from "react";
import { Box, Text, Progress } from "@chakra-ui/react";
// import { CheckCircleIcon } from "@chakra-ui/react";
import DialogMenu from "./DialogMenu";

const CardTaskItem = ({ items, title: category }) => {
  return (
    <>
      {items.map((item) => {
        return (
          <Box
            border="1px solid #E0E0E0"
            padding="1rem"
            margin="2px 0"
            key={item.id}
          >
            <Text fontWeight="700">{item.name}</Text>
            <Box border="1px dashed #E0E0E0" margin="1rem 0"></Box>
            <Box
              display="flex"
              justifyContent="start"
              alignItems="center"
              gap="15px"
            >
              <Box width="70%">
                <Progress
                  colorScheme={
                    item.progressPercentage === 100 ? "green" : "blue"
                  }
                  value={item.progressPercentage}
                  borderRadius="12px"
                />
              </Box>
              <Box>
                <Text fontSize="14px" color="#757575">
                  {item.progressPercentage}%
                </Text>
              </Box>
              <DialogMenu item={item} category={category} />
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default CardTaskItem;

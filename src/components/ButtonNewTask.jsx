/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  Box,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import DialogModal from "./DialogModal";
import { AddIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import useStore from "../store";

const ButtonNewTask = () => {
  const toast = useToast();
  const addTask = useStore((state) => state.addTask);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const getModalOpen = () => {
    setModalIsOpen(true);
  };
  const getModalClose = () => {
    setModalIsOpen(false);
  };
  const createTaskHandler = (e) => {
    e.preventDefault();
    if (!taskName) {
      toast({
        title: "Error",
        description: "Task name is required",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    const obj = {
      name: taskName,
      progressPercentage: 0,
    };
    console.log(obj);
    addTask(obj);
    setModalIsOpen(false);
    setTaskName("");
    toast({
      title: "Success",
      description: "New task has been added!",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "bottom",
    });
  };
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        marginTop="0.5rem"
        cursor="pointer"
        width="110px"
        onClick={getModalOpen}
      >
        <Button colorScheme="blue">
          <AddIcon boxSize={2.5} /> New Task
        </Button>
      </Box>
      <DialogModal
        title="Create Task"
        modalIsOpen={modalIsOpen}
        modalIsClose={getModalClose}
        createTaskHandler={createTaskHandler}
      >
        <form onSubmit={createTaskHandler}>
          <FormControl mb="1rem">
            <FormLabel>Task Name</FormLabel>
            <Input
              type="text"
              onChange={(e) => setTaskName(e.target.value)}
              value={taskName}
              required={true}
            />
          </FormControl>
        </form>
      </DialogModal>
    </>
  );
};

export default ButtonNewTask;

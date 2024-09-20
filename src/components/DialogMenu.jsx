/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Text,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import SettingButton from "./SettingButton";
import DialogModal from "./DialogModal";
import useStore from "../store";
import { useToast } from "@chakra-ui/react";

const DialogMenu = ({ item, category }) => {
  const toast = useToast();
  const todos = useStore((state) => state.todos);
  const inProgress = useStore((state) => state.inProgress);
  const completed = useStore((state) => state.completed);
  const deleteTaskTodo = useStore((state) => state.deleteTaskTodo);
  const deleteTaskInProgress = useStore((state) => state.deleteTaskInProgress);
  const deleteTaskCompleted = useStore((state) => state.deleteTaskCompleted);
  const updateTodo = useStore((state) => state.updateTodo);
  const updateInProgress = useStore((state) => state.updateInProgress);
  const updateCompleted = useStore((state) => state.updateCompleted);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [taskName, setTaskName] = useState("");
  const [progressPercentage, setProgressPercentage] = useState(0);
  const validationPercentage = (e) => {
    const value = e.target.value;
    const regex = /^(100|[0-9]{1,2})$/;
    if (regex.test(value) || value === "") {
      setProgressPercentage(Number(value));
    }
  };
  const showToast = (title, description, status) => {
    toast({
      title,
      description,
      status,
      duration: 2000,
      isClosable: true,
    });
  };
  const getModalClose = () => {
    setModalIsOpen(false);
  };
  const deleteHandler = (id, category) => {
    try {
      if (category === "TODO") {
        deleteTaskTodo(id);
      } else if (category === "In Progress") {
        deleteTaskInProgress(id);
      } else if (category === "Completed") {
        deleteTaskCompleted(id);
      }
      showToast("Success", "Task has been deleted!", "success");
    } catch (error) {
      console.log(error);
      showToast("Error", error.message, "error");
    } finally {
      setModalIsOpen(false);
    }
  };
  const getSingleTask = (id, category) => {
    if (category === "TODO") {
      const todo = todos.find((item) => item.id === id);
      setTaskName(todo.name);
      setProgressPercentage(todo.progressPercentage);
    } else if (category === "In Progress") {
      const todoInProgress = inProgress.find((item) => item.id === id);
      setTaskName(todoInProgress.name);
      setProgressPercentage(todoInProgress.progressPercentage);
    } else if (category === "Completed") {
      const todoCompleted = completed.find((item) => item.id === id);
      setTaskName(todoCompleted.name);
      setProgressPercentage(todoCompleted.progressPercentage);
    }
  };
  const updateHandler = (e, id, category) => {
    e.preventDefault();
    try {
      if (category === "TODO") {
        if (progressPercentage >= 1 && progressPercentage < 100) {
          updateInProgress({ id, name: taskName, progressPercentage });
          deleteTaskTodo(id);
        } else if (progressPercentage === 100) {
          updateCompleted({ id, name: taskName, progressPercentage });
          deleteTaskTodo(id);
        } else {
          updateTodo({ id, name: taskName, progressPercentage });
          deleteTaskTodo(id);
        }
      } else if (category === "In Progress") {
        if (progressPercentage >= 1 && progressPercentage < 100) {
          updateInProgress({ id, name: taskName, progressPercentage });
          deleteTaskInProgress(id);
        } else if (progressPercentage === 100) {
          updateCompleted({ id, name: taskName, progressPercentage });
          deleteTaskInProgress(id);
        } else if (progressPercentage === 0) {
          updateTodo({ id, name: taskName, progressPercentage });
          deleteTaskInProgress(id);
        }
      } else if (category === "Completed") {
        if (progressPercentage >= 1 && progressPercentage < 100) {
          updateInProgress({ id, name: taskName, progressPercentage });
          deleteTaskCompleted(id);
        } else if (progressPercentage === 0) {
          updateTodo({ id, name: taskName, progressPercentage });
          deleteTaskCompleted(id);
        } else {
          updateCompleted({ id, name: taskName, progressPercentage });
          deleteTaskCompleted(id);
        }
      }
      showToast("Success", "Task has been updated!", "success");
    } catch (error) {
      console.log(error);
      showToast("Error", "Semething went wrong", "error");
    } finally {
      setModalIsOpen(false);
    }
  };
  return (
    <>
      <Menu>
        <MenuButton height="2rem" cursor="pointer">
          <SettingButton />
        </MenuButton>
        <MenuList marginLeft="1rem">
          <MenuItem
            onClick={() => {
              setTypeModal("edit");
              setModalIsOpen(!modalIsOpen);
              getSingleTask(item.id, category);
            }}
          >
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              setTypeModal("delete");
              setModalIsOpen(!modalIsOpen);
            }}
          >
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
      {typeModal === "edit" && (
        <DialogModal
          title={`Edit Task: ${category}`}
          modalIsOpen={modalIsOpen}
          modalIsClose={getModalClose}
          updateHandler={updateHandler}
          item={item}
          category={category}
        >
          <form>
            <FormControl mb="1rem">
              <FormLabel>Task Name</FormLabel>
              <Input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </FormControl>
            <FormControl mb="1rem">
              <FormLabel>Progress</FormLabel>
              <Input
                type="text"
                width="100px"
                placeholder="70%"
                onChange={(e) => validationPercentage(e)}
                value={progressPercentage}
              />
            </FormControl>
          </form>
        </DialogModal>
      )}
      {typeModal === "delete" && (
        <DialogModal
          title="Delete Task"
          modalIsOpen={modalIsOpen}
          modalIsClose={getModalClose}
          deleteHandler={() => deleteHandler(item.id, category)}
        >
          <Text>
            {
              "Are you sure want to delete this task? your action can't be reverted."
            }
          </Text>
        </DialogModal>
      )}
    </>
  );
};

export default DialogMenu;

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

const DialogMenu = ({ item, category }) => {
  const todos = useStore((state) => state.todos);
  const inProgress = useStore((state) => state.inProgress);
  const completed = useStore((state) => state.completed);
  const deleteTaskTodo = useStore((state) => state.deleteTaskTodo);
  const deleteTaskInProgress = useStore((state) => state.deleteTaskInProgress);
  const deleteTaskCompleted = useStore((state) => state.deleteTaskCompleted);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [taskName, setTaskName] = useState("");
  const [progressPercentage, setProgressPercentage] = useState(0);
  const getModalClose = () => {
    setModalIsOpen(false);
  };
  const deleteHandler = (id, category) => {
    if (category === "TODO") {
      deleteTaskTodo(id);
    } else if (category === "In Progress") {
      deleteTaskInProgress(id);
    } else if (category === "Completed") {
      deleteTaskCompleted(id);
    }
    setModalIsOpen(!modalIsOpen);
  };
  const getSingleTask = (itemId) => {
    console.log("get task: " + itemId);
  };
  const updateHandler = (e, itemId) => {
    e.preventDefault();
    console.log("update: " + itemId);
  };
  const moveRightHandler = () => {
    console.log("Move right!");
  };
  const leftHandler = () => {
    console.log("Move left!");
  };
  return (
    <>
      <Menu>
        <MenuButton height="2rem" cursor="pointer">
          <SettingButton />
        </MenuButton>
        <MenuList marginLeft="1rem">
          <MenuItem onClick={moveRightHandler}>Move Right</MenuItem>
          <MenuItem onClick={leftHandler}>Move Left</MenuItem>
          <MenuItem
            onClick={() => {
              setTypeModal("edit");
              setModalIsOpen(!modalIsOpen);
              // getSingleTask(id, todoId);
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
          title="Edit Task"
          modalIsOpen={modalIsOpen}
          modalIsClose={getModalClose}
          updateHandler={updateHandler}
        >
          <form onSubmit={updateHandler}>
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
                disabled={true}
                onChange={(e) => setProgressPercentage(e.target.value)}
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

import { create } from "zustand";
import { generateRandomId } from "../utils";

const useStore = create((set) => ({
  todos: [
    { id: 1, name: "Buy groceries", progressPercentage: 0 },
    { id: 2, name: "Plan vacation", progressPercentage: 0 },
    { id: 3, name: "Start a new project", progressPercentage: 0 },
    { id: 4, name: "Clean the garage", progressPercentage: 0 },
    { id: 5, name: "Update resume", progressPercentage: 0 },
    { id: 6, name: "Call the bank", progressPercentage: 0 },
    { id: 7, name: "Research for blog post", progressPercentage: 0 },
    {
      id: 8,
      name: "Schedule a dentist appointment",
      progressPercentage: 0,
    },
    { id: 9, name: "Organize workspace", progressPercentage: 0 },
    { id: 10, name: "Prepare meeting agenda", progressPercentage: 0 },
  ],
  inProgress: [
    { id: 11, name: "Shopping", progressPercentage: 25 },
    { id: 12, name: "Laundry", progressPercentage: 50 },
    { id: 13, name: "Workout", progressPercentage: 75 },
    { id: 14, name: "Study Vue.js", progressPercentage: 60 },
    { id: 15, name: "Grocery Shopping", progressPercentage: 40 },
    { id: 16, name: "Cook Dinner", progressPercentage: 20 },
    { id: 17, name: "Read a book", progressPercentage: 90 },
    { id: 18, name: "Write blog post", progressPercentage: 35 },
    { id: 19, name: "Clean the house", progressPercentage: 80 },
    { id: 20, name: "Fix the bike", progressPercentage: 15 },
  ],
  completed: [
    { id: 21, name: "Submit tax documents", progressPercentage: 100 },
    { id: 22, name: "Renew driver’s license", progressPercentage: 100 },
    { id: 23, name: "Pay utility bills", progressPercentage: 100 },
    { id: 24, name: "Finish online course", progressPercentage: 100 },
    {
      id: 25,
      name: "Prepare presentation slides",
      progressPercentage: 100,
    },
  ],
  addTask: ({ name, progressPercentage }) =>
    set((state) => ({
      todos: [
        {
          id: generateRandomId(),
          name,
          progressPercentage: progressPercentage,
        },
        ...state.todos,
      ],
    })),
  deleteTaskTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((item) => item.id !== id),
    })),
  deleteTaskInProgress: (id) =>
    set((state) => ({
      inProgress: state.inProgress.filter((item) => item.id !== id),
    })),
  deleteTaskCompleted: (id) =>
    set((state) => ({
      completed: state.completed.filter((item) => item.id !== id),
    })),
}));

export default useStore;

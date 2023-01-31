import React, { useContext, useReducer } from "react";

const initialState = {
  tasks: [],
  // TO DO : add dark theme
  darkTheme: false,
};

// action contains the payload sent from dispatch function inside a component
function reducer(state, action) {
  switch (action.type) {
    case "add-task":
      return {
        ...state, // deep copy of the state (= initialState above)
        tasks: [...state.tasks, newTask(action.payload.name)],
      };
    case "delete-task":
      let newTasks = state.tasks.filter((task) => task.id !== action.payload.id);
      return { ...state, tasks: [...newTasks] };

    case "complete-task":
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            return { ...task, complete: !task.complete };
          } else {
            return task;
          }
        }),
      };
    default:
      return state;
  }
}

function newTask(name) {
  return { id: Date.now(), name: name, complete: false };
}

// const TaskContext = React.createContext(initialState);

const TaskStateContext = React.createContext();
const TaskDispatchContext = React.createContext();

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TaskStateContext.Provider value={state}>
      <TaskDispatchContext.Provider value={dispatch}>{children}</TaskDispatchContext.Provider>
    </TaskStateContext.Provider>
  );
}

export function useTaskState() {
  const context = useContext(TaskStateContext);

  if (!context) {
    throw Error("Task State Context doesn't exist");
  }

  return context;
}

export function useTaskDispatch() {
  const context = useContext(TaskDispatchContext);

  if (!context) {
    throw Error("Task Dispatch Context doesn't exist");
  }

  return context;
}
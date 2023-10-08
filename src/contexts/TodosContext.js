import { createContext, useContext, useReducer } from "react";
import todosReducers from "../reducers/todosReducers";

const TodosContext = createContext([]);

const TodosProvider = ({ children }) => {
  const [list, listDispatch] = useReducer(todosReducers, []);
  return (
    <TodosContext.Provider value={{ list: list, listDispatch: listDispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
export default TodosProvider;

export const useTodos = () => {
  return useContext(TodosContext);
};

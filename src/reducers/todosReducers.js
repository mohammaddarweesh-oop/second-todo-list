import { v4 as uuidv4 } from "uuid";
export default function reducer(currentTodos, action) {
  switch (action.type) {
    case "added": {
      const newTodos = {
        title: action.payload.title, //todoValue
        id: uuidv4(),
        body: "أضف وصف للمهمة",
        isCompleted: false,
      };

      const updatedTodos = [...currentTodos, newTodos];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "deleted": {
      const updatedTodos = currentTodos.filter(
        (t) => t.id != action.payload.prevId
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "updated": {
      const updateTodos = currentTodos.map((t) => {
        if (t.id == action.payload.dailogTodo.id) {
          return {
            ...t,
            title: action.payload.dailogTodo.title,
            body: action.payload.dailogTodo.body,
          };
        } else {
          return t;
        }
      });
      return updateTodos;
    }
    case "get": {
      let storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
      return storageTodos;
    }
    case "check": {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id == action.payload.id) {
          const updatedTodo = { ...t, isCompleted: !t.isCompleted };
          return updatedTodo;
        }
        return t;
      });

      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      return updatedTodos;
    }
    default: {
      throw Error("Unknown" + action.type);
    }
  }
}

import "./App.css";
import TodoList from "./Components/TodoList";
import { ThemeProvider, createTheme } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import { useState } from "react";
import { ToastProvider } from "./contexts/ToastContext";
import TodosProvider from "./contexts/TodosContext";

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
  palette: {
    primary: {
      main: "#d32f2f",
    },
    secondary: {
      main: "#c2185b",
    },
  },
});

function App() {
  const [list, setList] = useState([
    {
      id: uuidv4(),
      title: "المهمة الاولى",
      body: "قراءة كتاب",
      isCompleted: false,
    },
    {
      id: uuidv4(),
      title: "المهمة الثانية",
      body: "تسجيل فيديو",
      isCompleted: false,
    },
    {
      id: uuidv4(),
      title: "الذهاب للتسوق",
      body: "شراء طعام,ملابس,اكسسوارات",
      isCompleted: false,
    },
  ]);

  return (
    <>
      <TodosProvider>
        <ThemeProvider theme={theme}>
          <div
            className="App"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              backgroundColor: "#191b1f",
              // padding: "10vh 0",
            }}
          >
            <ToastProvider>
              <TodoList />
            </ToastProvider>
          </div>
        </ThemeProvider>
      </TodosProvider>
    </>
  );
}

export default App;

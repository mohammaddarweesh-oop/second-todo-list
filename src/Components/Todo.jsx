import { Card, CardContent, IconButton, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

import { useToast } from "../contexts/ToastContext";
import { useTodos } from "../contexts/TodosContext";

function Todo({ todo, showDelete, openEditHandler }) {
  const { list, listDispatch } = useTodos();
  // const { list, setList } = useContext(CompletedContext);
  const { showHideToast } = useToast();

  // ============= event hundler ================== //
  function handlerCheck() {
    // const updatedTodos = list.map((t) => {
    //   if (t.id == todo.id) {
    //     t.isCompleted = !t.isCompleted;
    //   }
    //   return t;
    // });
    // setList(updatedTodos);
    // localStorage.setItem("todos", JSON.stringify(updatedTodos));
    listDispatch({ type: "check", payload: todo });
    console.log(todo);
    if (!todo.isCompleted) {
      showHideToast("تم إنجاز المهمة");
    }
  }
  function openEditHandlerProps() {
    openEditHandler(todo);
  }
  function deleteHandler() {
    showDelete(todo);
  }
  // ============= event hundler ================== //
  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          backgroundColor: "#283593",
          color: "white",
          marginTop: 2,
        }}
        className="todo"
      >
        <CardContent>
          <Grid container spacing={2} xs={{ backgroundColor: "red" }}>
            <Grid xs={8}>
              <Typography
                variant="h5"
                color="text.secondary"
                gutterBottom
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted ? "line-through" : "",
                  color: "white",
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                gutterBottom
                sx={{
                  textAlign: "right",
                  color: "white",
                }}
              >
                {todo.body}
              </Typography>
            </Grid>

            <Grid
              xs={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              className="icon-button"
            >
              <IconButton
                className="iconBtn"
                sx={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  backgroundColor: todo.isCompleted ? "#8bc34a" : "white",
                  border: "#8bc34a solid 3px",
                }}
                onClick={handlerCheck}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                className="iconBtn"
                sx={{
                  color: "#1769aa",
                  backgroundColor: "white",
                  border: "#1769aa solid 3px",
                }}
                onClick={openEditHandlerProps}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                className="iconBtn"
                sx={{
                  color: "#b23c17",
                  backgroundColor: "white",
                  border: "#b23c17 solid 3px",
                }}
                onClick={deleteHandler}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default Todo;

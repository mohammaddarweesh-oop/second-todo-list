import {
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useMemo, useState } from "react";
import React from "react";
import Todo from "./Todo";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
// import CompletedProvider from "../contexts/CompletedContext";
//  Dialog ========================== //
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//  Dialog ========================== //
import { useToast } from "../contexts/ToastContext";
import { useTodos } from "../contexts/TodosContext";
// import todosReducers from "../reducers/todosReducers";

function TodoList() {
  const { list, listDispatch } = useTodos();
  // const { list, listDispatch } = useContext(TodosContext);
  // const { list2, setList } = useContext(CompletedContext);
  // const [list, listDispatch] = useReducer(todosReducers, []);
  const { showHideToast } = useToast();
  const [showDeleteDaialog, setShowDeleteDaialog] = useState(false);
  const [editShowModal, setEditShowModal] = useState(false);
  const [dailogTodo, setDailogTodo] = useState({ title: "", body: "" });
  const [todoValue, setTodoValue] = useState("");
  const [displayTodosType, setDisplayTodosType] = useState("all");

  /*


*/

  // ================= // is completed // =================//
  const completedTodos = useMemo(() => {
    console.log("completed");
    return list.filter((t) => t.isCompleted);
  }, [list]);

  // ================= // is completed // =================//
  // ================= // is completed // =================//
  const notCompletedTodos = useMemo(() => {
    return list.filter((t) => !t.isCompleted);
  }, [list]);

  // ================= // is completed // =================//
  let todosToBeRendered = list;
  if (displayTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayTodosType === "non-completed") {
    todosToBeRendered = notCompletedTodos;
  }

  function todoHandluer(event) {
    setTodoValue(event.target.value);
  }
  function addTodoHandluer() {
    // const updatedTodos = [
    //   ...list,
    //   {
    //     title: todoValue,
    //     id: uuidv4(),
    //     body: "Empty Details",
    //     isCompleted: false,
    //   },
    // ];
    // setList(updatedTodos);
    // localStorage.setItem("todos", JSON.stringify(updatedTodos));
    listDispatch({ type: "added", payload: { title: todoValue } });
    setTodoValue("");
    showHideToast("تم الإضافة ينجاح");
  }

  // ======================================

  function changeDisplayType(e) {
    setDisplayTodosType(e.target.value);
  }

  // ================= // Start Storage // =============== //

  useEffect(() => {
    // let storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    // setList(storageTodos);
    listDispatch({ type: "get" });
  }, []);
  // ================= // End Storage // =============== //

  function openDeleteDailog(todo) {
    setDailogTodo(todo);
    setShowDeleteDaialog(true);
  }
  function handleDelete() {
    // const updatedTodos = list.filter((t) => t.id != dailogTodo.id);
    // setList(updatedTodos);
    // localStorage.setItem("todos", JSON.stringify(updatedTodos));
    listDispatch({ type: "deleted", payload: { prevId: dailogTodo.id } });
    setShowDeleteDaialog(false);
    showHideToast("تم الحذف بنجاح");
    // setList(
    //   list.filter((t) => {
    //     if (t.id != todo.id) {
    //       return t;
    //     }
    //   })
    // );
  }
  function handleCloseDialog() {
    setShowDeleteDaialog(false);
  }
  function openEditHandler(todo) {
    setDailogTodo(todo);
    setEditShowModal(true);
  }
  function closeEditHandler() {
    setEditShowModal(false);
  }

  function updateTodoTitleHandler(event) {
    setDailogTodo({ ...dailogTodo, title: event.target.value });
    console.log(dailogTodo.title);
  }
  function updateBodyTodoHandler(event) {
    setDailogTodo({ ...dailogTodo, body: event.target.value });
    console.log(dailogTodo.body);
  }
  function confirmUpdateHandle() {
    // const updateTodos = list.map((t) => {
    //   if (t.id == dailogTodo.id) {
    //     return { ...t, title: dailogTodo.title, body: dailogTodo.body };
    //   } else {
    //     return t;
    //   }
    // });
    // setList(updateTodos);
    listDispatch({ type: "updated", payload: { dailogTodo: dailogTodo } });
    setEditShowModal(false);
    showHideToast("تم التعديل ينجاح");
  }
  const listData = todosToBeRendered.map((e) => {
    return (
      <Todo
        key={e.id}
        todo={e}
        showDelete={openDeleteDailog}
        openEditHandler={openEditHandler}
      />
    );
  });
  return (
    <>
      {/* Daialog Edit modal */}

      <Dialog
        open={editShowModal}
        onClose={closeEditHandler}
        style={{ direction: "rtl" }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>عنوان المهمة</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="المهمة"
            type="email"
            fullWidth
            variant="standard"
            value={dailogTodo.title}
            onChange={updateTodoTitleHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="وصف المهمه"
            type="email"
            fullWidth
            variant="standard"
            value={dailogTodo.body}
            onChange={updateBodyTodoHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditHandler}>إغلاق</Button>
          <Button onClick={confirmUpdateHandle}>حفظ</Button>
        </DialogActions>
      </Dialog>

      {/* Daialog Edit modal */}
      {/* Daialog Delete modal */}

      <Dialog
        open={showDeleteDaialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">
          {"هل أنت متأكد من حذف المهمة ؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعد إتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>إغلاق</Button>
          <Button autoFocus onClick={handleDelete}>
            نعم, قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* Daialog modal */}
      <Container maxWidth="sm">
        <Card
          sx={{ minWidth: 275 }}
          style={{ height: "500px", overflow: "auto" }}
          className="todo-list"
        >
          <CardContent>
            <Typography
              sx={{ fontWeight: "900" }}
              variant="h2"
              color="text.secondary"
              gutterBottom
            >
              مهامي
            </Typography>
            <Divider />
            <ToggleButtonGroup
              color="primary"
              exclusive
              aria-label="Platform"
              style={{ direction: "ltr", marginTop: "30px" }}
              value={displayTodosType}
              onChange={changeDisplayType}
            >
              <ToggleButton value="all">الكل</ToggleButton>
              <ToggleButton value="completed">منجز</ToggleButton>
              <ToggleButton value="non-completed">غير منجز</ToggleButton>
            </ToggleButtonGroup>

            <div style={{ minHeight: "33vh" }}>{listData}</div>
            {/* {listData} */}

            <Grid
              container
              spacing={20}
              style={{
                marginTop: 5,
                padding: "0",
              }}
              className="input-todo-list"
            >
              <Grid
                xs={12}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                spacing={2}
                style={{
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                <TextField
                  id="standard-basic"
                  label="اضف مهمة"
                  variant="standard"
                  style={{ width: "80%", height: "100%" }}
                  value={todoValue}
                  onChange={todoHandluer}
                />
                <Button
                  variant="contained"
                  style={{ width: "18%", height: "100%" }}
                  onClick={addTodoHandluer}
                  disabled={todoValue.length == 0}
                >
                  إضافة
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default TodoList;

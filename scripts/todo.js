"use strict";
//8.Hiển thị Todo List
//Truy cập vào các ô input và các tag HTML
const taskInput = document.getElementById("input-task");
const todoList = document.getElementById("todo-list");
//Tạo nút
const addBtn = document.getElementById("btn-add");
//Thêm mảng todo và tình trạng đăng nhập
let todoArr = [];
let todoCurrent = [];
let userCurrent = [];
let loginstatus = 0;
//Lấy dữ liệu đã được lưu userData trong localStorage
let keys = Object.keys(localStorage);
if (keys.includes("todoArray")) {
  todoArr = getFromStorage("todoArray");
}
if (keys.includes("userCurrent")) {
  userCurrent = getFromStorage("userCurrent");
}
//Tạo hàm chuyển từ JS Object sang Class Instance
function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);
  return task;
}
//Hàm tạo danh sách task
function renderList(todoArr) {
  let checked = "";
  //Duyệt các phần tử
  for (let i = 0; i < todoArr.length; i++) {
    const taskNew = todoArr[i].task;
    //Thêm tình trạng của các task đã xong hay chưa?
    if (todoArr[i].isDone === "finished") {
      checked = "checked";
    } else {
      checked = "";
    }
    //Thêm nội dung vừa duyệt vào bảng
    const row = document.createElement("li");
    row.innerHTML = `<li id="list" class=${checked}>${taskNew}<span class="close">×</span></li>`;
    todoList.appendChild(row);
  }
}
//c.Hàm tạo sự kiện task đã hoàn thành và lưu vào LS
function toggleTask() {
  let current_tasks = document.querySelectorAll("#list");
  for (let i = 0; i < current_tasks.length; i++) {
    current_tasks[i].addEventListener("click", function toggle() {
      current_tasks[i].classList.toggle("checked");
      if (current_tasks[i].classList == "checked") {
        todoCurrent[i].isDone = "finished";
      } else {
        todoCurrent[i].isDone = "unfinished";
      }
      for (let j = 0; j < todoArr.length; j++) {
        if (
          todoCurrent[i].owner === todoArr[j].owner &&
          todoCurrent[i].task === todoArr[j].task
        ) {
          todoArr[j].isDone = todoCurrent[i].isDone;
        }
      }
      saveToStorage("todoArray", todoArr);
    });
  }
}
//d.Hàm tạo nút delete
function delbutton() {
  let current_buts = document.querySelectorAll(".close");
  for (let i = 0; i < current_buts.length; i++) {
    current_buts[i].onclick = function deleteTask() {
      if (confirm("Are you sure?") === true) {
        this.parentNode.parentNode.remove();
        for (let j = 0; j < todoArr.length; j++) {
          if (
            todoCurrent[i].owner === todoArr[j].owner &&
            todoCurrent[i].task === todoArr[j].task
          ) {
            todoArr.splice(j, 1);
          }
        }
        saveToStorage("todoArray", todoArr);
      } else {
      }
    };
  }
}
//Lần đầu tải trang
//Xóa nội dung mặc định
todoList.innerHTML = "";
//Lưu task ứng với người dùng hiện tại vào mảng mới
for (let i = 0; i < todoArr.length; i++) {
  if (todoArr[i].owner === userCurrent[0].userName) {
    todoCurrent.push(todoArr[i]);
  }
}
//Hiện task đã lưu của người dùng
renderList(todoCurrent);
toggleTask();
delbutton();
//Nút Add list
addBtn.addEventListener("click", function Addlist(e) {
  if (keys.includes("loginstatus") && keys.includes("userCurrent")) {
    todoCurrent = [];
    //Tạo biến nhận dữ liệu task
    const taskData = {
      task: taskInput.value,
      owner: userCurrent[0].userName,
      isDone: "unfinished",
    };
    //Validate dữ liệu trong ô input:
    if (taskData.task === "") {
      alert("Please enter your task!");
      return taskData;
    }
    //Thêm người dùng vào mảng
    todoArr.push(parseTask(taskData));
    //a.Lưu lại todoData mới vào LocalStorage
    saveToStorage("todoArray", todoArr);
    //b.Hiển thị các Task
    //Xóa nội dung hiện tại
    todoList.innerHTML = "";
    //Lưu task ứng với người dùng hiện tại vào mảng mới
    for (let i = 0; i < todoArr.length; i++) {
      if (todoArr[i].owner === userCurrent[0].userName) {
        todoCurrent.push(todoArr[i]);
      }
    }
    //Gọi hàm renderList
    renderList(todoCurrent);
    toggleTask();
    delbutton();
    //Xóa các dữ dữ liệu vừa nhập ở trên ô input
    taskInput.value = "";
  }
  //Khi người dùng chưa đăng nhập
  else {
    alert("You are not logged in!");
  }
});

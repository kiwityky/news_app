"use strict";
//3.Chức năng Login
// Truy cập vào các ô input và các tag HTML
const uNameInput = document.getElementById("input-username");
const passInput = document.getElementById("input-password");
//Tạo nút
const loginBtn = document.getElementById("btn-submit");
//Thêm mảng người dùng, người dùng hiện tại
//và tình trạng đăng nhập
let userArr = [];
let userCurrent = [];
let login = 0;
//Lấy dữ liệu đã được lưu userData trong localStorage
let keys = Object.keys(localStorage);
if (keys.includes("userArray")) {
  userArr = getFromStorage("userArray");
}
//Tạo 2 mảng chứa riêng username và password để Validate
let user_names = userArr.map((user, index, userArr) => {
  return user.userName;
});
let passwords = userArr.map((user, index, userArr) => {
  return user.password;
});
//Nút Login
//Event
loginBtn.addEventListener("click", function Login(e) {
  //Xóa người dùng cũ đang được lưu trong LocalStorage nếu có
  if (keys.includes("userCurrent") && keys.includes("loginstatus")) {
    delStorage(`userCurrent`);
    delStorage(`loginstatus`);
  }
  // Tạo Object userData gồm các value's input
  const userData = {
    username: uNameInput.value,
    password: passInput.value,
  };
  //Validate dữ liệu trong các ô input:
  //a)Không có trường nào bị nhập thiếu dữ liệu.
  if (userData.username === "") {
    alert("Please enter your username!");
    return userData;
  } else if (userData.password === "") {
    alert("Please enter your password!");
    return userData;
  }
  //b)Người dùng nhập sai tên đăng nhập
  else if (user_names.indexOf(userData.username) === -1) {
    alert("Wrong username!");
    return userData;
  }
  //c)Người dùng nhập sai mật khẩu
  else if (passwords.indexOf(userData.password) === -1) {
    alert("Wrong password!");
    return userData;
  }
  alert("Logged in successfully!");
  //Lưu người dùng hiện tại
  for (let i = 0; i < userArr.length; i++) {
    if (userArr[i].userName === userData.username) {
      userCurrent.push(userArr[i]);
    }
  }
  //Tình trạng đăng nhập
  login = 1;
  //Lưu lại userData mới vào LocalStorage
  saveToStorage("userCurrent", userCurrent);
  saveToStorage("loginstatus", login);
  //Chuyển đến trang login
  window.location.href = "../index.html";
});

"use strict";
//4.Home Page
// Truy cập vào các ô input và các tag HTML
const notLogged = document.getElementById("login-modal");
const logged = document.getElementById("main-content");
const wel_mes = document.getElementById("welcome-message");
//Tạo nút
const logoutBtn = document.getElementById("btn-logout");
//Khởi tạo tình trạng đăng nhập
let loginstatus = 0;
let userCurrent = [];
//Lấy dữ liệu đã được lưu userData trong localStorage
let keys = Object.keys(localStorage);
if (keys.includes("loginstatus") && keys.includes("userCurrent")) {
  loginstatus = getFromStorage("loginstatus");
  userCurrent = getFromStorage("userCurrent");
} else {
  loginstatus = 0;
}
//Giao diện
if (loginstatus === 0) {
  logged.innerHTML = "";
} else if (loginstatus !== 0) {
  notLogged.innerHTML = "";
  const Firstname = String(userCurrent[0].firstName);
  wel_mes.innerHTML = `Welcome ${Firstname}`;
  //5.Nút Logout
  //Event
  logoutBtn.addEventListener("click", function Logout(e) {
    delStorage(`userCurrent`);
    delStorage(`loginstatus`);
    delStorage(`userSetting`);
    //Chuyển đến trang login
    window.location.href = "./pages/login.html";
  });
}

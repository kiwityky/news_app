"use strict";
//2.Chức năng Register
// Truy cập vào các ô input và các tag HTML
const fNameInput = document.getElementById("input-firstname");
const lNameInput = document.getElementById("input-lastname");
const uNameInput = document.getElementById("input-username");
const passInput = document.getElementById("input-password");
const conPassInput = document.getElementById("input-password-confirm");
//Tạo nút
const registerBtn = document.getElementById("btn-submit");
//Thêm mảng người dùng
let userArr = [];
let userID = [];
//Lấy dữ liệu đã được lưu userData trong localStorage
let keys = Object.keys(localStorage);
if (keys.includes("userArray")) {
  userArr = getFromStorage("userArray");
}
//Tạo hàm chuyển từ JS Object sang Class Instance
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password
  );
  return user;
}
//Hàm check ID
function aUnique(array, size) {
  //flag =  1 =>  tồn tại ID trùng nhau
  //flag =  0 =>  không tồn tại ID trùng nhau
  let flag = 0;
  for (let i = 0; i < size - 1; ++i) {
    for (let j = i + 1; j < size; ++j) {
      if (array[i] == array[j]) {
        /*Tìm thấy 1 ID trùng là dừng vòng lặp*/
        flag = 1;
        break;
      }
    }
  }
  return flag;
}
//Nút Register
//Event
registerBtn.addEventListener("click", function Register(e) {
  // Tạo Object userData gồm các value's input
  const userData = {
    firstname: fNameInput.value,
    lastname: lNameInput.value,
    username: uNameInput.value,
    password: passInput.value,
    conPass: conPassInput.value,
  };
  //Validate dữ liệu trong các ô input:
  //a)Không có trường nào bị nhập thiếu dữ liệu.
  if (
    userData.firstname === "" ||
    userData.lastname === "" ||
    userData.username === "" ||
    userData.password === "" ||
    userData.conPass === ""
  ) {
    alert("Please fill the whole form!");
    return userData;
  }
  //b)Password phải trên 8 ký tự.
  else if (userData.password.length + 1 < 8) {
    alert("Password must be more than 8 characters!");
    return userData;
  }
  //c)Password === Confirm Password.
  else if (userData.password !== userData.conPass) {
    alert("Please confirm the password again!");
    return userData;
  }
  //Thêm người dùng vào mảng
  userArr.push(parseUser(userData));
  userID.push(userData.uName);
  //Loại bỏ user có uName trùng
  let checkID = aUnique(userID, userID.length);
  if (checkID == 1) {
    alert("Username must unique!");
    userArr.pop();
    userID.pop();
  }
  //Lưu lại userData mới vào LocalStorage
  saveToStorage("userArray", userArr);
  //Chuyển đến trang login
  window.location.href = "../pages/login.html";
});

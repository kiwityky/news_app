"use strict";
//9.Thay đổi thiết lập
//Truy cập vào các ô input và các tag HTML
const newsPerPageInput = document.getElementById("input-page-size");
const categoryInput = document.getElementById("input-category");
//Tạo nút
const saveBtn = document.getElementById("btn-submit");
//Thêm mảng todo và tình trạng đăng nhập
let settingArr = [];
let userCurrent = [];
let loginstatus = 0;
//Lấy dữ liệu đã được lưu userData trong localStorage
let keys = Object.keys(localStorage);
if (keys.includes("userCurrent")) {
  userCurrent = getFromStorage("userCurrent");
}
//Nút Save Settings
//Event
saveBtn.addEventListener("click", function SaveSetting(e) {
  if (keys.includes("loginstatus") && keys.includes("userCurrent")) {
    // Tạo Object userSetting gồm các value's input
    const userSetting = {
      nPP: newsPerPageInput.value,
      category: categoryInput.value,
    };
    //Validate dữ liệu trong các ô input:
    if (userSetting.nPP < 1) {
      alert("News per page must greater than or equal to 1!");
      return userSetting;
    }
    //Tạo hàm chuyển từ JS Object sang Class Instance
    function parseUser(userCurrent) {
      const user = new User(
        userCurrent[0].firstName,
        userCurrent[0].lastName,
        userCurrent[0].userName,
        userCurrent[0].password
      );
      user.NewsPerPage = userSetting.nPP;
      user.NewsCategory = userSetting.category;
      return user;
    }
    //Thêm cài đặt người dùng vào mảng
    settingArr.push(parseUser(userCurrent));
    //Lưu lại userData mới vào LocalStorage
    delStorage("userSetting");
    saveToStorage("userSetting", settingArr);
    //Chuyển đến trang news
    window.location.href = "../pages/news.html";
  } else {
    alert("You are not logged in!");
  }
});

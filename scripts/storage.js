"use strict";
//Lưu
function saveToStorage(Key, Value) {
  //Để lưu trữ nhiều giá trị vào một key cần chuyển mảng sang dạng json do localStorage chỉ lưu trữ dữ liệu dưới dạng chuỗi (string)
  const setjson1 = JSON.stringify(Value);
  localStorage.setItem(Key, setjson1);
}
//Hiện
function getFromStorage(Key) {
  //Ngược lại ở trên
  const getobject = JSON.parse(localStorage.getItem(Key));
  return getobject;
}
//Xóa
function delStorage(Key) {
  localStorage.removeItem(Key);
}

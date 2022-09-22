"use strict";
//1.Tạo Class User
class User {
  //Hàm khởi tạo
  constructor(firstName, lastName, userName, password) {
    // Khai báo các thuộc tính
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
  }
  //Khai báo phương thức
  //Lấy dữ liệu tin tức từ API
  async getNews(country, pagesize, page, category) {
    let response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&pagesize=${pagesize}&page=${page}&category=${category}&apiKey=ba230580b9124b7cac082c9c1867c053`
    );
    let data = await response.json();
    return data;
  }
  //Lọc dữ liệu tin tức từ API
  async searchNews(q, pagesize, page) {
    let response = await fetch(
      `https://newsapi.org/v2/everything?q=${q}&pagesize=${pagesize}&page=${page}&apiKey=ba230580b9124b7cac082c9c1867c053`
    );
    let data = await response.json();
    return data;
  }
}
//8. Tạo Class Task
class Task {
  //Hàm khỏi tạo
  constructor(task, owner, isDone) {
    // Khai báo các thuộc tính
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

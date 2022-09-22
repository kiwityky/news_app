"use strict";
//10.Tìm kiếm bài viết theo từ khóa
// Truy cập vào các tag HTML
const newsContainer = document.querySelector("#news-container");
const searchInput = document.getElementById("input-query");
//Tạo nút
const searchBtn = document.getElementById("btn-submit");

//Lấy dữ liệu đã được lưu userData trong localStorage
let userSetting = [];
let keys = Object.keys(localStorage);
if (keys.includes("userSetting")) {
  userSetting = getFromStorage("userSetting");
}
//9.Tạo liên kết với user setting để người dùng tùy chỉnh
let pagesize;
if (keys.includes("userSetting")) {
  pagesize = userSetting[0].NewsPerPage;
} else {
  pagesize = "5";
}
//Nút Search
//Event
searchBtn.addEventListener("click", function Search(e) {
  const q = searchInput.value;
  if (q === "") {
    alert("What are you searching for?");
    return q;
  }
  //Render tin tức
  const renderNews = function (news) {
    const html = `
  <div style="border: thin solid rgb(201, 197, 197)">
  <img
    src=${news.urlToImage}
    style="float: left; position: relative;
    top:10px;"
    width="300 px"
    height="170 px"
  />
  <h2 style="position: relative; top:10px; padding-left: 320px; margin-bottom: 10px; font-weight: 550; font-size: 20px">
  ${news.title}
  </h2>
  <p style="padding-left: 320px; font-size: 16px">${news.description}</p>
  </br>
  <a href=${news.url}
    ><button
      type="button"
      class="btn btn-primary"
      style="position: relative; left: 20px; margin-bottom: 40px;"
    >
      View
    </button></a
  >
</div>
<br />
    `;
    newsContainer.insertAdjacentHTML("beforeend", html);
  };
  //Tạo bảng tin
  new User().searchNews(q, pagesize, "1").then((data) => {
    let news = data.articles;
    for (let i = 0; i < news.length; i++) {
      renderNews(news[i]);
    }
  });

  //7.Chuyển trang cho các bài viết
  // Truy cập vào các tag HTML
  const pagenum = document.getElementById("page-num");
  //Tạo nút
  const prevBtn = document.getElementById("btn-prev");
  const nextBtn = document.getElementById("btn-next");
  //Quy luật của nút Previous lần đầu load
  let pageNumCurrent = Number(pagenum.innerHTML);
  if (Number(pagenum.innerHTML) === 1) {
    prevBtn.classList.add("invisible");
  }
  //Các nút
  //Event Previous
  prevBtn.addEventListener("click", function Previous(e) {
    //Chỉ cần nhấn nút prev thì next hiện lại
    nextBtn.classList.remove("invisible");
    if (Number(pagenum.innerHTML) === 2) {
      prevBtn.classList.add("invisible");
    }
    if (Number(pagenum.innerHTML) !== 1) {
      const x = (pageNumCurrent -= 1);
      pagenum.innerHTML = x;
      //Xóa nội dung trên trang tin tức ở lần tải trang liền trước
      newsContainer.innerHTML = "";
      //Tạo lại trang tin tức ứng với số thứ tự page
      new User().searchNews(q, pagesize, String(x)).then((data) => {
        let news = data.articles;
        for (let i = 0; i < news.length; i++) {
          renderNews(news[i]);
        }
      });
    }
  });
  //Event Next
  nextBtn.addEventListener("click", function Next(e) {
    const x = (pageNumCurrent += 1);
    pagenum.innerHTML = x;
    if (Number(pagenum.innerHTML) !== 1) {
      prevBtn.classList.remove("invisible");
    }
    //Xóa nội dung trên trang tin tức ở lần tải trang liền trước
    newsContainer.innerHTML = "";
    //Tạo lại trang tin tức ứng với số thứ tự page
    new User().searchNews(q, pagesize, String(x)).then((data) => {
      let news = data.articles;
      for (let i = 0; i < news.length; i++) {
        renderNews(news[i]);
      }
      if (data.totalResults <= Number(pagesize) * x) {
        nextBtn.classList.add("invisible");
      }
    });
  });
});

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};
let allbuttons = document.querySelectorAll(".navigation ul li");
let alldivision = document.querySelectorAll(".allRequestDiv");

// by default allproduct division must be displayed
alldivision[0].style.display = "flex";

for (let i = 0; i < allbuttons.length; i++) {
  allbuttons[i].addEventListener("click", () => {
    for (let k = 0; k < alldivision.length; k++) {
      alldivision[k].style.display = "none"; // hide all divisions
    }
    let sectionId = allbuttons[i]
      .querySelector("span.admin-title")
      .innerText.toLowerCase();
    let section = document.getElementById(sectionId);
    if (section) {
      section.style.display = "flex"; // show the corresponding division if it exists
    }
  });
}

// upload image
const selectImage = document.querySelector(".select-image");
const inputFile = document.querySelector("#file");
const imgArea = document.querySelector(".img-area");

selectImage.addEventListener("click", function () {
  inputFile.click();
});

inputFile.addEventListener("change", function () {
  const image = this.files[0];
  if (image.size < 2000000) {
    const reader = new FileReader();
    reader.onload = () => {
      const allImg = imgArea.querySelectorAll("img");
      allImg.forEach((item) => item.remove());
      const imgUrl = reader.result;
      const img = document.createElement("img");
      img.src = imgUrl;
      imgArea.appendChild(img);
      imgArea.classList.add("active");
      imgArea.dataset.img = image.name;
    };
    reader.readAsDataURL(image);
  } else {
    alert("Image size more than 2MB");
  }
});

const addBlogBtn = document.querySelector("#addblogbtn");
const listtBlogs = document.querySelector(".listBlogs");

const addBlog = document.querySelector(".addBlog");
addBlogBtn.addEventListener("click", () => {
  listtBlogs.style.display = "none";
  addBlog.style.display = "block";
});

// add projects
const addprojectBtn = document.querySelector("#addprojectbtn");
const listtProject = document.querySelector(".listprojects");
const addProject = document.querySelector(".addProject");
addprojectBtn.addEventListener("click", () => {
  listtProject.style.display = "none";
  addProject.style.display = "block";
});

// profile popup

const profileAdmin = document.getElementById("prof-user-img");
const subMenuWrap = document.querySelector(".sub-menu-wrap");
profileAdmin.addEventListener("click", () => {
  subMenuWrap.classList.toggle("open-menu");
});

const showQueries = () => {
  var queriesList;
  if (localStorage.getItem("queriesList") == null) {
    queriesList = [];
  } else {
    queriesList = JSON.parse(localStorage.getItem("queriesList"));
  }
  var html = "";
  queriesList.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.email + "</td>";
    html += "<td>" + element.message + "</td>";
    html += `<td class="msgActions">
    <span class="delete-action" onclick="deleteComment(${index})"
      ><ion-icon name="trash-outline"></ion-icon
    ></span>
  </td>`;
    html += "</tr>";
  });

  var html2 = "";
  queriesList.forEach((element) => {
    html2 += `<tr>
    <td>
      <h4>
        ${element.email} <br />
        <span
          >${element.message}
        </span>
      </h4>
    </td>
  </tr>`;
  });

  document.querySelector("#adminContactList tbody").innerHTML = html;
  document.querySelector("#recentMessageTopTable").innerHTML = html2;
};
showQueries();
window.onload = showQueries; // Assigning the function directly to window.onload

// delete comment
const deleteComment = (index) => {
  var queriesList = JSON.parse(localStorage.getItem("queriesList"));
  queriesList.splice(index, 1);
  localStorage.setItem("queriesList", JSON.stringify(queriesList));
  showQueries();
};

const blogAddFormValidation = () => {
  const form = document.forms["add-blog-form"];
  const title = form["title"].value;
  const content = document.querySelector("#editor p").textContent;

  if (title == "") {
    return "Title can't be blank!";
  }
  if (content == "") {
    return "Content can't be blank!";
  }
  return true;
};
const addBlogError = document.getElementById("addBlogError");
//save blog function
const saveNewBlog = () => {
  const validationResult = blogAddFormValidation();

  if (validationResult === true) {
    // get blogs from local storage
    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const form = document.forms["add-blog-form"];

    //get form values
    const title = form["title"].value;
    const poster =
      document.querySelector("#file").files.length > 0
        ? document.querySelector("#file").files[0].name
        : null;
    const content = document.querySelector("#editor").innerHTML; // Changed this line

    //add new blog to blogs array
    const newBlog = {
      id: blogs.length + 1,
      title: title,
      poster: poster,
      content: content,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }),
      comments: [],
      views: 0,
      likes: 0,
      isLiked: false,
      isActive: false,
    };

    blogs.push(newBlog);

    //update localStorage blogs
    localStorage.setItem("blogs", JSON.stringify(blogs));
    form["title"].value = "";
    document.querySelector("#editor").innerHTML = ""; // Changed this line
    addBlogError.textContent = "Blog added successfully!";
    addBlogError.style.backgroundColor = "green";
    addBlogError.style.display = "block";
  } else {
    addBlogError.textContent = validationResult;
    addBlogError.style.backgroundColor = "red";
    addBlogError.style.display = "block";
  }
};

const saveBlogButton = document.getElementById("addBlogBtn");

saveBlogButton.addEventListener("click", saveNewBlog);

const dashboardDisplayBlogs = () => {
  const table = document.querySelector(".listBlogs table tbody");
  const recentTeble = document.querySelector("#dashboardRecentBlog tbody");
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  let html = "";
  let html2 = "";
  blogs.forEach((element, index) => {
    html += "<tr>";
    html += "<td>" + element.date + "</td>";
    html += "<td>" + element.title + "</td>";
    if (element.isActive) {
      html += "<td>" + "Active" + "</td>";
    } else {
      html += "<td>" + "Pending" + "</td>";
    }
    html += `<td class='actions'> 
      <span class='update-action'> 
      <ion-icon name='sync-circle-outline' onclick='updateBlog(${index})'> 
      </ion-icon> 
      </span> 
      <span class='delete-action'> 
      <ion-icon name='trash-outline' onclick='deleteBlog(${index})'> 
      </ion-icon> 
      </span> 
      </td>`;
    html += "</tr>";
  });
  blogs.forEach((element) => {
    html2 += "<tr>";
    html2 += "<td>" + element.date + "</td>";
    html2 += "<td>" + element.title + "</td>";
    if (element.isActive) {
      html2 += "<td>";
      html2 += `<span class="status active"> active </span>`;

      html2 += "</td>";
    } else {
      html2 += "<td>";
      html2 += `<span class="status panding"> Pending </span>`;

      html2 += "</td>";
    }
    html += "</tr>";
  });
  table.innerHTML = html;
  recentTeble.innerHTML = html2;
};
window.onload = dashboardDisplayBlogs;

// delete Blog
let currentDeleteIndex = 0;
const deleteBlog = (index) => {
  modal.style.display = "block";
  currentDeleteIndex = index;
};

// delete box

var modal = document.querySelector(".modal");
var deleteAction = document.querySelector(".del");
var span = document.querySelector(".close");
deleteAction.addEventListener("click", () => {
  const blogs = JSON.parse(localStorage.getItem("blogs"));
  blogs.splice(currentDeleteIndex, 1);
  localStorage.setItem("blogs", JSON.stringify(blogs));
  dashboardDisplayBlogs();
});

span.addEventListener("click", () => {
  hideModal();
});
function hideModal() {
  modal.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == modal) {
    hideModal();
  }
};

// update blog
const textToChange = document.getElementById("textToChange");
const updateButton = document.getElementById("updateBlogBtn");
document.getElementById("addBlogBtn");
const title = document.getElementById("title");
const content = document.getElementById("editor");
let currentUpdateIndex = 0;
const blogs = JSON.parse(localStorage.getItem("blogs"));

const updateBlog = (index) => {
  listtBlogs.style.display = "none";
  textToChange.textContent = "Update Blog";
  addBlog.style.display = "block";
  addBlogBtn.textContent = "update";
  saveBlogButton.style.display = "none";
  updateButton.style.display = "inline";
  title.value = blogs[index].title;
  content.innerHTML = blogs[index].content;
  currentUpdateIndex = index;
  console.log(index);
};
updateButton.addEventListener("click", () => {
  if (blogAddFormValidation() == true) {
    blogs[currentUpdateIndex].title = title.value;
    blogs[currentUpdateIndex].content = content.innerHTML;
    blogs[currentUpdateIndex].date = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
    localStorage.setItem("blogs", JSON.stringify(blogs));
    addBlogError.textContent = "Blog update successfully!";
    addBlogError.style.backgroundColor = "green";
    addBlogError.style.display = "block";
    title.value = "";
    content.innerHTML = "";
  } else {
    addBlogError.textContent = blogAddFormValidation();
    addBlogError.style.backgroundColor = "red";
    addBlogError.style.display = "block";
  }
});

const totalNumberOfArticles = () => {
  const articles = document.querySelector("#articlesNumber");
  articles.textContent = blogs.length;
};
totalNumberOfArticles();

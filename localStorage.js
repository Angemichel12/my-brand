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

// update blog
const updateBtnAction = document.querySelector(".update-action");
const updatetext = document.querySelector(".addBlog .cardHeader h2");
const updateSubmitBtn = document.querySelector("#btnUpdate");
updateBtnAction.addEventListener("click", () => {
  listtBlogs.style.display = "none";
  addBlog.style.display = "block";
  updatetext.textContent = "Update blog";
  updateSubmitBtn.textContent = "update";
});

// profile popup

const profileAdmin = document.getElementById("prof-user-img");
const subMenuWrap = document.querySelector(".sub-menu-wrap");
profileAdmin.addEventListener("click", () => {
  subMenuWrap.classList.toggle("open-menu");
});

// delete box

var modal = document.querySelector(".modal");
var deleteAction = document.querySelector(".delete-action");
var span = document.querySelector(".close");
deleteAction.addEventListener("click", () => {
  modal.style.display = "block";
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
    <span class="update-action"
      onclick="updateComment(${index})"><ion-icon name="sync-circle-outline"></ion-icon></span
    ><span class="delete-action" onclick="deleteComment(${index})"
      ><ion-icon name="trash-outline"></ion-icon
    ></span>
  </td>`;
    html += "</tr>";
  });
  var html2 = "";
  queriesList.forEach(function (element, index) {
    html2 += "<tr>";
    html2 += "<td>";
    html2 += "<h4>";
    html2 += "John Doe";
    html2 += "<br/>";
    html2 += "<span>" + "Hello" + "</span>";
    html2 += "</h4>";
    html2 += "</td>";
    html2 += "</tr>";
  });

  document.querySelector("#adminContactList tbody").innerHTML = html;
};

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

//save blog function
const saveNewBlog = () => {
  const validationResult = blogAddFormValidation();
  const addBlogError = document.getElementById("addBlogError");

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
    const content = document.querySelector("#editor p").textContent;

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
      isViewed: false,
    };

    blogs.push(newBlog);

    //update localStorage blogs
    localStorage.setItem("blogs", JSON.stringify(blogs));
    form["title"].value = "";
    document.querySelector("#editor p").textContent = "";
    addBlogError.textContent = "Blog added successfully!";
    addBlogError.style.backgroundColor = "green";
    addBlogError.style.display = "block";
  } else {
    addBlogError.textContent = validationResult;
    addBlogError.style.backgroundColor = "red";
    addBlogError.style.display = "block";
  }
};

const saveBlogButton = document.getElementById("btnUpdate");
saveBlogButton.addEventListener("click", saveNewBlog);

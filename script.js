function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// add hovered class to selected list item

let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}
list.forEach((item) => item.addEventListener("mouseover", activeLink));

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

// login validation
let errorlog;
function validateForm() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  if (username == null || username === "") {
    errorlog = "UserName can't be blank";
  } else if (password.length < 6) {
    paragraph.textContent = "Password must be at least 6 characters long.";
  } else if (!validatePassword(password)) {
    errorlog =
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";
  } else if (username != "Michel" || password != "Admin@123") {
    errorlog = "Wrong username or password";
  }
}

const errpar = document.getElementById("alert");
errpar.textContent = errorlog;

function validatePassword(password) {
  var regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return regex.test(password);
}

// addBlog Form validation
var paragraph = document.getElementById("alert");
let error = "";
const addBlogFormValidation = () => {
  const addBlogTitle = document.getElementById("title").value;
  const addBlogRichText = document.getElementById("editor").textContent;
  if (addBlogTitle == null || addBlogTitle === "") {
    paragraph.textContent = "title can not be black!!";
    return false;
  } else if (addBlogRichText == null || addBlogRichText === "") {
    paragraph.textContent = "Blog Description can't be Black!";
    return false;
  } else {
    paragraph.textContent = "Blog is successfull Added!";
  }
};

// Subscribe form validation

function subvalidateForm() {
  var firstName = document.getElementById("subFirstName").value.trim();
  var lastName = document.getElementById("subLastName").value.trim();
  var email = document.getElementById("subEmail").value.trim();

  // Check if first name is empty
  if (firstName === "") {
    alert("Please enter your first name.");
    return false;
  }

  // Check if last name is empty
  if (lastName === "") {
    alert("Please enter your last name.");
    return false;
  }

  // Check if email is empty
  if (email === "") {
    alert("Please enter your email address.");
    return false;
  }

  // Check if email is valid
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }
}

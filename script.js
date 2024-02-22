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

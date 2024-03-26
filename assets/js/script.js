function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// contact form validation
function contactFormValidation() {
  const contactEmail = document.getElementById("contactEmail").value;
  const contactMessage = document.getElementById("message").value;
  if (contactEmail == "") {
    return "E-mail Can't be blank!";
  }
  if (!contactEmail.includes("@")) {
    return "Invalid Email!";
  }
  if (contactMessage == "") {
    return "Message Can't be blank!";
  }
  return true;
}

// add contact
var addContactMessage = document.getElementById("add-contact-message");
var contactError = document.getElementById("contactError");

addContactMessage.addEventListener("click", () => {
  var validationResult = contactFormValidation();
  if (validationResult === true) {
    let contactEmail = document.getElementById("contactEmail");
    let contactMessage = document.getElementById("message");
    var queriesList;
    if (localStorage.getItem("queriesList") == null) {
      queriesList = [];
    } else {
      queriesList = JSON.parse(localStorage.getItem("queriesList"));
    }
    queriesList.push({
      email: contactEmail.value,
      message: contactMessage.value,
    });
    localStorage.setItem("queriesList", JSON.stringify(queriesList));
    contactEmail.value = "";
    contactMessage.value = "";
    contactError.textContent = "Form submitted successfully!";
    contactError.style.backgroundColor = "green";
    contactError.style.display = "block";
  } else {
    contactError.textContent = validationResult;
    contactError.style.backgroundColor = "red";
    contactError.style.display = "block";
  }
});

const displayBlogs = async () => {
  // Fetch the blogs from the API
  const response = await fetch(
    "https://mybrand-restapi.onrender.com/api/v1/blogs/"
  );
  const blogs = await response.json();
  const blogsData = blogs.data;

  // Get only the last three blogs
  const lastThreeBlogs = blogsData.slice(Math.max(blogs.length - 3, 0));

  // Get the container where the blogs will be appended
  const blogContainer = document.getElementById("blogContainer");

  // Iterate over the last three blogs and create the HTML for each blog
  lastThreeBlogs.forEach((blog, index) => {
    const date = new Date(blog.updatedAt);
    const formattedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    const blogCard = `
      <div class="card">
        <div class="card-header">
          <img src="${blog.image}" alt="blog poster" />
        </div>
        <div class="card-body flex-center flex-column">
          <span class="tag tag-teal">Technology</span>
          <h4>
            <a href="./detail/detail.html?index=${
              blog._id
            }" class="blog-link-detail">${blog.title}</a>
          </h4>
          <div>${blog.content.split(" ").slice(0, 20).join(" ")}</div>
          <div class="card-info-section flex-space-between gap-2">
            <div class="user">
              <div class="user-info">
                <h5>${blog.author.name}</h5>
                <small>${formattedDate}</small>
              </div>
            </div>
            <div class="like-comment">
              <img src="assets/icons/icons8-heart-50 (1) 1.png" alt="" class="blog-icon" /><span>${
                blog.likes
              }</span>
              <img src="assets/icons/icons8-comment-100.png" alt="" class="blog-icon" /><span>${
                blog.comments.length
              }</span>
            </div>
          </div>
        </div>
      </div>
    `;

    // Append the blog card to the container
    blogContainer.innerHTML += blogCard;
  });
};

// Call the function when the page loads
window.onload = displayBlogs;

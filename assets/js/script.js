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

function displayBlogs() {
  // Get the blogs from localStorage
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

  // Get only the last three blogs
  const lastThreeBlogs = blogs.slice(Math.max(blogs.length - 3, 0));

  // Get the container where the blogs will be appended
  const blogContainer = document.getElementById("blogContainer");

  // Iterate over the last three blogs and create the HTML for each blog
  lastThreeBlogs.forEach((blog, index) => {
    const blogCard = `
      <div class="card">
        <div class="card-header">
          <img src="./assets/upload/${blog.poster}" alt="blog poster" />
        </div>
        <div class="card-body flex-center flex-column">
          <span class="tag tag-teal">Technology</span>
          <h4>
            <a href="./detail/detail.html?index=${index}" class="blog-link-detail">${
      blog.title
    }</a>
          </h4>
          <p>${blog.content.split(" ").slice(0, 20).join(" ")}</p>
          <div class="card-info-section flex-space-between gap-2">
            <div class="user">
              <img src="https://lh3.googleusercontent.com/ogw/ADGmqu8sn9zF15pW59JIYiLgx3PQ3EyZLFp5Zqao906l=s32-c-mo" alt="user" />
              <div class="user-info">
                <h5>John doe</h5>
                <small>${blog.date}</small>
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
}

// Call the function when the page loads
window.onload = displayBlogs;

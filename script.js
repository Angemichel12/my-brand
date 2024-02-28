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
            <a href="detail.html?index=${index + 1}" class="blog-link-detail">${
      blog.title
    }</a>
          </h4>
          <p>${blog.content}</p>
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

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Retrieve index of the clicked blog from URL query parameter
const blogIndex = getQueryParam("index");

// Retrieve blogs from localStorage
const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

// Function to display detailed information of the clicked blog
function displayBlogDetail() {
  const blogDetail = document.getElementById("blog-detail");
  blogDetail.innerHTML = "";

  const blog = blogs[blogIndex];

  const blogDetailItem = document.createElement("div");
  blogDetailItem.innerHTML = `
      <div>
      <h1 class="single__blog-title blog-p-y blog-bold">${blog.title}</h1>
      <p class="single__blog-info blog-p-y">
        By <span class="blog-bold">Michel</span> | February/ 12/ 2024 . 4 min
        read
      </p>
      <div class="single__blog-img">
        <img src="assets/upload/${blog.poster}" alt="blog1 image" class="blog-p-y" />
      </div>
      <p class="blog-description blog-p-y">${blog.content}</p>
      </div>
  `;
  blogDetail.appendChild(blogDetailItem);
}

// Call displayBlogDetail function to display detailed information of the clicked blog
displayBlogDetail();

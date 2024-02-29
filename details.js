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
window.onload = displayBlogDetail;

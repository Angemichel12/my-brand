function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Retrieve index of the clicked blog from URL query parameter
const blogIndex = getQueryParam("index");

// Retrieve blogs from localStorage
const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

// Function to display detailed information of the clicked blog
const displayBlogDetail = async () => {
  const blogDetail = document.getElementById("blog-div-detail");
  blogDetail.innerHTML = "";
  const commentList = document.getElementById("commentsList");

  const res = await fetch(
    `https://mybrand-restapi.onrender.com/api/v1/blogs/${blogIndex}`
  );
  const blog = await res.json();
  console.log(blog);

  if (!blog) {
    console.error("Blog not found");
    return;
  }

  const blogDetailItem = document.createElement("div");
  blogDetailItem.innerHTML = `
      <div>
      <h1 class="single__blog-title blog-p-y blog-bold">${blog.title}</h1>
      <p class="single__blog-info blog-p-y">
        By <span class="blog-bold">Michel</span> | ${blog.updatedAt} . 4 min
        read
      </p>
      <div class="single__blog-img">
        <img src="${blog.image}" alt="blog1 image" class="blog-p-y" />
      </div>
      <div class="blog-description blog-p-y">${blog.content}</div>
      </div>
  `;
  blog.comments.forEach((commentObj) => {
    const commentElement = document.createElement("div");
    commentElement.innerHTML = `<p class="detail-fullname">${commentObj[0]}:</p> <p class="detail-comment">${commentObj.comment}</p>`;
    commentList.appendChild(commentElement);
  });
  blogDetail.appendChild(blogDetailItem);
};

document
  .getElementById("comment-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Retrieve the fullname and comment from the form
    const fullname = document.getElementById("fullname").value;
    const comment = document.getElementById("comment").value;

    // Retrieve the blog from local storage
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const blog = blogs[blogIndex];

    if (!blog) {
      console.error("Blog not found");
      return;
    }

    // Add the new comment to the blog's comments array
    blog.comments.push({ fullname, comment });

    // Update the blog in local storage
    blogs[blogIndex] = blog;
    localStorage.setItem("blogs", JSON.stringify(blogs));

    // Clear the comment form
    document.getElementById("fullname").value = "";
    document.getElementById("comment").value = "";

    // Update the blog detail on the page
    displayBlogDetail();
  });
displayBlogDetail();

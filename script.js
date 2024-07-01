// scriptblog.js

// Function to fetch and load blog posts
function loadBlogPosts() {
    fetch('blogPosts.json')
      .then(response => response.json())
      .then(posts => {
        if (window.location.pathname.includes('page_blog_list.html')) {
          displayBlogPosts(posts);
        } else if (window.location.pathname.includes('page_blog_post.html')) {
          handleBlogPostClick(posts);
        }
      })
      .catch(error => console.error('Error loading blog posts:', error));
  }
  
  // Function to display blog posts on the page_blog_list.html page
  function displayBlogPosts(posts) {
    const blogPostsContainer = document.getElementById('blog-posts');
    blogPostsContainer.innerHTML = ''; // Clear previous content
  
    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post-summary');
      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <img src="${post.image}" alt="${post.title} Image">
        <p>${post.content.substring(0, 100)}...</p>
        <a href="page_blog_post.html?key=${post.key}">Read More</a>
      `;
  
      blogPostsContainer.appendChild(postElement);
    });
  }
  
  // Function to handle click on blog post link and navigate to detailed view
  function handleBlogPostClick(posts) {
    const queryParams = new URLSearchParams(window.location.search);
    const key = queryParams.get('key');
  
    if (key) {
      const selectedPost = posts.find(post => post.key === key);
      if (selectedPost) {
        displayBlogPostDetail(selectedPost);
      } else {
        displayBlogPostNotFound();
      }
    } else {
      displayBlogPostNotFound();
    }
  }
  
  // Function to display blog post detail on page_blog_post.html
  function displayBlogPostDetail(post) {
    const blogPostContainer = document.getElementById('blog-post');
  
    blogPostContainer.innerHTML = `
      <h2>${post.title}</h2>
      <p class="post-meta">Published on ${new Date(post.created_at).toLocaleDateString()} by ${post.author}</p>
      <div class="post-content">
        ${post.content}
        <img src="${post.image}" alt="${post.title} Image">
      </div>
    `;
  }
  
  // Function to display message when blog post is not found
  function displayBlogPostNotFound() {
    const blogPostContainer = document.getElementById('blog-post');
    blogPostContainer.innerHTML = `<p>Blog post not found.</p>`;
  }
  
  // Check if we're on the page_blog_list.html or page_blog_post.html page and load blog posts accordingly
  if (window.location.pathname.includes('page_blog_list.html') || window.location.pathname.includes('page_blog_post.html')) {
    loadBlogPosts();
  }
  
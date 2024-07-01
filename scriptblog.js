// scriptblog.js

// Function to fetch and load blog posts from JSON file
function fetchBlogPosts() {
    return fetch('blogPosts.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching blog posts:', error);
        return [];
      });
  }
  
  // Function to display blog posts on the blog list page (page_blog_list.html)
  function displayBlogList(posts) {
    const blogPostsContainer = document.getElementById('blog-posts');
    blogPostsContainer.innerHTML = ''; // Clear previous content
  
    posts.forEach(post => {
      const postElement = createPostElement(post);
      blogPostsContainer.appendChild(postElement);
    });
  }
  
  // Function to create HTML element for a blog post summary
  function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('post-summary');
    postElement.innerHTML = `
      <h2>${post.title}</h2>
      <img src="${post.image}" alt="${post.title} Image">
      <p>${post.content.substring(0, 100)}...</p>
      <a href="page_blog_post.html?key=${post.key}">Read More</a>
    `;
    return postElement;
  }
  
  // Function to display blog post detail on the blog post page (page_blog_post.html)
  function displayBlogPostDetail(posts) {
    const queryParams = new URLSearchParams(window.location.search);
    const key = queryParams.get('key');
  
    if (key) {
      const selectedPost = posts.find(post => post.key === key);
      if (selectedPost) {
        renderBlogPost(selectedPost);
      } else {
        displayBlogPostNotFound();
      }
    } else {
      displayBlogPostNotFound();
    }
  }
  
  // Function to render blog post detail
  function renderBlogPost(post) {
    const blogPostContainer = document.getElementById('blog-post');
    blogPostContainer.innerHTML = `
      <article class="blog-post">
        <h2>${post.title}</h2>
        <p class="post-meta">Published on ${new Date(post.created_at).toLocaleDateString()} by ${post.author}</p>
        <div class="post-content">
          ${post.content}
          <img src="${post.image}" alt="${post.title} Image">
        </div>
      </article>
    `;
  }
  
  // Function to display message when blog post is not found
  function displayBlogPostNotFound() {
    const blogPostContainer = document.getElementById('blog-post');
    blogPostContainer.innerHTML = `<p>Blog post not found.</p>`;
  }
  
  // Initialization function to determine page type and load appropriate content
  function initializeBlog() {
    const isBlogListPage = window.location.pathname.includes('page_blog_list.html');
    const isBlogPostPage = window.location.pathname.includes('page_blog_post.html');
  
    if (isBlogListPage || isBlogPostPage) {
      fetchBlogPosts().then(posts => {
        if (isBlogListPage) {
          displayBlogList(posts);
        } else if (isBlogPostPage) {
          displayBlogPostDetail(posts);
        }
      });
    }
  }
  
  // Call the initialization function when the page is loaded
  document.addEventListener('DOMContentLoaded', initializeBlog);
  
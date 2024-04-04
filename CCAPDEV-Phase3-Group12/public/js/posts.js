// FRONT-END JS For Posts view
const postBtn = document.getElementById("postBtn");
const postForm = document.forms.postForm;

postBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log('click'); 
    // Retrieves form data send POST request to `/post`
    const data = new FormData(postForm); // Retrieve data from postform
    const jstring = JSON.stringify(Object.fromEntries(data)); // convert formdata to js object, then stringify
    console.log(jstring);

    try {
        const response = await fetch('/posts', {
            method: 'POST',
            body: jstring,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(response);

        // Handle response based on statuscode
        if (response.status == 200) {
            location.reload(); // refresh the page
        } else {
            const message = `An error has occured. Status code: ${response.status}`;
            alert(message);
            console.log(message);
        }
    } catch (err) {
        console.error(err);
    }
});

// Search Feature Segment 

const searchInput = document.querySelector('#searchOptions_dropdown input[type="text"]');
const searchResults = document.querySelector('#searchOptions_dropdown.searchResults');
let currentFilter = null;  

// Function to set the current filter
function setFilter(filter) {
    currentFilter = filter;
    filterPosts();
}

// Function to filter the posts based on the current filter
function filterPosts() {
    const posts = document.querySelectorAll('#searchOptions_dropdown.post');
    const searchQuery = searchInput.value.toLowerCase();

  // Loop through all the posts, and filter based on the search query and current filter
posts.forEach((post) => {
    const postContent = post.querySelector('.post-content p').innerText.toLowerCase();
    const postUsername = post.querySelector('.post-userInfo.post-username').innerText.toLowerCase();
    const postTimestamp = post.querySelector('.post-timestamp').innerText.toLowerCase();

    if (currentFilter === 'TopPost' &&!post.classList.contains('top-post')) {
    post.style.display = 'none';
    } else if (currentFilter === 'latestPost' &&!post.classList.contains('latest-post')) {
    post.style.display = 'none';
    } else if (searchQuery &&!postContent.includes(searchQuery) &&!postUsername.includes(searchQuery)) {
    post.style.display = 'none';
    } else {
    post.style.display = 'block';
    }
});
}

// Listen for changes to the search input
searchInput.addEventListener('input', filterPosts);

// Listen for clicks on the filter links
document.querySelectorAll('#searchOptions_dropdown.filter-option').forEach((filterLink) => {
    filterLink.addEventListener('click', (event) => {
    event.preventDefault();
    setFilter(event.target.innerText);
    });
});
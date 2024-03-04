// Hardcoded database
var database = [
    { id: 1, tag: 'Science', community: 'Research' },
    { id: 2, tag: 'Technology', community: 'Tech Enthusiasts' },
    { id: 3, tag: 'Books', community: 'Book Lovers' },
    // Add more data as needed
];

// Handle form submission
$('#searchForm').submit(function (event) {
    event.preventDefault();

    // Get search parameters
    var searchTerm = $('#search').val();
    var searchBy = $('#search_by').val();

    // Filter data based on search parameters
    var results = database.filter(function (item) {
        return item[searchBy].toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Handle the results (you can update the UI as needed)
    console.log(results);
});


//Display Post
// Hardcoded database
var posts = [
    { id: 1, title: 'Post 1', content: 'Content for post 1...', tag: 'Science' },
    { id: 2, title: 'Post 2', content: 'Content for post 2...', tag: 'Technology' },
    { id: 3, title: 'Post 3', content: 'Content for post 3...', name: 'John Doe' },
    // Add more data as needed
];

// Handle search button click
$('#searchButton').click(function () {
    // Get search term
    var searchTerm = $('#search').val();

    // Filter posts based on search term
    var matchingPosts = posts.filter(function (post) {
        return post.tag.toLowerCase().includes(searchTerm.toLowerCase()) || post.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Display matching posts
    displayPosts(matchingPosts);
});

// Validation

// Follow Check


// Display posts
function displayPosts(posts) {
    // Clear previous posts
    $('#postsContainer').empty();

    // Loop through posts
    posts.forEach(function (post) {
        // Create post container
        var postContainer = $('<div class="post"></div>');

        // Add post title
        var postTitle = $('<h2></h2>').text(post.title);
        postContainer.append(postTitle);

        // Add post content
        var postContent = $('<p></p>').text(post.content);
        postContainer.append(postContent);

        // Add post tag or name
        var postTag = $('<p></p>').text('Tag: ' + post.tag);
        var postName = $('<p></p>').text('Author: ' + post.name);
        if (post.tag) {
            postContainer.append(postTag);
        } else {
            postContainer.append(postName);
        }

        // Add post container to page
        $('#postsContainer').append(postContainer);
    });
}
# CCAPDEV_MachineProjects

# Topic: Forum Web Application
highlighted for Topic: comments
1. View all posts - 15-20 most recent posts
	2. choice to make auto-load or go to another page
	3. clicking the post will let you view post (8)
	4. The user may also see the most popular post based on a calculated ranking
2. Register - needed for ability to post/comment
	1. ==need to decide if non-logged in users can view posts==
3. View user Profile - username, pfp, short description, latest posts and comments
4. Edit Profile - change pfp, change description (can be empty)
5. Login/Logout
	1. every login extends the "remember" period by 3 weeks (21 days)
	2. logout cuts the "remember" period and clears session-related data
6. Make a post (additional points for markup)
	1. needs title, body
	2. ==let's add hashtags so we can implement (7)==
7. Tags/Communities
	1. posts are categorized under tags OR a community based on theme (choose one)
	2. ==let's do tags please==
8. View SINGLE post - if you have the link; shows title, body, and comments
	1. user can also view posts by tag/community
9. Comment - user can comment on any post including own
	1. comments nest indefinitely
	2. ==we can add like a feature to hide comments (Instagram)==
10. Edit/Delete post - can edit or delete own posts at any time
	1. need indication for editing
	2. ==suggestion:== if viewed on the same day, put HH:MM but if viewed on another day, put Month Day, Year HH:MM
11. Edit/Delete Comment - can edit or delete own comments at any time
	1. need indication for editing, same suggestion above
12. Upvote/Downvote (including your own)
	1. ==indicates popularity stack (1), if they have the same amount of up/downvotes put the most recent one on top==
13. Search - search for posts based on similarities in the title/body or by phrase/word
	1. ==IDK WHAT THIS MEANS==: The user may limit their search on posts with certain tags or posts from a certain community.
14. General: Good UX for ease-of-use, cohesiveness, consistency
	1. ==do you guys want to have a light mode and dark mode?==

# Pages to make (for member division)
note: divide into frontend/backend phase later on
1. Login/Register Page (2, 5)
	1. Wrong password (keep last email inputted, not needed)
	2. Account does not exist
	3. Register Page
2. Feed view (default is most recent, newer posts at the top) (1, 6, 7, 8, 9, 10, 11, 12)
	1. Popular Tab
3. Search View (7, 13)
	1. Empty Page
	2. Page with Results by word or phrase
	3. Search by ``#tag``
4. Profile View (3, 4)
	1. Posts Section (all posts made by user, not in reply to others?)
	2. Comments Section (shows post commented on and user's reply under it)
	3. Change Details View (if user is logged in)

# Notes
- ==store== all the colors in ``:root`` for global access
```css
:root {
  --primary-color: #007bff; /* blue */
  --secondary-color: #6c757d; /* gray */
  --font-size: 16px;
  --padding: 10px;
  --main-font: 'Arial', sans-serif;
  --border-width: 2px;
  --spacing: 20px;
  --background-image: url('path/to/image.jpg');
}
```
- hamburger menu icon (3 lines) is different from dropdown menu (3 dots)
- ==(7, 13)== to categorize posts and comments for profile view, we can have a hidden "tag" 
- allow auto-fill usage ==(to look into)==
- Frutiger Aero design is funny as hell
- Pastel Themes: https://www.instagram.com/uiuxcreative/p/C1rj1rGMNeB/
- Dark Theme Suggestion: https://www.nordtheme.com/, https://www.nordtheme.com/docs/usage
## Other site features
- icons on hover: change color or brightness
# Websites and things that stand out
1. [Twitter](https://www.x.com/) - simple icons on the side, create post through button below icons
	1. Alt: [Bluesky](https://bsky.app/)
2. [Mastodon](https://mastodon.social/) - flat colors (easy on the eyes), search bar on left div
3. [RateYourMusic](https://rateyourmusic.com/) - all navigation and profile access on top bar
4. Steam Community
	1. ([Guides Page](https://steamcommunity.com/app/1623730/guides/)) - popular categories are in a grid (note: can be used for community)
	2. ([Profile Layout](https://steamcommunity.com/id/clavzno/)) - picture on the side, username next to picture, description under (same as bio page hw)
5. Old Facebook - has a copy link function, online users are on the right side
6. Current [Facebook](https://www.facebook.com/) - posts have a drop down menu per post on top right: save
8. [Threads](https://www.threads.net/) - posts, replies, and reposts are separated into columns
9. All - site icon on the top left

---

Facebook Font
https://www.designyourway.net/blog/what-font-does-facebook-use/

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Orienta&family=Ruda:wght@400..900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
```

```css
.orienta-regular {
  font-family: "Orienta", sans-serif;
  font-weight: 400;
  font-style: normal;
}
// <uniquifier>: Use a uniquifier for the class name
// <weight>: Use a value from 100 to 900

.work-sans-<uniquifier> {
  font-family: "Work Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: <weight>;
  font-style: normal;
}
// <uniquifier>: Use a uniquifier for the class name
// <weight>: Use a value from 400 to 900

.ruda-<uniquifier> {
  font-family: "Ruda", sans-serif;
  font-optical-sizing: auto;
  font-weight: <weight>;
  font-style: normal;
}
```
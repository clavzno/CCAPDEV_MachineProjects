Last Edited: 2024-02-26 4:48pm
# Sprite Generator
https://www.toptal.com/developers/css/sprite-generator

# Sprites
Home: https://icons8.com/icon/83326/home
Create New Post: https://icons8.com/icon/mjhvSYS9KNQQ/post

Like: https://icons8.com/icon/85608/thumbs-up
Dislike: https://icons8.com/icon/87695/thumbs-down
Share: https://icons8.com/icon/90278/share
Comment: https://icons8.com/icon/82768/comments

Search: https://icons8.com/icon/82712/search
Clear Search: https://icons8.com/icon/84081/clear-search
Filter Posts: https://icons8.com/icon/85451/filter
Search Options: https://icons8.com/icon/83286/search-more

Feed: Login: https://icons8.com/icon/101589/login
Feed: Logout: https://icons8.com/icon/83256/login-rounded

Unfollow: https://icons8.com/icon/59142/remove-user-group-man-man
Follow: https://icons8.com/icon/85445/add-user-male

Edit Profile: https://icons8.com/icon/86373/edit
Profile: https://icons8.com/icon/85356/male-user

# Fonts - Google Fonts
```
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Orienta&family=Ruda:wght@400..900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
```
## Ruda - Headers (Logo, Page Name, Profile Display Name, Button Labels)
```
// <uniquifier>: Use a uniquifier for the class name
// <weight>: Use a value from 400 to 900
.ruda-<uniquifier> {
  font-family: "Ruda", sans-serif;
  font-optical-sizing: auto;
  font-weight: <weight>;
  font-style: normal;
}
```

## Orienta (@username, Post DateTime, )
```
.orienta-regular {
  font-family: "Orienta", sans-serif;
  font-weight: 400;
  font-style: normal;
}
```

## Work Sans (Descriptions, Post Text)
```
// <uniquifier>: Use a uniquifier for the class name
// <weight>: Use a value from 100 to 900
.work-sans-<uniquifier> {
  font-family: "Work Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: <weight>;
  font-style: normal;
}
```

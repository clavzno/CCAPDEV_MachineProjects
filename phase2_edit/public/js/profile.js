const editProfileDiv = document.getElementById('editProfile');

function closePopup(event) {
    //editProfileDiv.style.visibility = "hidden";
    event.preventDefault();
    editProfileDiv.remove();
}

function openPopup(event) {
    event.preventDefault();
    const editProfileDiv = document.createElement('div');
    editProfileDiv.id = 'editProfile';
    editProfileDiv.innerHTML = `
    <div class="editProfile fullscreen-overlay" id="editProfile">
    <div class="editProfileDialog">
        <h1 class="ruda-regular">Edit Profile</h1>
        <div class="editImages">
            <div class="headerPreview imagePreviews">
                <img src="../images/zappy.jpg" class="profile_images"/>
            </div>
            <div class="profilePicPreview imagePreviews">
                <img src="../images/lorem.jpg" class="profile_images" />
            </div>
        </div>
        <div class="editInfo">
            <form id="editProfileInfo" method="post">
                <label for="displayName" class="orienta-regular">Display Name</label> <br>
                <input name="displayName" type="text" class="textInput">
                <br><br>
                <label for="bio" class="orienta-regular">Bio</label> <br>
                <textarea name="bio" class="textInput" type="description"></textarea>
                <br><br>
                <button type="submit" class="importantButton" onclick="closePopup();">Save changes</button>
            </form>
        </div>
    </div>
    `
    document.body.appendChild(editProfileDiv);
    document.getElementById('editProfileInfo').addEventListener('submit', closePopup);
}
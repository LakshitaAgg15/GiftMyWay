
document.addEventListener("DOMContentLoaded", function () {
    // Get all links with class 'scroll-link'
    const scrollLinks = document.querySelectorAll('.scroll-link');

    // Add smooth scroll behavior to each link
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetID = link.getAttribute('href');
            document.querySelector(targetID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
});


// edit profile javascript


document.getElementById("editProfileForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const profilePhoto = document.getElementById("profilePhoto").files[0];

    // Log the details (for now) to confirm they're being collected
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone:", phone);
    if (profilePhoto) {
        console.log("Profile Photo:", profilePhoto.name);
    }

    // Here, you could add code to save the data to local storage, a database, or send it to an API
    alert("Profile updated successfully!");
});


// navbar
const menu = document.getElementById("menu");
const mobileMenu = document.getElementById("mobileMenu");
menu.addEventListener('click' , (e)=>{
      e.preventDefault()
        mobileMenu.classList.toggle("mobile-menu-active");
        menu.classList.toggle("fa-xmark");
        menu.classList.toggle("fa-bars");
})
// gift-wrapper   
document.addEventListener("DOMContentLoaded", function() {
  const track = document.querySelector(".gift-track");
  const btnLeft = document.querySelector(".carousel-btn.left");
  const btnRight = document.querySelector(".carousel-btn.right");
  const scrollAmount = 200;

  let autoScrollActive = false;
  let paused = false;
  let direction = 1; // 1 = right, -1 = left
  let resumeTimer;

  // Manual scroll for larger screens
  btnLeft.addEventListener("click", () => {
    track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  btnRight.addEventListener("click", () => {
    track.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  // 🌀 Auto-scroll for small screens only
  function handleAutoScroll() {
    const width = window.innerWidth;

    if (width <= 760 && !autoScrollActive) {
      autoScrollActive = true;
      autoScroll();
    } else if (width > 760) {
      autoScrollActive = false;
    }
  }

  function autoScroll() {
    if (!autoScrollActive) return;

    track.scrollLeft += direction * 1.2; // adjust speed here

    // Reverse at edges
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 1) {
      direction = -1;
    } else if (track.scrollLeft <= 0) {
      direction = 1;
    }

    requestAnimationFrame(autoScroll);
  }

  // Recheck when window resizes
  window.addEventListener("resize", handleAutoScroll);

  // Start once loaded
  handleAutoScroll();
}); 

// img slider
const carousel = document.querySelector('.carousel');
const inner = carousel.querySelector('.carousel-inner');
const items = inner.querySelectorAll('.carousel-item');
const prevBtn = carousel.querySelector('.carousel-control-prev');
const nextBtn = carousel.querySelector('.carousel-control-next');
const indicators = carousel.querySelectorAll('.carousel-indicators button');

let currentIndex = 0;
const total = items.length;

function updateCarousel(index) {
  inner.style.transform = `translateX(-${index * 100}%)`;
  indicators.forEach((btn,i) => btn.classList.toggle('active', i === index));
}

// Controls
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + total) % total;
  updateCarousel(currentIndex);
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % total;
  updateCarousel(currentIndex);
});

// Indicator click
indicators.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    currentIndex = i;
    updateCarousel(currentIndex);
  });
});

// Auto-play
setInterval(() => {
  currentIndex = (currentIndex + 1) % total;
  updateCarousel(currentIndex);
}, 3000);

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

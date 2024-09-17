
// document.addEventListener('DOMContentLoaded', () => {
//     const slidesContainer = document.querySelector('.slides');
//     const slides = Array.from(document.querySelectorAll('.slides .slide'));
//     const dots = Array.from(document.querySelectorAll('.btm-sliders span'));
//     let currentIndex = 0;
//     let autoSlideInterval;
  
//     // Clone the first and last slides for seamless transitions
//     const firstSlide = slides[0].cloneNode(true);
//     const lastSlide = slides[slides.length - 1].cloneNode(true);
//     slidesContainer.appendChild(firstSlide); // Clone appended at the end
//     slidesContainer.insertBefore(lastSlide, slides[0]); // Clone prepended at the beginning
    
//     const totalSlides = slides.length + 2; // Including cloned slides
    
//     function showSlide(index, withTransition = true) {
//       // Handle transition
//       if (withTransition) {
//         slidesContainer.style.transition = 'transform 0.5s ease-in-out';
//       } else {
//         slidesContainer.style.transition = 'none'; // Disable transition for instant jump
//       }
  
//       // Handle sliding
//       slidesContainer.style.transform = `translateX(-${index * 100}%)`;
      
//       // For normal sliding, update currentIndex and the dots
//       if (index > 0 && index < totalSlides - 1) {
//         currentIndex = index - 1; // Ignore the clones, adjust for real slides
//         updateDots(currentIndex);
//       }
  
//       // Reset auto-slide after every manual navigation
//       resetAutoSlide();
//     }
  
//     function updateDots(activeIndex) {
//       dots.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));
//     }
  
//     // Handle the next slide functionality
//     function nextSlide() {
//       if (currentIndex >= slides.length - 1) {
//         // If it's the last real slide, transition to the first cloned slide
//         showSlide(slides.length, true); // Move to cloned first slide
//         setTimeout(() => {
//           // Instantly jump to the real first slide
//           showSlide(1, false);
//         }, 500); // Wait for the transition to complete
//       } else {
//         showSlide(currentIndex + 2); // Increment by 1 considering the clone
//       }
//     }
  
//     // Handle the previous slide functionality
//     function prevSlide() {
//       if (currentIndex <= 0) {
//         // If it's the first real slide, transition to the last cloned slide
//         showSlide(0, true); // Move to cloned last slide
//         setTimeout(() => {
//           // Instantly jump to the real last slide
//           showSlide(slides.length - 1, false);
//         }, 500); // Wait for the transition to complete
//       } else {
//         showSlide(currentIndex, true); // Decrement by 1 considering the clone
//       }
//     }
  
//     function startAutoSlide() {
//       autoSlideInterval = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
//     }
  
//     function resetAutoSlide() {
//       clearInterval(autoSlideInterval); // Clear current interval
//       startAutoSlide(); // Start a new interval
//     }
  
//     // Add event listeners for navigation buttons
//     document.querySelector('.next').addEventListener('click', () => {
//       nextSlide();
//     });
    
//     document.querySelector('.prev').addEventListener('click', () => {
//       prevSlide();
//     });
  
//     // Add event listeners for bottom dots
//     dots.forEach((dot, index) => {
//       dot.addEventListener('click', () => {
//         showSlide(index + 1); // Move to the real slide corresponding to the dot
//         updateDots(index); // Update the active dot
//       });
//     });
  
//     // Initialize the slider and start auto-slide
//     slidesContainer.style.transform = `translateX(-100%)`; // Start at the first real slide
//     startAutoSlide();
//   });
  


document.addEventListener('DOMContentLoaded', () => {
  const slidesContainer = document.querySelector('.slides');
  const slides = Array.from(document.querySelectorAll('.slides .slide'));
  const dots = Array.from(document.querySelectorAll('.btm-sliders span'));
  let currentIndex = 0;
  let autoSlideInterval;

  // Clone the first and last slides for seamless transitions
  const firstSlide = slides[0].cloneNode(true);
  const lastSlide = slides[slides.length - 1].cloneNode(true);
  slidesContainer.appendChild(firstSlide);
  slidesContainer.insertBefore(lastSlide, slides[0]);
  
  const totalSlides = slides.length + 2;

  // Set background images for all slides, including clones
  // const allSlides = document.querySelectorAll('.slides .slide');
  // allSlides.forEach((slide, index) => {
  //     let imageIndex = index % slides.length; // This ensures correct indexing for cloned slides
  //     slide.style.backgroundImage = `url('image${imageIndex + 1}.jpg')`;
  // });

  
  
  function showSlide(index, withTransition = true) {
      if (withTransition) {
          slidesContainer.style.transition = 'transform 0.5s ease-in-out';
      } else {
          slidesContainer.style.transition = 'none';
      }

      slidesContainer.style.transform = `translateX(-${index * 100}%)`;
      
      if (index > 0 && index < totalSlides - 1) {
          currentIndex = index - 1;
          updateDots(currentIndex);
      }
  }

  function updateDots(activeIndex) {
      dots.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));
  }

  function nextSlide() {
      if (currentIndex >= slides.length - 1) {
          showSlide(totalSlides - 1);
          setTimeout(() => {
              showSlide(1, false);
          }, 500);
          currentIndex = 0;
      } else {
          showSlide(currentIndex + 2);
      }
      resetAutoSlide();
  }

  function prevSlide() {
      if (currentIndex <= 0) {
          showSlide(0);
          setTimeout(() => {
              showSlide(totalSlides - 2, false);
          }, 500);
          currentIndex = slides.length - 1;
      } else {
          showSlide(currentIndex);
      }
      resetAutoSlide();
  }

  function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
  }

  document.querySelector('.next').addEventListener('click', nextSlide);
  document.querySelector('.prev').addEventListener('click', prevSlide);

  dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
          showSlide(index + 1);
          currentIndex = index;
          resetAutoSlide();
      });
  });

  // Pause auto-sliding on hover
  slidesContainer.addEventListener('mouseenter', () => {
      clearInterval(autoSlideInterval);
  });

  slidesContainer.addEventListener('mouseleave', startAutoSlide);

  // Initialize the slider
  showSlide(1, false);
  startAutoSlide();
});
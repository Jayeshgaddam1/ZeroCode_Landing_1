// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Modal functionality
const modal = document.getElementById("popupModal");
const btn = document.getElementById("openModal");
const span = document.getElementsByClassName("close")[0];
const waitlistForm = document.getElementById("waitlistForm");

// Open modal when button is clicked
btn.onclick = function() {
  modal.style.display = "block";
}

// Close modal when X is clicked
span.onclick = function() {
  modal.style.display = "none";
}

// Close modal when clicking outside
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Handle form submission
waitlistForm.addEventListener("submit", async function(e) {
  e.preventDefault();
  
  const name = document.getElementById("userName").value;
  const email = document.getElementById("userEmail").value;
  
  try {
    const response = await fetch('/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      alert("Thank you for joining our waitlist!");
      waitlistForm.reset();
      modal.style.display = "none";
    } else {
      alert(`Error: ${data.message || 'Something went wrong'}`);
    }
  } catch (error) {
    alert("There was an error submitting your information. Please try again.");
    console.error(error);
  }
});

// Binary code animation for background
const binaryElement = document.querySelector('.binary-code');
function generateBinary() {
  let binary = '';
  for (let i = 0; i < 1000; i++) {
    binary += Math.floor(Math.random() * 2);
  }
  return binary;
}
if (binaryElement) {
  binaryElement.textContent = generateBinary();
}

// Enhanced binary background animation
document.addEventListener('DOMContentLoaded', function() {
    const binaryCode = document.querySelector('.binary-code');
    if (binaryCode) {
        // Create binary digits programmatically
        let binaryHTML = '';
        for (let i = 0; i < 100; i++) {
            let row = '';
            for (let j = 0; j < 40; j++) {
                // Randomly generate 0s and 1s
                row += Math.round(Math.random());
            }
            let top = i * 20;
            let left = Math.random() * 90;
            binaryHTML += `<div style="position:absolute; top:${top}px; left:${left}%; color:white; font-family:monospace; opacity:0.25;">${row}</div>`;
        }
        binaryCode.innerHTML = binaryHTML;
        
        // Adjust animation speed based on screen size
        function adjustAnimationSpeed() {
            const viewportWidth = window.innerWidth;
            let duration;
            
            if (viewportWidth < 768) {
                duration = '20s'; // Faster on mobile
            } else {
                duration = '30s'; // Normal speed on desktop
            }
            
            binaryCode.style.animationDuration = duration;
        }
        
        // Initial set
        adjustAnimationSpeed();
        
        // Update on resize
        window.addEventListener('resize', adjustAnimationSpeed);
    }
});

// Animation for problem and solution cards on scroll (in the same section now)
document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Get all problem and solution cards
    const problemCards = document.querySelectorAll('.problem-card');
    const solutionCards = document.querySelectorAll('.solution-card');
    
    // Function to animate cards when they come into view
    function animateCardsOnScroll() {
        problemCards.forEach(card => {
            if (isInViewport(card)) {
                card.classList.add('animate');
            }
        });
        
        solutionCards.forEach(card => {
            if (isInViewport(card)) {
                card.classList.add('animate');
            }
        });
    }
    
    // Check on initial load
    animateCardsOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateCardsOnScroll);
});

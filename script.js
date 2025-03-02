// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// CTA button functionality
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', () => {
        // Show email sign-up form or modal
        // This is a placeholder - you'll need to implement the actual form
        alert('Join our waitlist form would appear here!');
        // Alternatively, you could show a modal with a form
    });
});

// Add some animation for binary background
const binaryBackground = document.querySelector('.binary-background');
if (binaryBackground) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        binaryBackground.style.transform = `translateY(${scrollPosition * 0.4}px)`;
    });
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
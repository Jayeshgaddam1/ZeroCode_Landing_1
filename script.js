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
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('popupModal');
    const openButtons = document.querySelectorAll('.cta-button');
    const closeButton = document.querySelector('.close');
    const form = document.getElementById('waitlistForm');


    // Show modal only when clicking "Join the List" button
    openButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.style.display = "block";
        });
    });

    // Close modal when clicking the close button
    closeButton.addEventListener('click', () => {
        modal.style.display = "none";
    });

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
        
        const name = document.getElementById('userName').value;
        const email = document.getElementById('userEmail').value;
        
        console.log(`User Joined: Name - ${name}, Email - ${email}`);

        // Here you can send the data to your backend API
        
        alert('Thank you for joining! We will notify you soon.');
        modal.style.display = 'none'; // Hide modal after submission
        form.reset(); // Clear form fields
    });

    // Add some animation for binary background
        const binaryBackground = document.querySelector('.binary-background');
        if (binaryBackground) {
            window.addEventListener('scroll', () => {
                const scrollPosition = window.scrollY;
                binaryBackground.style.transform = `translateY(${scrollPosition * 0.4}px)`;
            });
        }
        });



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

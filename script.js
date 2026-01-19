document.addEventListener('DOMContentLoaded', () => {
    // Selectors matched to new CSS class names (see style.css)
    // Mobile Menu Logic
    const menuBtn = document.querySelector('.nav-toggle-mobile');
    const navMenu = document.querySelector('.nav-menu-desktop');

    if (menuBtn && navMenu) {
        // Toggle Menu
        menuBtn.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('is-active-mobile');
            document.body.classList.toggle('no-scroll', isActive);

            menuBtn.textContent = isActive ? 'close' : 'menu';
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('is-active-mobile');
                document.body.classList.remove('no-scroll');
                menuBtn.textContent = 'menu';
            });
        });
    }

    // Recipe Accordion Logic
    const recipesContainer = document.querySelector('.journal-carousel');
    const cards = document.querySelectorAll('.journal-card-item');

    if (recipesContainer && cards.length > 0) {
        cards.forEach(card => {
            // Add click event for expansion
            card.addEventListener('click', (e) => {
                // Prevent triggering if clicking a link/button specifically (though here the button says "Read Recipe" implying expansion)
                // But we want the whole card to trigger it as per previous logic.

                const isExpanded = card.classList.contains('is-expanded');

                // Reset all other cards
                cards.forEach(c => {
                    if (c !== card) c.classList.remove('is-expanded');
                });

                // Toggle current card
                if (!isExpanded) {
                    card.classList.add('is-expanded');
                    // Smooth scroll to the card after a short delay for layout transition
                    setTimeout(() => {
                        card.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest',
                            inline: 'center'
                        });
                    }, 300);
                } else {
                    // Optional: Allow collapsing if clicking the already expanded one
                    // card.classList.remove('is-expanded');
                }
            });
        });
    }
});

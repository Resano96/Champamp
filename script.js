document.addEventListener('DOMContentLoaded', () => {
    // Selectors matched to new CSS class names (see style.css)
    const menuBtn = document.querySelector('.nav-toggle-mobile');
    const navMenu = document.querySelector('.nav-menu-desktop');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            // Toggle the active class which controls the mobile menu visibility
            navMenu.classList.toggle('is-active-mobile');

            // Toggle icon state
            if (navMenu.classList.contains('is-active-mobile')) {
                menuBtn.textContent = 'close';
            } else {
                menuBtn.textContent = 'menu';
            }
        });
    }
});

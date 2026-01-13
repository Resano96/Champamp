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

    if (recipesContainer) {
        fetch('recipes.json')
            .then(response => response.json())
            .then(recipes => {
                recipesContainer.innerHTML = ''; // Clear placeholder

                recipes.forEach((recipe, index) => {
                    const card = document.createElement('div');
                    card.classList.add('journal-card-item');

                    // Construct Internal HTML
                    const ingredientsList = recipe.ingredients.map(ing => `<li>${ing}</li>`).join('');
                    const instructionList = recipe.instructions.map(inst => `<li>${inst}</li>`).join('');

                    card.innerHTML = `
                        <div class="journal-card-inner">
                            <img alt="${recipe.title}" class="journal-card-img"
                                src="${recipe.image}" loading="lazy" />
                            <div class="journal-card-overlay"></div>
                            
                            <div class="journal-card-content">
                                <div class="journal-header-group">
                                    <span class="journal-tag-badge">${recipe.subtitle}</span>
                                    <h3 class="journal-card-title">${recipe.title}</h3>
                                    <button class="journal-action-link" type="button">
                                        Leer Receta <span class="material-icon">arrow_forward</span>
                                    </button>
                                </div>

                                <div class="journal-details">
                                    <div class="recipe-meta">
                                        <span><i class="material-icon" style="font-size:1em; vertical-align:middle">timer</i> ${recipe.time}</span>
                                        <span><i class="material-icon" style="font-size:1em; vertical-align:middle">restaurant</i> ${recipe.difficulty}</span>
                                    </div>

                                    <div class="recipe-lists-grid">
                                        <div>
                                            <h4 class="recipe-list-title">Ingredientes</h4>
                                            <ul class="recipe-list-items">
                                                ${ingredientsList}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 class="recipe-list-title">Instrucciones</h4>
                                            <ol class="recipe-list-items">
                                                ${instructionList}
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;

                    // Add click event for expansion
                    card.addEventListener('click', (e) => {
                        const isExpanded = card.classList.contains('is-expanded');
                        const allCards = document.querySelectorAll('.journal-card-item');

                        // Reset all other cards
                        allCards.forEach(c => {
                            if (c !== card) c.classList.remove('is-expanded');
                        });

                        // Toggle current card
                        if (!isExpanded) {
                            card.classList.add('is-expanded');
                            // Smooth scroll to the card after a short delay for layout transition
                            setTimeout(() => {
                                card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                            }, 300);
                        } else {
                            // Optional: Allow collapsing?
                            // card.classList.remove('is-expanded');
                        }
                    });

                    recipesContainer.appendChild(card);
                });
            })
            .catch(error => console.error('Error loading recipes:', error));
    }
});

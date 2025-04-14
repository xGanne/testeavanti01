document.addEventListener('DOMContentLoaded', () => {
    // --- Search Form Interaction ---
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResultDisplay = document.getElementById('search-result-display');

    if (searchForm && searchInput && searchResultDisplay) {

        // Function to show results
        function showResults(text) {
            searchResultDisplay.textContent = text;
            searchResultDisplay.style.display = 'block';
        }

        // Function to hide results
        function hideResults() {
            searchResultDisplay.style.display = 'none';
            searchResultDisplay.textContent = ''; 
        }

        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const searchTerm = searchInput.value.trim();

            if (searchTerm) {
                showResults(`Você buscou por: '${searchTerm}'`);
            } else {
                hideResults();
            }
        });

        searchInput.addEventListener('input', () => {
            if (searchInput.value.trim() === '') {
                hideResults();
            }
        });

        document.addEventListener('click', (event) => {
            if (!searchForm.contains(event.target) && !searchResultDisplay.contains(event.target)) {
                hideResults();
            }
        });
         hideResults();

    }

    // --- Product Carousel (Swiper JS) ---
    const productSwiper = new Swiper('.product-swiper', {
        loop: true,
        slidesPerView: 1.5,
        spaceBetween: 15,

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        breakpoints: {
            576: {
                slidesPerView: 2.5,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 3.5,
                spaceBetween: 20
            },
            992: {
                slidesPerView: 4.5,
                spaceBetween: 30
            },
             1200: {
                slidesPerView: 5,
                spaceBetween: 30
            }
        }
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            document.body.classList.toggle('menu-active'); // Toggle body class
            
            if (!mainNav.classList.contains('active')) {
                const openItems = document.querySelectorAll('.nav-item.open');
                openItems.forEach(item => item.classList.remove('open'));
            }
        });
    }

    document.addEventListener('click', (event) => {
        if (mainNav && mainNav.classList.contains('active')) {
            if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
                mainNav.classList.remove('active');
                document.body.classList.remove('menu-active');
            }
        }
    });


    document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('.search-form');
    const searchResultDisplay = document.getElementById('search-result-display');
    
    function positionSearchResults() {
        if (!searchForm || !searchResultDisplay) return;
        
        const formRect = searchForm.getBoundingClientRect();
        const headerContainer = searchForm.closest('.header-container') || document.body;
        
        searchResultDisplay.style.position = 'absolute';
        searchResultDisplay.style.top = (formRect.bottom + window.scrollY) + 'px';
        searchResultDisplay.style.left = formRect.left + 'px';
        searchResultDisplay.style.width = formRect.width + 'px';
        searchResultDisplay.style.zIndex = '1001';
        searchResultDisplay.style.backgroundColor = 'white';
        searchResultDisplay.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        searchResultDisplay.style.borderRadius = '0 0 4px 4px';
    }
    
    positionSearchResults();
    window.addEventListener('resize', positionSearchResults);
    
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            if (searchInput.value.trim()) {
                positionSearchResults();
                searchResultDisplay.style.display = 'block';
            } else {
                searchResultDisplay.style.display = 'none';
            }
        });
    }
});

});
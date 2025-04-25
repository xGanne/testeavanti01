document.addEventListener('DOMContentLoaded', () => {
    function debounce(func, wait = 100) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // --- Search Form Interaction ---
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResultDisplay = document.getElementById('search-result-display');
    const siteHeader = document.querySelector('.site-header');

    if (searchForm && searchInput && searchResultDisplay && siteHeader) {
        function positionSearchResults() {
            if (!searchResultDisplay || searchResultDisplay.style.display === 'none') return;

            const formRect = searchForm.getBoundingClientRect();
            searchResultDisplay.style.position = 'fixed';
            searchResultDisplay.style.top = `${formRect.bottom + 5}px`;
            searchResultDisplay.style.left = `${formRect.left}px`;
            searchResultDisplay.style.width = `${formRect.width}px`;
            searchResultDisplay.style.zIndex = '1100';
        }

        function showResults(text) {
            searchResultDisplay.textContent = text;
            searchResultDisplay.style.display = 'block';
            positionSearchResults();
            searchResultDisplay.setAttribute('aria-live', 'polite');
            searchResultDisplay.setAttribute('role', 'status');
        }

        function hideResults() {
            searchResultDisplay.style.display = 'none';
            searchResultDisplay.textContent = '';
        }

        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const searchTerm = searchInput.value.trim();

            if (searchTerm) {
                showResults(`Exibindo resultados para: '${searchTerm}'`);
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

        // Usar debounce para eventos de scroll e resize
        window.addEventListener('scroll', debounce(positionSearchResults));
        window.addEventListener('resize', debounce(positionSearchResults));

        hideResults();
    }

    // --- Product Carousel (Swiper JS) ---
    const productSwipers = document.querySelectorAll('.product-swiper');
    productSwipers.forEach((swiperElement, index) => {
        const swiperInstance = new Swiper(swiperElement, {
            // --- Base Options ---
            loop: true,
            a11y: {
                enabled: true,
                prevSlideMessage: 'Slide anterior',
                nextSlideMessage: 'Próximo slide',
                paginationBulletMessage: 'Ir para o slide {{index}}'
            },
            // --- Breakpoints ---
            breakpoints: {
                // Mobile (Default - screens up to 767px wide)
                0: {
                    slidesPerView: 2,
                    spaceBetween: 15
                },
                // Medium devices (tablets, >= 768px)
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                // Large devices (desktops, >= 992px)
                992: {
                    slidesPerView: 4,
                    spaceBetween: 20
                },
                // Extra large devices (large desktops, >= 1200px)
                1200: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                    slidesPerGroup: 3,
                }
            },

            // --- Pagination ---
            pagination: {
                el: swiperElement.querySelector('.swiper-pagination'),
                clickable: true,
                dynamicBullets: true,
                dynamicMainBullets: 3
            },

            // --- Navigation ---
            navigation: {
                nextEl: swiperElement.querySelector('.swiper-button-next'),
                prevEl: swiperElement.querySelector('.swiper-button-prev'),
            },
        });
    });
    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        if (!menuToggle.hasAttribute('aria-label')) {
            menuToggle.setAttribute('aria-label', 'Abrir menu de navegação');
        }
        menuToggle.setAttribute('aria-controls', 'main-navigation');
        menuToggle.setAttribute('aria-expanded', 'false');
        
        if (mainNav.id === '') {
            mainNav.id = 'main-navigation';
        }

        menuToggle.addEventListener('click', () => {
            const isExpanded = mainNav.classList.toggle('active');
            document.body.classList.toggle('menu-open', isExpanded);
            menuToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
            menuToggle.setAttribute('aria-label', 
                isExpanded ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
        });

        document.addEventListener('click', (event) => {
            if (mainNav.classList.contains('active') &&
                !mainNav.contains(event.target) &&
                !menuToggle.contains(event.target)) {
                mainNav.classList.remove('active');
                document.body.classList.remove('menu-open');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', 'Abrir menu de navegação');
            }
        });
    }

    // --- Footer Accordion Toggle ---
    const footerLinkHeadings = document.querySelectorAll('.footer-links h4');

    footerLinkHeadings.forEach(heading => {
        heading.setAttribute('role', 'button');
        heading.setAttribute('tabindex', '0');
        heading.setAttribute('aria-expanded', 'false');
        
        const list = heading.nextElementSibling;
        if (list && list.tagName === 'UL') {
            const listId = `footer-list-${Math.random().toString(36).substr(2, 9)}`;
            list.id = listId;
            heading.setAttribute('aria-controls', listId);
            
            list.style.maxHeight = '0';
            list.style.overflow = 'hidden';
            list.style.transition = 'max-height 0.3s ease-out';
            
            if (window.innerWidth < 991) {
                list.style.display = 'none';
            } else {
                list.style.maxHeight = 'none';
                list.style.display = 'block';
                heading.setAttribute('aria-expanded', 'true');
            }
        }

        const toggleFooterAccordion = () => {
            if (window.innerWidth < 991) {
                const parentLinkBlock = heading.parentElement;
                const isOpen = parentLinkBlock.classList.toggle('open');
                heading.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

                const list = heading.nextElementSibling;
                if (list && list.tagName === 'UL') {
                    if (isOpen) {
                        list.style.display = 'block';
                        const scrollHeight = list.scrollHeight;
                        list.style.maxHeight = scrollHeight + "px";
                    } else {
                        list.style.maxHeight = '0';
                        list.addEventListener('transitionend', () => {
                            if (!parentLinkBlock.classList.contains('open')) {
                                list.style.display = 'none';
                            }
                        }, { once: true });
                    }
                }
            }
        };

        heading.addEventListener('click', toggleFooterAccordion);
        heading.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFooterAccordion();
            }
        });
    });

    const handleResize = debounce(() => {
        footerLinkHeadings.forEach(heading => {
            const list = heading.nextElementSibling;
            const parentLinkBlock = heading.parentElement;
            
            if (list && list.tagName === 'UL') {
                if (window.innerWidth >= 991) {
                    list.style.maxHeight = 'none';
                    list.style.display = 'block';
                    heading.setAttribute('aria-expanded', 'true');
                } else {
                    const isOpen = parentLinkBlock.classList.contains('open');
                    heading.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
                    
                    if (!isOpen) {
                        list.style.maxHeight = '0';
                        list.style.display = 'none';
                    } else {
                        list.style.display = 'block';
                        list.style.maxHeight = list.scrollHeight + "px";
                    }
                }
            }
        });
    }, 250);

    window.addEventListener('resize', handleResize);

    // --- Dropdown Navigation ---
    const navItemsWithDropdown = document.querySelectorAll('.main-nav .has-dropdown > a');

    navItemsWithDropdown.forEach(link => {
        const dropdownMenu = link.nextElementSibling;
        if (dropdownMenu) {
            const dropdownId = `dropdown-${Math.random().toString(36).substr(2, 9)}`;
            dropdownMenu.id = dropdownId;
            
            link.setAttribute('aria-haspopup', 'true');
            link.setAttribute('aria-expanded', 'false');
            link.setAttribute('aria-controls', dropdownId);
        }

        const toggleDropdown = (e) => {
            if (window.innerWidth < 992) {
                if (link.parentElement.classList.contains('has-dropdown')) {
                    e.preventDefault();
                    const dropdown = link.nextElementSibling;
                    if (dropdown) {
                        const isOpen = link.parentElement.classList.toggle('open');
                        link.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            
                        if (isOpen) {
                            dropdown.style.maxHeight = dropdown.scrollHeight + "px";
                            dropdown.style.paddingTop = '10px';
                            dropdown.style.paddingBottom = '15px';
                        } else {
                            dropdown.style.maxHeight = '0';
                            dropdown.style.paddingTop = '0';
                            dropdown.style.paddingBottom = '0';
                        }
                    }
                }
            }
        };

        link.addEventListener('click', toggleDropdown);
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleDropdown(e);
            }
        });

        const dropdown = link.nextElementSibling;
        if (dropdown) {
            dropdown.style.maxHeight = window.innerWidth < 992 ? '0' : '';
            dropdown.style.overflow = window.innerWidth < 992 ? 'hidden' : '';
            dropdown.style.transition = 'max-height 0.3s ease-out, padding 0.3s ease-out';
            
            if (window.innerWidth < 992) {
                dropdown.style.paddingTop = '0';
                dropdown.style.paddingBottom = '0';
            }
        }
    });

    window.addEventListener('resize', debounce(() => {
        navItemsWithDropdown.forEach(link => {
            const dropdown = link.nextElementSibling;
            const parentLi = link.parentElement;
            
            if (dropdown) {
                if (window.innerWidth >= 992) {
                    dropdown.style.maxHeight = '';
                    dropdown.style.paddingTop = '';
                    dropdown.style.paddingBottom = '';
                    dropdown.style.overflow = '';
                } else {
                    const isOpen = parentLi.classList.contains('open');
                    if (!isOpen) {
                        dropdown.style.maxHeight = '0';
                        dropdown.style.paddingTop = '0';
                        dropdown.style.paddingBottom = '0';
                        dropdown.style.overflow = 'hidden';
                    } else {
                        dropdown.style.maxHeight = dropdown.scrollHeight + "px";
                    }
                }
            }
        });
    }, 250));

    handleResize();
});
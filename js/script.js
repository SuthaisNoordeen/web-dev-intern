/**
 * Homepage — navigation, sliders, tabs
 */

(function () {
    'use strict';

    function ready(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    }

    ready(function () {
        initAnnouncement();
        initNavigation();
        initHeroSlider();
        initFeaturedTabs();
        initTestimonials();
        initNewsletter();
        initCart();
        initFAQ();
        initContactForm();
    });

    function initAnnouncement() {
        var bar = document.getElementById('announcement-bar');
        var closeBtn = document.getElementById('announcement-close');

        if (!bar || !closeBtn) {
            return;
        }

        closeBtn.addEventListener('click', function () {
            document.body.classList.add('announcement-hidden');
        });
    }

    function getScrollOffset() {
        var header = document.querySelector('.site-header');
        return header ? header.offsetHeight + 12 : 90;
    }

    function initNavigation() {
        var menuToggle = document.getElementById('menu-toggle');
        var mobileNav = document.getElementById('mobile-nav');
        var header = document.querySelector('.site-header');

        function closeMenu() {
            if (!mobileNav || !menuToggle) {
                return;
            }
            mobileNav.classList.remove('is-open');
            mobileNav.setAttribute('aria-hidden', 'true');
            menuToggle.classList.remove('is-active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Open menu');
            document.body.classList.remove('menu-open');
        }

        function openMenu() {
            if (!mobileNav || !menuToggle) {
                return;
            }
            mobileNav.classList.add('is-open');
            mobileNav.setAttribute('aria-hidden', 'false');
            menuToggle.classList.add('is-active');
            menuToggle.setAttribute('aria-expanded', 'true');
            menuToggle.setAttribute('aria-label', 'Close menu');
            document.body.classList.add('menu-open');
        }

        function isMenuOpen() {
            return mobileNav && mobileNav.classList.contains('is-open');
        }

        function scrollToSection(targetId) {
            var target = document.getElementById(targetId);
            if (!target) {
                return false;
            }
            closeMenu();
            setActiveNavLink(targetId);
            var top = target.getBoundingClientRect().top + window.pageYOffset - getScrollOffset();
            window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
            return true;
        }

        /* Smooth scroll — works for all .nav-link and in-page # anchors */
        document.addEventListener('click', function (e) {
            var link = e.target.closest('a[href^="#"]');
            if (!link) {
                return;
            }

            var href = link.getAttribute('href');
            if (!href || href === '#') {
                return;
            }

            var targetId = href.slice(1);
            if (!document.getElementById(targetId)) {
                return;
            }

            e.preventDefault();
            scrollToSection(targetId);
        });

        /* Mobile hamburger */
        if (menuToggle && mobileNav) {
            menuToggle.addEventListener('click', function (e) {
                e.stopPropagation();
                if (isMenuOpen()) {
                    closeMenu();
                } else {
                    openMenu();
                }
            });

            document.addEventListener('click', function (e) {
                if (!isMenuOpen()) {
                    return;
                }
                if (header && !header.contains(e.target)) {
                    closeMenu();
                }
            });

            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape' && isMenuOpen()) {
                    closeMenu();
                }
            });

            window.addEventListener('resize', function () {
                if (window.innerWidth > 768 && isMenuOpen()) {
                    closeMenu();
                }
            });
        }
    }

    function setActiveNavLink(sectionId) {
        document.querySelectorAll('.nav-link[data-section]').forEach(function (link) {
            var isActive = link.getAttribute('data-section') === sectionId;
            link.classList.toggle('active', isActive);
        });
    }

    function initHeroSlider() {
        var heroSlides = document.querySelectorAll('.hero-slide');
        var heroIndex = 0;

        function showHeroSlide(index) {
            if (!heroSlides.length) {
                return;
            }
            heroIndex = (index + heroSlides.length) % heroSlides.length;
            heroSlides.forEach(function (slide, i) {
                slide.classList.toggle('active', i === heroIndex);
            });
        }

        var heroPrev = document.getElementById('hero-prev');
        var heroNext = document.getElementById('hero-next');

        if (heroPrev) {
            heroPrev.addEventListener('click', function () {
                showHeroSlide(heroIndex - 1);
            });
        }
        if (heroNext) {
            heroNext.addEventListener('click', function () {
                showHeroSlide(heroIndex + 1);
            });
        }

        if (heroSlides.length > 1) {
            setInterval(function () {
                showHeroSlide(heroIndex + 1);
            }, 6000);
        }
    }

    function initFeaturedTabs() {
        var tabButtons = document.querySelectorAll('.featured-tabs button');
        var featuredCards = document.querySelectorAll('#featured-grid .product-card');

        tabButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var filter = btn.getAttribute('data-filter');

                tabButtons.forEach(function (b) {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');

                featuredCards.forEach(function (card) {
                    var category = card.getAttribute('data-category');
                    var show = filter === 'all' || category === filter;
                    card.classList.toggle('hidden', !show);
                });
            });
        });
    }

    function initTestimonials() {
        var testimonials = [
            {
                text: '"The flowers arrived fresh and beautifully arranged. My mother was thrilled — Kogul made Mother\'s Day truly special!"',
                name: 'Sarah Mitchell',
                role: 'Happy Customer',
            avatar: 'images/avatar-1.jpg?v=5'
        },
        {
            text: '"Same-day delivery was flawless. The bouquet looked exactly like the photo — I will definitely order again."',
            name: 'Michael Chen',
            role: 'Verified Buyer',
            avatar: 'images/avatar-2.jpg?v=5'
        },
        {
            text: '"Professional service and stunning arrangements. Kogul is my go-to for every celebration."',
            name: 'Emily Rodriguez',
            role: 'Loyal Customer',
            avatar: 'images/avatar-3.jpg?v=5'
            }
        ];

        var testimonialIndex = 0;
        var testimonialText = document.getElementById('testimonial-text');
        var testimonialName = document.getElementById('testimonial-name');
        var testimonialRole = document.getElementById('testimonial-role');
        var testimonialAvatar = document.getElementById('testimonial-avatar');

        function showTestimonial(index) {
            if (!testimonialText || !testimonialAvatar) {
                return;
            }
            testimonialIndex = (index + testimonials.length) % testimonials.length;
            var t = testimonials[testimonialIndex];
            testimonialText.textContent = t.text;
            if (testimonialName) {
                testimonialName.textContent = t.name;
            }
            if (testimonialRole) {
                testimonialRole.textContent = t.role;
            }
            testimonialAvatar.src = t.avatar;
            testimonialAvatar.alt = t.name;
        }

        var testimonialPrev = document.getElementById('testimonial-prev');
        var testimonialNext = document.getElementById('testimonial-next');

        if (testimonialPrev) {
            testimonialPrev.addEventListener('click', function () {
                showTestimonial(testimonialIndex - 1);
            });
        }
        if (testimonialNext) {
            testimonialNext.addEventListener('click', function () {
                showTestimonial(testimonialIndex + 1);
            });
        }
    }


    function initNewsletter() {
        var newsletterForm = document.querySelector('.newsletter-form');
        if (!newsletterForm) {
            return;
        }

        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var input = newsletterForm.querySelector('input[type="email"]');
            if (input && input.value.trim()) {
                alert('Thank you for subscribing, ' + input.value.trim() + '!');
                input.value = '';
            }
        });
    }


    function initCart() {
        var addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        var cartBtn = document.querySelector('.cart-btn');
        var cartModalOverlay = document.getElementById('cart-modal-overlay');
        var cartModalClose = document.getElementById('cart-modal-close');

        loadCart();

        addToCartButtons.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                var productCard = btn.closest('.product-card');
                if (productCard) {
                    var productName = productCard.querySelector('.product-name').textContent;
                    var productPrice = productCard.querySelector('.product-price').textContent;
                    addToCart(productName, productPrice);
                }
            });
        });

        if (cartBtn) {
            cartBtn.addEventListener('click', function (e) {
                e.preventDefault();
                openCartModal();
            });
        }

        if (cartModalClose) {
            cartModalClose.addEventListener('click', closeCartModal);
        }

        if (cartModalOverlay) {
            cartModalOverlay.addEventListener('click', closeCartModal);
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeCartModal();
            }
        });
    }

    function getCart() {
        var cart = localStorage.getItem('shoppingCart');
        return cart ? JSON.parse(cart) : [];
    }

    function saveCart(cartItems) {
        localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
        updateCartBadge();
    }

    function addToCart(productName, productPrice) {
        var cart = getCart();
        var priceMatch = productPrice.match(/\$(\d+\.?\d*)/);
        var price = priceMatch ? parseFloat(priceMatch[1]) : 0;
        
        var existingItem = cart.find(function (item) {
            return item.name === productName;
        });

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: Date.now(),
                name: productName,
                price: price,
                quantity: 1
            });
        }

        saveCart(cart);
        renderCart();
    }

    function removeFromCart(itemId) {
        var cart = getCart();
        cart = cart.filter(function (item) {
            return item.id !== itemId;
        });
        saveCart(cart);
        renderCart();
    }

    function openCartModal() {
        var cartModal = document.getElementById('cart-modal');
        if (cartModal) {
            cartModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeCartModal() {
        var cartModal = document.getElementById('cart-modal');
        if (cartModal) {
            cartModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    function renderCart() {
        var cart = getCart();
        var cartItemsList = document.getElementById('cart-items-list');
        var cartEmptyState = document.getElementById('cart-empty-state');
        var cartModalFooter = document.getElementById('cart-modal-footer');

        if (!cartItemsList) {
            return;
        }

        cartItemsList.innerHTML = '';

        if (cart.length === 0) {
            if (cartEmptyState) cartEmptyState.style.display = 'flex';
            cartItemsList.style.display = 'none';
            if (cartModalFooter) cartModalFooter.style.display = 'none';
            return;
        }

        if (cartEmptyState) cartEmptyState.style.display = 'none';
        cartItemsList.style.display = 'block';
        if (cartModalFooter) cartModalFooter.style.display = 'block';

        var subtotal = 0;

        cart.forEach(function (item) {
            var itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            var li = document.createElement('li');
            li.className = 'cart-item';
            li.innerHTML = `
                <div class="cart-item-image">
                    <img src="images/Beautiful-Flowers.jpg.webp?v=5" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <p class="cart-item-qty">Qty: ${item.quantity}</p>
                    <button type="button" class="cart-item-remove" data-item-id="${item.id}">Remove</button>
                </div>
            `;
            cartItemsList.appendChild(li);
        });

        document.querySelectorAll('.cart-item-remove').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var itemId = parseInt(btn.getAttribute('data-item-id'), 10);
                removeFromCart(itemId);
            });
        });

        var cartSubtotal = document.getElementById('cart-subtotal');
        if (cartSubtotal) {
            cartSubtotal.textContent = '$' + subtotal.toFixed(2);
        }
    }

    function loadCart() {
        renderCart();
        updateCartBadge();
    }

    function updateCartBadge() {
        var cartBadge = document.querySelector('.cart-badge');
        if (cartBadge) {
            var cart = getCart();
            var totalItems = cart.reduce(function (sum, item) {
                return sum + item.quantity;
            }, 0);
            cartBadge.textContent = totalItems;
            cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';

            var cartBtn = document.querySelector('.cart-btn');
            if (cartBtn) {
                cartBtn.setAttribute('aria-label', 'Shopping cart, ' + totalItems + ' items');
            }
        }
    }

    function initFAQ() {
        var faqTriggers = document.querySelectorAll('.faq-trigger');

        faqTriggers.forEach(function (trigger) {
            trigger.addEventListener('click', function () {
                var isExpanded = trigger.getAttribute('aria-expanded') === 'true';
                var answer = trigger.nextElementSibling;

                // Close other FAQs
                faqTriggers.forEach(function (otherTrigger) {
                    if (otherTrigger !== trigger && otherTrigger.getAttribute('aria-expanded') === 'true') {
                        otherTrigger.setAttribute('aria-expanded', 'false');
                        var otherAnswer = otherTrigger.nextElementSibling;
                        if (otherAnswer) {
                            otherAnswer.style.display = 'none';
                        }
                    }
                });

                // Toggle current
                trigger.setAttribute('aria-expanded', !isExpanded);
                if (answer) {
                    answer.style.display = isExpanded ? 'none' : 'block';
                }
            });
        });
    }

    function initContactForm() {
        var contactForm = document.getElementById('contact-form');
        if (!contactForm) {
            return;
        }

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Clear previous errors
            document.querySelectorAll('.form-error').forEach(function (err) {
                err.textContent = '';
            });
            document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(function (field) {
                field.classList.remove('error');
            });

            // Validate form
            var isValid = true;
            var name = document.getElementById('contact-name');
            var email = document.getElementById('contact-email');
            var subject = document.getElementById('contact-subject');
            var message = document.getElementById('contact-message');

            // Name validation
            if (!name.value.trim()) {
                showError(name, 'Please enter your name');
                isValid = false;
            }

            // Email validation
            if (!email.value.trim()) {
                showError(email, 'Please enter your email address');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }

            // Subject validation
            if (!subject.value) {
                showError(subject, 'Please select a subject');
                isValid = false;
            }

            // Message validation
            if (!message.value.trim()) {
                showError(message, 'Please enter a message');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showError(message, 'Message must be at least 10 characters');
                isValid = false;
            }

            if (isValid) {
                // Show success message
                var formWrapper = contactForm.parentElement;
                contactForm.style.display = 'none';
                var successMsg = document.getElementById('contact-success');
                if (successMsg) {
                    successMsg.style.display = 'block';
                }

                // Reset form after a delay
                setTimeout(function () {
                    contactForm.reset();
                    contactForm.style.display = 'block';
                    if (successMsg) {
                        successMsg.style.display = 'none';
                    }
                }, 3000);
            }
        });
    }

    function showError(field, message) {
        field.classList.add('error');
        var errorEl = field.parentElement.querySelector('.form-error');
        if (errorEl) {
            errorEl.textContent = message;
        }
    }

    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
})();

      // Page navigation
        function showPage(pageId, category = null) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            document.getElementById(pageId).classList.add('active');
            
            // Update navigation active state
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            // Set active link
            const navLinks = document.querySelectorAll('.nav-link');
            for (let link of navLinks) {
                const onclickText = link.getAttribute('onclick');
                if (onclickText && onclickText.includes(`'${pageId}'`)) {
                    link.classList.add('active');
                    break;
                }
            }
            
            // Update mobile navigation
            document.querySelectorAll('.mobile-nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            document.querySelectorAll('.mobile-nav-item').forEach(item => {
                if (item.getAttribute('onclick')?.includes(`'${pageId}'`)) {
                    item.classList.add('active');
                }
            });
            
            // Show notification when navigating to notifications page
            if (pageId === 'notifications') {
                document.getElementById('notifCounter').textContent = '0';
                document.getElementById('mobileNotifCounter').textContent = '0';
            }
            
            // Update specific pages when shown
            if (pageId === 'cart') {
                updateCartPage();
            } else if (pageId === 'shop') {
                loadShopProducts();
            }
        }

        // Cart data
        let cart = [];
        let currentPage = 1;
        const productsPerPage = 6;
        let userProfile = {
            firstName: "Selamawit",
            lastName: "Kebede",
            email: "selamawit.k@example.com",
            phone: "+251 912 345 678",
            address: "Bole Subcity",
            city: "Addis Ababa",
            region: "Addis Ababa",
            isLoggedIn: false
        };
        
        // Shop products
        const shopProducts = [
            { id: "1", name: "Premium Navy Blazer", price: 249, image: "/images/Premium Navy Blazer223.avif", badge: "New" },
            { id: "2", name: "Black Evening Dress", price: 189, image: "/images/Black Evening Dress22.avif", badge: "Sale" },
            { id: "3", name: "Leather Handbag", price: 159, image: "/images/Designer Leather Bag.avif", badge: "Popular" },
            { id: "4", name: "Premium Cotton T-Shirt", price: 39, image: "/images/MAREFU.jpg", badge: "New" },
            { id: "5", name: "Air Jordan 4 Retro OG – Iconic Style Reimagined", price: 49.99, image: "/images/air jordan 4.avif", badge: "New" },
            { id: "6", name: "Slim Fit Jeans", price: 69.99, image: "/images/jeans22.avif", badge: "Bestseller" },
            { id: "7", name: "Air Jordan – Fly Above the Rest", price: 79.99, image: "/images/Air Jordan 4 Retro OG – Iconic Style Reimagined.avif", badge: "Sale" },
            { id: "8", name: "Classic Leather Belt – Timeless Elegance", price: 129.99, image: "/images/Belt.avif" },
            { id: "9", name: "Elegant Step: Premium Women's Fashion Shoes", price: 89.99, image: "/images/women shoes.avif" },
            { id: "10", name: "Midnight Elegance: Stylish Women's Nightwear Collection", price: 74.99, image: "/images/nightwear.avif", badge: "New" },
            { id: "11", name: "Casual Summer Dress", price: 59.99, image: "/images/Casual Summer Dress.avif" },
            { id: "12", name: "In the Cold Season, Trust Your Clothes!", price: 129.99, image: "/images/Cold Weather Clothes.avif" },
            { id: "13", name: "Bold Edge Cap – Street Fashion Favorite", price: 89.99, image: "/images/cap.avif" },
            { id: "14", name: "Summer Shade Bucket Hat", price: 79.99, image: "/images/Bucket Hat.avif" },
            { id: "15", name: "Leather Wallet", price: 49.99, image: "/images/Leather Wallet.avif" },
            { id: "16", name: "Black Evening Dress", price: 189, image: "/images/Black Evening Dress22.avif" }
        ];
        
        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize cart counter
            updateCartCounter();
            
            // Initialize auth state
            initAuthState();
            
            // Add to cart buttons
            document.addEventListener('click', function(e) {
                if (e.target.classList.contains('add-to-cart-btn') || e.target.closest('.add-to-cart-btn')) {
                    const button = e.target.closest('.add-to-cart-btn');
                    const id = button.getAttribute('data-id');
                    const name = button.getAttribute('data-name');
                    const price = parseFloat(button.getAttribute('data-price'));
                    const image = button.getAttribute('data-image');
                    
                    addToCart(id, name, price, image);
                }
                
                // Quick view buttons
                if (e.target.classList.contains('quick-view-btn') || e.target.closest('.quick-view-btn')) {
                    const button = e.target.closest('.quick-view-btn');
                    const id = button.getAttribute('data-id');
                    const name = button.getAttribute('data-name');
                    const price = button.getAttribute('data-price');
                    const image = button.getAttribute('data-image');
                    
                    showProductDetail(id, name, price, image);
                }
                
                // Cart quantity adjustment
                if (e.target.classList.contains('cart-decrement')) {
                    const button = e.target.closest('.cart-decrement');
                    const id = button.getAttribute('data-id');
                    updateCartItemQuantity(id, -1);
                }
                
                if (e.target.classList.contains('cart-increment')) {
                    const button = e.target.closest('.cart-increment');
                    const id = button.getAttribute('data-id');
                    updateCartItemQuantity(id, 1);
                }
                
                // Remove item from cart
                if (e.target.classList.contains('cart-remove') || e.target.closest('.cart-remove')) {
                    const button = e.target.closest('.cart-remove');
                    const id = button.getAttribute('data-id');
                    removeFromCart(id);
                }
            });
            
            // Contact form submission
            document.getElementById('contactForm').addEventListener('submit', function(e) {
                e.preventDefault();
                showNotification('success', 'Your message has been sent successfully!');
                this.reset();
            });
            
            // Shop filters
            document.getElementById('applyFiltersBtn').addEventListener('click', loadShopProducts);
            document.getElementById('sortSelect').addEventListener('change', loadShopProducts);
            
            // Pagination
            document.getElementById('prevPage').addEventListener('click', function() {
                if (currentPage > 1) {
                    currentPage--;
                    loadShopProducts();
                }
            });
            
            document.getElementById('nextPage').addEventListener('click', function() {
                if (currentPage < Math.ceil(shopProducts.length / productsPerPage)) {
                    currentPage++;
                    loadShopProducts();
                }
            });
            
            document.querySelectorAll('#pagination .page-link').forEach(link => {
                if (link.id !== 'prevPage' && link.id !== 'nextPage') {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        currentPage = parseInt(this.getAttribute('data-page'));
                        loadShopProducts();
                    });
                }
            });
            
            // Proceed to checkout button
            document.getElementById('proceedToCheckoutBtn').addEventListener('click', function() {
                // Check if cart is empty
                if (cart.length === 0) {
                    showNotification('error', 'Your cart is empty! Add items before proceeding to checkout.');
                    return;
                }
                
                // Check if user is logged in
                if (!userProfile.isLoggedIn) {
                    showNotification('warning', 'You need to log in to proceed to checkout.');
                    const authModal = new bootstrap.Modal(document.getElementById('authModal'));
                    authModal.show();
                    return;
                }
                
                // Proceed to checkout
                showPage('checkout');
            });
            
            // Show welcome notification
            showNotification('success', 'Welcome to Boos Clothes!');
            showNotification('info', 'New summer collection is now available. Check it out!');
            
            // Load initial data
            loadShopProducts();
            updateCartPage();
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                const dropdown = document.getElementById('authDropdown');
                if (dropdown.classList.contains('active') && !e.target.closest('.auth-btn')) {
                    dropdown.classList.remove('active');
                }
            });
            
            // Set up product detail modal add to cart button
            document.getElementById('addToCartFromModal').addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const name = this.getAttribute('data-name');
                const price = parseFloat(this.getAttribute('data-price'));
                const image = this.getAttribute('data-image');
                
                addToCart(id, name, price, image);
                
                // Close modal
                const productModal = bootstrap.Modal.getInstance(document.getElementById('productDetailModal'));
                productModal.hide();
            });
        });
        
        // Toggle auth dropdown
        function toggleAuthDropdown(e) {
            e.preventDefault();
            const dropdown = document.getElementById('authDropdown');
            dropdown.classList.toggle('active');
        }
        
        // Initialize authentication state
        function initAuthState() {
            // Check if user is logged in
            const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
            userProfile.isLoggedIn = loggedIn;
            
            // Update UI based on auth state
            updateAuthUI();
        }
        
        // Update authentication UI
        function updateAuthUI() {
            const logoutBtn = document.getElementById('logoutBtn');
            
            if (userProfile.isLoggedIn) {
                // Show logout button
                logoutBtn.style.display = 'block';
            } else {
                // Hide logout button
                logoutBtn.style.display = 'none';
            }
        }
        
        // Show login form
        function showLoginForm() {
            document.getElementById('loginForm').style.display = 'block';
            document.getElementById('registerForm').style.display = 'none';
            document.getElementById('authModalTitle').textContent = 'Login to Your Account';
            
            // Update tabs
            document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.auth-tab')[0].classList.add('active');
        }
        
        // Show register form
        function showRegisterForm() {
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('registerForm').style.display = 'block';
            document.getElementById('authModalTitle').textContent = 'Create New Account';
            
            // Update tabs
            document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.auth-tab')[1].classList.add('active');
        }
        
        // Toggle password visibility
        function togglePasswordVisibility(fieldId) {
            const passwordField = document.getElementById(fieldId);
            const toggleIcon = passwordField.nextElementSibling.querySelector('i');
            
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                toggleIcon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                passwordField.type = 'password';
                toggleIcon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        }
        
        // Validate login form
        function validateLoginForm() {
            let isValid = true;
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;
            
            // Reset errors
            document.getElementById('loginEmailError').textContent = '';
            document.getElementById('loginPasswordError').textContent = '';
            document.getElementById('loginEmail').classList.remove('is-invalid');
            document.getElementById('loginPassword').classList.remove('is-invalid');
            
            // Validate email
            if (!email) {
                document.getElementById('loginEmailError').textContent = 'Email is required';
                document.getElementById('loginEmail').classList.add('is-invalid');
                isValid = false;
            } else if (!validateEmail(email)) {
                document.getElementById('loginEmailError').textContent = 'Please enter a valid email address';
                document.getElementById('loginEmail').classList.add('is-invalid');
                isValid = false;
            }
            
            // Validate password
            if (!password) {
                document.getElementById('loginPasswordError').textContent = 'Password is required';
                document.getElementById('loginPassword').classList.add('is-invalid');
                isValid = false;
            } else if (password.length < 6) {
                document.getElementById('loginPasswordError').textContent = 'Password must be at least 6 characters';
                document.getElementById('loginPassword').classList.add('is-invalid');
                isValid = false;
            }
            
            return isValid;
        }
        
        // Validate register form
        function validateRegisterForm() {
            let isValid = true;
            const name = document.getElementById('registerName').value.trim();
            const email = document.getElementById('registerEmail').value.trim();
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfirmPassword').value;
            
            // Reset errors
            document.getElementById('registerNameError').textContent = '';
            document.getElementById('registerEmailError').textContent = '';
            document.getElementById('registerPasswordError').textContent = '';
            document.getElementById('registerConfirmPasswordError').textContent = '';
            document.getElementById('registerName').classList.remove('is-invalid');
            document.getElementById('registerEmail').classList.remove('is-invalid');
            document.getElementById('registerPassword').classList.remove('is-invalid');
            document.getElementById('registerConfirmPassword').classList.remove('is-invalid');
            
            // Validate name
            if (!name) {
                document.getElementById('registerNameError').textContent = 'Full name is required';
                document.getElementById('registerName').classList.add('is-invalid');
                isValid = false;
            }
            
            // Validate email
            if (!email) {
                document.getElementById('registerEmailError').textContent = 'Email is required';
                document.getElementById('registerEmail').classList.add('is-invalid');
                isValid = false;
            } else if (!validateEmail(email)) {
                document.getElementById('registerEmailError').textContent = 'Please enter a valid email address';
                document.getElementById('registerEmail').classList.add('is-invalid');
                isValid = false;
            }
            
            // Validate password
            if (!password) {
                document.getElementById('registerPasswordError').textContent = 'Password is required';
                document.getElementById('registerPassword').classList.add('is-invalid');
                isValid = false;
            } else if (password.length < 8) {
                document.getElementById('registerPasswordError').textContent = 'Password must be at least 8 characters';
                document.getElementById('registerPassword').classList.add('is-invalid');
                isValid = false;
            }
            
            // Validate confirm password
            if (!confirmPassword) {
                document.getElementById('registerConfirmPasswordError').textContent = 'Please confirm your password';
                document.getElementById('registerConfirmPassword').classList.add('is-invalid');
                isValid = false;
            } else if (password !== confirmPassword) {
                document.getElementById('registerConfirmPasswordError').textContent = 'Passwords do not match';
                document.getElementById('registerConfirmPassword').classList.add('is-invalid');
                isValid = false;
            }
            
            // Validate terms
            if (!document.getElementById('acceptTerms').checked) {
                showNotification('warning', 'Please agree to the Terms of Service and Privacy Policy');
                isValid = false;
            }
            
            return isValid;
        }
        
        // Email validation helper
        function validateEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        
        // Login user
        function loginUser() {
            if (!validateLoginForm()) return;
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Set user as logged in
            userProfile.isLoggedIn = true;
            localStorage.setItem('isLoggedIn', 'true');
            
            // Close modal
            const authModal = bootstrap.Modal.getInstance(document.getElementById('authModal'));
            authModal.hide();
            
            // Update UI
            updateAuthUI();
            
            showNotification('success', 'You have successfully logged in!');
        }
        
        // Register user
        function registerUser() {
            if (!validateRegisterForm()) return;
            
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            
            // Set user as logged in
            userProfile.isLoggedIn = true;
            localStorage.setItem('isLoggedIn', 'true');
            
            // Update user profile
            const nameParts = name.split(' ');
            userProfile.firstName = nameParts[0] || '';
            userProfile.lastName = nameParts.slice(1).join(' ') || '';
            userProfile.email = email;
            
            // Close modal
            const authModal = bootstrap.Modal.getInstance(document.getElementById('authModal'));
            authModal.hide();
            
            // Update UI
            updateAuthUI();
            
            showNotification('success', 'Account created successfully! You are now logged in.');
        }
        
        // Social login
        function socialLogin(provider) {
            showNotification('info', `Signing in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}...`);
            
            // Simulate successful login after delay
            setTimeout(() => {
                userProfile.isLoggedIn = true;
                localStorage.setItem('isLoggedIn', 'true');
                updateAuthUI();
                
                const authModal = bootstrap.Modal.getInstance(document.getElementById('authModal'));
                authModal.hide();
                
                showNotification('success', `You have successfully signed in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}!`);
            }, 1500);
        }
        
        // Logout user
        function logoutUser() {
            userProfile.isLoggedIn = false;
            localStorage.setItem('isLoggedIn', 'false');
            updateAuthUI();
            showNotification('success', 'You have been logged out.');
            document.getElementById('authDropdown').classList.remove('active');
        }
        
        // Show product detail
        function showProductDetail(id, name, price, image) {
            document.getElementById('productDetailTitle').textContent = name;
            document.getElementById('productDetailName').textContent = name;
            document.getElementById('productDetailPrice').textContent = `$${price}`;
            document.getElementById('productDetailImage').src = image;
            
            // Set add to cart button in modal
            const addToCartBtn = document.getElementById('addToCartFromModal');
            addToCartBtn.setAttribute('data-id', id);
            addToCartBtn.setAttribute('data-name', name);
            addToCartBtn.setAttribute('data-price', price);
            addToCartBtn.setAttribute('data-image', image);
            
            // Show modal
            const productModal = new bootstrap.Modal(document.getElementById('productDetailModal'));
            productModal.show();
        }
        
        // Add to cart function
        function addToCart(id, name, price, image) {
            // Check if item already in cart
            const existingItem = cart.find(item => item.id === id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: id,
                    name: name,
                    price: price,
                    image: image,
                    quantity: 1
                });
            }
            
            // Update cart counter
            updateCartCounter();
            
            // Show notification
            showNotification('success', `${name} added to cart!`);
        }
        
        // Update cart item quantity
        function updateCartItemQuantity(id, change) {
            const item = cart.find(item => item.id === id);
            
            if (item) {
                item.quantity += change;
                
                if (item.quantity <= 0) {
                    removeFromCart(id);
                } else {
                    updateCartPage();
                    updateCartCounter();
                }
            }
        }
        
        // Remove from cart
        function removeFromCart(id) {
            cart = cart.filter(item => item.id !== id);
            updateCartPage();
            updateCartCounter();
            showNotification('info', 'Item removed from cart!');
        }
        
        // Update cart counter
        function updateCartCounter() {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            document.getElementById('cartCounter').textContent = totalItems;
            document.getElementById('mobileCartCounter').textContent = totalItems;
        }
        
        // Update cart page
        function updateCartPage() {
            const container = document.getElementById('cartItemsContainer');
            const itemCount = document.getElementById('cartItemCount');
            const subtotalEl = document.getElementById('cartSubtotal');
            const shippingEl = document.getElementById('cartShipping');
            const taxEl = document.getElementById('cartTax');
            const discountEl = document.getElementById('cartDiscount');
            const totalEl = document.getElementById('cartTotal');
            
            // Update cart items
            container.innerHTML = '';
            
            if (cart.length === 0) {
                container.innerHTML = '<p class="text-center py-4">Your cart is empty</p>';
                itemCount.textContent = '0 items';
                subtotalEl.textContent = '$0.00';
                shippingEl.textContent = '$0.00';
                taxEl.textContent = '$0.00';
                discountEl.textContent = '$0.00';
                totalEl.textContent = '$0.00';
                return;
            }
            
            let cartHTML = '';
            let subtotal = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                
                cartHTML += `
                    <div class="cart-item mb-4 pb-4 border-bottom">
                        <div class="row">
                            <div class="col-md-2">
                                <img src="${item.image}" alt="${item.name}" class="img-fluid rounded-3">
                            </div>
                            <div class="col-md-5">
                                <h6>${item.name}</h6>
                                <p class="text-muted mb-0">Size: M</p>
                                <p class="text-muted mb-0">Color: Blue</p>
                            </div>
                            <div class="col-md-3">
                                <div class="d-flex align-items-center">
                                    <button class="btn btn-sm btn-outline-secondary px-3 cart-decrement" data-id="${item.id}">-</button>
                                    <input type="text" class="form-control form-control-sm text-center mx-2" value="${item.quantity}" style="max-width: 50px;" readonly>
                                    <button class="btn btn-sm btn-outline-secondary px-3 cart-increment" data-id="${item.id}">+</button>
                                </div>
                            </div>
                            <div class="col-md-2 text-end">
                                <h6>$${itemTotal.toFixed(2)}</h6>
                                <button class="btn btn-sm btn-outline-danger cart-remove" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            container.innerHTML = cartHTML;
            itemCount.textContent = `${cart.reduce((sum, item) => sum + item.quantity, 0)} items`;
            
            // Calculate totals
            const shipping = 5.99;
            const tax = subtotal * 0.1;
            const discount = 10.00;
            const total = subtotal + shipping + tax - discount;
            
            subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
            shippingEl.textContent = `$${shipping.toFixed(2)}`;
            taxEl.textContent = `$${tax.toFixed(2)}`;
            discountEl.textContent = `-$${discount.toFixed(2)}`;
            totalEl.textContent = `$${total.toFixed(2)}`;
        }
        
        // Load shop products
        function loadShopProducts() {
            const container = document.getElementById('shopProducts');
            const countElement = document.getElementById('productCount');
            const pagination = document.getElementById('pagination');
            const prevButton = document.getElementById('prevPage');
            const nextButton = document.getElementById('nextPage');
            
            // Calculate pagination
            const startIndex = (currentPage - 1) * productsPerPage;
            const endIndex = Math.min(startIndex + productsPerPage, shopProducts.length);
            const paginatedProducts = shopProducts.slice(startIndex, endIndex);
            
            // Update product count
            countElement.textContent = `${shopProducts.length} products`;
            
            // Generate products HTML
            let productsHTML = '';
            
            paginatedProducts.forEach(product => {
                productsHTML += `
                    <div class="col-md-4 col-sm-6 mb-4">
                        <div class="product-card">
                            <div style="position: relative;">
                                <img src="${product.image}" alt="Product" class="product-img">
                                ${product.badge ? `<span class="product-badge badge-${product.badge === 'Bestseller' ? 'popular' : product.badge.toLowerCase()}">${product.badge}</span>` : ''}
                            </div>
                            <div class="product-info">
                                <h5 class="product-title">${product.name}</h5>
                                <p class="product-price">$${product.price.toFixed(2)}</p>
                                <div class="d-flex justify-content-between">
                                    <button class="btn btn-danger add-to-cart-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">Add to Cart</button>
                                    <button class="btn btn-outline-dark quick-view-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">View</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            container.innerHTML = productsHTML;
            
            // Update pagination
            const totalPages = Math.ceil(shopProducts.length / productsPerPage);
            prevButton.parentElement.classList.toggle('disabled', currentPage === 1);
            nextButton.parentElement.classList.toggle('disabled', currentPage === totalPages);
            
            // Update page numbers
            const pageItems = pagination.querySelectorAll('.page-item');
            pageItems.forEach(item => {
                if (item.querySelector('.page-link') !== prevButton && item.querySelector('.page-link') !== nextButton) {
                    item.remove();
                }
            });
            
            for (let i = 1; i <= totalPages; i++) {
                const pageItem = document.createElement('li');
                pageItem.className = `page-item ${i === currentPage ? 'active' : ''}`;
                pageItem.innerHTML = `<a class="page-link" href="#" data-page="${i}">${i}</a>`;
                nextButton.parentElement.parentElement.insertBefore(pageItem, nextButton.parentElement);
            }
        }
        
        // Show notification
        function showNotification(type, message) {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            
            let icon = '';
            switch(type) {
                case 'success':
                    icon = 'fas fa-check-circle';
                    break;
                case 'error':
                    icon = 'fas fa-exclamation-circle';
                    break;
                case 'warning':
                    icon = 'fas fa-exclamation-triangle';
                    break;
                case 'info':
                    icon = 'fas fa-info-circle';
                    break;
                default:
                    icon = 'fas fa-bell';
            }
            
            notification.innerHTML = `
                <div class="d-flex align-items-start">
                    <i class="${icon} notification-icon"></i>
                    <div class="notification-content">
                        <div class="notification-title">${message}</div>
                    </div>
                    <button class="notification-close" onclick="this.parentElement.remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            
            // Add to container
            const container = document.getElementById('notificationContainer');
            container.appendChild(notification);
            
            // Remove after 5 seconds
            setTimeout(() => {
                notification.remove();
            }, 5000);
        }
        
        // Checkout functions
        function nextStep(step) {
            // Check if user is logged in
            if (!userProfile.isLoggedIn) {
                document.getElementById('loginRequiredMessage').style.display = 'block';
                return;
            } else {
                document.getElementById('loginRequiredMessage').style.display = 'none';
            }
            
            // Hide all form sections
            document.querySelectorAll('.form-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show the next section
            document.getElementById(`${step}Section`).classList.add('active');
            
            // Update step indicator
            document.querySelectorAll('.step').forEach(step => {
                step.classList.remove('active');
            });
            
            if (step === 'payment') {
                document.querySelectorAll('.step')[1].classList.add('active');
            } else if (step === 'review') {
                document.querySelectorAll('.step')[2].classList.add('active');
            }
        }
        
        function prevStep(step) {
            // Hide all form sections
            document.querySelectorAll('.form-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show the previous section
            document.getElementById(`${step}Section`).classList.add('active');
            
            // Update step indicator
            document.querySelectorAll('.step').forEach(step => {
                step.classList.remove('active');
            });
            
            if (step === 'shipping') {
                document.querySelectorAll('.step')[0].classList.add('active');
            } else if (step === 'payment') {
                document.querySelectorAll('.step')[1].classList.add('active');
            }
        }
        
        function selectPayment(element, type) {
            // Remove selected class from all options
            document.querySelectorAll('.payment-option').forEach(option => {
                option.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            element.classList.add('selected');
            
            // Check the radio button
            document.getElementById(`${type}Payment`).checked = true;
            
            // Show payment details
            const ethiopianDetails = document.getElementById('ethiopianPaymentDetails');
            const cardDetails = document.getElementById('cardDetails');
            
            ethiopianDetails.style.display = type === 'ethiopian' ? 'block' : 'none';
            cardDetails.style.display = type === 'card' ? 'block' : 'none';
        }
        
        function previewImage(event) {
            const input = event.target;
            const preview = document.getElementById('uploadPreview');
            
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    preview.src = e.target.result;
                    preview.style.display = 'block';
                }
                
                reader.readAsDataURL(input.files[0]);
                
                // Update upload area text
                document.getElementById('uploadArea').innerHTML = `
                    <img src="${URL.createObjectURL(input.files[0])}" class="upload-preview" alt="Preview">
                    <p class="mt-2">Click to change image</p>
                `;
            }
        }
        
        function placeOrder() {
            // Check if cart is empty
            if (cart.length === 0) {
                showNotification('error', 'Your cart is empty! Add items before placing an order.');
                return;
            }
            
            // Get selected payment method
            let paymentMethod = '';
            if (document.getElementById('cardPayment').checked) {
                paymentMethod = 'Credit Card';
            } else if (document.getElementById('ethiopianPayment').checked) {
                paymentMethod = 'Ethiopian Payment';
            }
            
            // Clear cart
            cart = [];
            updateCartCounter();
            updateCartPage();
            
            // Show success notification
            showNotification('success', 'Your order has been placed successfully!');
            
            // Redirect to home after 3 seconds
            setTimeout(() => {
                showPage('home');
            }, 3000);
        }
        
        function markAllAsRead() {
            document.querySelectorAll('.notification-item.unread').forEach(item => {
                item.classList.remove('unread');
            });
            document.getElementById('notifCounter').textContent = '0';
            document.getElementById('mobileNotifCounter').textContent = '0';
        }
        // Video play functionality
    document.addEventListener('DOMContentLoaded', function() {
        const videoContainer = document.querySelector('.video-container');
        const video = document.querySelector('.video-container video');
        const playBtn = document.querySelector('.play-btn');
        const overlay = document.querySelector('.video-overlay');
        
        if (playBtn && video) {
            playBtn.addEventListener('click', function() {
                video.play();
                videoContainer.classList.add('playing');
            });
            
            overlay.addEventListener('click', function() {
                video.play();
                videoContainer.classList.add('playing');
            });
            
            video.addEventListener('play', function() {
                videoContainer.classList.add('playing');
            });
            
            video.addEventListener('pause', function() {
                videoContainer.classList.remove('playing');
            });
        }
    });
    
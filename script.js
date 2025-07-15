document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.innerHTML = mainNav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Carrusel de imágenes
    function initCarousel() {
        const carousel = document.querySelector('.carousel');
        if (!carousel) return;

        const inner = carousel.querySelector('.carousel-inner');
        const items = carousel.querySelectorAll('.carousel-item');
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');
        const indicatorsContainer = carousel.querySelector('.carousel-indicators');
        
        let currentIndex = 0;
        let intervalId;
        const intervalTime = 5000; // 5 segundos
        
        // Crear indicadores
        items.forEach((_, index) => {
            const indicator = document.createElement('span');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
        
        const indicators = indicatorsContainer.querySelectorAll('span');
        
        function updateCarousel() {
            inner.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Actualizar clases activas
            items.forEach(item => item.classList.remove('active'));
            items[currentIndex].classList.add('active');
            
            // Actualizar indicadores
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        }
        
        function goToSlide(index) {
            currentIndex = (index + items.length) % items.length;
            updateCarousel();
            resetInterval();
        }
        
        function nextSlide() {
            goToSlide(currentIndex + 1);
        }
        
        function prevSlide() {
            goToSlide(currentIndex - 1);
        }
        
        function startInterval() {
            intervalId = setInterval(nextSlide, intervalTime);
        }
        
        function resetInterval() {
            clearInterval(intervalId);
            startInterval();
        }
        
        // Event listeners
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
        
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });
        
        // Eventos táctiles para móviles
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                nextSlide(); // Deslizar izquierda
            } else if (touchEndX > touchStartX + 50) {
                prevSlide(); // Deslizar derecha
            }
            resetInterval();
        }
        
        // Iniciar
        updateCarousel();
        startInterval();
        
        // Pausar al hacer hover
        carousel.addEventListener('mouseenter', () => clearInterval(intervalId));
        carousel.addEventListener('mouseleave', startInterval);
    }

    // Inicializar carrusel
    initCarousel();
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    console.log('Página Agro Ganadero cargada correctamente');
});

document.addEventListener('DOMContentLoaded', function() {
    // Mostrar/ocultar contraseña
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }

    // Validación del formulario
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            
            if (!email || !password) {
                showAlert('Por favor completa todos los campos', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showAlert('Por favor ingresa un email válido', 'error');
                return;
            }
            
            // Simulación de envío (en un caso real sería una petición AJAX)
            showAlert('Iniciando sesión...', 'success');
            
            // Simular redirección después de 1.5 segundos
            setTimeout(() => {
                window.location.href = 'dashboard.html'; // Cambiar por tu página de destino
            }, 1500);
        });
    }
    
    // Validar formato de email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Mostrar mensaje de alerta
    function showAlert(message, type) {
        // Eliminar alertas previas
        const oldAlert = document.querySelector('.alert');
        if (oldAlert) oldAlert.remove();
        
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        
        // Insertar después del encabezado
        const header = document.querySelector('.login-header');
        if (header) {
            header.insertAdjacentElement('afterend', alert);
            
            // Eliminar después de 3 segundos
            setTimeout(() => {
                alert.remove();
            }, 3000);
        }
    }
    
    // Menú móvil (si no está en el JS principal)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.innerHTML = mainNav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
});
 // funciones de registres


document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad para mostrar/ocultar contraseña
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
    button.addEventListener('click', function() {
        const input = this.parentNode.querySelector('input');
        const icon = this.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.replace('fa-eye', 'fa-eye-slash');
            this.setAttribute('aria-label', 'Ocultar contraseña');
        } else {
            input.type = 'password';  // Eliminé la línea duplicada que estaba aquí
            icon.classList.replace('fa-eye-slash', 'fa-eye');
            this.setAttribute('aria-label', 'Mostrar contraseña');
        }
        
        input.focus();
    });
});

    // Medidor de seguridad de contraseña
    const passwordInput = document.getElementById('password');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthLevel = document.getElementById('strengthLevel');
    
    if (passwordInput && strengthBar && strengthLevel) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = calculatePasswordStrength(password);
            
            // Actualizar barra de progreso
            strengthBar.style.width = strength.percentage + '%';
            strengthBar.style.backgroundColor = strength.color;
            
            // Actualizar texto
            strengthLevel.textContent = strength.text;
            strengthLevel.style.color = strength.color;
        });
    }

    // Función para calcular la fuerza de la contraseña
    function calculatePasswordStrength(password) {
        let strength = 0;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isLongEnough = password.length >= 8;
        
        // Puntos por cada criterio cumplido
        if (hasUpperCase) strength += 20;
        if (hasLowerCase) strength += 20;
        if (hasNumbers) strength += 20;
        if (hasSpecialChars) strength += 20;
        if (isLongEnough) strength += 20;
        
        // Determinar nivel de seguridad
        if (password.length === 0) {
            return {
                percentage: 0,
                color: '#e74c3c',
                text: 'Débil'
            };
        } else if (strength < 40) {
            return {
                percentage: 33,
                color: '#e74c3c',
                text: 'Débil'
            };
        } else if (strength < 80) {
            return {
                percentage: 66,
                color: '#f39c12',
                text: 'Moderada'
            };
        } else {
            return {
                percentage: 100,
                color: '#2ecc71',
                text: 'Fuerte'
            };
        }
    }

    // Validación de confirmación de contraseña
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordMatchFeedback = document.getElementById('passwordMatch');
    
    if (passwordInput && confirmPasswordInput && passwordMatchFeedback) {
        confirmPasswordInput.addEventListener('input', function() {
            if (this.value.length === 0) {
                passwordMatchFeedback.textContent = '';
                passwordMatchFeedback.style.color = '';
            } else if (this.value === passwordInput.value) {
                passwordMatchFeedback.textContent = '✓ Las contraseñas coinciden';
                passwordMatchFeedback.style.color = '#2ecc71';
            } else {
                passwordMatchFeedback.textContent = '✗ Las contraseñas no coinciden';
                passwordMatchFeedback.style.color = '#e74c3c';
            }
        });
    }

    // Validación del formulario
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validaciones básicas
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const userType = document.getElementById('userType').value;
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            const termsChecked = document.getElementById('terms').checked;
            
            // Validar campos vacíos
            if (!firstName || !lastName || !email || !userType || !password || !confirmPassword) {
                showAlert('Por favor completa todos los campos', 'error');
                return;
            }
            
            // Validar email
            if (!validateEmail(email)) {
                showAlert('Por favor ingresa un email válido', 'error');
                return;
            }
            
            // Validar contraseñas coincidentes
            if (password !== confirmPassword) {
                showAlert('Las contraseñas no coinciden', 'error');
                return;
            }
            
            // Validar términos
            if (!termsChecked) {
                showAlert('Debes aceptar los términos y condiciones', 'error');
                return;
            }
            
            // Simular envío del formulario (en producción sería AJAX)
            showAlert('Registro exitoso! Redirigiendo...', 'success');
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        });
    }
    
    // Función para validar email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Función para mostrar alertas
    function showAlert(message, type) {
        // Eliminar alertas previas
        const oldAlert = document.querySelector('.alert');
        if (oldAlert) oldAlert.remove();
        
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        
        const header = document.querySelector('.register-header');
        if (header) {
            header.insertAdjacentElement('afterend', alert);
            
            setTimeout(() => {
                alert.remove();
            }, 3000);
        }
    }
    
    // Menú móvil
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.innerHTML = mainNav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
});
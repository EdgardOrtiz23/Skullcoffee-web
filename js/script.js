document.addEventListener('DOMContentLoaded', () => {
    if (document.body.id === 'productos-page') {
        const cartItems = JSON.parse(localStorage.getItem('skullCoffeeCart')) || [];
        const cartList = document.getElementById('carrito-lista');
        const cartTotalSpan = document.getElementById('carrito-total');
        const addToCartButtons = document.querySelectorAll('.add-to-cart');

        const updateCartDisplay = () => {
            cartList.innerHTML = '';
            let total = 0;

            if (cartItems.length === 0) {
                cartList.innerHTML = '<li>El carrito está vacío.</li>';
            } else {
                cartItems.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.textContent = ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)};
                    cartList.appendChild(listItem);
                    total += item.price * item.quantity;
                });
            }
            cartTotalSpan.textContent = total.toFixed(2);
            localStorage.setItem('skullCoffeeCart', JSON.stringify(cartItems));
        };

        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.producto-card');
                const name = card.querySelector('h3').textContent;
                const price = parseFloat(card.dataset.precio);
                const sku = card.dataset.sku;

                const existingItem = cartItems.find(item => item.sku === sku);

                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cartItems.push({ sku, name, price, quantity: 1 });
                }

                alert(¡"${name}" agregado al carrito!);
                updateCartDisplay();
            });
        });

        document.getElementById('checkout-btn')?.addEventListener('click', () => {
            if (cartItems.length > 0) {
                alert(Procediendo al pago de $${cartTotalSpan.textContent}. Gracias por apoyar a Skull Coffee localmente!);
            } else {
                alert('Tu carrito está vacío. Agrega un producto primero.');
            }
        });

        updateCartDisplay();
    }

    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const mensaje = document.getElementById('mensaje').value;

            if (nombre.trim() === '' || email.trim() === '' || mensaje.trim() === '') {
                formMessage.className = 'error';
                formMessage.textContent = 'Por favor, rellena todos los campos obligatorios.';
                formMessage.classList.remove('hidden');
                return;
            }

            console.log('Datos del formulario enviados:', { nombre, email, mensaje });

            formMessage.className = 'success';
            formMessage.textContent = ¡Gracias, ${nombre}! Tu mensaje ha sido enviado. Te contactaremos pronto.;
            formMessage.classList.remove('hidden');

            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 5000);

            contactForm.reset();
        });
    }

    const themeButton = document.getElementById('toggle-theme-btn');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let currentTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.remove('light-theme');
            themeButton.textContent = 'Cambiar a Tema Claro';
        } else {
            document.body.classList.add('light-theme');
            themeButton.textContent = 'Cambiar a Tema Oscuro';
        }
        localStorage.setItem('theme', theme);
    };

    applyTheme(currentTheme);

    themeButton.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(currentTheme);
    });
});
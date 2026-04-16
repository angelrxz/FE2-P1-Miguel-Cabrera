document.addEventListener('DOMContentLoaded', () => {
  // Carrito de compras
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Elementos del DOM
  const addToCartBtn = document.querySelector('.action-button.secondary');
  const buyNowBtn = document.querySelector('.action-button.primary');
  const cartBtn = document.querySelector('.cart-button');
  const profileBtn = document.getElementById('profile-btn');
  const checkoutModal = document.getElementById('checkout-modal');
  const profileModal = document.getElementById('profile-modal');
  const closeBtns = document.querySelectorAll('.close');
  const checkoutForm = document.getElementById('checkout-form');
  const profileForm = document.getElementById('profile-form');
  const cartPreview = document.getElementById('cart-preview');

  // Agregar al carrito
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      const product = {
        name: 'Samsung Galaxy S26 Ultra',
        price: 1299,
        quantity: 1
      };
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartPreview();
      alert('Producto agregado al carrito');
    });
  }

  // Comprar ahora
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', () => {
      checkoutModal.style.display = 'block';
    });
  }

  // Abrir modal de perfil
  if (profileBtn) {
    profileBtn.addEventListener('click', () => {
      profileModal.style.display = 'block';
    });
  }

  // Carrito button
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      window.location.href = 'cart.html';
    });
  }

  // Cerrar modales
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (checkoutModal) checkoutModal.style.display = 'none';
      if (profileModal) profileModal.style.display = 'none';
    });
  });

  // Cerrar modal al hacer click fuera
  window.addEventListener('click', (event) => {
    if (checkoutModal && event.target == checkoutModal) {
      checkoutModal.style.display = 'none';
    }
    if (profileModal && event.target == profileModal) {
      profileModal.style.display = 'none';
    }
  });

  // Enviar formulario de checkout
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Pago procesado exitosamente');
      checkoutModal.style.display = 'none';
    });
  }

  // Enviar formulario de perfil
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const firstName = document.getElementById('first-name').value;
      const lastName = document.getElementById('last-name').value;
      alert(`Cuenta creada para ${firstName} ${lastName}`);
      profileModal.style.display = 'none';
    });
  }

  // Actualizar preview del carrito
  function updateCartPreview() {
    if (!cartPreview) return;
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.textContent = `(${cart.length})`;
    cartPreview.innerHTML = '';
    if (cart.length === 0) {
      cartPreview.innerHTML = '<p>Carrito vacío</p>';
    } else {
      cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `<span>${item.name}</span><span>$${item.price}</span>`;
        cartPreview.appendChild(itemDiv);
      });
      const viewCartBtn = document.createElement('button');
      viewCartBtn.className = 'action-button primary';
      viewCartBtn.textContent = 'Ver Carrito';
      viewCartBtn.addEventListener('click', () => {
        window.location.href = 'cart.html';
      });
      cartPreview.appendChild(viewCartBtn);
    }
  }

  // Para la página del carrito
  if (window.location.pathname.includes('cart.html')) {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');

    function renderCart() {
      cartItems.innerHTML = '';
      let total = 0;
      cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
          <span>${item.name}</span>
          <span>$${item.price}</span>
          <span>Cantidad: ${item.quantity}</span>
          <button onclick="removeFromCart(${index})" class="remove-btn">Eliminar</button>
        `;
        cartItems.appendChild(itemDiv);
      });
      totalPrice.textContent = total;
    }

    window.removeFromCart = function(index) {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    };

    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        alert('Procediendo al pago...');
      });
    }

    renderCart();
  }

  // Inicializar
  updateCartPreview();
});</content>
<parameter name="filePath">t:\FE2-P1-Miguel-Cabrera\cart.html
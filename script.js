document.addEventListener('DOMContentLoaded', () => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const addToCartBtn = document.getElementById('add-cart-btn');
  const buyNowBtn = document.getElementById('buy-now-btn');
  const cartDropdownBtn = document.getElementById('cart-dropdown-btn');
  const profileBtn = document.getElementById('profile-btn');
  const checkoutModal = document.getElementById('checkout-modal');
  const profileModal = document.getElementById('profile-modal');
  const closeBtns = document.querySelectorAll('.close');
  const checkoutForm = document.getElementById('checkout-form');
  const profileForm = document.getElementById('profile-form');
  const cartPreview = document.getElementById('cart-preview');
  const cartCountElement = document.getElementById('cart-count');
  const backHomeBtn = document.getElementById('cart-home-btn');

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function getProduct() {
    return {
      name: 'TELEFONO X PLUS',
      price: 1299,
      quantity: 1
    };
  }

  function updateCartPreview() {
    if (!cartPreview || !cartCountElement) return;

    cartCountElement.textContent = cart.length;
    cartPreview.innerHTML = '';

    if (cart.length === 0) {
      cartPreview.innerHTML = '<p>Carrito vacío</p>';
      return;
    }

    cart.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'cart-item';
      itemDiv.innerHTML = `<span>${item.name}</span><span>$${item.price}</span>`;
      cartPreview.appendChild(itemDiv);
    });

    const viewCartBtn = document.createElement('button');
    viewCartBtn.className = 'action-button primary';
    viewCartBtn.textContent = 'Ver carrito';
    viewCartBtn.addEventListener('click', () => {
      window.location.href = 'cart.html';
    });

    const previewFooter = document.createElement('div');
    previewFooter.className = 'cart-preview-footer';
    previewFooter.appendChild(viewCartBtn);
    cartPreview.appendChild(previewFooter);
  }

  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      cart.push(getProduct());
      saveCart();
      updateCartPreview();
      alert('Producto agregado al carrito');
    });
  }

  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', () => {
      if (checkoutModal) checkoutModal.style.display = 'block';
    });
  }

  if (profileBtn) {
    profileBtn.addEventListener('click', () => {
      if (profileModal) profileModal.style.display = 'block';
    });
  }

  if (cartDropdownBtn && cartPreview) {
    cartDropdownBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      cartPreview.classList.toggle('active');
    });
  }

  if (backHomeBtn) {
    backHomeBtn.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (checkoutModal) checkoutModal.style.display = 'none';
      if (profileModal) profileModal.style.display = 'none';
    });
  });

  window.addEventListener('click', (event) => {
    if (checkoutModal && event.target === checkoutModal) {
      checkoutModal.style.display = 'none';
    }
    if (profileModal && event.target === profileModal) {
      profileModal.style.display = 'none';
    }
    if (cartPreview && cartDropdownBtn && event.target !== cartPreview && event.target !== cartDropdownBtn) {
      cartPreview.classList.remove('active');
    }
  });

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Pago procesado exitosamente');
      if (checkoutModal) checkoutModal.style.display = 'none';
    });
  }

  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const firstName = document.getElementById('first-name').value;
      const lastName = document.getElementById('last-name').value;
      alert(`Cuenta creada para ${firstName} ${lastName}`);
      if (profileModal) profileModal.style.display = 'none';
    });
  }

  function renderCartPage() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cartStatus = document.getElementById('cart-count');

    if (!cartItems || !totalPrice || !checkoutBtn || !cartStatus) return;

    cartItems.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
      cartItems.innerHTML = '<p>Tu carrito está vacío. Agrega productos desde la tienda.</p>';
    } else {
      cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
          <div>
            <strong>${item.name}</strong>
            <p>Cantidad: ${item.quantity}</p>
          </div>
          <div class="cart-item-actions">
            <span>$${item.price}</span>
            <button class="remove-btn" data-index="${index}">Eliminar</button>
          </div>
        `;
        cartItems.appendChild(itemDiv);
      });
    }

    totalPrice.textContent = total.toFixed(2);
    cartStatus.textContent = cart.length;

    cartItems.querySelectorAll('.remove-btn').forEach(button => {
      button.addEventListener('click', (event) => {
        const index = Number(event.currentTarget.dataset.index);
        cart.splice(index, 1);
        saveCart();
        renderCartPage();
        updateCartPreview();
      });
    });

    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Tu carrito está vacío. Agrega un producto antes de pagar.');
        return;
      }
      if (checkoutModal) checkoutModal.style.display = 'block';
    });
  }

  updateCartPreview();

  if (window.location.pathname.includes('cart.html')) {
    renderCartPage();
  }
});</content>
<parameter name="filePath">t:\FE2-P1-Miguel-Cabrera\cart.html
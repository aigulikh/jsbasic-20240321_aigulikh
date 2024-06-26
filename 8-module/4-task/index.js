import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    //вызов без аргумента / с нулевым аргументом
    if (!product || product === null) {
      return;
    }
    //найти позицию продукта в корзине
    let prodInd = this.cartItems.findIndex(cartItem => cartItem.product.id === product.id);

    if (prodInd >= 0) {
      this.cartItems[prodInd].count++;
    } else {
      this.cartItems.push({product, count: 1});
    }

    this.onProductUpdate(this.cartItems[prodInd]);
  }

  updateProductCount(productId, amount) {

  //найти позицию продукта в корзине
    let prodInd = this.cartItems.findIndex(cartItem => cartItem.product.id === productId);

    if (prodInd < 0) {
      return;
    }

    this.cartItems[prodInd].count += amount;

    if (this.cartItems[prodInd].count === 0) {
      //удалить 1 элемент с найденной позицией
      this.cartItems.splice(prodInd, 1);
    } else {
      this.onProductUpdate(this.cartItems[prodInd]);
    }
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.count * currentValue.product.price , 0)
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    document.body.append(this.modal.elem);
    this.modal.setTitle('Your order');
    this.modal.setBody(this.createCartBodyElement());

    this.productElements = document.querySelectorAll('.cart-product');
    this.subminBtnElement = document.querySelector('.cart-buttons__button.btn-group__button.button');
    this.formElement = document.querySelector('.cart-form');
    this.modalBody = this.modal.bodyElement;
    this.createCartListeners();
  }
  

  onProductUpdate(cartItem) {
    // ...ваш код

    this.cartIcon.update(this);
  }

  onSubmit(event) {
    // ...ваш код
  };

  addEventListeners() {
    this.productElements.forEach(product => product.addEventListener('click', this.productElementClickHandler));
    this.formElement.addEventListener('submit', this.onSubmit);
  }
}


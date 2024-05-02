export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.cartItems = []
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

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
  }
}


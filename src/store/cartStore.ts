import { makeAutoObservable } from "mobx";
import { Starship } from "types/apis.type";

interface CartItem extends Starship {
  quantity: number;
}

class CartStore {
  private cartItems: CartItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addItem(item: Starship) {
    let newItems = [];
    let isExist = false;

    for (const cartItem of this.cartItems) {
      if (cartItem.name === item.name) {
        isExist = true;
        cartItem.quantity++;
      }
      newItems.push(cartItem);
    }

    if (!isExist) {
      newItems.push({ ...item, quantity: 1 });
    }

    this.cartItems = newItems;
  }

  removeItem(item: Starship) {
    let newItems = [];
    let isExist = false;

    for (const cartItem of this.cartItems) {
      if (cartItem.name === item.name) {
        isExist = true;
        cartItem.quantity--;
      }
      if (cartItem.quantity > 0) {
        newItems.push(cartItem);
      }
    }

    this.cartItems = newItems;
  }

  getCart() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
  }

  get totalPrice(): number {
    return this.cartItems.reduce(
      (acc, item) =>
        acc +
        item.quantity * Math.floor(Number(item.cost_in_credits ?? 0) / 10000),
      0
    );
  }

  get totalItems(): number {
    return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }
}

export default CartStore;

import { observer } from "mobx-react";
import { useStore } from "store/rootStore";

const WithCartQuantity = (Component: React.ComponentType<any>) => {
  return observer((props: any) => {
    const { item } = props;
    const [cartStore] = useStore("cartStore");

    const cartItem = cartStore
      .getCart()
      .find((cartItem) => cartItem.name === item.name);

    return (
      <Component
        {...props}
        cartQuantity={cartItem?.quantity || 0}
        addToCart={() => cartStore.addItem(item)}
        removeFromCart={() => cartStore.removeItem(item)}
      />
    );
  });
};

export default WithCartQuantity;

import { createContext, useContext } from "react";
import CartStore from "./cartStore";

class RootStore {
  cartStore: CartStore;

  constructor() {
    this.cartStore = new CartStore(); // this way we can manage multiple stores
  }
}

export default RootStore;

const rootStore = new RootStore();
export const RootStoreContext = createContext<RootStore>(rootStore);

export const RootStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <RootStoreContext.Provider value={rootStore as RootStore}>
      {children}
    </RootStoreContext.Provider>
  );
};

export const useStore = (storeNames: string[] | string) => {
  const storeNamesArray = Array.isArray(storeNames) ? storeNames : [storeNames];
  return storeNamesArray.map((name) => rootStore[name as keyof RootStore]);
};

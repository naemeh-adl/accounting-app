import { createContext, useContext } from "react";
import AccountStore from "./accountStore";
import CommonStore from "./commonStore";
import USerStore from "./userStore";
import ModalStore from "./modalStore";
import TransactionStore from "./transactionStore";

interface Store {
    accountStore: AccountStore;
    commonStore: CommonStore;
    userStore: USerStore;
    modalStore: ModalStore;
    transactionStore: TransactionStore;
}

export const store: Store = {
    accountStore: new AccountStore(),
    commonStore: new CommonStore(),
    userStore: new USerStore(),
    modalStore: new ModalStore(),
    transactionStore: new TransactionStore()
  }

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
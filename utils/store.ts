import { types } from "mobx-state-tree";

const Store = types
  .model({
    popupIsOpen: types.boolean,
    fromValue: types.number,
    toValue: types.number,
    fromCurrency: types.string,
    toCurrency: types.string,
  })
  .actions((self) => ({
    setPopup(status) {
      self.popupIsOpen = status;
    },
    setFromValue(status) {
      self.fromValue = status;
    },
    setToValue(status) {
      self.toValue = status;
    },
    setFromCurrency(status) {
      self.fromCurrency = status;
    },
    setToCurrency(status) {
      self.toCurrency = status;
    },
  }));

export const store = Store.create({
  popupIsOpen: false,
  fromValue: 1,
  toValue: 1,
  fromCurrency: "BTC",
  toCurrency: "ETH",
});

const Blockchain = types
  .model({
    balance: types.string,
    address: types.string,
  })
  .actions((self) => ({
    setBalance(status) {
      self.balance = status;
    },
    setAddress(status) {
      self.address = status;
    },
  }));

export const blockchain = Blockchain.create({
  balance: "",
  address: "",
});

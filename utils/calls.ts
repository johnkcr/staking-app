import { store } from "./store";

export const initialExchange = () => {
    let headers = new Headers();
    headers.append("X-CoinAPI-Key", "108D699F-F150-4090-803B-BB297F81244B");
    headers.append("Content-Type", "application/json");
    fetch(`https://rest-sandbox.coinapi.io/v1/exchangerate/BTC/ETH`, {
        headers: headers,
    })
        .then((res) => res.json())
        .then((data) =>
            store.setToValue(
                Math.round((data.rate * store.fromValue + Number.EPSILON) * 10000) /
                10000
            )
        );
}

export const convertFromTo = () => {
    let headers = new Headers();
    headers.append("X-CoinAPI-Key", "108D699F-F150-4090-803B-BB297F81244B");
    headers.append("Content-Type", "application/json");
    fetch(
        `https://rest-sandbox.coinapi.io/v1/exchangerate/${store.fromCurrency}/${store.toCurrency}`,
        { headers: headers }
    )
        .then((res) => res.json())
        .then((data) =>
            store.setToValue(
                Math.round((data.rate * store.fromValue + Number.EPSILON) * 10000) /
                10000
            )
        );
};

export const convertToFrom = () => {
    let headers = new Headers();
    headers.append("X-CoinAPI-Key", "108D699F-F150-4090-803B-BB297F81244B");
    headers.append("Content-Type", "application/json");
    fetch(
        `https://rest-sandbox.coinapi.io/v1/exchangerate/${store.toCurrency}/${store.fromCurrency}`,
        { headers: headers }
    )
        .then((res) => res.json())
        .then((data) =>
            store.setFromValue(
                Math.round((data.rate * store.toValue + Number.EPSILON) * 10000) /
                10000
            )
        );
};
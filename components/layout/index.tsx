import { SelectorIcon } from "@heroicons/react/solid";
import { useWeb3React } from "@web3-react/core";
import Spinner from "components/layout/spinner";
import Modal from "components/modal";
import { observer } from "mobx-react-lite";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { convertFromTo, convertToFrom, initialExchange } from "utils/calls";
import { store } from "utils/store";
import Header from "./header";
import {
  Section,
  Background,
  Content,
  Card,
  CardTitle,
  CardDescription,
  Form,
} from "./layout.styled";

// @ts-ignore
const Layout = observer(() => {
  const context = useWeb3React();

  const [coinList, setCoinList] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    initialExchange();
  }, []);

  const handleFromCurrencyChange = (e) => {
    store.setFromCurrency(e.target.value);
    convertFromTo();
  };

  const handleToCurrencyChange = (e) => {
    store.setToCurrency(e.target.value);
    convertToFrom();
  };

  const handleFromValueChange = (e) => {
    // @ts-ignore
    store.setFromValue(parseFloat(e.target.value));
    convertFromTo();
  };

  const handleToValueChange = (e) => {
    store.setToValue(parseFloat(e.target.value));
    convertToFrom();
  };

  const handleSwap = () => {
    const exchangCurrency = store.fromCurrency;
    const exchangValue = store.fromValue;
    store.setFromCurrency(store.toCurrency);
    store.setToCurrency(exchangCurrency);
    store.setFromValue(store.toValue);
    store.setToValue(exchangValue);
  };
  const onSubmit = (data) => {
    // Show confirmation dialog
    // store.setPopup(true);
  };

  const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
    fetch("https://api.coinpaprika.com/v1/coins")
      .then((res) => res.json())
      .then((data) => setCoinList(data.slice(0, 10)))
  );

  if (isLoading) return <Spinner />;

  if (error) return "An error has occurred: " + error;

  return (
    <div className="h-screen lg:overflow-y-hidden font-monst">
      <Head>
        <title>Token swap</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Modal />
      <div>
        <Header />
        <main className="-mt-32">
          <Section>
            <Background>
              <Content>
                <Card>
                  <div className="relative">
                    <div className="sm:text-center">
                      <CardTitle>Token Swap</CardTitle>
                      <CardDescription>
                        Current Trading Info
                      </CardDescription>
                    </div>

                    <Form>
                      <div className="flex flex-col items-center justify-center mt-12 space-y-3 sm:mx-auto sm:max-w-sm sm:flex">
                        <div className="relative mt-1 rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">↑</span>
                          </div>
                          <input
                            onChange={handleFromValueChange}
                            value={store.fromValue}
                            className="block w-full py-3 pr-12 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 pl-7 sm:text-sm"
                            placeholder="0.00"
                          />
                          {errors.fromCoin?.type === "required" &&
                            "Please type a value"}
                          <div className="absolute inset-y-0 right-0 flex items-center">
                            <label htmlFor="currency" className="sr-only">
                              Currency
                            </label>
                            <select
                              onChange={handleFromCurrencyChange}
                              value={store.fromCurrency}
                              name="currency"
                              className="h-full py-0 pl-2 text-gray-500 bg-transparent border-gray-300 rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 pr-7 sm:text-sm"
                            >
                              {coinList.map((coin) => (
                                <option key={coin.symbol}>{coin.symbol}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <button onClick={() => handleSwap()}>
                          <SelectorIcon
                            className="block p-1 bg-white rounded-full w-7 h-7"
                            aria-hidden="true"
                          />
                        </button>
                        <div className="relative mt-1 rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            {...register("toCoin", { required: true })}
                            value={store.toValue}
                            onChange={handleToValueChange}
                            className="block w-full py-3 pr-12 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 pl-7 sm:text-sm"
                            placeholder="0.00"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center">
                            <label htmlFor="currency" className="sr-only">
                              Currency
                            </label>
                            <select
                              onChange={handleToCurrencyChange}
                              value={store.toCurrency}
                              name="currency"
                              className="h-full py-0 pl-2 text-gray-500 bg-transparent border-gray-300 rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 pr-7 sm:text-sm"
                            >
                              {coinList.map((coin) => (
                                <option key={coin.symbol}>{coin.symbol}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center ">
                        <button
                          type="submit"
                          onClick={() => store.setPopup(true)}
                          className="px-8 py-3 mx-auto mt-6 text-base font-medium text-white bg-indigo-500 border border-transparent rounded-md shadow w-sm hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                        >
                          Swap
                        </button>
                      </div>
                    </Form>
                  </div>
                </Card>
              </Content>
            </Background>
          </Section>
        </main>
      </div>
    </div>
  );
});
export default Layout;

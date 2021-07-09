import { formatEther } from "@ethersproject/units";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useWeb3React } from "@web3-react/core";
import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";
import { useEagerConnect, useInactiveListener } from "utils/chainHooks";
import { blockchain } from "utils/store";
import { injected } from "../../utils/connectors";

const connectorsByName = {
  Injected: injected,
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = observer(() => {
  const context = useWeb3React();
  const { connector, library, chainId, account, activate, deactivate, active } =
    context;

  const [activatingConnector, setActivatingConnector] = useState();
  useEffect(() => {
    console.log("running");
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  useEffect(() => {
    console.log("running");
    console.log("account", account);
    if (account) blockchain.setAddress(account);

    if (library)
      console.log(
        "library",
        library.getBalance(blockchain.address).then((balance) => {
          console.log(balance);
          blockchain.setBalance(
            `Ξ ${parseFloat(formatEther(balance)).toPrecision(4)}`
          );
          console.log(blockchain.balance);
        })
      );
  }, [library, account, chainId]);

  const handleActivation = () => {
    console.log("Handeling Metamask");
    setActivatingConnector(injected);
    activate(injected);
  };
  return (
    <div className="pb-32 bg-gray-800">
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="border-b border-gray-700">
                <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                        alt="Workflow"
                      />
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="flex items-center ml-4 md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        {({ open }) => (
                          <>
                            <div>
                              <Menu.Button className="flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <span className="sr-only">Open user menu</span>
                                <div
                                  onClick={() => handleActivation()}
                                  className="w-8 h-8 bg-gray-300 rounded-full"
                                />
                              </Menu.Button>
                            </div>
                            <Transition
                              show={open}
                              // @ts-ignore
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items
                                static
                                className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                              >
                                <Menu.Item>
                                  <a
                                    href="#"
                                    className={classNames(
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Address:{" "}
                                    {blockchain.address === undefined
                                      ? "..."
                                      : blockchain.address === null
                                      ? "None"
                                      : `${blockchain.address.substring(
                                          0,
                                          6
                                        )}...${blockchain.address.substring(
                                          blockchain.address.length - 4
                                        )}`}
                                  </a>
                                </Menu.Item>
                                <Menu.Item>
                                  <a
                                    href="#"
                                    className={classNames(
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Balance: {blockchain.balance}
                                  </a>
                                </Menu.Item>
                              </Menu.Items>
                            </Transition>
                          </>
                        )}
                      </Menu>
                    </div>
                  </div>
                  <div className="flex -mr-2 md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button
                      onClick={() => handleActivation()}
                      className="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block w-6 h-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block w-6 h-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="border-b border-gray-700 md:hidden">
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gray-300 rounded-full" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      User
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      Wallet address
                    </div>
                  </div>
                </div>
                <div className="px-2 mt-3 space-y-1">
                  <a
                    href="#"
                    className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700"
                  >
                    {blockchain.address === undefined
                      ? "..."
                      : blockchain.address === null
                      ? "None"
                      : `${blockchain.address.substring(
                          0,
                          6
                        )}...${blockchain.address.substring(
                          blockchain.address.length - 4
                        )}`}
                  </a>
                  <a
                    href="#"
                    className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700"
                  >
                    {blockchain.balance}
                  </a>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <header className="py-10">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"></div>
      </header>
    </div>
  );
});

export default Header;

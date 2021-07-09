import { formatEther } from "@ethersproject/units";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useWeb3React } from "@web3-react/core";
import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";
import { useEagerConnect, useInactiveListener } from "utils/chainHooks";
import { blockchain } from "utils/store";
import { injected } from "../../utils/connectors";
import { Button } from './layout.styled';

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
            `${parseFloat(formatEther(balance)).toPrecision(4)} ETH` 
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
                  <div>
                    <div className="flex items-center ml-4 md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        {({ open }) => (
                          <>
                            <div>
                              <Menu.Button>
                                <span className="sr-only">Open user menu</span>
                                <Button
                                  onClick={() => handleActivation()}
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
                                </Button>
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
                                    Connected with MetaMask
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
                                {blockchain.address && (<Menu.Item>
                                  <a
                                    href={`https://etherscan.io/address/${blockchain.address}`}
                                    target="_blank"
                                    className={classNames(
                                      "block px-4 py-2 text-sm text-gray-700 flex"
                                    )}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                    Etherscan
                                  </a>
                                </Menu.Item>
                                )}
                               
                              </Menu.Items>
                            </Transition>
                          </>
                        )}
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

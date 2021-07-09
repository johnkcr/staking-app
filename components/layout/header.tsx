import React from 'react';
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
import Link from 'next/link';

import AppDialog from './app-dialog';
import WalletModal from './wallet-modal';

const connectorsByName = {
  Injected: injected,
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = observer(() => {

  const [openWalletModal, setWalletModal] = React.useState(false);

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
    // console.log("running");
    // console.log("account", account);
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
    //setActivatingConnector(injected);
    //activate(injected);
  };


  const handleChangeWallet = () => {
    setWalletModal(true);
  }

  const handleCloseWalletModal = () => {
    setWalletModal(false);
  }


  const formatAddress = (addr) => {
    return addr? `${addr.substring(
      0,
      6
    )}...${addr.substring(
      addr.length - 4
    )}`: `Connect to network`;
  }

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
                    <Link href="/">
                      <Button>
                        Token Swap
                      </Button>
                     </Link>
                     <Link href="/solana">
                      <Button className="ml-2">
                        Solana
                      </Button>
                     </Link>
                    <Link href="/settings">
                      <Button className="ml-2">
                        {formatAddress(account)}
                      </Button>
                     </Link>
                     
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
      <AppDialog
        handleClose={handleCloseWalletModal}
        open={openWalletModal}
      >
        <WalletModal/>
      </AppDialog>
    </div>
  );
});

export default Header;

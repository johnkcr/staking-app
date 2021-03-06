import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
import { observer } from "mobx-react-lite";
import React, { Fragment, useRef } from "react";
import { store } from "../../utils/store";

const AppDialog = ({ open, handleClose, children }) => {
  const closeModal = () => {
    handleClose();
  }

  return (
    <Transition.Root
      show={open}
      // @ts-ignore
      as={Fragment}
    >
      <Dialog
        as="div"
        static
        className="fixed inset-0 z-10 overflow-y-auto"
        open={open}
        onClose={closeModal}
      >
        <div className="flex items-end justify-center min-h-screen px-4 pt-2 pb-20 text-center sm:block sm:p-0 w-full ">
          <Transition.Child
            // @ts-ignore
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-800 bg-opacity-75" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            // @ts-ignore
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block px-4 pt-3 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl max-w-md sm:my-8 sm:align-middle sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Change Wallet
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Please select one
                    </p>
                  </div>
                </div>
              </div>
              <div className="max-w-md">
                {children}
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => closeModal()}
                >
                  Go back to dashboard
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );

}

export default AppDialog;

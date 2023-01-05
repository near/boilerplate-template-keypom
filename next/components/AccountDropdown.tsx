import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useWalletSelector } from "./WalletSelectorContext";

const AccountDropdown: React.FC = () => {
  const { modal, accounts, accountId, selector } = useWalletSelector();

  const handleSignOut = async () => {
    const wallet = await selector.wallet();

    wallet.signOut().catch((err) => {
      console.log("Failed to sign out");
      console.error(err);
    });
  };

  const handleSwitchWallet = () => {
    modal.show();
  };

  const handleSwitchAccount = (accountId: string) => {
    selector.setActiveAccount(accountId);
  };

  if (!accountId) {
    return null;
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          {accountId}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {accounts.length > 1 && (
            <div className="py-1">
              <Menu.Item disabled>
                <span className="text-gray-500 block px-4 py-2 text-sm">
                  Switch Account
                </span>
              </Menu.Item>

              {accounts
                .filter((a) => a.accountId !== accountId) // remove the current selection
                .map((account) => (
                  <Menu.Item>
                    <a
                      href="#"
                      onClick={() => handleSwitchAccount(account.accountId)}
                      className="text-gray-700 block px-4 py-2 text-sm"
                    >
                      {account.accountId}
                    </a>
                  </Menu.Item>
                ))}
            </div>
          )}
          <div className="py-1">
            <Menu.Item>
              <a
                href="#"
                className="text-gray-700 block px-4 py-2 text-sm"
                onClick={() => handleSwitchWallet()}
              >
                Switch Wallet
              </a>
            </Menu.Item>
            <Menu.Item>
              <a
                href="#"
                className="text-gray-700 block px-4 py-2 text-sm"
                onClick={() => handleSignOut()}
              >
                Log out
              </a>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default AccountDropdown;

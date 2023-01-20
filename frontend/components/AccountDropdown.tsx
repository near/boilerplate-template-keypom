import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useWalletSelector } from './WalletSelectorContext';
import { useRouter } from 'next/router';

const AccountDropdown: React.FC = () => {
  const router = useRouter();
  const { modal, accounts, accountId, selector } = useWalletSelector();

  const handleSignOut = async () => {
    const wallet = await selector.wallet();

    try {
      await wallet.signOut();
    } catch (err) {
      console.log('Failed to sign out');
      console.error(err);
    }
    router.push('/');
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
        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
            />
          </svg>
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-200 shadow-lg ring-1 ring-gray-400 ring-opacity-5 focus:outline-none">
          {accounts.length > 1 && (
            <div className="py-1">
              <Menu.Item disabled>
                <span className="text-gray-500 block px-4 py-2 text-sm">Switch Account</span>
              </Menu.Item>

              {accounts
                .filter((a) => a.accountId !== accountId) // remove the current selection
                .map((account) => (
                  <Menu.Item key={account.accountId}>
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
              <a href="#" className="text-gray-700 block px-4 py-2 text-sm" onClick={() => handleSwitchWallet()}>
                Switch Wallet
              </a>
            </Menu.Item>
            <Menu.Item>
              <a href="#" className="text-gray-700 block px-4 py-2 text-sm" onClick={() => handleSignOut()}>
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

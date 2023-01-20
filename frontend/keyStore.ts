// Gets the secret keys for a drop.
export const getKeysForDrop = (dropId: number | string): string[] =>
  JSON.parse(window.localStorage.getItem(`drop#${dropId}`) || '[]');
// Stores the secret keys for a drop.
export const setKeysForDrop = (dropId: number | string, keys: string[]) =>
  window.localStorage.setItem(`drop#${dropId}`, JSON.stringify(keys));

export const setInactiveDrop = (dropId: number | string) => {
  window.localStorage.setItem('inactiveDropId', `${dropId}`);
};
export const getInactiveDrop = () => window.localStorage.getItem('inactiveDropId');

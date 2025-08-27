import * as SecureStore from "expo-secure-store";

export function isValidEmail(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function isValidPassword(password: string) {
  const regex = /^(?=.*\d).{2,}$/;
  return regex.test(password);
}

export async function secureItem(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function deleteSecureItem(key: string) {
  await SecureStore.deleteItemAsync(key);
}

export async function getSureItem(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return null;
  }
}

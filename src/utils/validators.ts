import { validateMnemonic } from 'bip39'

export function validateMnemonicsInput(data: string) {
  return validateMnemonic(data) ? true : "Mnemonic doesn't seem to be valid."
}

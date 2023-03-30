import { validateMnemonic } from 'bip39'

export function validateMnemonicsInput(data: string) {
  if (!data) return 'Mnemonics is required.'
  return validateMnemonic(data) ? true : "Mnemonics doesn't seem to be valid."
}

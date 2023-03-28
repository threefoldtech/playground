import { GridClient, NetworkEnv, BackendStorageType } from 'grid3_client'
import type { Profile } from '../stores/profile_manager'

export async function getGrid(profile: Pick<Profile, 'mnemonics'>) {
  if (!profile) return null
  const grid = new GridClient({
    mnemonic: profile.mnemonics,
    network: NetworkEnv.dev,
    backendStorageType: BackendStorageType.tfkvstore
  })
  await grid.connect()
  return grid
}

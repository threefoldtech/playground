import { GridClient, NetworkEnv, BackendStorageType } from 'grid3_client'
import type { Profile } from '../stores/profile_manager'

const NETWORK = process.env.NETWORK as NetworkEnv

export async function getGrid(profile: Pick<Profile, 'mnemonics'>) {
  if (!profile) return null
  const grid = new GridClient({
    mnemonic: profile.mnemonics,
    network: NETWORK,
    backendStorageType: BackendStorageType.tfkvstore
  })
  await grid.connect()
  return grid
}

export function createAccount() {
  const grid = new GridClient({
    network: NETWORK,
    mnemonic: '',
    storeSecret: 'test'
  })
  grid._connect()
  const relay = grid.getDefaultUrls(NETWORK).relay.slice(6)
  return grid.tfchain.createAccount(relay)
}

export async function loadBalance(grid: GridClient): Promise<Profile['balance']> {
  const balance = await grid.balance.getMyBalance()
  return {
    free: +balance.free,
    locked: +balance.reserved
  }
}

export async function loadProfile(mnemonics: string, grid: GridClient): Promise<Profile> {
  return {
    mnemonics,
    ssh: await readSSH(grid),
    twinId: await grid.twins.get_my_twin_id(),
    address: grid.twins.client.client.address,
    balance: await loadBalance(grid)
  }
}

export async function getMetadata(grid: GridClient): Promise<{ [key: string]: any }> {
  const metadata = await grid.kvstore.get({ key: 'metadata' })
  try {
    return JSON.parse(metadata)
  } catch {
    return {}
  }
}

export async function readSSH(grid: GridClient): Promise<string> {
  const metadata = await getMetadata(grid)
  return metadata.sshkey || ''
}

export async function storeSSH(grid: GridClient, newSSH: string): Promise<void> {
  const metadata = await getMetadata(grid)
  const ssh = metadata.sshkey
  if (ssh === newSSH) return

  return grid.kvstore.set({
    key: 'metadata',
    value: JSON.stringify({
      ...metadata,
      sshkey: newSSH
    })
  })
}

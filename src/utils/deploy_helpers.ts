import { NetworkModel, generateString } from 'grid3_client'

export function createNetwork(network: Network = {}): NetworkModel {
  const nw = new NetworkModel()
  nw.name = network.name || 'NW' + generateString(10)
  nw.ip_range = network.ipRange || '10.20.0.0/16'
  nw.addAccess = network.addAccess || false
  return nw
}

export interface Network {
  name?: string
  ipRange?: string
  addAccess?: boolean
}

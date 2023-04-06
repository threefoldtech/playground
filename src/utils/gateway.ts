import type { GridClient } from 'grid3_client'
// import type { Profile } from '../stores/profile_manager'
// import { getGrid } from './grid'

export interface GatewayNodes {
  nodeDomain: string
  nodeId: number
  idx?: number
}

export const loadGateWayNodes = async (grid: GridClient, pageIndx: number) => {
  const nodes = grid.capacity
  const LoadedNodesPartial = await nodes.filterNodes({ gateway: true, page: pageIndx })
  const gws: GatewayNodes[] = []
  for (const node of LoadedNodesPartial) {
    gws.push({
      nodeDomain: node.publicConfig.domain,
      nodeId: node.nodeId
    })
  }
  return gws
}

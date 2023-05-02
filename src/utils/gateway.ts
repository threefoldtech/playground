import type { GridClient } from '@threefold/grid_client'

export const loadGateWayNodes = (grid: GridClient, pageIndx: number) => {
  const nodes = grid.capacity
  return nodes.filterNodes({ gateway: true, page: pageIndx })
}

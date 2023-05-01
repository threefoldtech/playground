import type { ProjectName } from '@/types'
import { SolutionCode } from '@/types'
import type { GridClient, FilterOptions } from 'grid3_client'

export function loadGateways(grid: GridClient, options: Omit<FilterOptions, 'gateway'>) {
  return grid.capacity.filterNodes({
    gateway: true,
    ...options,
  })
}

export interface GetHostnameOptions {
  deploymentName: string
  projectName: ProjectName
}
export function getHostname(grid: GridClient, options: GetHostnameOptions) {
  return (
    SolutionCode[options.projectName as keyof typeof SolutionCode] +
    grid.twinId +
    options.deploymentName.toLowerCase()
  )
}

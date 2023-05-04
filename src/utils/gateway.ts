import type { ProjectName } from '@/types'
import { SolutionCode } from '@/types'
import { type GridClient, type FilterOptions, GatewayNameModel } from '@threefold/grid_client'

export function loadGatewayNodes(grid: GridClient, options: Omit<FilterOptions, 'gateway'> = {}) {
  return grid.capacity
    .filterNodes({
      gateway: true,
      ...options,
    })
    .catch(() => [])
}

export interface GetHostnameOptions {
  deploymentName: string
  projectName: ProjectName
}
export function getSubdomain(grid: GridClient, options: GetHostnameOptions) {
  return (
    SolutionCode[options.projectName as keyof typeof SolutionCode] +
    grid.twinId +
    options.deploymentName.toLowerCase()
  )
}

export interface DeployGatewayNameOptions {
  name: string
  nodeId: number
  tlsPassthrough?: boolean
  backends: (`http://${string}:${number}` | `https://${string}:${number}`)[]
}
export async function deployGatewayName(grid: GridClient, options: DeployGatewayNameOptions) {
  const gateway = new GatewayNameModel()
  gateway.name = options.name
  gateway.node_id = options.nodeId
  gateway.tls_passthrough = options.tlsPassthrough || false
  gateway.backends = options.backends
  gateway.solutionProviderID = +process.env.INTERNAL_SOLUTION_PROVIDER_ID!

  return grid.gateway.deploy_name(gateway)
}

export async function rollbackDeployment(grid: GridClient, name: string) {
  const result = await grid.machines.delete({ name })

  if (result.deleted.length === 0) {
    throw new Error(`Failed to delete deployment with name "${name}".`)
  }

  return result
}

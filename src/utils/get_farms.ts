import { NodeStatus } from 'tf_gridproxy_client'
import { gqlClient, gridProxyClient } from '../clients'

export async function getFarms(hasPublicIP: boolean, exclusiveFor?: string) {
  const where = hasPublicIP ? { publicIPs_some: {} } : undefined
  const { totalCount } = await gqlClient.farmsConnection(
    { totalCount: true },
    { orderBy: ['farmID_ASC'], where }
  )
  const farms = await gqlClient.farms({ name: true, farmID: true }, { limit: totalCount, where })

  const onlineFarms = await getOnlineFarms()

  const blockedFarms = await getBlockedFarms(hasPublicIP, exclusiveFor)

  return farms.filter((f) => onlineFarms.has(f.farmID) && !blockedFarms.has(f.farmID))
}

async function getOnlineFarms() {
  const nodes = await gridProxyClient.nodes.listAll({ status: NodeStatus.Up })
  return new Set(nodes.map((node) => node.farmId))
}

async function getBlockedFarms(hasPublicIP: boolean, exclusiveFor?: string) {
  if (hasPublicIP || !exclusiveFor) return new Set<number>([])
  const { totalCount } = await gqlClient.nodeContractsConnection(
    { totalCount: true },
    {
      orderBy: ['id_ASC'],
      where: {
        deploymentData_contains: exclusiveFor,
        state_eq: 'Created'
      }
    }
  )

  const nodeContracts = await gqlClient.nodeContracts(
    { nodeID: true },
    {
      limit: totalCount,
      where: {
        deploymentData_contains: exclusiveFor,
        state_eq: 'Created'
      }
    }
  )

  const nodeIds = new Set(nodeContracts.map((n) => n.nodeID))
  const promies = Array.from(nodeIds).map((id) => gridProxyClient.nodes.byId(id))
  const nodes = await Promise.all(promies)
  return new Set(nodes.map((n) => n.farmId))
}

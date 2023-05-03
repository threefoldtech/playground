import {SolutionCode, type  ProjectName } from '@/types'
import type { GridClient, FilterOptions } from '@threefold/grid_client'

export interface GatewayNodes {
  nodeDomain: string;
  nodeId: number;
  idx?: number;
}
export interface GetHostnameOptions {
  deploymentName: string
  projectName: ProjectName
}

function randomChoice(choices: string | any[]) {
  const random = Math.floor(Math.random() * choices.length);
  return choices[random];
}

export async function selectGatewayNode(grid: GridClient): Promise<[number, string]> {
  const nodes = grid.capacity;
  const selectedNode = randomChoice(await nodes.filterNodes({ gateway: true }));

  const nodeId = selectedNode.nodeId;
  const nodeDomain = selectedNode.publicConfig.domain;
  return [nodeId, nodeDomain];
}

export function selectSpecificGatewayNode(gateway: GatewayNodes): [number, string] {
  const nodeId = gateway.nodeId;
  const nodeDomain = gateway.nodeDomain;

  return [nodeId, nodeDomain];
}

export function loadGateways(grid: GridClient, options: Omit<FilterOptions, 'gateway'>) {
  console.log("gateway", grid.capacity.filterNodes({
    gateway: true,
    ...options,
  }));
  
  return grid.capacity.filterNodes({
    gateway: true,
    ...options,
  })
}

export function getSubdomain(grid: GridClient, options: GetHostnameOptions) {
  return (
    SolutionCode[options.projectName as keyof typeof SolutionCode] +
    grid.twinId +
    options.deploymentName.toLowerCase()
  )
}



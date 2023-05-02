import type { GridClient } from '@threefold/grid_client'
import { formatConsumption } from './contracts'

export interface LoadVMsOptions {
  filter?(vm: any): boolean
}
export async function loadVms(grid: GridClient, options: LoadVMsOptions = {}) {
  const machines = await grid.machines.list()
  const promises = machines.map((name) => {
    return grid.machines.getObj(name).catch(() => null)
  })
  const items = await Promise.all(promises)
  const vms = items
    .map((item: any, index) => {
      if (item) {
        item.deploymentName = machines[index]
        item.projectName = grid.clientOptions!.projectName
        item.forEach((i: any) => {
          i.deploymentName = machines[index]
          i.projectName = grid.clientOptions!.projectName
        })
      }
      return item
    })
    .filter((item) => item && item.length > 0)
    .filter(options.filter || (() => true)) as any[][]
  const consumptions = await Promise.all(
    vms.map((vm) => {
      return grid.contracts.getConsumption({ id: vm[0].contractId }).catch(() => undefined)
    })
  )
  return vms.map((vm, index) => {
    vm[0].billing = formatConsumption(consumptions[index] as number)
    return vm
  })
}

export type K8S = { masters: any[]; workers: any[]; deploymentName: string }
export async function loadK8s(grid: GridClient): Promise<K8S[]> {
  const clusters = await grid.k8s.list()
  const promises = clusters.map((name) => {
    return grid.k8s.getObj(name).catch(() => null)
  })
  const items = (await Promise.all(promises)) as any[]
  const k8s = items
    .map((item, index) => {
      if (item) {
        item.deploymentName = clusters[index]
        item.projectName = grid.clientOptions!.projectName
      }
      return item
    })
    .filter((item) => item && item.masters.length > 0) as { masters: any[] }[]
  const consumptions = await Promise.all(
    k8s.map((cluster) => {
      return grid.contracts
        .getConsumption({ id: cluster.masters[0].contractId })
        .catch(() => undefined)
    })
  )
  return k8s.map((cluster, index) => {
    cluster.masters[0].billing = formatConsumption(consumptions[index] as number)
    return cluster as K8S
  })
}

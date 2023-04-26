import type { GridClient } from 'grid3_client'
import { formatConsumption } from './contracts'

export async function loadVms(grid: GridClient) {
  const machines = await grid.machines.list()
  const promises = machines.map((name) => {
    return grid!.machines.getObj(name).catch(() => null)
  })
  const items = await Promise.all(promises)
  const vms = items.filter((item) => !!item) as any[][]
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

export async function loadK8s(grid: GridClient) {}

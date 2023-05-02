import {
  type GridClient,
  type FilterOptions,
  randomChoice,
  DiskModel,
  MachinesModel,
  MachineModel,
  QSFSDiskModel,
  generateString
} from '@threefold/grid_client'
import { createNetwork, type Network } from './deploy_helpers'

export async function deployVM(grid: GridClient, options: DeployVMOptions) {
  const vms = new MachinesModel()
  vms.name = options.name
  vms.network = createNetwork(options.network)
  vms.machines = await Promise.all(options.machines.map(createMachine.bind(undefined, grid)))
  vms.metadata = options.metadata
  vms.description = options.description
  await grid.machines.deploy(vms)
  return loadVM(grid, vms.name)
}

export async function loadVM(grid: GridClient, name: string) {
  return grid.machines.getObj(name)
}

async function createMachine(grid: GridClient, machine: Machine): Promise<MachineModel> {
  const filters: FilterOptions = {
    cru: machine.cpu,
    mru: Math.round(machine.memory / 1024),
    country: machine.country,
    farmId: machine.farmId,
    farmName: machine.farmName,
    hru: machine.qsfsDisks?.reduce((total, disk) => total + disk.cache, 0),
    sru: machine.disks?.reduce((total, disk) => total + disk.size, machine.rootFilesystemSize || 0),
    publicIPs: machine.publicIpv4,
    availableFor: grid.twinId
  }

  const vm = new MachineModel()
  vm.name = machine.name
  vm.node_id = +randomChoice(await grid.capacity.filterNodes(filters)).nodeId
  vm.disks = createDisks(machine.disks)
  vm.public_ip = machine.publicIpv4 || false
  vm.public_ip6 = machine.publicIpv6 || false
  vm.planetary = machine.planetary || true
  vm.cpu = machine.cpu
  vm.memory = machine.memory
  vm.rootfs_size = machine.rootFilesystemSize || 0
  vm.flist = machine.flist
  vm.entrypoint = machine.entryPoint
  vm.env = createEnvs(machine.envs)
  vm.solutionProviderID = +process.env.INTERNAL_SOLUTION_PROVIDER_ID!
  vm.qsfs_disks = createQsfsDisks(machine.qsfsDisks)
  return vm
}

function createQsfsDisks(disks: QsfsDisk[] = []): QSFSDiskModel[] {
  return disks.map((disk) => {
    const qsfs = new QSFSDiskModel()
    qsfs.name = disk.name
    qsfs.cache = disk.cache
    qsfs.mountpoint = disk.mountpoint
    qsfs.encryption_key = disk.encryption_key || disk.name
    qsfs.prefix = disk.prefix || disk.name
    qsfs.qsfs_zdbs_name = disk.zdbsName || disk.name
    return qsfs
  })
}

function createEnvs(envs: Env[] = []): { [key: string]: string } {
  return envs.reduce((result, env) => {
    result[env.key] = env.value
    return result
  }, {} as { [key: string]: string })
}

function createDisks(disks: Disk[] = []): DiskModel[] {
  return disks.map((disk) => {
    const d = new DiskModel()
    d.name = disk.name || 'DS' + generateString(10)
    d.size = disk.size
    d.mountpoint = disk.mountPoint
    return d
  })
}

export interface Env {
  key: string
  value: string
}

export interface Disk {
  name?: string
  size: number
  mountPoint: string
}

export interface QsfsDisk {
  name: string
  cache: number
  mountpoint: string
  encryption_key?: string
  prefix?: string
  zdbsName?: string
}

export interface Machine {
  name: string
  farmId: number
  farmName?: string
  publicIpv4?: boolean
  publicIpv6?: boolean
  planetary?: boolean
  cpu: number
  memory: number
  rootFilesystemSize?: number
  flist: string
  entryPoint: string
  envs?: Env[]
  disks?: Disk[]
  country?: string
  qsfsDisks?: QsfsDisk[]
}

export interface DeployVMOptions {
  name: string
  network?: Network
  machines: Machine[]
  metadata?: string
  description?: string
}

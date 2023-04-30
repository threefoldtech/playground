import type { VDataTable } from 'vuetify/lib/labs/components'

export interface K8SWorker {
  name: string
  cpu: number
  memory: number
  diskSize: number
  ipv4: boolean
  ipv6: boolean
  planetary: boolean
  rootFsSize: number
  farm?: Farm
}

export interface Farm {
  name: string
  farmID: number
  country?: string
}

export interface Flist {
  value: string
  entryPoint: string
}

export type VDataTableHeader = VDataTable['headers']

export enum ProjectName {
  Kubernetes = 'Kubernetes',
  Caprover = 'CapRover',
}

export interface solutionFlavor {
  cpu: number
  memory: number
  disk: number
}

export interface FormValidatorService {
  setValid(uid: number, value: boolean, reset: () => void): void
  unregister(uid: number): void
}

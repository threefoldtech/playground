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

export interface CaproverWorker {
  name: string
  farm?: Farm
  solution?: solutionFlavor
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
  Discourse = 'Discourse',
  Funkwhale = 'Funkwhale',
  Mastodon = 'Mastodon',
  Mattermost = 'Mattermost',
  Owncloud = 'Owncloud',
  Peertube = 'Peertube',
  Subsquid = 'Subsquid',
  Taiga = 'Taiga',
  Wordpress = 'Wordpress',
  Gateway = 'GatewayName',
  QVM = 'Qvm',
  TFhubValidator = 'TFhubValidator',
  Casperlabs = 'Casperlabs',
  Presearch = 'Presearch',
  VM = 'VM',
  NodePilot = 'NodePilot',
  Fullvm = 'Fullvm',
  Algorand = 'Algorand',
  Qvm = 'Qvm',
  Umbrel = 'Umbrel',
}

export enum SolutionCode {
  Peertube = 'pt',
  Funkwhale = 'fw',
  Taiga = 'tg',
  Discourse = 'dc',
  Owncloud = 'oc',
  Mattermost = 'mm',
  Mastodon = 'md',
  TFhubValidator = 'tfvalidator',
  Casperlabs = 'cl',
  Presearch = 'ps',
  CapRover = 'cp',
  Kubernetes = 'k8s',
  Machines = 'vm',
  VM = 'vm',
  NodePilot = 'np',
  Fullvm = 'fvm',
  Subsquid = 'ss',
  Algorand = 'al',
  Qvm = 'qvm',
  Umbrel = 'um',
  Wordpress = 'wp',
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

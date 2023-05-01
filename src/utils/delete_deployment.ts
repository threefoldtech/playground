import { ProjectName } from '@/types'
import type { GridClient } from 'grid3_client'
import { getSubdomain } from './gateway'
import { updateGrid } from './grid'
import { loadVM } from './deploy_vm'

export interface DeleteDeploymentOptions {
  name: string
  projectName: ProjectName
}

export async function deleteDeployment(grid: GridClient, options: DeleteDeploymentOptions) {
  /* Delete qsfs_zdbs */
  if (options.projectName === ProjectName.QVM) {
    let qvm = await loadVM(grid, options.name)
    if (!qvm || qvm.length === 0) {
      qvm = await loadVM(updateGrid(grid, { projectName: '' }), options.name)
    }
    await grid.qsfs_zdbs.delete({ name: (<any>qvm)[0].mounts[0].name })
    updateGrid(grid, { projectName: options.projectName })
  }

  /* Delete gateway */
  if (solutionHasGateway(options.projectName)) {
    await deleteDeploymentGateway(grid, options)
  }

  /* Delete deployment */
  if (options.projectName === ProjectName.Kubernetes) {
    const result = await grid.k8s.delete({ name: options.name })
    if (result.deleted.length) return result
    return updateGrid(grid, { projectName: '' }).k8s.delete({ name: options.name })
  }

  const result = await grid.machines.delete({ name: options.name })
  if (result.deleted.length) return result
  return updateGrid(grid, { projectName: '' }).machines.delete({ name: options.name })
}

export async function deleteDeploymentGateway(grid: GridClient, options: DeleteDeploymentOptions) {
  const subdomain = getSubdomain(grid, {
    deploymentName: options.name,
    projectName: options.projectName,
  })
  for (const projectName of [options.projectName, ProjectName.Gateway, '']) {
    if (await deleteGateway(updateGrid(grid, { projectName }), subdomain)) {
      updateGrid(grid, { projectName: options.projectName })
      return
    }
  }
  throw new Error(`Can't delete gateway contracts with name ${subdomain}`)
}

export async function deleteGateway(grid: GridClient, name: string) {
  const { deleted } = await grid.gateway.delete_name({ name })
  return deleted.length > 0
}

export function solutionHasGateway(projectName: ProjectName) {
  return [
    ProjectName.Discourse,
    ProjectName.Funkwhale,
    ProjectName.Mastodon,
    ProjectName.Mattermost,
    ProjectName.Owncloud,
    ProjectName.Peertube,
    ProjectName.Subsquid,
    ProjectName.Taiga,
    ProjectName.Wordpress,
  ].includes(projectName)
}

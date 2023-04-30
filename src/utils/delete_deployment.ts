import { ProjectName } from '@/types'
import type { GridClient } from 'grid3_client'
import { getHostname } from './gateway'
import { updateGrid } from './grid'

export interface DeleteDeploymentOptions {
  name: string
  projectName: ProjectName
}

export async function deleteDeployment(grid: GridClient, options: DeleteDeploymentOptions) {
  /* Delete deployment */

  /* Delete gateway */
  if (solutionHasGateway(options.projectName)) {
    const hostname = getHostname(grid, {
      deploymentName: options.name,
      projectName: options.projectName,
    })
    for (const projectName of [options.projectName, ProjectName.Gateway, '']) {
      if (await deleteGateway(updateGrid(grid, { projectName }), hostname)) {
        break
      }
    }
    grid = updateGrid(grid, { projectName: options.projectName })
  }

  /* Delete other stuff */
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

# **User Stories**

## LogIn
    - As a user I should be able to login easily using TfChain mnemonic 
### Acceptance Criteria
    - User can login easily by adding his mnemonic, then click on 'login' button. 
    - If the user doesn't have an account, click on 'Don't Have An Account? Create One' button to create an account and mnemonic will be generated automatically, then user can add or generate SSH Keys.
---

## Logout
    - As a user I should be able to logout easily from the system
### Acceptance Criteria
    - User can logout easily from profile manager by clicking on 'Logout' button. 
---

## SSH Key
    - As a user I should be able to update or generate new SSH Key
### Acceptance Criteria
    - User can update Public SSH Key from profile manager after activating profile, by clicking on 'Update Public SSH Key' button.
    - User can also generate new SSH Key after activating profile, by clicking on 'Generate SSH Keys' button.
    - Private SSH Key should be downloaded after generation.
    - If user added the same SSH Key, it won't update.
---

## TFT Balance

    - As a user I should be able fund my balance easily

### Acceptance Criteria

    - The user should be able to scan QR Code through the 'ThreeFold Connect' mobile application.
    - The user should be able to transfer the desired TFT amount.
    - These amounts will reflect on TfChain.
---

## Quick Start Docs
    - As a user I should be able to deploy easily on grid
### Acceptance Criteria
    - For all kinds of deployments, there will be 'Quick start documentation' https://manual.grid.tf, refers to manual of TFGrid where the user can find all of the details about each field in every solution.
---

## Deployment Cost
    - As a user I should be able to know my deploymets' cost.
### Acceptance Criteria
    - Deployment cost should be available to user before deploying.
---

## Deployment Farm
    - As a user I should be able to choose farm easily for deployments
### Acceptance Criteria
    - When deploying, there's 'Farm Filter' filter farms to choose farm with available nodes.
    - User won't have to think about which farm to choose. 
    - User will just choose Country and Farm from the drop-down list, then click on 'Deploy' button.
---

## Issues Tracker is linked (Devnet Only)
    - As a user I should be able to complain about any issue.
### Acceptance Criteria
    - From Devnet, user can access the test_feedback repository from the 'Disclaimer' section.
    - User can also create detailed issues on this repository and then it will be reviewed and moved to its correct repository by our team.
---

## Live Chat Helper
    - As a user I should be able to complain about any issue
### Acceptance Criteria
    - There's also a live chat at the right bottom, that will help user with any issue.
---    


## Deployment Deletion
    - As a user I'd like to delete any of my deployments at anytime.
### Acceptance Criteria
    - After deployment, user can delete all deployments or any specific deployment from the 'Deployment List' at the bottom.
    - User can also delete them from 'Contracts' and 'Deployments' in 'My Account' section.
---

## Deployment Details
    - As a user I should be able to view all details of my contracts and deployments
### Acceptance Criteria
    - User can view all contracts and deployments from 'Contracts' and 'Deployments' in 'My Account' section.
    - User can also view details of any contract/deployment and delete any of them. 
    - If there are any updates, user can refresh contracts/deployments from 'Refresh' button in the UI.
---

## Deployments Access
    - As a User I should be able to access my deployments
### Acceptance Criteria
    - User can access deployments through SSH using any of the available network options(IPV4, IPV6, Planetary Network, Wireguard)
    - These will be included in every deployments details. 
---

## Full Virtual Machine Deployment
    - As a user I should be able to deploy a Full Virtual Machine easily with all of its configurations.
### Acceptance Criteria
    - User can deploy full virtual machine easily, knowing the max and min of required configurations as CPU, Memory, and Disk.
    - From the 'DISKS' section above, the user can add many disks within the virtual machine.
    - All logs while deploying will be shown to user.
    - All previous deployments will be listed at the bottom. 
---

## Micro Virtual Machine Deployment
    - As a user I should be able to deploy Micro Virtual machine
### Acceptance Criteria
    - User can deploy micro virtual machine easily, know the max and min of required configurations as CPU, Memory, and Disk.
    - From 'ENVIRONMENT VARIABLES' user can also add, modify, or delete environment variables to micro virtual machine.
    - From 'DISKS' user can add many disks within the micro virtual machine. 
---

## Kubernetes Deployment
    - As a user I expect to deploy Kubernetes Cluster easily with many workers 
### Acceptance Criteria
    - User can deploy Kubernetes Cluster easily with all its configurations for both master and workers with the needed resources as CPU, Memory, and Disk
---

## Kubernetes Deployment with multiple workers on different nodes
    - As a user I expect to deploy Kubernetes Cluster with many workers, each on different node
### Acceptance Criteria
    - Workers should be deployed on different nodes within the farm.
---

## CapRover Deployment Configuration
    - As a user I should be able to deploy and user CapRover easily
### Acceptance Criteria
    - User should pick domain name from 'GoDaddy.com' or 'Name.com' and add it.
    - User should add Leaders from 'Leaders' section with chosen amount of resources(CPU, Memory, Disk)
    - User can also add many workers from 'Workers' section.
---

## Peertube Deployment
    - As a user I should be able to deploy peertube
### Acceptance Criteria
    - User can deploy peertube easily with selecting the amount of resources and gateway node. 
    - Also, all previous instances of peertube are listed below.
---

## Funkwhale Deployment
    - As a user I should be able to deploy Funkwhale easily
### Acceptance Criteria
    - User can deploy Funkwhale easily with  choosing resources and gateway node.
    - After deployment, user can visit all Funkwhale instances from deployments list and use it.
---

## Mattermost Deployment
    - As a user I should be able to deploy Mattermost easily
### Acceptance Criteria
    - User can deploy mattermost easily, with selecting resources and gateway node.
    - User also can configure the instance with SMPT server, from 'SMTP Server' section. 
---

## Discourse Deployment
    - As a user expect to know what's Discourse and how to deploy it
### Acceptance Criteria
    - User can deploy discource easily, with selecting amount of resources and gateway node.
    - User also can configure the instance with SMPT server from 'SMTP Server' section. 
---

## Taiga Deployment
    - As a user I should be able to deploy Taiga easily
### Acceptance Criteria
    - User can deploy taiga easily, with selecting amount of resources and gateway node.
    - User can also configure it with SMTP server from 'SMTP Server' section.
---

## Owncloud Deployment
    - As a user I should deploy Owncloud easily 
### Acceptance Criteria
    - User can deploy owncloud easily, with selecting amount of resources and gateway node.
    - User can also configure it with SMTP server from 'SMTP Server' section.
---

## Presearch Deployment
    - As user a expect to know what's Presearch and how to deploy it
### Acceptance Criteria
    - User can learn all about the deployment on presearch from the 'Quick start documentation', that explains all about it.
    - All previous deployments of presearch will be listed at the bottom in the 'Deployment List (presearch)'. 
    - User can visit all presearch instances from deployments list and use it 
---

## Presearch History
    - As user a want to restore previous node of my presearch instance
### Acceptance Criteria
    - User can fill the 'Restore' section with restore key field to get previous node.
---

## Subsquid Deployments
    - As a user I should be able to deploy subsquid easily
### Acceptance Criteria
    - User can deploy subsquid by adding websocket endpoint, selecting needed resources and gateway node
--- 

## Casperlabs Deployment
    - As a user I should be able to deploy Casperlabs
### Acceptance Criteria
    - User can deploy subsquid by selecting needed resources and gateway node
---

## Algorand Deployment
    - As a user I should be able to deploy Algorand
### Acceptance Criteria
    - User can deploy it easily with choosing Network and Node Type.
---

## Node Pilot Deployment
    - As a user I should be able to deploy Node Pilot
### Acceptance Criteria
    - User can deploy Node pilot with needed resources of Cpu and Memory
---


## Wordpress Deployment
    - As a user I should be able to deploy Wordpress 
### Acceptance Criteria
    - User can deploy wordpress by selecting needed resources and gateway node
--- 

## Umbrel Deployment
    - As a user I should be able to deploy Umbrel
### Acceptance Criteria
    - User can deploy umbrel by selecting needed resources from Cpu, Memory, and Disk.
---
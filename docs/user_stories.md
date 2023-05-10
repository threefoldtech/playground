# **User Stories**

## LogIn

    - As a user I should be able to login easily using TfChain mnemonic 

### Acceptance Criteria

    - User can login easily by adding his mnemonic, then click on 'activate' button. 
    - If user don't have an account, click on 'DON"T HAVE ACCOUNT? CREATE ONE' button to create an account and mnemonic will be generated automatically, then user can add or generate SSH Keys.
---
## Logout

    - As a user I should be able to logout easily from the system

### Acceptance Criteria

    - User can logout easily from profile manager. 
---
## SSH Key

    - As a user I should be able to update or generate new SSK Key

### Acceptance Criteria

    - User can update its SSH Key from profile manager after activating profile, by clicking on 'UPDATE PUBLIC SSH KEY' button.
    - User can also generate new SSH Key after activating profile, by clicking on 'GENERATE SSH KEYS' button.
    - If user added the same SSH Key, it won't update.
---
## TFT Wallet

    - As a user I would like to know how to fund my wallet

### Acceptance Criteria

    - The user can fund its wallet from 'ThreeFold Connect' mobile application.
    - These funds will reflect on TfChain.
---
## Grid Deployment

    - As a user I expect to know easily how to deploy on grid

### Acceptance Criteria

    - For all kinds of deployments, there will be 'Quick start documentation' refers to manual of TFGrid https://manual.grid.tf , which document single detail about all deployments.
---
## Deployment Cost

    - As a user I expect to know the calculations of all kind of deployments from my TFT Balance

### Acceptance Criteria
    - Deployment cost should be available to user before deploying.
---
## Deployment Node

    - As I user I expect to choose node for deploying easily

### Acceptance Criteria

    - When deploying, there's 'Farm Filter' filter farms to choose farm with available nodes.
    - User won't have to think about which node to choose. 
    - User will just choose Country and Farm from the drop-down list, then click on 'DEPLOY' button.
---
## Issues Tracker is linked 

    - As I user I would like to know what to do if I faced any issue
### Acceptance Criteria

    - User can add issues from the 'Disclaimer' part.
    - Applying for issues in github and the developers will solve them.
    - There's also a live chat at the bottom for any issue.
---
## Deployments Access

    - As I user I want to know how to access my deployments 
### Acceptance Criteria

    - User can learn all about deployments from the 'Quick start documentation', that explains all about it.
    - User can access them via SSH command which is explained in the documentation. 
---
## Full Virtual Machine Deployment

    - As a user I expect to know deploy Full Virtual machine easily with all its configurations.

### Acceptance Criteria

    - User can deploy full virtual machine easily, know the max and min of required configurations as CPU, Memory, and Disk.
    - User also can add disks to virtual machine. 
    - All logs while deploying will be shown to user.
    - All previous deployments will be listed at the bottom. 

---
## Full Virtual Machine Deployment

    - As a user I should add more disks easily to Full Virtual machine

### Acceptance Criteria

    - From the 'DISKS' section above, the user can add many disks with the virtual machine.
---
## Full Virtual Machine Logs

    - As a user I expect to get all details about Full Virtual machine after deployment

### Acceptance Criteria

    - After deployment, all details of the deployed virtual machine will be shown to user.
    - Also, list of all deployments available at the bottom to view details at anytime.
    - User can also view all deployments/contracts from 'Contracts' and 'Deployments' in 'My Account' section.
---
## Deployment Cancellation

    - As a user I expect to cancel any of my deployments anytime

### Acceptance Criteria

    - After deployment, user can delete all deployments or any specific deployment from the 'Deployment List' at the bottom.
    - User can also delete them from 'Contracts' and 'Deployments' in 'My Account'.
---
## Full Virtual Machine VS Micro Virtual Machine

    - As I user I expect to know the difference between Full Virtual Machine and Micro Virtual Machine

### Acceptance Criteria

    - From 'Quick start documentation' that refers to manual of TF Chain, documents all information about their differences and similarities.
---
## Adding Configurations to Micro Virtual Machine

    - As I user I expect to add or delete 'ENVIRONMENT VARIABLES' and 'DISKS' to Micro Virtual Machine

### Acceptance Criteria

    - From 'ENVIRONMENT VARIABLES' user can add, modify, or delete environment variables to micro virtual machine.
    - From 'DISKS' user can add many disks with the micro virtual machine. 
---
## Kubernetes Deployment

    - As I user I expect to deploy Kubernetes Cluster easily with many workers 
### Acceptance Criteria

    - User can deploy Kubernetes Cluster easily with all its configurations for both master and workers 
---
## Kubernetes Deployment with many workers

    - As I user I expect to deploy Kubernetes Cluster with many workers, each on different node
### Acceptance Criteria

    - Custer machines should be deployed on different nodes on the farm if possible.
---
## User Contracts and Deployments

    - As I user I should be able to view all of my contracts and deployments
### Acceptance Criteria

    - User can view all contracts and deployments from 'Contracts' and 'Deployments' in 'My Account' section.
    - User can also view details of any contract/deployment and delete any of them. 
    - If there's any problem, user can refresh contracts/deployments from 'Refresh' button in the UI.
---
## CapRover Deployment Configuration

    - As I user I want to know what's domain and password used for in CapRover
### Acceptance Criteria

    - User can learn all about deployments from the 'Quick start documentation', that explains all about it.
    - User should pick domain name from 'GoDaddy.com' or 'Name.com' 
---
## CapRover Deployment Configuration

    - As I user I want to know what's leader and workers in CapRover
### Acceptance Criteria

    - User can learn all about deployments from the 'Quick start documentation', that explains all about it.
---
## Peertube Deployment

    - As I user expect to know what's Peertube and how to deploy it
### Acceptance Criteria

    - User can learn all about the deployment on peertube from the 'Quick start documentation', that explains all about it.
    - All previous deployments of peertube will be listed at the bottom in the 'Deployment List (Peertube)'.  
---
## Accessing Peertube Instance

    - As I user expect to know access peertube after deployment
### Acceptance Criteria

    - User can visit its deployment instance of peertube from 'Deployment List (Peertube)' by clicking on preview icon or from 'Deployments' in 'My Account' section.
    - User can login easily to peertube instance with the deployment data.
---
## Funkwhale Deployment

    - As I user expect to know what's Funkwhale and how to deploy it
### Acceptance Criteria

    - User can learn all about the deployment on Funkwhale from the 'Quick start documentation', that explains all about it.
    - All previous deployments of Funkwhale will be listed at the bottom in the 'Deployment List (Funkwhale)'. 
    - User can visit all Funkwhale instances from deployments list and use it 
---
## Accessing Funkwhale Instance

    - As I user expect to know access Funkwhale after deployment
### Acceptance Criteria

    - User can visit its deployment instance of Funkwhale from 'Deployment List (Funkwhale)' by clicking on preview icon or from 'Deployments' in 'My Account' section.
    - User can login easily to funkwhale instance with the deployment data.
---    
## Mattermost Deployment

    - As I user expect to know what's Mattermost and how to deploy it
### Acceptance Criteria

    - User can learn all about the deployment on Mattermost from the 'Quick start documentation', that explains all about it.
    - All previous deployments of mattermost will be listed at the bottom in the 'Deployment List (mattermost)'. 
    - User can visit all mattermost instances from deployments list 
---
## Mattermost Configurations 

    - As I user I want to configure mattermost instance with SMPT server
### Acceptance Criteria

    - User can configure its mattermost instance with SMTP server, by clicking on 'SMTP SERVER' and fill the data.
---
## Accessing Mattermost Instance

    - As I user expect to know access Mattermost after deployment
### Acceptance Criteria

    - User can visit its deployment instance of Mattermost from 'Deployment List (Mattermost)' by clicking on preview icon or from 'Deployments' in 'My Account' section.
    - User can login easily to mattermost instance with the deployment data.
--- 
## Discourse Deployment

    - As I user expect to know what's Discourse and how to deploy it
### Acceptance Criteria

    - User can learn all about the deployment on Discourse from the 'Quick start documentation', that explains all about it.
    - All previous deployments of discourse will be listed at the bottom in the 'Deployment List (mattermost)'. 
    - User can visit all discourse instances from deployments list 
---
## Accessing Discourse Instance

    - As I user expect to know access Discourse after deployment
### Acceptance Criteria

    - User can visit its deployment instance of Discourse from 'Deployment List (Discourse)' by clicking on preview icon or from 'Deployments' in 'My Account' section.
    - User can login easily to discourse instance with the deployment data.
--- 
## Taiga Deployment

    - As I user expect to know what's Taiga and how to deploy it
### Acceptance Criteria

    - User can learn all about the deployment on Taiga from the 'Quick start documentation', that explains all about it.
    - All previous deployments of Taiga will be listed at the bottom in the 'Deployment List (Taiga)'. 
    - User can visit all Taiga instances from deployments list and use it 
---
## Taiga Configurations 

    - As I user I want to configure Taiga instance with SMPT server
### Acceptance Criteria

    - User can configure its Taiga instance with SMTP server, by clicking on 'SMTP SERVER' and fill the data.
---
## Accessing Taiga Instance

    - As I user expect to know access Taiga after deployment
### Acceptance Criteria

    - User can visit its deployment instance of Taiga from 'Deployment List (Taiga)' by clicking on preview icon or from 'Deployments' in 'My Account' section.
    - User can login easily to Taiga instance with the deployment data.
--- 
## Owncloud Deployment

    - As I user expect to know what's Owncloud and how to deploy it
### Acceptance Criteria

    - User can learn all about the deployment on Owncloud from the 'Quick start documentation', that explains all about it.
    - All previous deployments of Owncloud will be listed at the bottom in the 'Deployment List (Owncloud)'. 
    - User can visit all Owncloud instances from deployments list and use it 
---
## Owncloud Configurations 

    - As I user I want to configure Owncloud instance with SMPT server
### Acceptance Criteria

    - User can configure its Owncloud instance with SMTP server, by clicking on 'SMTP SERVER' and fill the data.
---
## Accessing Owncloud Instance

    - As I user expect to know access Owncloud after deployment
### Acceptance Criteria

    - User can visit its deployment instance of Owncloud from 'Deployment List (Owncloud)' by clicking on preview icon or from 'Deployments' in 'My Account' section.
    - User can login easily to Owncloud instance with the deployment data.
--- 
## Presearch Deployment

    - As user I expect to know what's Presearch and how to deploy it
### Acceptance Criteria

    - User can learn all about the deployment on presearch from the 'Quick start documentation', that explains all about it.
    - All previous deployments of presearch will be listed at the bottom in the 'Deployment List (presearch)'. 
    - User can visit all presearch instances from deployments list and use it 
---
## Presearch History

    - As user I want to restore previous node of my presearch instance
### Acceptance Criteria

    - User can fill the 'Restore' section with restore key field to get previous node.
---
## Subsquid Deployment

    - As I user I want to know what's Subsquid
### Acceptance Criteria

    - User can learn all about deployments from the 'Quick start documentation', that explains all about it.
---
## Accessing Subsquid Instance

    - As I user expect to know access Subsquid after deployment
### Acceptance Criteria

    - User can visit its deployment instance of Subsquid from 'Deployment List (Subsquid)' by clicking on preview icon or from 'Deployments' in 'My Account' section.
    - User can login easily to subsquid instance with the deployment data.
--- 
## Casperlabs Deployment

    - As I user I want to know what's Casperlabs
### Acceptance Criteria

    - User can learn all about deployments from the 'Quick start documentation', that explains all about it.
---
## Accessing Casperlabs Instance

    - As I user expect to know access casperlabs after deployment
### Acceptance Criteria

    - User can visit its deployment instance of Casperlabs from 'Deployment List (Casperlabs)' by clicking on preview icon or from 'Deployments' in 'My Account' section.
    - User can login easily to casperlabs instance with the deployment data.
--- 
## Node Pilot Deployment

    - As I user I want to know what's Node Pilot
### Acceptance Criteria

    - User can learn all about deployments from the 'Quick start documentation', that explains all about it.
---
## Wordpress Deployment

    - As I user I want to know what's Wordpress
### Acceptance Criteria

    - User can learn all about deployments from the 'Quick start documentation', that explains all about it.
---
## Accessing Wordpress Instance

    - As I user expect to know access wordpress after deployment
### Acceptance Criteria

    - User can visit its deployment instance of Wordpress from 'Deployment List (Wordpress)' by clicking on preview icon or from 'Deployments' in 'My Account' section.
    - User can login easily to wordpress instance with the deployment data.
--- 
## Umbrel Deployment

    - As I user I want to know what's Umbrel and how to deploy it
### Acceptance Criteria

    - User can learn all about deployments from the 'Quick start documentation', that explains all about it.
---
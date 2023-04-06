import TFGridGqlClient, { Networks } from 'tfgrid-gql'
import GridProxyClient, { Network } from 'tf_gridproxy_client'

const gqlClient = new TFGridGqlClient(Networks.Dev)
const gridProxyClient = new GridProxyClient(Network.Dev)

export { gqlClient, gridProxyClient }

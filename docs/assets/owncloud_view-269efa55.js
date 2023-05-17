import{d as B,u as H,r as d,a as x,b as m,o as I,c as z,w as t,g as b,e as D,f as a,m as P,h as v,i as g,j as T,k as G,n as k,_ as K,l as Y,F as Q}from"./index-df6f743d.js";import{i as C,_ as V,P as h,j as J,d as X,r as Z,k as ee,l as ae,a as le}from"./tf_deployment_list.vue_vue_type_script_setup_true_lang-1803a4f6.js";import{_ as W}from"./select_gateway_node.vue_vue_type_script_setup_true_lang-ef88227d.js";import{c as oe,_ as E}from"./smtp_server.vue_vue_type_script_setup_true_lang-26828204.js";import"./list_table.vue_vue_type_script_setup_true_lang-046c7938.js";const te=T("a",{target:"_blank",class:"app-link",href:"https://manual.grid.tf/weblets/weblets_owncloud.html"}," Quick start documentation ",-1),se={name:"TfOwncloud",components:{SmtpServer:E,SelectSolutionFlavor:C,SelectGatewayNode:W,SelectFarm:V}},ne=B({...se,setup(R){const s=H(),N=d(),f=x(),i=d("MM"+b(9)),O=d("admin"),p=d(b(12)),l=d(),y=d(),_=d(),n=d(oe());async function F(){s.value.setStatus("deploy");const o=h.Owncloud.toLowerCase(),e=J({deploymentName:i.value,projectName:o,twinId:f.profile.twinId}),w=e+"."+y.value.domain;let r,S;try{r=await G(f.profile,o),await s.value.validateBalance(r),S=await X(r,{name:i.value,machines:[{name:i.value,cpu:l.value.cpu,memory:l.value.memory,disks:[{size:l.value.disk,mountPoint:"/var/lib/docker"}],flist:"https://hub.grid.tf/tf-official-apps/owncloud-10.9.1.flist",entryPoint:"/sbin/zinit init",rootFilesystemSize:Z(l.value.cpu,l.value.memory),farmId:_.value.farmID,farmName:_.value.name,country:_.value.country,planetary:!0,envs:[{key:"SSH_KEY",value:f.profile.ssh},{key:"OWNCLOUD_ADMIN_USERNAME",value:O.value},{key:"OWNCLOUD_ADMIN_PASSWORD",value:p.value},{key:"OWNCLOUD_DOMAIN",value:w},...n.value.enabled?[{key:"OWNCLOUD_MAIL_SMTP_SECURE",value:n.value.tls?"tls":n.value.ssl?"ssl":"none"},{key:"OWNCLOUD_MAIL_FROM_ADDRESS",value:n.value.email.split("@")[0]},{key:"OWNCLOUD_MAIL_DOMAIN",value:n.value.email.split("@")[1]},{key:"OWNCLOUD_MAIL_SMTP_HOST",value:n.value.hostname},{key:"OWNCLOUD_MAIL_SMTP_PORT",value:n.value.port.toString()},{key:"OWNCLOUD_MAIL_SMTP_NAME",value:n.value.username},{key:"OWNCLOUD_MAIL_SMTP_PASSWORD",value:n.value.password}]:[]]}]})}catch(M){return s.value.setStatus("failed",k(M,"Failed to deploy a owncloud instance."))}try{s.value.setStatus("deploy","Preparing to deploy gateway..."),await ee(r,{name:e,nodeId:y.value.id,backends:[`http://[${S[0].planetary}]:80`]}),s.value.reloadDeploymentsList(),s.value.setStatus("success","Successfully deployed a owncloud instance."),s.value.openDialog(S,{SSH_KEY:"Public SSH Key",OWNCLOUD_DOMAIN:"Owncloud Domain",OWNCLOUD_ADMIN_USERNAME:"Owncloud Admin Username",OWNCLOUD_ADMIN_PASSWORD:"Owncloud Admin Password",OWNCLOUD_MAIL_SMTP_SECURE:"Owncloud Mail SMTP Secure",OWNCLOUD_MAIL_DOMAIN:"Owncloud Mail Domain",OWNCLOUD_MAIL_FROM_ADDRESS:"Owncloud Mail From Address",OWNCLOUD_MAIL_SMTP_HOST:"Owncloud Mail SMTP Host",OWNCLOUD_MAIL_SMTP_PORT:"Owncloud Mail SMTP Port",OWNCLOUD_MAIL_SMTP_NAME:"Owncloud Mail SMTP Name",OWNCLOUD_MAIL_SMTP_PASSWORD:"Owncloud Mail SMTP Password"})}catch(M){s.value.setStatus("deploy","Rollbacking back due to fail to deploy gateway..."),await ae(r,i.value),s.value.setStatus("failed",k(M,"Failed to deploy a owncloud instance."))}}return(o,e)=>{const w=m("v-text-field"),r=m("input-validator"),S=m("password-input-wrapper"),M=m("d-tabs"),$=m("v-btn"),j=m("weblet-layout");return I(),z(j,{ref_key:"layout",ref:s},{title:t(()=>[D("Deploy an Owncloud Instance ")]),subtitle:t(()=>[D(" Owncloud develops and provides open-source software for content collaboration, allowing teams to easily share and work on files seamlessly regardless of device or location. "),te]),"footer-actions":t(()=>{var c;return[a($,{color:"primary",variant:"tonal",onClick:F,disabled:(c=N.value)==null?void 0:c.invalid},{default:t(()=>[D(" Deploy ")]),_:1},8,["disabled"])]}),default:t(()=>[a(M,{tabs:[{title:"Base",value:"base"},{title:"SMTP Server",value:"smtp"}],ref_key:"tabs",ref:N},{base:t(()=>{var c,U,A;return[a(r,{value:i.value,rules:[o.validators.required("Name is required."),o.validators.minLength("Name minLength is 2 chars.",2),o.validators.maxLength("Name maxLength is 15 chars.",15)]},{default:t(({props:u})=>[a(w,P({label:"Name",modelValue:i.value,"onUpdate:modelValue":e[0]||(e[0]=L=>i.value=L)},u),null,16,["modelValue"])]),_:1},8,["value","rules"]),a(r,{value:O.value,rules:[o.validators.required("Username is required."),o.validators.minLength("Username minLength is 2 chars.",2),o.validators.maxLength("Username maxLength is 15 chars.",15)]},{default:t(({props:u})=>[a(w,P({label:"Username",modelValue:O.value,"onUpdate:modelValue":e[1]||(e[1]=L=>O.value=L)},u),null,16,["modelValue"])]),_:1},8,["value","rules"]),a(S,null,{default:t(({props:u})=>[a(r,{value:p.value,rules:[o.validators.required("Password is required."),o.validators.minLength("Password minLength is 6 chars.",6),o.validators.maxLength("Password maxLength is 15 chars.",15)]},{default:t(({props:L})=>[a(w,P({label:"Password",modelValue:p.value,"onUpdate:modelValue":e[2]||(e[2]=q=>p.value=q)},{...u,...L}),null,16,["modelValue"])]),_:2},1032,["value","rules"])]),_:1}),a(C,{modelValue:v(l),"onUpdate:modelValue":e[3]||(e[3]=u=>g(l)?l.value=u:null)},null,8,["modelValue"]),a(W,{modelValue:v(y),"onUpdate:modelValue":e[4]||(e[4]=u=>g(y)?y.value=u:null)},null,8,["modelValue"]),a(V,{filters:{cpu:(c=v(l))==null?void 0:c.cpu,memory:(U=v(l))==null?void 0:U.memory,ssd:(A=v(l))==null?void 0:A.disk,publicIp:!1},modelValue:v(_),"onUpdate:modelValue":e[5]||(e[5]=u=>g(_)?_.value=u:null)},null,8,["filters","modelValue"])]}),smtp:t(()=>[a(E,{modelValue:n.value,"onUpdate:modelValue":e[6]||(e[6]=c=>n.value=c),tls:"",ssl:"",email:""},{default:t(()=>[D(" Configure these settings only If you have an smtp service and you know what you’re doing. ")]),_:1},8,["modelValue"])]),_:1},512)]),_:1},512)}}}),ue={name:"MattermostView",components:{TfOwncloud:ne,TfDeploymentList:le},setup(){return{name:h.Owncloud}}},re={class:"mt-4"};function ie(R,s,N,f,i,O){const p=m("TfOwncloud"),l=m("TfDeploymentList");return I(),Y(Q,null,[a(p),T("div",re,[a(l,{"project-name":f.name},null,8,["project-name"])])],64)}const ve=K(ue,[["render",ie]]);export{ve as default};
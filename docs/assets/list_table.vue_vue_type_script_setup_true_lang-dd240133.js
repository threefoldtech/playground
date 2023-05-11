import{R as D,ab as k,d as x,r as V,B as N,b as i,o as r,c as v,Q as S,E as T,w as d,f as g,A as B,t as I,D as U,G as A,V as L,W as P}from"./index-b7afd9dd.js";async function F(e){const a=await e.contracts.listMyContracts(),s=[a.nameContracts.map(t=>h(e,t,"name")),a.nodeContracts.map(t=>h(e,t,"node")),a.rentContracts.map(t=>h(e,t,"rent"))];return Promise.all(s.flat(1))}async function h(e,a,s){const t=+a.contractID;let o;try{o=JSON.parse(a.deploymentData)}catch{o={name:a.name}}let l="-";if(a.state===D.GracePeriod){const m=await e.contracts.getDeletionTime({id:t});l=new Date(m).toLocaleString()}let c;try{c=b(await e.contracts.getConsumption({id:t}))}catch{c=b(0)}return{contractId:t,type:s,state:a.state,createdAt:new Date(+a.createdAt*1e3).toLocaleString(),nodeId:a.nodeID||"-",solutionName:o.name||"-",solutionType:o.projectName||o.type||"-",expiration:l,consumption:c}}function b(e){return e=+e,isNaN(e)||e<=0?"No Data Available":new k(e).toFixed(8)+" TFT/hour"}const z={key:1,class:"text-center mt-8"},$={name:"ListTable"},G=x({...$,props:{headers:null,items:null,loading:{type:Boolean},deleting:{type:Boolean},modelValue:null,noDataText:null},emits:["update:model-value"],setup(e,{emit:a}){const s=e,t=V([]);N(t,l=>a("update:model-value",l));function o(){t.value.length===s.items.length?t.value=[]:t.value=s.items.slice()}return(l,c)=>{const m=i("v-checkbox-btn"),f=i("v-progress-circular"),p=i("v-spacer"),C=i("v-row"),w=i("v-data-table");return r(),v(w,{headers:e.headers,items:e.items,"item-title":"title","item-value":"key",hover:"","items-per-page":-1,"hide-default-footer":"","show-select":"",modelValue:t.value,"onUpdate:modelValue":c[0]||(c[0]=n=>t.value=n)},S({["column.data-table-select"]:d(()=>[g(m,{"model-value":t.value.length>0&&t.value.length===e.items.length,indeterminate:t.value.length>0&&e.items.length!==t.value.length,disabled:e.deleting||e.loading,onChange:o},null,8,["model-value","indeterminate","disabled"])]),["item.data-table-select"]:d(({item:n,toggleSelect:u})=>[e.deleting&&t.value.includes(n==null?void 0:n.value)?(r(),v(f,{key:0,class:"ml-3",indeterminate:"",color:"red",width:2,size:20})):(r(),v(m,{key:1,color:"primary",disabled:e.deleting||e.loading,"model-value":t.value.includes(n.value),"onUpdate:modelValue":y=>u(n)},null,8,["disabled","model-value","onUpdate:modelValue"]))]),bottom:d(()=>[e.loading&&e.items.length===0?(r(),v(C,{key:0,class:"mt-5"},{default:d(()=>[g(p),g(f,{indeterminate:"",color:"primary"}),g(p)]),_:1})):!e.loading&&e.items.length===0&&e.noDataText?(r(),B("p",z,I(e.noDataText),1)):U("",!0)]),_:2},[T(l.$slots,(n,u)=>({name:u,fn:d(y=>[A(l.$slots,u,L(P(y)))])}))]),1032,["headers","items","modelValue"])}}});export{G as _,b as f,F as g};
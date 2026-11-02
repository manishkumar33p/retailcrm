import React, {createContext,useContext,useEffect,useMemo,useState} from 'react';
import {readStore,writeStore} from '../services/storage';
import {SUPER_ADMIN} from '../data';
const AppContext=createContext(null);
const emptyData={products:[],customers:[],suppliers:[],orders:[],attendance:[],employees:[],leads:[],followups:[]};
function ensureFreshDemo(){if(typeof window!=='undefined' && localStorage.getItem('retailpro_schema')!=='3'){['retailpro_workspaces','retailpro_session','retailpro_products','retailpro_customers','retailpro_suppliers','retailpro_orders','retailpro_employees','retailpro_attendance','retailpro_leads','retailpro_followups'].forEach(k=>localStorage.removeItem(k));localStorage.setItem('retailpro_schema','3');}}
export function AppProvider({children}){
 const [workspaces,setWorkspaces]=useState(()=>{ensureFreshDemo();return readStore('workspaces',[])});
 const [user,setUser]=useState(()=>readStore('session',null));
 const [workspaceData,setWorkspaceData]=useState(emptyData);
 const [loadedId,setLoadedId]=useState(null);
 useEffect(()=>writeStore('workspaces',workspaces),[workspaces]);
 useEffect(()=>writeStore('session',user),[user]);
 useEffect(()=>{
  if(user?.workspaceId){const saved=readStore('workspace_'+user.workspaceId,emptyData);setWorkspaceData({...emptyData,...saved});setLoadedId(user.workspaceId);}
  else {setWorkspaceData(emptyData);setLoadedId(null);}
 },[user?.workspaceId,user?.id]);
 useEffect(()=>{if(user?.workspaceId && loadedId===user.workspaceId)writeStore('workspace_'+user.workspaceId,workspaceData);},[workspaceData,user?.workspaceId,loadedId]);
 const update=(key,setter)=>(value)=>setter(old=>({...old,[key]:typeof value==='function'?value(old[key]):value}));
 const setLeads=update('leads',setWorkspaceData),setFollowups=update('followups',setWorkspaceData);
 const setProducts=update('products',setWorkspaceData),setCustomers=update('customers',setWorkspaceData),setSuppliers=update('suppliers',setWorkspaceData),setOrders=update('orders',setWorkspaceData),setAttendance=update('attendance',setWorkspaceData),setEmployees=update('employees',setWorkspaceData);
 const login=(loginId,password)=>{
  const id=loginId.trim().toLowerCase();
  if(id===SUPER_ADMIN.email && password===SUPER_ADMIN.password){setUser(SUPER_ADMIN);return {ok:true};}
  for(const ws of workspaces){if((ws.ownerEmail?.toLowerCase()===id || ws.loginId?.toLowerCase()===id) && ws.ownerPassword===password && ws.active!==false){setUser({id:'owner-'+ws.id,name:ws.ownerName,email:ws.ownerEmail,role:'owner',workspaceId:ws.id,shopName:ws.name});return {ok:true};}}
  for(const ws of workspaces){const d=readStore('workspace_'+ws.id,emptyData);const emp=(d.employees||[]).find(e=>(e.userId?.toLowerCase()===id||e.email?.toLowerCase()===id)&&e.password===password&&e.active!==false);if(emp){setUser({...emp,role:'employee',workspaceId:ws.id,shopName:ws.name});return {ok:true};}}
  return {ok:false,message:'Login ID / Email या Password गलत है।'};
 };
 const createWorkspace=(details)=>{const ws={...details,id:'shop-'+Date.now(),createdAt:new Date().toISOString(),active:true};setWorkspaces(old=>[...old,ws]);writeStore('workspace_'+ws.id,emptyData);return ws;};
 const value=useMemo(()=>({user,setUser,login,workspaces,setWorkspaces,createWorkspace,...workspaceData,setLeads,setFollowups,setProducts,setCustomers,setSuppliers,setOrders,setAttendance,setEmployees}),[user,workspaces,workspaceData]);
 return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export const useApp=()=>useContext(AppContext);

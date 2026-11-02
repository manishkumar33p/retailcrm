import React from 'react';
import Sidebar from './Sidebar';
import './Layout.css';
export default function Layout({active,onNavigate,onLogout,children,user}) {return <div className="app-shell"><Sidebar active={active} onNavigate={onNavigate} onLogout={onLogout} shopName={user?.shopName} role={user?.role}/><main className="main-area"><header className="topbar"><div><span className="topbar-kicker">RETAIL MANAGEMENT</span><b>{active}</b></div><div className="top-actions"><span className="today-label">● Store Online</span><button className="avatar" title={user?.name}>{(user?.name||'A').slice(0,1).toUpperCase()}</button></div></header><div className="page-content">{children}</div></main></div>}

// ═══════════════════════════════════════════════
//  NovaTEch BD — Dashboard Module v2.1
//  Worker: সম্পূর্ণ analytics
//  Admin: মূল summary
// ═══════════════════════════════════════════════
(function(){
'use strict';

const $    = id => document.getElementById(id);
const bn   = n  => '৳' + Math.round(n||0).toLocaleString('bn-BD');
const bnN  = n  => Math.round(n||0).toLocaleString('bn-BD');
const td   = () => new Date().toISOString().split('T')[0];
const now  = () => new Date();

// ── CSS ──
function injectCSS(){
  if($('dash-css')) return;
  const s=document.createElement('style'); s.id='dash-css';
  s.textContent=`
#page-dash{padding:0;}
.dash-spin{display:flex;align-items:center;justify-content:center;padding:50px;}
.ds{width:26px;height:26px;border:2px solid var(--border);border-top-color:var(--gold);border-radius:50%;animation:spin .7s linear infinite;}

/* ── WORKER ── */
.wd-hero{background:linear-gradient(160deg,#0a1628 0%,#0f2347 50%,#0a3550 100%);padding:18px 16px 54px;position:relative;overflow:hidden;}
.wd-hero::before{content:'';position:absolute;top:-40px;right:-40px;width:180px;height:180px;border-radius:50%;background:radial-gradient(circle,rgba(59,130,246,.18),transparent 70%);}
.wd-hero::after{content:'';position:absolute;bottom:10px;left:-20px;width:130px;height:130px;border-radius:50%;background:radial-gradient(circle,rgba(245,200,66,.07),transparent 70%);}
.wd-hero-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;position:relative;z-index:1;}
.wd-datestr{font-size:11px;color:rgba(255,255,255,.45);}
.wd-profile{display:flex;align-items:center;gap:12px;position:relative;z-index:1;}
.wd-av{width:56px;height:56px;border-radius:16px;flex-shrink:0;background:linear-gradient(135deg,#f59e0b,#ef4444);display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;font-family:var(--font-en);color:#fff;border:2px solid rgba(255,255,255,.2);overflow:hidden;position:relative;}
.wd-av img{width:100%;height:100%;object-fit:cover;}
.wd-online{position:absolute;bottom:2px;right:2px;width:11px;height:11px;background:#10b981;border-radius:50%;border:2px solid #0f2246;}
.wd-name{font-family:var(--font-en);font-size:19px;font-weight:800;color:#fff;line-height:1.1;}
.wd-sub{font-size:11px;color:rgba(255,255,255,.5);margin-top:3px;}
.wd-ci{background:rgba(16,185,129,.18);border:1px solid rgba(16,185,129,.35);border-radius:10px;padding:7px 11px;text-align:center;flex-shrink:0;}
.wd-ci-l{font-size:9px;color:rgba(255,255,255,.5);font-weight:700;text-transform:uppercase;}
.wd-ci-t{font-family:var(--font-en);font-size:15px;font-weight:800;color:#34d399;margin-top:2px;}

/* Floating strip */
.wd-strip{margin:-30px 13px 0;background:var(--bg-card);border:1px solid rgba(99,179,237,.12);border-radius:16px;padding:11px 6px;display:flex;position:relative;z-index:2;box-shadow:0 8px 28px rgba(0,0,0,.4);}
.wd-si{flex:1;text-align:center;padding:0 3px;}
.wd-si+.wd-si{border-left:1px solid var(--border);}
.wd-sv{font-family:var(--font-en);font-size:15px;font-weight:800;color:var(--text);}
.wd-sl{font-size:8.5px;color:var(--text-3);font-weight:600;margin-top:2px;text-transform:uppercase;}

/* Period tabs */
.wd-body{padding:14px 13px;display:flex;flex-direction:column;gap:12px;}
.ptabs{display:flex;gap:5px;overflow-x:auto;}
.ptabs::-webkit-scrollbar{display:none;}
.ptab{flex-shrink:0;padding:6px 13px;border-radius:20px;font-size:12px;font-weight:700;font-family:var(--font-bn);cursor:pointer;border:1px solid var(--border);background:var(--bg-card);color:var(--text-3);transition:all .18s;}
.ptab.active{background:var(--blue);color:#fff;border-color:var(--blue);}

/* Stat cards */
.sg2{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.sg3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:7px;}
.sc{background:var(--bg-card);border:1px solid var(--border);border-radius:13px;padding:12px 11px;position:relative;overflow:hidden;}
.sc::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;border-radius:2px 2px 0 0;}
.sc-bl::before{background:linear-gradient(90deg,#3b82f6,#60a5fa);}
.sc-gn::before{background:linear-gradient(90deg,#10b981,#34d399);}
.sc-gd::before{background:linear-gradient(90deg,#d4a017,#f5c842);}
.sc-rd::before{background:linear-gradient(90deg,#ef4444,#f87171);}
.sc-pp::before{background:linear-gradient(90deg,#8b5cf6,#a78bfa);}
.sc-cy::before{background:linear-gradient(90deg,#06b6d4,#22d3ee);}
.sc-ico{font-size:18px;margin-bottom:5px;}
.sc-val{font-family:var(--font-en);font-size:17px;font-weight:800;color:var(--text);line-height:1;}
.sc-lbl{font-size:9.5px;color:var(--text-3);font-weight:600;margin-top:3px;text-transform:uppercase;letter-spacing:.3px;}

/* Section header */
.sh{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;}
.sh-t{font-size:11px;font-weight:700;color:var(--text-3);text-transform:uppercase;letter-spacing:.4px;}
.sh-b{font-size:10px;font-weight:700;background:rgba(59,130,246,.1);color:#60a5fa;border:1px solid rgba(59,130,246,.2);padding:2px 8px;border-radius:6px;}

/* Progress */
.prog-card{background:var(--bg-card);border:1px solid var(--border);border-radius:13px;padding:13px;}
.prog-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:9px;}
.prog-title{font-size:12px;font-weight:700;color:var(--text-2);}
.prog-pct{font-family:var(--font-en);font-size:17px;font-weight:800;color:var(--gold);}
.prog-bar{height:8px;background:var(--bg-elevated);border-radius:4px;overflow:hidden;margin-bottom:7px;}
.prog-fill{height:100%;border-radius:4px;background:linear-gradient(90deg,#d4a017,#f5c842);transition:width .6s ease;}
.prog-info{display:flex;justify-content:space-between;font-size:11px;}
.prog-done{color:var(--gold);font-weight:700;font-family:var(--font-en);}
.prog-rem{color:var(--text-3);}

/* Route card */
.route-card{background:var(--bg-card);border:1px solid var(--border-gold);border-radius:13px;padding:13px;}
.route-hdr{display:flex;align-items:center;gap:8px;margin-bottom:10px;}
.route-ico{font-size:20px;}
.route-name{font-size:14px;font-weight:700;color:var(--text);}
.route-sub{font-size:11px;color:var(--text-3);margin-top:2px;}
.visit-bar{height:10px;background:var(--bg-elevated);border-radius:5px;overflow:hidden;margin:8px 0;}
.visit-fill{height:100%;border-radius:5px;background:linear-gradient(90deg,#10b981,#34d399);transition:width .5s ease;}
.visit-info{display:flex;justify-content:space-between;font-size:11px;}

/* Task item */
.task-item{background:var(--bg-card);border:1px solid var(--border);border-radius:11px;padding:10px 12px;display:flex;align-items:center;gap:9px;margin-bottom:6px;}
.task-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
.task-txt{font-size:12.5px;flex:1;}
.task-due{font-size:10px;color:var(--text-3);}

/* ── ADMIN ── */
.ad-wrap{padding:13px;display:flex;flex-direction:column;gap:12px;}
.ad-ptabs{display:flex;gap:5px;overflow-x:auto;}
.ad-ptabs::-webkit-scrollbar{display:none;}
.ad-ptab{flex-shrink:0;padding:6px 13px;border-radius:20px;font-size:12px;font-weight:700;font-family:var(--font-bn);cursor:pointer;border:1px solid var(--border);background:var(--bg-card);color:var(--text-3);transition:all .18s;}
.ad-ptab.active{background:var(--gold);color:#0d0900;border-color:var(--gold);}
.ad-cards{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.ad-card{background:var(--bg-card);border:1px solid var(--border);border-radius:13px;padding:13px 12px;position:relative;overflow:hidden;}
.ad-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;border-radius:2px 2px 0 0;}
.adc-bl::before{background:linear-gradient(90deg,#3b82f6,#60a5fa);}
.adc-gn::before{background:linear-gradient(90deg,#10b981,#34d399);}
.adc-gd::before{background:linear-gradient(90deg,#d4a017,#f5c842);}
.adc-rd::before{background:linear-gradient(90deg,#ef4444,#f87171);}
.adc-pp::before{background:linear-gradient(90deg,#8b5cf6,#a78bfa);}
.adc-cy::before{background:linear-gradient(90deg,#06b6d4,#22d3ee);}
.ad-ico{font-size:20px;margin-bottom:6px;}
.ad-val{font-family:var(--font-en);font-size:19px;font-weight:800;line-height:1;}
.ad-lbl{font-size:9.5px;color:var(--text-3);font-weight:600;margin-top:4px;text-transform:uppercase;letter-spacing:.3px;}
.ad-diff{font-size:10px;font-weight:700;margin-top:3px;}
.d-up{color:#34d399;} .d-dn{color:#f87171;}
.mini-bars{display:flex;align-items:flex-end;gap:3px;height:44px;}
.mbar{flex:1;border-radius:3px 3px 0 0;background:rgba(245,200,66,.18);min-height:4px;transition:height .4s ease;}
.mbar.today{background:var(--gold);}
.wr-row{background:var(--bg-card);border:1px solid var(--border);border-radius:11px;padding:10px 12px;display:flex;align-items:center;gap:10px;margin-bottom:6px;}
.wr-av{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#1e3a5f,#1a2d4a);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;color:var(--gold);font-family:var(--font-en);flex-shrink:0;overflow:hidden;}
.wr-av img{width:100%;height:100%;object-fit:cover;}
.wr-inf{flex:1;min-width:0;}
.wr-nm{font-size:13px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.wr-sb{font-size:11px;color:var(--text-3);margin-top:2px;}
.wr-amt{font-family:var(--font-en);font-size:13px;font-weight:800;color:var(--gold);}
`;
  document.head.appendChild(s);
}

// ═══════════════════════════════════
//  WORKER DASHBOARD
// ═══════════════════════════════════
function buildWorkerDash(){
  const pg=$('page-dash'); if(!pg) return;
  pg.innerHTML=`<div class="dash-spin"><div class="ds"></div></div>`;

  let _p='1'; // period: 1=আজ, 7=৭দিন, 30=১মাস, 90=৩মাস
  let _sales=[], _rpl=[], _mySal={}, _myAtt=[], _tasks=[], _routes={}, _myRoute=null;
  let _uns=[];

  function unsub(){ _uns.forEach(f=>f&&f()); _uns=[]; }

  function load(){
    unsub();
    const uid=window.CUID;
    _uns.push(window.dbListen('sales',        v=>{ _sales  =Object.values(v||{}).filter(s=>s.uid===uid); render(); }));
    _uns.push(window.dbListen('replacements', v=>{ _rpl    =Object.values(v||{}).filter(s=>s.uid===uid); render(); }));
    _uns.push(window.dbListen('salaries/'+uid,v=>{ _mySal  =v||{}; render(); }));
    _uns.push(window.dbListen('attendance',   v=>{ _myAtt  =Object.values(v||{}).filter(a=>a.uid===uid); render(); }));
    _uns.push(window.dbListen('tasks',        v=>{ _tasks  =Object.values(v||{}).filter(t=>t.assignedTo===uid||t.createdBy===uid); render(); }));
    _uns.push(window.dbListen('routes',       v=>{ _routes =v||{}; render(); }));
  }

  function getDateRange(){
    const n=now(), days=parseInt(_p);
    if(_p==='1') return { start:td(), end:td() };
    const s=new Date(n-(days*86400000)).toISOString().split('T')[0];
    return { start:s, end:td() };
  }

  function filtered(arr){
    const {start,end}=getDateRange();
    return arr.filter(s=>s.date>=start&&s.date<=end);
  }

  function todayCI(){
    const rec=_myAtt.find(a=>a.date===td()&&a.checkIn);
    if(!rec) return null;
    return new Date(rec.checkIn).toLocaleTimeString('bn-BD',{hour:'2-digit',minute:'2-digit'});
  }

  function monthAtt(){
    const n=now(), ms=new Date(n.getFullYear(),n.getMonth(),1).toISOString().split('T')[0];
    const m=_myAtt.filter(a=>a.date>=ms);
    return { present:m.filter(a=>a.checkIn).length, late:m.filter(a=>a.late).length };
  }

  function myRouteInfo(){
    const uid=window.CUID;
    // user এর routeId থেকে route খোঁজো
    const routeId=window.CUDATA?.routeId;
    if(!routeId||!_routes[routeId]) return null;
    const route=_routes[routeId];
    const totalShops=route.shopCount||0;
    // আজকে কতো shop visit হয়েছে
    const visitedToday=[...new Set(_sales.filter(s=>s.date===td()).map(s=>s.shopId).filter(Boolean))].length;
    return { name:route.name||'রুট', totalShops, visitedToday };
  }

  function render(){
    const fs   = filtered(_sales);
    const fr   = filtered(_rpl);
    const sale = fs.reduce((a,s)=>a+(s.total||0),0);
    const due  = fs.reduce((a,s)=>a+(s.due||0),0);
    const rplAmt=fr.reduce((a,r)=>a+(r.returnTotal||r.totalReturn||0),0);
    const qty  = fs.reduce((a,s)=>a+(s.qty||0),0);
    const att  = monthAtt();
    const ci   = todayCI();
    const route= myRouteInfo();
    const pend = _tasks.filter(t=>t.status!=='done').length;
    const udata= window.CUDATA||{};

    // Target (monthly)
    const target=parseInt(_mySal.monthlyTarget||0);
    const n=now(), ms=new Date(n.getFullYear(),n.getMonth(),1).toISOString().split('T')[0];
    const monthSale=_sales.filter(s=>s.date>=ms).reduce((a,s)=>a+(s.total||0),0);
    const tPct=target>0?Math.min(Math.round(monthSale/target*100),100):0;

    const dateStr=n.toLocaleDateString('bn-BD',{weekday:'long',day:'numeric',month:'long'});

    pg.innerHTML=`
    <div>
      <!-- Hero -->
      <div class="wd-hero">
        <div class="wd-hero-top">
          <span class="wd-datestr">${dateStr}</span>
        </div>
        <div class="wd-profile">
          <div class="wd-av">
            ${udata.photoURL?`<img src="${udata.photoURL}" onerror="this.style.display='none'">`:''}
            <span style="${udata.photoURL?'display:none':''}">${(window.CN||'U')[0].toUpperCase()}</span>
            <div class="wd-online"></div>
          </div>
          <div style="flex:1">
            <div class="wd-name">${window.CN||''}</div>
            <div class="wd-sub">${udata.empId?udata.empId+' · ':''}${udata.phone||''}</div>
          </div>
          ${ci?`<div class="wd-ci"><div class="wd-ci-l">চেক-ইন</div><div class="wd-ci-t">${ci}</div></div>`:''}
        </div>
      </div>

      <!-- Strip -->
      <div class="wd-strip">
        <div class="wd-si"><div class="wd-sv">${bnN(att.present)}</div><div class="wd-sl">উপস্থিত</div></div>
        <div class="wd-si"><div class="wd-sv">${bnN(att.late)}</div><div class="wd-sl">দেরি</div></div>
        <div class="wd-si"><div class="wd-sv">${bnN(pend)}</div><div class="wd-sl">কাজ বাকি</div></div>
        <div class="wd-si"><div class="wd-sv">${bnN(fs.length)}</div><div class="wd-sl">বিক্রয়</div></div>
      </div>

      <div class="wd-body">
        <!-- Period tabs -->
        <div class="ptabs">
          ${[['1','আজ'],['7','৭ দিন'],['30','১ মাস'],['90','৩ মাস']].map(([v,l])=>`
            <button class="ptab${_p===v?' active':''}" onclick="wdP('${v}')">${l}</button>`).join('')}
        </div>

        <!-- Main stats -->
        <div class="sg2">
          <div class="sc sc-gd"><div class="sc-ico">💰</div><div class="sc-val">${bn(sale)}</div><div class="sc-lbl">মোট বিক্রয়</div></div>
          <div class="sc sc-rd"><div class="sc-ico">⏳</div><div class="sc-val">${bn(due)}</div><div class="sc-lbl">বাকি আছে</div></div>
          <div class="sc sc-pp"><div class="sc-ico">🔄</div><div class="sc-val">${bnN(fr.length)}</div><div class="sc-lbl">রিপ্লেসমেন্ট</div></div>
          <div class="sc sc-cy"><div class="sc-ico">💸</div><div class="sc-val">${bn(rplAmt)}</div><div class="sc-lbl">রিপ্লে. মূল্য</div></div>
        </div>

        <!-- More stats -->
        <div class="sg3">
          <div class="sc sc-bl"><div class="sc-ico">📦</div><div class="sc-val">${bnN(qty)}</div><div class="sc-lbl">পণ্য বিক্রি</div></div>
          <div class="sc sc-gn"><div class="sc-ico">🏪</div><div class="sc-val">${bnN([...new Set(fs.map(s=>s.shopId).filter(Boolean))].length)}</div><div class="sc-lbl">দোকান</div></div>
          <div class="sc sc-rd"><div class="sc-ico">📋</div><div class="sc-val">${bnN(pend)}</div><div class="sc-lbl">বাকি কাজ</div></div>
        </div>

        <!-- Target -->
        ${target>0?`
        <div class="prog-card">
          <div class="prog-hdr"><span class="prog-title">🎯 মাসিক টার্গেট</span><span class="prog-pct">${bnN(tPct)}%</span></div>
          <div class="prog-bar"><div class="prog-fill" style="width:${tPct}%"></div></div>
          <div class="prog-info"><span class="prog-done">${bn(monthSale)} অর্জিত</span><span class="prog-rem">লক্ষ্য ${bn(target)}</span></div>
        </div>`:''}

        <!-- Route info -->
        ${route?`
        <div class="route-card">
          <div class="route-hdr"><span class="route-ico">🗺️</span><div><div class="route-name">${route.name}</div><div class="route-sub">আজকের রুট</div></div></div>
          <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;">
            <span style="color:var(--text-3)">ভিজিট করা দোকান</span>
            <span style="color:var(--gold);font-weight:700;font-family:var(--font-en)">${route.visitedToday} / ${route.totalShops}</span>
          </div>
          ${route.totalShops>0?`
          <div class="visit-bar"><div class="visit-fill" style="width:${Math.round(route.visitedToday/route.totalShops*100)}%"></div></div>
          <div class="visit-info">
            <span style="color:var(--green);font-weight:700">${Math.round(route.visitedToday/route.totalShops*100)}% সম্পন্ন</span>
            <span style="color:var(--text-3)">${route.totalShops-route.visitedToday}টি বাকি</span>
          </div>`:''
          }
        </div>`:''}

        <!-- Pending Tasks -->
        ${pend>0?`
        <div>
          <div class="sh"><span class="sh-t">✅ বাকি কাজ</span><span class="sh-b">${bnN(pend)}টি</span></div>
          ${_tasks.filter(t=>t.status!=='done').slice(0,4).map(t=>`
            <div class="task-item">
              <div class="task-dot" style="background:${t.priority==='high'?'#ef4444':t.priority==='medium'?'#f59e0b':'#60a5fa'}"></div>
              <div class="task-txt">${t.title||''}</div>
              <div class="task-due">${t.dueDate||''}</div>
            </div>`).join('')}
        </div>`:''}

      </div>
    </div>`;

    window.wdP=v=>{ _p=v; render(); };
  }

  load();
}

// ═══════════════════════════════════
//  ADMIN / MANAGER DASHBOARD
// ═══════════════════════════════════
function buildAdminDash(){
  const pg=$('page-dash'); if(!pg) return;
  pg.innerHTML=`<div class="dash-spin"><div class="ds"></div></div>`;

  let _p='7';
  let _sales=[], _exp=[], _users={}, _uns=[];

  function unsub(){ _uns.forEach(f=>f&&f()); _uns=[]; }

  function load(){
    unsub();
    _uns.push(window.dbListen('sales',   v=>{ _sales=Object.values(v||{}); render(); }));
    _uns.push(window.dbListen('expenses',v=>{ _exp  =Object.values(v||{}); render(); }));
    _uns.push(window.dbListen('users',   v=>{ _users=v||{};                render(); }));
  }

  function byPeriod(arr){
    const n=now(), t=td();
    if(_p==='1') return arr.filter(s=>s.date===t);
    const s=new Date(n-parseInt(_p)*86400000).toISOString().split('T')[0];
    if(_p==='month'){ const ms=new Date(n.getFullYear(),n.getMonth(),1).toISOString().split('T')[0]; return arr.filter(s=>s.date>=ms); }
    return arr.filter(x=>x.date>=s);
  }

  function prevPeriod(arr){
    const n=now(), d=_p==='month'?30:parseInt(_p);
    const e=new Date(n-d*86400000).toISOString().split('T')[0];
    const s=new Date(n-d*2*86400000).toISOString().split('T')[0];
    return arr.filter(x=>x.date>=s&&x.date<=e);
  }

  function diff(cur,prev){
    if(prev===0) return cur>0?100:0;
    return Math.round((cur-prev)/prev*100);
  }

  function render(){
    const fs=byPeriod(_sales), ps=prevPeriod(_sales);
    const fe=byPeriod(_exp);
    const tS =fs.reduce((a,s)=>a+(s.total||0),0);
    const tP =fs.reduce((a,s)=>a+(s.profit||0),0);
    const tE =fe.reduce((a,e)=>a+(e.amount||0),0);
    const tD =fs.reduce((a,s)=>a+(s.due||0),0);
    const tR =fs.length;
    const pS =ps.reduce((a,s)=>a+(s.total||0),0);
    const pP =ps.reduce((a,s)=>a+(s.profit||0),0);
    const dS =diff(tS,pS), dP=diff(tP,pP);

    const workers=Object.entries(_users)
      .filter(([,u])=>u.role==='worker'||u.role==='manager')
      .map(([uid,u])=>{
        const ws=fs.filter(s=>s.uid===uid);
        return {...u,uid,total:ws.reduce((a,s)=>a+(s.total||0),0),cnt:ws.length};
      }).sort((a,b)=>b.total-a.total);

    // 7-day bars
    const bars=Array.from({length:7},(_,i)=>{
      const d=new Date(now()-(6-i)*86400000).toISOString().split('T')[0];
      return {d, v:_sales.filter(s=>s.date===d).reduce((a,s)=>a+(s.total||0),0)};
    });
    const maxB=Math.max(...bars.map(b=>b.v),1);

    pg.innerHTML=`
    <div class="ad-wrap">
      <div class="ad-ptabs">
        ${[['1','আজ'],['7','৭ দিন'],['30','৩০ দিন'],['month','এ মাসে']].map(([v,l])=>`
          <button class="ad-ptab${_p===v?' active':''}" onclick="adP('${v}')">${l}</button>`).join('')}
      </div>

      <div class="ad-cards">
        <div class="ad-card adc-bl">
          <div class="ad-ico">💰</div>
          <div class="ad-val" style="color:#60a5fa">${bn(tS)}</div>
          <div class="ad-lbl">মোট বিক্রয়</div>
          <div class="ad-diff ${dS>=0?'d-up':'d-dn'}">${dS>=0?'▲':'▼'} ${Math.abs(dS)}%</div>
        </div>
        <div class="ad-card adc-gn">
          <div class="ad-ico">📈</div>
          <div class="ad-val" style="color:#34d399">${bn(tP)}</div>
          <div class="ad-lbl">মোট লাভ</div>
          <div class="ad-diff ${dP>=0?'d-up':'d-dn'}">${dP>=0?'▲':'▼'} ${Math.abs(dP)}%</div>
        </div>
        <div class="ad-card adc-gd">
          <div class="ad-ico">💸</div>
          <div class="ad-val" style="color:var(--gold)">${bn(tE)}</div>
          <div class="ad-lbl">মোট খরচ</div>
        </div>
        <div class="ad-card adc-rd">
          <div class="ad-ico">⏳</div>
          <div class="ad-val" style="color:#f87171">${bn(tD)}</div>
          <div class="ad-lbl">বাকি আছে</div>
        </div>
        <div class="ad-card adc-pp">
          <div class="ad-ico">🧾</div>
          <div class="ad-val" style="color:#a78bfa">${bnN(tR)}</div>
          <div class="ad-lbl">মোট বিক্রয় সংখ্যা</div>
        </div>
        <div class="ad-card adc-cy">
          <div class="ad-ico">👥</div>
          <div class="ad-val" style="color:#22d3ee">${bnN(workers.length)}</div>
          <div class="ad-lbl">সক্রিয় কর্মী</div>
        </div>
      </div>

      <!-- 7-day chart -->
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:13px;padding:13px">
        <div class="sh" style="margin-bottom:12px">
          <span class="sh-t">📊 ৭ দিনের বিক্রয়</span>
          <span style="font-size:11px;color:var(--text-3)">${bn(tS)}</span>
        </div>
        <div class="mini-bars">
          ${bars.map((b,i)=>`
            <div style="display:flex;flex-direction:column;align-items:center;flex:1;gap:3px">
              <div class="mbar${i===6?' today':''}" style="height:${Math.round((b.v/maxB)*40)+4}px;width:100%"></div>
              <span style="font-size:8px;color:var(--text-3)">${new Date(b.d).toLocaleDateString('bn-BD',{weekday:'narrow'})}</span>
            </div>`).join('')}
        </div>
      </div>

      <!-- Worker ranking -->
      <div>
        <div class="sh">
          <span class="sh-t">🏆 কর্মীদের বিক্রয়</span>
          <span class="sh-b">${bnN(workers.length)} জন</span>
        </div>
        ${workers.slice(0,6).map((w,i)=>`
          <div class="wr-row">
            <div style="font-size:11px;font-weight:800;font-family:var(--font-en);color:${['var(--gold)','#94a3b8','#cd7f32'][i]||'var(--text-3)'};width:16px">#${i+1}</div>
            <div class="wr-av">
              ${w.photoURL?`<img src="${w.photoURL}" onerror="this.style.display='none'">`:''}
              <span style="${w.photoURL?'display:none':''}">${(w.name||'?')[0].toUpperCase()}</span>
            </div>
            <div class="wr-inf">
              <div class="wr-nm">${w.name||'Unknown'}</div>
              <div class="wr-sb">${w.cnt}টি বিক্রয়</div>
            </div>
            <div class="wr-amt">${bn(w.total)}</div>
          </div>`).join('')}
        ${workers.length===0?`<div style="text-align:center;padding:20px;color:var(--text-3);font-size:13px">এই সময়ে কোনো বিক্রয় নেই</div>`:''}
      </div>
    </div>`;

    window.adP=v=>{ _p=v; render(); };
  }

  load();
}

// ── Init ──
function init(){
  injectCSS();
  window.CR==='worker' ? buildWorkerDash() : buildAdminDash();
}
function waitAndInit(t=0){
  if(window._db&&window.CU&&window.CR){ init(); return; }
  if(t>60) return;
  setTimeout(()=>waitAndInit(t+1),300);
}
waitAndInit();

})();

import{useState,useEffect,useRef,useCallback}from"react";
import"./MarketSim.css";
import{NEWS}from"../../utils/newsData";

const TICKERS_INIT=[{n:'BBCA',p:9800},{n:'TLKM',p:3120},{n:'ASII',p:5750},{n:'BMRI',p:7200},{n:'BBRI',p:4890},{n:'UNVR',p:2830},{n:'ICBP',p:10200},{n:'PGAS',p:1640},{n:'ANTM',p:2150},{n:'INDF',p:6300}];
const W_DIR=[0.50,0.40,-0.50,-0.38,0.50,-0.42,0.60,0.48,-0.32,-0.40,0.25,-0.30,0.42,0.68,-0.28,-0.72,0.52,-0.48,0.50,-0.60];
const W_MAG={MAKRO:0.42,KOMODITAS:0.35,GLOBAL:0.58,KORPORASI:0.38,KURS:0.32,KEBIJAKAN:0.46,DOMESTIK:0.22,ENERGI:0.38,REGULASI:0.28};

const OPEN=7850,TICK=900,NEWS_INT=120000,LOT=100;
const fmt=n=>n.toLocaleString('id-ID',{minimumFractionDigits:2,maximumFractionDigits:2});
const fmtRp=n=>'Rp '+Math.round(n).toLocaleString('id-ID');

export default function MarketSim({balance:initBal=2000000,onTransaction}){
  const cvRef=useRef(null);
  const stateRef=useRef({
    price:OPEN,hi:OPEN,lo:OPEN,vol:0,impact:0,
    history:[],newsHist:[],used:new Set(),lastNews:Date.now(),
    balance:initBal,shares:0,avgBuy:0,
    tkP:TICKERS_INIT.map(s=>({...s})),
  });
  const [,forceUpdate]=useState(0);
  const rerender=useCallback(()=>forceUpdate(v=>v+1),[]);
  const animRef=useRef(null);
  const [msg,setMsg]=useState({text:'',type:''});
  const [expandedIdx,setExpandedIdx]=useState(null);
  const [qty,setQty]=useState(1);

  // Init history
  useEffect(()=>{
    const s=stateRef.current;
    let p=OPEN;
    for(let i=0;i<260;i++){
      p+=(Math.random()-0.495)*p*0.0009;
      p=Math.max(6000,p);
      s.history.push(p);
    }
    s.price=p;s.hi=Math.max(...s.history);s.lo=Math.min(...s.history);
  },[]);

  // Pick news
  const pickNews=useCallback(()=>{
    const s=stateRef.current;
    if(s.used.size>=NEWS.length)s.used.clear();
    let i;do{i=Math.floor(Math.random()*NEWS.length)}while(s.used.has(i));
    s.used.add(i);return i;
  },[]);

  // Fire news
  const fireNews=useCallback(()=>{
    const s=stateRef.current;
    const idx=pickNews(),n=NEWS[idx];
    s.impact=(W_DIR[idx]||0)*(W_MAG[n.c]||0.35);
    const ts=new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'});
    s.newsHist.unshift({...n,ts,idx});
    if(s.newsHist.length>7)s.newsHist.pop();
    s.lastNews=Date.now();
    rerender();
  },[pickNews,rerender]);

  // Canvas draw
  const draw=useCallback(()=>{
    const cv=cvRef.current;if(!cv)return;
    const parent=cv.parentElement;if(!parent)return;
    const dpr=devicePixelRatio||1;
    cv.width=parent.clientWidth*dpr;cv.height=parent.clientHeight*dpr;
    cv.style.width=parent.clientWidth+'px';cv.style.height=parent.clientHeight+'px';
    const W=cv.width,H=cv.height;if(!W||!H)return;
    const ctx=cv.getContext('2d');
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle='#FFFFFF';ctx.fillRect(0,0,W,H);
    const s=stateRef.current;
    const pad={t:14,r:60,b:24,l:8};
    const cW=W-pad.l-pad.r,cH=H-pad.t-pad.b;
    const data=s.history.slice(-260);if(data.length<2)return;
    const mn=Math.min(...data)*0.9994,mx=Math.max(...data)*1.0006,rng=mx-mn||1;
    const tx=i=>pad.l+(i/(data.length-1))*cW;
    const ty=p=>pad.t+cH-((p-mn)/rng)*cH;
    // Grid
    for(let i=0;i<=4;i++){
      const y=pad.t+(i/4)*cH,pv=mx-(i/4)*rng;
      ctx.beginPath();ctx.strokeStyle='#E8ECF2';ctx.lineWidth=1;ctx.setLineDash([4,6]);
      ctx.moveTo(pad.l,y);ctx.lineTo(pad.l+cW,y);ctx.stroke();ctx.setLineDash([]);
      ctx.fillStyle='#9CA3AF';ctx.font=`${9*dpr}px "Plus Jakarta Sans",sans-serif`;ctx.textAlign='left';
      ctx.fillText(fmt(pv),pad.l+cW+5,y+3);
    }
    // Current price line
    const curY=ty(s.price);
    ctx.beginPath();ctx.strokeStyle='rgba(0,186,136,0.15)';ctx.lineWidth=1;ctx.setLineDash([3,4]);
    ctx.moveTo(pad.l,curY);ctx.lineTo(pad.l+cW,curY);ctx.stroke();ctx.setLineDash([]);
    // Area fill
    const grad=ctx.createLinearGradient(0,pad.t,0,pad.t+cH);
    grad.addColorStop(0,'rgba(0,186,136,0.18)');grad.addColorStop(1,'rgba(0,186,136,0.01)');
    ctx.beginPath();ctx.moveTo(tx(0),ty(data[0]));
    for(let i=1;i<data.length;i++)ctx.lineTo(tx(i),ty(data[i]));
    ctx.lineTo(tx(data.length-1),pad.t+cH);ctx.lineTo(tx(0),pad.t+cH);ctx.closePath();
    ctx.fillStyle=grad;ctx.fill();
    // Line
    ctx.beginPath();ctx.moveTo(tx(0),ty(data[0]));
    for(let i=1;i<data.length;i++)ctx.lineTo(tx(i),ty(data[i]));
    ctx.strokeStyle='#00BA88';ctx.lineWidth=2*dpr;ctx.stroke();
    // Dot
    ctx.beginPath();ctx.arc(tx(data.length-1),curY,4*dpr,0,Math.PI*2);
    ctx.fillStyle='#00BA88';ctx.fill();
    ctx.beginPath();ctx.arc(tx(data.length-1),curY,6*dpr,0,Math.PI*2);
    ctx.fillStyle='rgba(0,186,136,0.15)';ctx.fill();
    const pulse=8*dpr+Math.sin(Date.now()/320)*2*dpr;
    ctx.beginPath();ctx.arc(tx(data.length-1),curY,pulse,0,Math.PI*2);
    ctx.strokeStyle='rgba(0,186,136,0.20)';ctx.lineWidth=dpr;ctx.stroke();
    // X labels
    for(let i=0;i<=4;i++){
      const idx2=Math.floor((i/4)*(data.length-1));
      const minsAgo=Math.floor(((data.length-1-idx2)*TICK)/60000);
      ctx.fillStyle='#9CA3AF';ctx.font=`${8*dpr}px "Plus Jakarta Sans",sans-serif`;ctx.textAlign='center';
      ctx.fillText(minsAgo===0?'kini':`-${minsAgo}m`,tx(idx2),H-6);
    }
  },[]);

  // Main tick loop
  useEffect(()=>{
    const firstNewsTimer=setTimeout(()=>fireNews(),1200);
    const interval=setInterval(()=>{
      const s=stateRef.current;
      const sig=0.00045+Math.abs(s.impact)*0.0007;
      const mu=s.impact*0.0012;
      s.impact*=0.997;
      s.price=Math.max(6000,s.price*(1+mu*(TICK/1000)+(Math.random()-0.5)*2*sig));
      s.vol+=Math.floor(Math.random()*200000+50000);
      if(s.price>s.hi)s.hi=s.price;
      if(s.price<s.lo)s.lo=s.price;
      s.history.push(s.price);
      if(s.history.length>380)s.history.shift();
      // Ticker prices
      s.tkP.forEach(tk=>{tk.p+=(Math.random()-0.492)*tk.p*0.0007});
      // Auto news
      if(Date.now()-s.lastNews>=NEWS_INT)fireNews();
      rerender();
      draw();
    },TICK);
    return()=>{clearTimeout(firstNewsTimer);clearInterval(interval)};
  },[fireNews,rerender,draw]);

  // Resize observer
  useEffect(()=>{
    const cv=cvRef.current;if(!cv)return;
    const ro=new ResizeObserver(()=>draw());
    ro.observe(cv.parentElement);
    return()=>ro.disconnect();
  },[draw]);

  // Sync balance from props
  useEffect(()=>{stateRef.current.balance=initBal},[initBal]);

  const s=stateRef.current;
  const chg=s.price-OPEN,pct=(chg/OPEN)*100;
  const rem=Math.max(0,NEWS_INT-(Date.now()-s.lastNews));
  const m=Math.floor(rem/60000),sec=Math.floor((rem%60000)/1000);
  const cdTime=`${m}:${String(sec).padStart(2,'0')}`;
  const cdPct=(rem/NEWS_INT*100);
  const v=s.vol>=1e9?(s.vol/1e9).toFixed(1)+'B':(s.vol/1e6).toFixed(0)+'M';
  const lots=Math.floor(s.shares/LOT);
  const pl=s.shares>0?(s.price-s.avgBuy)*s.shares:0;

  const doBuy=()=>{
    const cost=qty*LOT*s.price;
    if(cost>s.balance){setMsg({text:'SALDO TIDAK MENCUKUPI',type:'err'});setTimeout(()=>setMsg({text:'',type:''}),2000);return}
    s.avgBuy=s.shares===0?s.price:(s.avgBuy*s.shares+s.price*qty*LOT)/(s.shares+qty*LOT);
    s.balance-=cost;s.shares+=qty*LOT;
    if(onTransaction)onTransaction(-cost);
    setMsg({text:`BELI ${qty} LOT — ${fmtRp(cost)}`,type:'ok'});
    setTimeout(()=>setMsg({text:'',type:''}),2500);
    rerender();
  };

  const doSell=()=>{
    const toSell=qty*LOT;
    if(toSell>s.shares){setMsg({text:'SAHAM TIDAK MENCUKUPI',type:'err'});setTimeout(()=>setMsg({text:'',type:''}),2000);return}
    const proceeds=toSell*s.price;
    s.balance+=proceeds;s.shares-=toSell;
    if(s.shares===0)s.avgBuy=0;
    if(onTransaction)onTransaction(proceeds);
    setMsg({text:`JUAL ${qty} LOT — ${fmtRp(proceeds)}`,type:'ok'});
    setTimeout(()=>setMsg({text:'',type:''}),2500);
    rerender();
  };

  const activeNews=s.newsHist[0]||null;

  return(
    <div className="mk-page">
      <div className="r">
        {/* Header ticker */}
        <div className="hdr">
          <div className="logo">MKTLAB</div>
          <div className="tkw">
            <div className="tki">
              {[...s.tkP,...s.tkP].map((t,i)=>(
                <span className="tks" key={i}>{t.n} <b>{Math.round(t.p)}</b></span>
              ))}
            </div>
          </div>
          <div className="clk">{new Date().toLocaleTimeString('id-ID')}</div>
        </div>

        <div className="body">
          {/* Left — Chart */}
          <div className="left">
            <div className="chdr">
              <div><div className="csub">IHSG · IDX COMPOSITE</div><div className="cname">PASAR INDONESIA</div></div>
              <div className="cprc">{fmt(s.price)}</div>
              <div className="cdif">{chg>=0?'+':''}{fmt(chg)} ({chg>=0?'+':''}{pct.toFixed(2)}%)</div>
            </div>
            <div className="cwrap"><canvas ref={cvRef}/></div>
            <div className="cfoot">
              <div className="cf"><div className="cfl">Open</div><div className="cfv">{fmt(OPEN)}</div></div>
              <div className="cf"><div className="cfl">High</div><div className="cfv">{fmt(s.hi)}</div></div>
              <div className="cf"><div className="cfl">Low</div><div className="cfv">{fmt(s.lo)}</div></div>
              <div className="cf"><div className="cfl">Volume</div><div className="cfv">{v}</div></div>
              <div className="cf"><div className="cfl">Perubahan</div><div className="cfv">{chg>=0?'+':''}{pct.toFixed(2)}%</div></div>
            </div>
          </div>

          {/* Right — News + Trade */}
          <div className="right">
            <div className="nhdr">
              <div className="nlbl"><span className="ndot"/>BERITA PASAR</div>
              <div className={`ncard${activeNews?' nanim':''}`}>
                <div className="ncat">{activeNews?activeNews.c:'MEMUAT'}</div>
                <div className="ntitle">{activeNews?activeNews.t:'Menunggu berita pertama…'}</div>
                <div className="nbody">{activeNews?activeNews.b:'Pasar bergerak dalam kisaran terbatas sambil menunggu katalis baru.'}</div>
                <div className="ntimer">Berita berikutnya: {cdTime}</div>
              </div>
            </div>

            <div className="hlbl">RIWAYAT BERITA</div>
            <div className="nhist">
              {s.newsHist.length===0&&<div style={{fontSize:8,color:'#222',textAlign:'center',padding:10}}>Belum ada riwayat</div>}
              {s.newsHist.map((n,i)=>(
                <div key={`${n.idx}-${i}`}>
                  <div className="hi" onClick={()=>setExpandedIdx(expandedIdx===`${n.idx}-${i}`?null:`${n.idx}-${i}`)}>
                    <div className="hit">{n.t}</div>
                    <div className="him">{n.ts} · {n.c}</div>
                  </div>
                  {expandedIdx===`${n.idx}-${i}`&&(
                    <div className="hi-explain">
                      <div className="hi-explain-label">Analisis</div>
                      {n.b}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="trade">
              <div className="tlbl">TRANSAKSI</div>
              <div className="tbal">
                <span className="tball">Saldo</span>
                <span className="tbalv">{fmtRp(s.balance)}</span>
              </div>
              <div className="tport">
                <div className="tpi"><div className="tpl">Dimiliki</div><div className="tpv">{lots} lot</div></div>
                <div className="tpi"><div className="tpl">Harga rata</div><div className="tpv">{s.avgBuy?fmt(s.avgBuy):'—'}</div></div>
                <div className="tpi"><div className="tpl">P&amp;L</div><div className="tpv" style={{color:pl>=0?'#888':'#666'}}>{s.shares>0?fmtRp(pl):'—'}</div></div>
              </div>
              <div className="tqwrap">
                <span className="tqlbl">Jumlah</span>
                <input className="tqinp" type="number" value={qty} min={1} max={999}
                  onChange={e=>setQty(Math.max(1,parseInt(e.target.value)||1))}/>
                <span style={{fontSize:8,color:'#2e2e2e'}}>lot</span>
              </div>
              <div className="tbtn-row">
                <button className="tbtn tbuy" onClick={doBuy}>BELI</button>
                <button className="tbtn tsell" onClick={doSell} disabled={s.shares<=0}>JUAL</button>
              </div>
              <div className={`tmsg ${msg.type}`}>{msg.text}</div>
            </div>

            <div className="cdbar">
              <span className="cdl">Berita berikutnya</span>
              <div className="cdp"><div className="cdf" style={{width:`${cdPct}%`}}/></div>
              <span className="cdt">{cdTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

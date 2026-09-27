const DATA_URL="../roadmap/roadmap.json";
const roadmap=document.querySelector("#roadmap"), detail=document.querySelector("#detail");
const laneGrid=document.querySelector("#lane-grid");

async function load(){
  const data=await fetch(DATA_URL).then(r=>r.json());
  const phases=data.phases;
  document.querySelector("#phase-count").textContent=phases.length;
  document.querySelector("#active-phase").textContent=data.activePhase;
  const total=phases.reduce((s,p)=>s+p.progress,0);
  document.querySelector("#overall-progress").textContent=Math.round(total/phases.length)+"%";

  phases.forEach((p,i)=>{
    const row=document.createElement("div"); row.className="phase-row";
    const card=document.createElement("article"); card.className="phase "+p.status;
    const pct=Math.max(0,Math.min(100,p.progress));
    card.innerHTML=`
      <div class="phase-head"><span>PHASE ${p.id}</span><span>${p.status.toUpperCase()}</span></div>
      <h2>${p.title}</h2>
      <div class="bar"><span style="width:${pct}%"></span></div>
      <div class="phase-foot"><span>${p.progress}% COMPLETE</span><span>${p.lessons} LESSONS</span></div>`;
    card.addEventListener("click",()=>showDetail(p));
    row.appendChild(card); roadmap.appendChild(row);
  });

  data.lanes.forEach(l=>{
    const el=document.createElement("div"); el.className="lane";
    el.innerHTML=`<strong>${l.title.toUpperCase()}</strong><p>${l.description}</p>`;
    laneGrid.appendChild(el);
  });
}
function showDetail(p){
  detail.classList.remove("hidden");
  detail.innerHTML=`<button onclick="detail.classList.add('hidden')">CLOSE</button>
    <div class="eyebrow">PHASE ${p.id}</div><h3>${p.title}</h3>
    <p>Status: <b>${p.status}</b> · Progress: <b>${p.progress}%</b></p>
    <p><b>Theory:</b> ${p.outputs.theory}<br><b>Implementation:</b> ${p.outputs.implementation}<br>
    <b>Engineering:</b> ${p.outputs.engineering}<br><b>Project:</b> ${p.outputs.project}</p>`;
}
load();

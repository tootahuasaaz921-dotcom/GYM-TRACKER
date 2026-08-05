/* ==================================================================
   FORGE — Gym & Nutrition Tracker
   Vanilla JS application logic. All data persisted to localStorage.
   ================================================================== */

/* ============================================================
   0. ICONS — tiny inline SVG library, rendered from data-ic attrs
   ============================================================ */
const ICONS = {
  grid:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  dumbbell:'<path d="M6.5 6.5 17.5 17.5"/><rect x="2.5" y="2.5" width="5" height="5" rx="1.4" transform="rotate(-45 5 5)"/><rect x="16.5" y="16.5" width="5" height="5" rx="1.4" transform="rotate(-45 19 19)"/><path d="M9 6 6 9M18 15l-3 3"/>',
  flame:'<path d="M12 2c1 4-4 5-4 9a4 4 0 0 0 8 0c0-1.5-1-2-1-3.5 1 1 3 2.5 3 5.5a6 6 0 0 1-12 0C6 9 9 7 12 2Z"/>',
  trophy:'<path d="M8 4h8v5a4 4 0 0 1-8 0V4Z"/><path d="M8 5H4a3 3 0 0 0 3 5M16 5h4a3 3 0 0 1-3 5"/><path d="M10 15h4v3h-4z"/><path d="M8 21h8"/>',
  trend:'<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  scale:'<circle cx="12" cy="14" r="7"/><path d="M9 3h6l1 3H8l1-3Z"/><path d="M12 14l3-3"/>',
  apple:'<path d="M12 8c-3 0-5 2.5-5 6a7 7 0 0 0 7 7c1 0 1.5-.5 2-1 .5.5 1 1 2 1a7 7 0 0 0 7-7c0-3.5-2-6-5-6-1.3 0-2 .6-3 .6s-1.7-.6-3-.6Z"/><path d="M12 8c0-2 1-4 3-4.5"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
  list:'<path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r="1.2"/><circle cx="3.5" cy="12" r="1.2"/><circle cx="3.5" cy="18" r="1.2"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  bar:'<path d="M4 20V10M11 20V4M18 20v-7"/>',
  spark:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V20a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H4a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 1.9.3H10a1.7 1.7 0 0 0 1-1.6V4a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.9V10a1.7 1.7 0 0 0 1.6 1H20a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.6 1Z"/>',
  menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  moon:'<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z"/>',
  sun:'<circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  check:'<path d="M4 12l5 5L20 6"/>',
  chevleft:'<path d="M15 5l-7 7 7 7"/>',
  chevright:'<path d="M9 5l7 7-7 7"/>',
  play:'<path d="M6 4l14 8-14 8V4Z"/>',
  pause:'<path d="M6 4h4v16H6zM14 4h4v16h-4z"/>',
  reset:'<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/>',
  download:'<path d="M12 3v13M7 11l5 5 5-5"/><path d="M4 21h16"/>',
  upload:'<path d="M12 21V8M7 12l5-5 5 5"/><path d="M4 21h16"/>',
  trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14"/>',
  fire:'<path d="M12 2c1 4-4 5-4 9a4 4 0 0 0 8 0c0-1.5-1-2-1-3.5 1 1 3 2.5 3 5.5a6 6 0 0 1-12 0C6 9 9 7 12 2Z"/>',
  x:'<path d="M6 6l12 12M18 6L6 18"/>',
  edit:'<path d="M4 20h4L18.5 9.5a2 2 0 0 0 0-2.8L16.3 4.5a2 2 0 0 0-2.8 0L4 14v6Z"/>',
  star:'<path d="M12 3l2.6 5.8 6.4.6-4.8 4.3 1.4 6.3L12 16.8 6.4 20l1.4-6.3-4.8-4.3 6.4-.6L12 3Z"/>',
};
function renderIcons(root=document){
  root.querySelectorAll('[data-ic]').forEach(el=>{
    const name = el.getAttribute('data-ic');
    if(!ICONS[name]) return;
    el.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg>`;
    el.removeAttribute('data-ic');
  });
}

/* ============================================================
   1. UTILITIES
   ============================================================ */
const uid = ()=> Date.now().toString(36)+Math.random().toString(36).slice(2,8);
const todayISO = ()=> new Date().toISOString().slice(0,10);
const $ = (sel,root=document)=> root.querySelector(sel);
const $$ = (sel,root=document)=> Array.from(root.querySelectorAll(sel));

function fmtDate(iso){
  const d = new Date(iso+'T00:00:00');
  return d.toLocaleDateString(undefined,{weekday:'short', month:'short', day:'numeric'});
}
function fmtDateShort(iso){
  const d = new Date(iso+'T00:00:00');
  return d.toLocaleDateString(undefined,{month:'short', day:'numeric'});
}
function fmtDateFull(iso){
  const d = new Date(iso+'T00:00:00');
  return d.toLocaleDateString(undefined,{weekday:'long', year:'numeric', month:'long', day:'numeric'});
}
function daysAgo(n){
  const d = new Date();
  d.setDate(d.getDate()-n);
  return d.toISOString().slice(0,10);
}
function isSameWeek(iso){
  const d = new Date(iso+'T00:00:00'), now = new Date();
  const start = new Date(now); start.setDate(now.getDate()-now.getDay());
  start.setHours(0,0,0,0);
  return d >= start && d <= now;
}
function isSameMonth(iso){
  const d = new Date(iso+'T00:00:00'), now = new Date();
  return d.getMonth()===now.getMonth() && d.getFullYear()===now.getFullYear();
}
function round1(n){ return Math.round(n*10)/10; }
function round0(n){ return Math.round(n); }
function kgToLbs(kg){ return kg*2.20462; }
function lbsToKg(lbs){ return lbs/2.20462; }
function toDisplayWeight(kg){
  if(kg==null || isNaN(kg)) return 0;
  return store.settings.unit==='lbs' ? round1(kgToLbs(kg)) : round1(kg);
}
function toStoreWeight(val){
  const n = parseFloat(val)||0;
  return store.settings.unit==='lbs' ? lbsToKg(n) : n;
}
function unitLabel(){ return store.settings.unit==='lbs' ? 'lbs' : 'kg'; }
function est1RM(weight,reps){
  if(!reps || reps<=0) return weight;
  return weight * (1 + reps/30);
}
function escapeHtml(s){
  return String(s??'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

/* ============================================================
   2. STATE / STORAGE
   ============================================================ */
const STORAGE_KEY = 'forge_tracker_data_v1';

function defaultState(){
  return {
    exercises: [],       // {id,name,muscleGroup,notes,favorite}
    workouts: [],         // {id,date,notes,exercises:[{exerciseId,exerciseName,sets:[{weight,reps,rpe,notes}],volume,maxWeight,est1RM}]}
    prs: [],               // {id,exerciseId,exerciseName,previous,newPR,reps,date}
    bodyweight: [],       // {id,date,weight}
    foods: [],             // saved food library {id,name,calories,protein,carbs,fat} per 1 unit(100g default)
    foodLog: [],           // {id,date,name,calories,protein,carbs,fat,quantity}
    water: {},             // { 'YYYY-MM-DD': cupsCount }
    habits: [],             // {id,name,log:{'YYYY-MM-DD':true}}
    sleep: [],               // {id,date,hours}
    settings: {
      theme:'dark',
      unit:'kg',
      calorieGoal:2200,
      proteinGoal:150,
      carbGoal:220,
      fatGoal:70,
      waterGoal:8,
      startWeight:null,
      goalWeight:null,
      missedWorkoutAlert:false,
    }
  };
}

let store = load();

function load(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return defaultState();
    const parsed = JSON.parse(raw);
    // merge with defaults to survive schema upgrades
    const def = defaultState();
    return Object.assign(def, parsed, {settings: Object.assign(def.settings, parsed.settings||{})});
  }catch(e){
    console.error('Failed to load data', e);
    return defaultState();
  }
}
function save(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

/* ============================================================
   3. TOASTS
   ============================================================ */
function toast(message, type='info'){
  const stack = $('#toastStack');
  const el = document.createElement('div');
  el.className = 'toast' + (type==='pr' ? ' pr':'');
  const iconName = type==='pr' ? 'trophy' : type==='error' ? 'x' : 'check';
  el.innerHTML = `<span class="toast-icon" data-ic="${iconName}"></span><span>${escapeHtml(message)}</span>`;
  stack.appendChild(el);
  renderIcons(el);
  setTimeout(()=>{ el.style.opacity='0'; el.style.transform='translateX(30px)'; el.style.transition='.25s'; setTimeout(()=>el.remove(),260); }, 3400);
}

/* ============================================================
   4. MODAL HELPER
   ============================================================ */
const modalBackdrop = ()=>$('#modalBackdrop');
const modalRoot = ()=>$('#modalRoot');
function openModal(html){
  modalRoot().innerHTML = html;
  modalBackdrop().classList.add('show');
  renderIcons(modalRoot());
}
function closeModal(){
  modalBackdrop().classList.remove('show');
  modalRoot().innerHTML='';
}
document.addEventListener('click', e=>{
  if(e.target===modalBackdrop()) closeModal();
});
document.addEventListener('keydown', e=>{
  if(e.key==='Escape') closeModal();
});

/* ============================================================
   5. NAVIGATION
   ============================================================ */
const PAGE_TITLES = {
  dashboard:'Dashboard', exercises:'Exercise Management', workout:'Workout Tracker',
  pr:'PR Tracker', overload:'Progressive Overload', bodyweight:'Body Weight Tracker',
  food:'Food Tracker', foodhistory:'Food History', workouthistory:'Workout History',
  calendar:'Calendar', stats:'Statistics', extras:'Extras', settings:'Settings'
};
function goToPage(page){
  $$('.page').forEach(p=>p.classList.remove('active'));
  const target = $('#page-'+page);
  if(!target) return;
  target.classList.add('active');
  $$('.nav-item').forEach(n=> n.classList.toggle('active', n.dataset.page===page));
  $('#pageTitle').textContent = PAGE_TITLES[page]||'';
  document.title = `FORGE — ${PAGE_TITLES[page]||''}`;
  closeSidebar();
  renderPage(page);
  window.scrollTo({top:0,behavior:'instant'in window ? 'instant':'auto'});
}
function renderPage(page){
  if(page==='dashboard') renderDashboard();
  else if(page==='exercises') renderExercises();
  else if(page==='workout') renderWorkoutPage();
  else if(page==='pr') renderPRPage();
  else if(page==='overload') renderOverloadPage();
  else if(page==='bodyweight') renderBodyweightPage();
  else if(page==='food') renderFoodPage();
  else if(page==='foodhistory') renderFoodHistoryPage();
  else if(page==='workouthistory') renderWorkoutHistoryPage();
  else if(page==='calendar') renderCalendarPage();
  else if(page==='stats') renderStatsPage();
  else if(page==='extras') renderExtrasPage();
  else if(page==='settings') renderSettingsPage();
}
$$('.nav-item').forEach(btn=> btn.addEventListener('click', ()=> goToPage(btn.dataset.page)));

function openSidebar(){ $('#sidebar').classList.add('open'); $('#scrim').classList.add('show'); }
function closeSidebar(){ $('#sidebar').classList.remove('open'); $('#scrim').classList.remove('show'); }
$('#menuToggle').addEventListener('click', openSidebar);
$('#scrim').addEventListener('click', closeSidebar);

/* mobile search bar toggle: inject a search bar under topbar */
$('#searchToggle').addEventListener('click', ()=>{
  let bar = $('.mobile-search-bar');
  if(!bar){
    bar = document.createElement('div');
    bar.className='mobile-search-bar';
    bar.innerHTML = `<div class="global-search"><span data-ic="search"></span><input type="text" id="globalSearchMobile" placeholder="Search…"><div class="search-results" id="searchResultsMobile"></div></div>`;
    $('.topbar').insertAdjacentElement('afterend', bar);
    renderIcons(bar);
    $('#globalSearchMobile').addEventListener('input', e=> runGlobalSearch(e.target.value, '#searchResultsMobile'));
  }
  bar.classList.toggle('show');
  if(bar.classList.contains('show')) $('#globalSearchMobile').focus();
});


/* ============================================================
   6. CONSTANTS
   ============================================================ */
const MUSCLE_GROUPS = ['Chest','Back','Shoulders','Biceps','Triceps','Legs','Abs','Cardio','Custom'];

/* ============================================================
   7. DASHBOARD
   ============================================================ */
let dashWeightChartInst=null, weeklySummaryChartInst=null;

function renderDashboard(){
  $('#statWorkouts').textContent = store.workouts.length;
  const curW = currentBodyWeight();
  $('#statWeight').textContent = curW!=null ? `${toDisplayWeight(curW)} ${unitLabel()}` : '—';
  $('#statExercises').textContent = store.exercises.length;
  $('#statPRs').textContent = store.prs.length;
  $('#statCalories').textContent = round0(caloriesForDate(todayISO()));
  $('#statStreak').textContent = computeStreak();
  $('#streakCount').textContent = computeStreak();

  renderDashWeightChart();
  renderWeeklySummaryChart();
  renderRecentActivity();
  renderDashMacroBars();
}

function currentBodyWeight(){
  if(store.bodyweight.length===0) return null;
  const sorted = [...store.bodyweight].sort((a,b)=> a.date.localeCompare(b.date));
  return sorted[sorted.length-1].weight;
}

function computeStreak(){
  // consecutive days (including today) with at least one workout
  const dates = new Set(store.workouts.map(w=>w.date));
  let streak=0, d = new Date();
  // if no workout today, start check from yesterday (today not yet broken)
  let cursor = todayISO();
  if(!dates.has(cursor)){
    d.setDate(d.getDate()-1);
    cursor = d.toISOString().slice(0,10);
    if(!dates.has(cursor)) return 0;
  }
  while(dates.has(cursor)){
    streak++;
    d.setDate(d.getDate()-1);
    cursor = d.toISOString().slice(0,10);
  }
  return streak;
}

function renderDashWeightChart(){
  const ctx = $('#dashWeightChart');
  const sorted = [...store.bodyweight].sort((a,b)=> a.date.localeCompare(b.date)).slice(-30);
  const labels = sorted.map(e=> fmtDateShort(e.date));
  const data = sorted.map(e=> toDisplayWeight(e.weight));
  if(dashWeightChartInst) dashWeightChartInst.destroy();
  dashWeightChartInst = new Chart(ctx, lineChartConfig(labels, data, unitLabel(), '#7c5cfc'));
}

function renderWeeklySummaryChart(){
  const ctx = $('#weeklySummaryChart');
  const now = new Date();
  const start = new Date(now); start.setDate(now.getDate()-6);
  const labels=[], counts=[];
  for(let i=0;i<7;i++){
    const d = new Date(start); d.setDate(start.getDate()+i);
    const iso = d.toISOString().slice(0,10);
    labels.push(d.toLocaleDateString(undefined,{weekday:'short'}));
    counts.push(store.workouts.filter(w=>w.date===iso).length);
  }
  $('#weekRangeLabel').textContent = `${fmtDateShort(start.toISOString().slice(0,10))} – ${fmtDateShort(now.toISOString().slice(0,10))}`;
  if(weeklySummaryChartInst) weeklySummaryChartInst.destroy();
  weeklySummaryChartInst = new Chart(ctx, barChartConfig(labels, counts, 'Workouts', '#22d3ee'));
}

function renderRecentActivity(){
  const items = [];
  store.workouts.forEach(w=> items.push({type:'workout', date:w.date, ts:w.id, title:`Workout logged — ${w.exercises.length} exercise${w.exercises.length!==1?'s':''}`, sub:w.exercises.map(e=>e.exerciseName).join(', ')}));
  store.prs.forEach(p=> items.push({type:'pr', date:p.date, ts:p.id, title:`New PR — ${p.exerciseName}`, sub:`${round1(toDisplayWeight(p.previous))} → ${round1(toDisplayWeight(p.newPR))} ${unitLabel()}`}));
  store.bodyweight.forEach(b=> items.push({type:'weight', date:b.date, ts:b.id, title:`Body weight logged`, sub:`${toDisplayWeight(b.weight)} ${unitLabel()}`}));
  store.foodLog.forEach(f=> items.push({type:'food', date:f.date, ts:f.id, title:`Food logged — ${f.name}`, sub:`${round0(f.calories)} kcal`}));
  items.sort((a,b)=> String(b.ts).localeCompare(String(a.ts)));
  const top = items.slice(0,10);
  const wrap = $('#recentActivity');
  if(top.length===0){ wrap.innerHTML = `<div class="empty-state">No activity yet. Start by logging a workout or a meal.</div>`; return; }
  wrap.innerHTML = top.map(it=>`
    <div class="activity-item">
      <span class="activity-dot"></span>
      <div class="ai-main"><div class="ai-title">${escapeHtml(it.title)}</div><div class="ai-sub">${escapeHtml(it.sub)}</div></div>
      <div class="ai-time">${fmtDateShort(it.date)}</div>
    </div>`).join('');
}

function renderDashMacroBars(){
  renderMacroBarsInto('#dashMacroBars', todayISO());
}
function renderMacroBarsInto(sel, dateIso){
  const logs = store.foodLog.filter(f=>f.date===dateIso);
  const totals = logs.reduce((acc,f)=>({
    cal:acc.cal+f.calories, pro:acc.pro+f.protein, carb:acc.carb+f.carbs, fat:acc.fat+f.fat
  }), {cal:0,pro:0,carb:0,fat:0});
  const g = store.settings;
  const rows = [
    {label:'Calories', cls:'cal', val:totals.cal, goal:g.calorieGoal, unit:'kcal'},
    {label:'Protein', cls:'protein', val:totals.pro, goal:g.proteinGoal, unit:'g'},
    {label:'Carbs', cls:'carbs', val:totals.carb, goal:g.carbGoal, unit:'g'},
    {label:'Fat', cls:'fat', val:totals.fat, goal:g.fatGoal, unit:'g'},
  ];
  $(sel).innerHTML = rows.map(r=>{
    const pct = r.goal>0 ? Math.min(100, (r.val/r.goal)*100) : 0;
    return `<div class="macro-bar-row">
      <div class="macro-bar-label"><span>${r.label}</span><b>${round0(r.val)} / ${r.goal} ${r.unit}</b></div>
      <div class="macro-bar-track"><div class="macro-bar-fill ${r.cls}" style="width:${pct}%"></div></div>
    </div>`;
  }).join('');
}

function caloriesForDate(iso){
  return store.foodLog.filter(f=>f.date===iso).reduce((s,f)=> s+f.calories, 0);
}

/* Shared chart configs */
function chartTextColor(){ return getComputedStyle(document.body).getPropertyValue('--text-dim').trim() || '#9aa1b3'; }
function chartGridColor(){ return getComputedStyle(document.body).getPropertyValue('--border-soft').trim() || 'rgba(255,255,255,.06)'; }

function lineChartConfig(labels, data, label, color){
  return {
    type:'line',
    data:{labels, datasets:[{label, data, borderColor:color, backgroundColor:color+'22', fill:true, tension:.35, pointRadius:2, pointBackgroundColor:color, borderWidth:2}]},
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{legend:{display:false}},
      scales:{
        x:{ticks:{color:chartTextColor(), font:{size:10}}, grid:{color:'transparent'}},
        y:{ticks:{color:chartTextColor(), font:{size:10}}, grid:{color:chartGridColor()}}
      }
    }
  };
}
function barChartConfig(labels, data, label, color){
  return {
    type:'bar',
    data:{labels, datasets:[{label, data, backgroundColor:color, borderRadius:6, maxBarThickness:36}]},
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{legend:{display:false}},
      scales:{
        x:{ticks:{color:chartTextColor(), font:{size:10}}, grid:{color:'transparent'}},
        y:{ticks:{color:chartTextColor(), font:{size:10}, precision:0}, grid:{color:chartGridColor()}}
      }
    }
  };
}
function multiLineChartConfig(labels, datasets){
  return {
    type:'line',
    data:{labels, datasets:datasets.map(d=>({...d, tension:.35, pointRadius:2, borderWidth:2, fill:false}))},
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{legend:{labels:{color:chartTextColor(), font:{size:11}}}},
      scales:{
        x:{ticks:{color:chartTextColor(), font:{size:10}}, grid:{color:'transparent'}},
        y:{ticks:{color:chartTextColor(), font:{size:10}}, grid:{color:chartGridColor()}}
      }
    }
  };
}


/* ============================================================
   8. EXERCISE MANAGEMENT
   ============================================================ */
let activeMuscleFilter = 'All';

function renderMuscleFilters(){
  const wrap = $('#muscleFilters');
  const groups = ['All','Favorites',...MUSCLE_GROUPS];
  wrap.innerHTML = groups.map(g=> `<button class="chip ${g===activeMuscleFilter?'active':''}" data-mg="${g}">${g}</button>`).join('');
  $$('.chip', wrap).forEach(c=> c.addEventListener('click', ()=>{ activeMuscleFilter=c.dataset.mg; renderExercises(); }));
}

function renderExercises(){
  renderMuscleFilters();
  let list = [...store.exercises];
  if(activeMuscleFilter==='Favorites') list = list.filter(e=>e.favorite);
  else if(activeMuscleFilter!=='All') list = list.filter(e=>e.muscleGroup===activeMuscleFilter);
  list.sort((a,b)=> a.name.localeCompare(b.name));
  const grid = $('#exerciseGrid');
  if(list.length===0){ grid.innerHTML = `<div class="empty-state">No exercises here yet. Add one to get started.</div>`; return; }
  grid.innerHTML = list.map(ex=>`
    <div class="ex-card" data-id="${ex.id}">
      <div class="ex-card-top">
        <div>
          <div class="ex-name">${escapeHtml(ex.name)}</div>
          <span class="ex-group-badge">${escapeHtml(ex.muscleGroup)}</span>
        </div>
        <button class="fav-btn ${ex.favorite?'active':''}" data-fav="${ex.id}" title="Favorite"><i data-ic="star"></i></button>
      </div>
      <div class="ex-notes">${escapeHtml(ex.notes||'')}</div>
      <div class="ex-card-actions">
        <button class="btn-icon-sm" data-edit="${ex.id}"><i data-ic="edit"></i></button>
        <button class="btn-icon-sm" data-del="${ex.id}"><i data-ic="trash"></i></button>
      </div>
    </div>`).join('');
  renderIcons(grid);
  $$('[data-fav]', grid).forEach(b=> b.addEventListener('click', ()=> toggleFavorite(b.dataset.fav)));
  $$('[data-edit]', grid).forEach(b=> b.addEventListener('click', ()=> openExerciseModal(b.dataset.edit)));
  $$('[data-del]', grid).forEach(b=> b.addEventListener('click', ()=> deleteExercise(b.dataset.del)));
}

function toggleFavorite(id){
  const ex = store.exercises.find(e=>e.id===id);
  if(!ex) return;
  ex.favorite = !ex.favorite;
  save(); renderExercises();
}

function deleteExercise(id){
  const ex = store.exercises.find(e=>e.id===id);
  if(!ex) return;
  openConfirm(`Delete "${ex.name}"? This will not remove past workout logs.`, ()=>{
    store.exercises = store.exercises.filter(e=>e.id!==id);
    save(); renderExercises(); populateExerciseSelects(); toast('Exercise deleted');
  });
}

function openExerciseModal(editId=null){
  const editing = editId ? store.exercises.find(e=>e.id===editId) : null;
  openModal(`
    <h3>${editing?'Edit Exercise':'Add Exercise'}</h3>
    <div class="field" style="margin-bottom:12px;">
      <label>Exercise Name</label>
      <input type="text" id="mExName" value="${editing?escapeHtml(editing.name):''}" placeholder="e.g. Barbell Bench Press">
    </div>
    <div class="field" style="margin-bottom:12px;">
      <label>Muscle Group</label>
      <select id="mExGroup">${MUSCLE_GROUPS.map(g=>`<option value="${g}" ${editing&&editing.muscleGroup===g?'selected':''}>${g}</option>`).join('')}</select>
    </div>
    <div class="field" style="margin-bottom:12px;">
      <label>Notes</label>
      <textarea id="mExNotes" rows="3" placeholder="Form cues, equipment, etc.">${editing?escapeHtml(editing.notes||''):''}</textarea>
    </div>
    <div class="settings-row" style="border:none;padding:0;">
      <span>Mark as favorite</span>
      <label class="switch"><input type="checkbox" id="mExFav" ${editing&&editing.favorite?'checked':''}><span></span></label>
    </div>
    <div class="modal-actions">
      <button class="btn btn-secondary" id="mCancel">Cancel</button>
      <button class="btn btn-primary" id="mSave"><i data-ic="check"></i> Save</button>
    </div>
  `);
  $('#mCancel').addEventListener('click', closeModal);
  $('#mSave').addEventListener('click', ()=>{
    const name = $('#mExName').value.trim();
    if(!name){ toast('Please enter an exercise name','error'); return; }
    const group = $('#mExGroup').value;
    const notes = $('#mExNotes').value.trim();
    const fav = $('#mExFav').checked;
    if(editing){
      editing.name=name; editing.muscleGroup=group; editing.notes=notes; editing.favorite=fav;
    }else{
      store.exercises.push({id:uid(), name, muscleGroup:group, notes, favorite:fav});
    }
    save(); closeModal(); renderExercises(); populateExerciseSelects();
    toast(editing?'Exercise updated':'Exercise added');
  });
}
$('#addExerciseBtn').addEventListener('click', ()=> openExerciseModal());

function openConfirm(message, onConfirm){
  openModal(`
    <h3>Confirm</h3>
    <p style="color:var(--text-dim);font-size:13.5px;margin-bottom:6px;">${escapeHtml(message)}</p>
    <div class="modal-actions">
      <button class="btn btn-secondary" id="cCancel">Cancel</button>
      <button class="btn btn-danger" id="cOk"><i data-ic="trash"></i> Confirm</button>
    </div>
  `);
  $('#cCancel').addEventListener('click', closeModal);
  $('#cOk').addEventListener('click', ()=>{ closeModal(); onConfirm(); });
}

function populateExerciseSelects(){
  const opts = ['<option value="">Select exercise…</option>', ...store.exercises.sort((a,b)=>a.name.localeCompare(b.name)).map(e=>`<option value="${e.id}">${escapeHtml(e.name)} (${e.muscleGroup})</option>`)];
  const html = opts.join('');
  const sel1 = $('#workoutExerciseSelect'); if(sel1) sel1.innerHTML = html;
  const sel2 = $('#overloadExerciseSelect'); if(sel2) sel2.innerHTML = html;
}


/* ============================================================
   9. WORKOUT TRACKER
   ============================================================ */
// working draft of the workout currently being built
let workoutDraft = { exercises: [] }; // [{exerciseId, exerciseName, sets:[{weight,reps,rpe,notes}]}]

function renderWorkoutPage(){
  $('#workoutDate').value = $('#workoutDate').value || todayISO();
  populateExerciseSelects();
  renderWorkoutExerciseList();
  updateWorkoutSummary();
}

$('#addWorkoutExerciseBtn').addEventListener('click', ()=>{
  const sel = $('#workoutExerciseSelect');
  const exId = sel.value;
  if(!exId){ toast('Choose an exercise first','error'); return; }
  if(workoutDraft.exercises.find(e=>e.exerciseId===exId)){ toast('Exercise already added','error'); return; }
  const ex = store.exercises.find(e=>e.id===exId);
  workoutDraft.exercises.push({exerciseId:exId, exerciseName:ex.name, sets:[{weight:'',reps:'',rpe:'',notes:''}]});
  sel.value='';
  renderWorkoutExerciseList();
});

function renderWorkoutExerciseList(){
  const wrap = $('#workoutExerciseList');
  if(workoutDraft.exercises.length===0){
    wrap.innerHTML = `<div class="empty-state">No exercises added yet. Pick one above to start logging sets.</div>`;
    return;
  }
  wrap.innerHTML = workoutDraft.exercises.map((blk, bi)=>`
    <div class="we-block" data-bi="${bi}">
      <div class="we-head">
        <b>${escapeHtml(blk.exerciseName)}</b>
        <button class="remove-ex" data-remove-ex="${bi}" title="Remove exercise"><i data-ic="x"></i></button>
      </div>
      <div class="we-sets">
        ${blk.sets.map((s,si)=>`
          <div class="set-row" data-si="${si}">
            <span class="set-num">${si+1}</span>
            <input type="number" step="0.5" placeholder="Weight (${unitLabel()})" value="${s.weight}" data-field="weight" data-bi="${bi}" data-si="${si}">
            <input type="number" placeholder="Reps" value="${s.reps}" data-field="reps" data-bi="${bi}" data-si="${si}">
            <input type="number" step="0.5" placeholder="RPE" value="${s.rpe}" data-field="rpe" data-bi="${bi}" data-si="${si}" min="1" max="10">
            <input type="text" placeholder="Set notes" value="${escapeHtml(s.notes)}" data-field="notes" data-bi="${bi}" data-si="${si}">
            <button class="remove-set" data-remove-set="${bi}:${si}" title="Remove set"><i data-ic="x"></i></button>
          </div>`).join('')}
      </div>
      <button class="add-set-btn" data-add-set="${bi}">+ Add Set</button>
    </div>`).join('');
  renderIcons(wrap);

  $$('[data-field]', wrap).forEach(inp=> inp.addEventListener('input', e=>{
    const bi=+e.target.dataset.bi, si=+e.target.dataset.si, field=e.target.dataset.field;
    workoutDraft.exercises[bi].sets[si][field] = e.target.value;
    updateWorkoutSummary();
  }));
  $$('[data-add-set]', wrap).forEach(b=> b.addEventListener('click', ()=>{
    const bi=+b.dataset.addSet;
    workoutDraft.exercises[bi].sets.push({weight:'',reps:'',rpe:'',notes:''});
    renderWorkoutExerciseList();
  }));
  $$('[data-remove-set]', wrap).forEach(b=> b.addEventListener('click', ()=>{
    const [bi,si] = b.dataset.removeSet.split(':').map(Number);
    workoutDraft.exercises[bi].sets.splice(si,1);
    if(workoutDraft.exercises[bi].sets.length===0) workoutDraft.exercises[bi].sets.push({weight:'',reps:'',rpe:'',notes:''});
    renderWorkoutExerciseList(); updateWorkoutSummary();
  }));
  $$('[data-remove-ex]', wrap).forEach(b=> b.addEventListener('click', ()=>{
    workoutDraft.exercises.splice(+b.dataset.removeEx,1);
    renderWorkoutExerciseList(); updateWorkoutSummary();
  }));
}

function computeBlockStats(blk){
  let volume=0, maxWeight=0, bestOneRM=0;
  blk.sets.forEach(s=>{
    const w = toStoreWeight(s.weight), r = parseFloat(s.reps)||0;
    if(w>0 && r>0){
      volume += w*r;
      if(w>maxWeight) maxWeight = w;
      const orm = est1RM(w,r);
      if(orm>bestOneRM) bestOneRM = orm;
    }
  });
  return {volume, maxWeight, bestOneRM};
}

function updateWorkoutSummary(){
  let totalVolume=0, topWeight=0, bestOneRM=0;
  workoutDraft.exercises.forEach(blk=>{
    const s = computeBlockStats(blk);
    totalVolume += s.volume;
    if(s.maxWeight>topWeight) topWeight=s.maxWeight;
    if(s.bestOneRM>bestOneRM) bestOneRM=s.bestOneRM;
  });
  $('#wSumVolume').textContent = `${round0(toDisplayWeight(totalVolume))} ${unitLabel()}`;
  $('#wSumTop').textContent = `${round1(toDisplayWeight(topWeight))} ${unitLabel()}`;
  $('#wSumOneRM').textContent = `${round1(toDisplayWeight(bestOneRM))} ${unitLabel()}`;
}

$('#saveWorkoutBtn').addEventListener('click', ()=>{
  const date = $('#workoutDate').value || todayISO();
  const validExercises = workoutDraft.exercises.filter(blk=> blk.sets.some(s=> toStoreWeight(s.weight)>0 && parseFloat(s.reps)>0));
  if(validExercises.length===0){ toast('Add at least one set with weight and reps','error'); return; }

  const exercisesToSave = validExercises.map(blk=>{
    const cleanSets = blk.sets
      .filter(s=> toStoreWeight(s.weight)>0 && parseFloat(s.reps)>0)
      .map(s=> ({weight:toStoreWeight(s.weight), reps:parseFloat(s.reps)||0, rpe:s.rpe?parseFloat(s.rpe):null, notes:s.notes||''}));
    const stats = computeBlockStats({sets: cleanSets.map(s=>({weight:toDisplayWeight(s.weight), reps:s.reps}))});
    // recompute directly in kg to avoid double conversion
    let volume=0,maxWeight=0,bestOneRM=0;
    cleanSets.forEach(s=>{ volume+=s.weight*s.reps; if(s.weight>maxWeight)maxWeight=s.weight; const o=est1RM(s.weight,s.reps); if(o>bestOneRM)bestOneRM=o; });
    return {exerciseId:blk.exerciseId, exerciseName:blk.exerciseName, sets:cleanSets, volume, maxWeight, est1RM:bestOneRM};
  });

  const workout = {id:uid(), date, notes:$('#workoutNotes').value.trim(), exercises:exercisesToSave};
  store.workouts.push(workout);
  save();

  // PR detection per exercise
  exercisesToSave.forEach(blk=> detectAndRecordPR(blk, date, workout.id));

  save();
  workoutDraft = {exercises:[]};
  $('#workoutNotes').value='';
  renderWorkoutExerciseList();
  updateWorkoutSummary();
  toast('Workout saved');
  renderDashboard();
});

function detectAndRecordPR(blk, date, excludeWorkoutId){
  // find previous best weight for this exercise across all workouts except the one just saved
  let prevBest = 0, prevReps=0;
  store.workouts.forEach(w=>{
    if(w.id===excludeWorkoutId) return;
    w.exercises.forEach(e=>{
      if(e.exerciseId!==blk.exerciseId) return;
      e.sets.forEach(s=>{
        if(s.weight>prevBest){ prevBest=s.weight; prevReps=s.reps; }
      });
    });
  });
  if(blk.maxWeight>prevBest){
    const bestSet = blk.sets.reduce((a,b)=> b.weight>a.weight?b:a, blk.sets[0]);
    store.prs.push({
      id:uid(), exerciseId:blk.exerciseId, exerciseName:blk.exerciseName,
      previous: prevBest, newPR: blk.maxWeight, reps: bestSet.reps, date
    });
    toast(`New PR! ${blk.exerciseName}: ${round1(toDisplayWeight(blk.maxWeight))} ${unitLabel()}`, 'pr');
  }
}


/* ============================================================
   9. WORKOUT TRACKER
   ============================================================ */
let currentWorkoutDraft = { exercises: [] }; // {exerciseId,exerciseName,sets:[{weight,reps,rpe,notes}]}

function renderWorkoutPage(){
  populateExerciseSelects();
  if(!$('#workoutDate').value) $('#workoutDate').value = todayISO();
  renderWorkoutExerciseList();
  updateWorkoutSummaryBar();
}

$('#addWorkoutExerciseBtn').addEventListener('click', ()=>{
  const sel = $('#workoutExerciseSelect');
  const id = sel.value;
  if(!id){ toast('Choose an exercise first','error'); return; }
  if(currentWorkoutDraft.exercises.find(e=>e.exerciseId===id)){ toast('Exercise already added to this workout','error'); return; }
  const ex = store.exercises.find(e=>e.id===id);
  currentWorkoutDraft.exercises.push({
    exerciseId:id, exerciseName:ex.name,
    sets:[{weight:'',reps:'',rpe:'',notes:''}]
  });
  sel.value='';
  renderWorkoutExerciseList();
});

function renderWorkoutExerciseList(){
  const wrap = $('#workoutExerciseList');
  if(currentWorkoutDraft.exercises.length===0){
    wrap.innerHTML = `<div class="empty-state">Add an exercise above, then log your sets.</div>`;
    return;
  }
  wrap.innerHTML = currentWorkoutDraft.exercises.map((blk, bi)=>`
    <div class="we-block" data-bi="${bi}">
      <div class="we-head">
        <b>${escapeHtml(blk.exerciseName)}</b>
        <button class="remove-ex" data-remove-ex="${bi}"><i data-ic="x"></i></button>
      </div>
      <div class="set-rows" data-set-rows="${bi}">
        ${blk.sets.map((s,si)=>setRowHtml(bi,si,s)).join('')}
      </div>
      <button class="add-set-btn" data-add-set="${bi}">+ Add Set</button>
    </div>`).join('');
  renderIcons(wrap);
  wireWorkoutBlockEvents();
}

function setRowHtml(bi,si,s){
  return `<div class="set-row" data-set="${bi}-${si}">
    <span class="set-num">${si+1}</span>
    <input type="number" step="0.5" placeholder="Weight (${unitLabel()})" value="${s.weight}" data-field="weight" data-bi="${bi}" data-si="${si}">
    <input type="number" placeholder="Reps" value="${s.reps}" data-field="reps" data-bi="${bi}" data-si="${si}">
    <input type="number" step="0.5" placeholder="RPE" value="${s.rpe}" data-field="rpe" data-bi="${bi}" data-si="${si}" min="0" max="10">
    <input type="text" placeholder="Notes" value="${escapeHtml(s.notes)}" data-field="notes" data-bi="${bi}" data-si="${si}">
    <button class="remove-set" data-remove-set="${bi}-${si}"><i data-ic="x"></i></button>
  </div>`;
}

function wireWorkoutBlockEvents(){
  const wrap = $('#workoutExerciseList');
  $$('[data-remove-ex]', wrap).forEach(b=> b.addEventListener('click', ()=>{
    currentWorkoutDraft.exercises.splice(+b.dataset.removeEx,1);
    renderWorkoutExerciseList(); updateWorkoutSummaryBar();
  }));
  $$('[data-add-set]', wrap).forEach(b=> b.addEventListener('click', ()=>{
    currentWorkoutDraft.exercises[+b.dataset.addSet].sets.push({weight:'',reps:'',rpe:'',notes:''});
    renderWorkoutExerciseList(); updateWorkoutSummaryBar();
  }));
  $$('[data-remove-set]', wrap).forEach(b=> b.addEventListener('click', ()=>{
    const [bi,si] = b.dataset.removeSet.split('-').map(Number);
    currentWorkoutDraft.exercises[bi].sets.splice(si,1);
    if(currentWorkoutDraft.exercises[bi].sets.length===0) currentWorkoutDraft.exercises[bi].sets.push({weight:'',reps:'',rpe:'',notes:''});
    renderWorkoutExerciseList(); updateWorkoutSummaryBar();
  }));
  $$('input[data-field]', wrap).forEach(inp=> inp.addEventListener('input', ()=>{
    const bi=+inp.dataset.bi, si=+inp.dataset.si, field=inp.dataset.field;
    currentWorkoutDraft.exercises[bi].sets[si][field] = inp.value;
    updateWorkoutSummaryBar();
  }));
}

function updateWorkoutSummaryBar(){
  let totalVolume=0, topWeightDisp=0, bestOneRM=0;
  currentWorkoutDraft.exercises.forEach(blk=>{
    blk.sets.forEach(s=>{
      const w = parseFloat(s.weight)||0, r = parseFloat(s.reps)||0;
      totalVolume += w*r;
      if(w>topWeightDisp) topWeightDisp=w;
      const orm = est1RM(w,r);
      if(orm>bestOneRM) bestOneRM=orm;
    });
  });
  $('#wSumVolume').textContent = `${round0(totalVolume)} ${unitLabel()}`;
  $('#wSumTop').textContent = `${round1(topWeightDisp)} ${unitLabel()}`;
  $('#wSumOneRM').textContent = `${round1(bestOneRM)} ${unitLabel()}`;
}

$('#saveWorkoutBtn').addEventListener('click', ()=>{
  if(currentWorkoutDraft.exercises.length===0){ toast('Add at least one exercise','error'); return; }
  const date = $('#workoutDate').value || todayISO();
  const notes = $('#workoutNotes').value.trim();

  const finalExercises = [];
  const newPRs = [];

  for(const blk of currentWorkoutDraft.exercises){
    const validSets = blk.sets
      .map(s=>({
        weight: toStoreWeight(s.weight),
        reps: parseFloat(s.reps)||0,
        rpe: s.rpe===''? null : parseFloat(s.rpe),
        notes: s.notes||''
      }))
      .filter(s=> s.weight>0 || s.reps>0);
    if(validSets.length===0) continue;

    const volume = validSets.reduce((s,x)=> s + x.weight*x.reps, 0);
    const maxWeight = Math.max(...validSets.map(x=>x.weight));
    const bestSet = validSets.reduce((best,x)=> est1RM(x.weight,x.reps) > est1RM(best.weight,best.reps) ? x : best, validSets[0]);
    const oneRM = est1RM(bestSet.weight, bestSet.reps);

    finalExercises.push({
      exerciseId: blk.exerciseId, exerciseName: blk.exerciseName,
      sets: validSets, volume, maxWeight, est1RM: oneRM
    });

    // PR detection — compare against best weight ever recorded for this exercise (prior to this save)
    const priorMax = getPriorMaxWeight(blk.exerciseId);
    if(maxWeight > priorMax){
      const prSet = validSets.find(s=>s.weight===maxWeight);
      const pr = {
        id: uid(), exerciseId: blk.exerciseId, exerciseName: blk.exerciseName,
        previous: priorMax, newPR: maxWeight, reps: prSet.reps, date
      };
      store.prs.push(pr);
      newPRs.push(pr);
    }
  }

  if(finalExercises.length===0){ toast('Please fill in at least one set with weight or reps','error'); return; }

  store.workouts.push({ id: uid(), date, notes, exercises: finalExercises });
  save();

  currentWorkoutDraft = { exercises: [] };
  $('#workoutNotes').value='';
  renderWorkoutExerciseList();
  updateWorkoutSummaryBar();

  toast('Workout saved successfully');
  newPRs.forEach(pr=> setTimeout(()=> toast(`New PR! ${pr.exerciseName}: ${round1(toDisplayWeight(pr.newPR))} ${unitLabel()}`, 'pr'), 300));
});

function getPriorMaxWeight(exerciseId){
  let max = 0;
  store.workouts.forEach(w=>{
    w.exercises.forEach(e=>{
      if(e.exerciseId===exerciseId && e.maxWeight>max) max=e.maxWeight;
    });
  });
  return max;
}


/* ============================================================
   10. PR TRACKER PAGE
   ============================================================ */
let prChartInst=null;

function renderPRPage(){
  const sorted = [...store.prs].sort((a,b)=> b.date.localeCompare(a.date) || String(b.id).localeCompare(String(a.id)));

  const latestWrap = $('#prLatestList');
  const latest = sorted.slice(0,8);
  latestWrap.innerHTML = latest.length ? latest.map(p=>`
    <div class="activity-item">
      <span class="activity-dot" style="background:var(--amber)"></span>
      <div class="ai-main"><div class="ai-title">${escapeHtml(p.exerciseName)}</div>
      <div class="ai-sub">${round1(toDisplayWeight(p.previous))} → ${round1(toDisplayWeight(p.newPR))} ${unitLabel()}</div></div>
      <div class="ai-time">${fmtDateShort(p.date)}</div>
    </div>`).join('') : `<div class="empty-state">No PRs yet — log a heavier set to set one!</div>`;

  const tbody = $('#prTable tbody');
  tbody.innerHTML = sorted.length ? sorted.map(p=>{
    const improvement = p.previous>0 ? (((p.newPR-p.previous)/p.previous)*100) : 100;
    return `<tr>
      <td>${escapeHtml(p.exerciseName)}</td>
      <td>${p.previous>0? round1(toDisplayWeight(p.previous)) : '—'} ${unitLabel()}</td>
      <td><b>${round1(toDisplayWeight(p.newPR))} ${unitLabel()}</b></td>
      <td><span class="delta-pill delta-up">+${round1(improvement)}%</span></td>
      <td>${fmtDateShort(p.date)}</td>
    </tr>`;
  }).join('') : `<tr><td colspan="5" class="empty-state">No records yet</td></tr>`;

  // chart: PR count / improvement over recent months
  const byMonth = {};
  sorted.forEach(p=>{
    const m = p.date.slice(0,7);
    byMonth[m] = (byMonth[m]||0)+1;
  });
  const months = Object.keys(byMonth).sort().slice(-8);
  const ctx = $('#prChart');
  if(prChartInst) prChartInst.destroy();
  prChartInst = new Chart(ctx, barChartConfig(months.map(m=>{
    const [y,mo] = m.split('-'); return new Date(y,mo-1,1).toLocaleDateString(undefined,{month:'short',year:'2-digit'});
  }), months.map(m=>byMonth[m]), 'PRs', '#fbbf24'));
}

/* ============================================================
   11. PROGRESSIVE OVERLOAD
   ============================================================ */
let overloadWeightChartInst=null, overloadVolumeChartInst=null;

function getExerciseSessions(exerciseId){
  // returns array of {date, volume, maxWeight, est1RM, reps(total)} sorted by date asc
  const sessions=[];
  [...store.workouts].sort((a,b)=> a.date.localeCompare(b.date)).forEach(w=>{
    const e = w.exercises.find(x=>x.exerciseId===exerciseId);
    if(e) sessions.push({date:w.date, volume:e.volume, maxWeight:e.maxWeight, est1RM:e.est1RM, totalReps: e.sets.reduce((s,x)=>s+x.reps,0)});
  });
  return sessions;
}

function renderOverloadPage(){
  populateExerciseSelects();
  const sel = $('#overloadExerciseSelect');
  if(!sel.value && store.exercises.length){ /* leave blank until chosen */ }
  sel.onchange = ()=> renderOverloadForExercise(sel.value);
  renderOverloadForExercise(sel.value);
  renderOverloadTable();
}

function renderOverloadForExercise(exerciseId){
  const weightCtx = $('#overloadWeightChart'), volCtx = $('#overloadVolumeChart');
  if(overloadWeightChartInst) overloadWeightChartInst.destroy();
  if(overloadVolumeChartInst) overloadVolumeChartInst.destroy();
  $('#overloadCompare').innerHTML='';

  if(!exerciseId){
    overloadWeightChartInst = new Chart(weightCtx, lineChartConfig([],[],'Weight','#7c5cfc'));
    overloadVolumeChartInst = new Chart(volCtx, lineChartConfig([],[],'Volume','#22d3ee'));
    $('#overloadCompare').innerHTML = `<div class="empty-state">Select an exercise to see its trend.</div>`;
    return;
  }
  const sessions = getExerciseSessions(exerciseId);
  const labels = sessions.map(s=>fmtDateShort(s.date));
  overloadWeightChartInst = new Chart(weightCtx, lineChartConfig(labels, sessions.map(s=>toDisplayWeight(s.maxWeight)), `Weight (${unitLabel()})`, '#7c5cfc'));
  overloadVolumeChartInst = new Chart(volCtx, lineChartConfig(labels, sessions.map(s=>round0(toDisplayWeight(s.volume))), `Volume`, '#22d3ee'));

  if(sessions.length>=1){
    const last = sessions[sessions.length-1];
    const prev = sessions.length>=2 ? sessions[sessions.length-2] : null;
    $('#overloadCompare').innerHTML = `
      <div class="oc-col"><h4>Previous Session ${prev? '('+fmtDateShort(prev.date)+')':''}</h4>
        ${prev ? `
        <div class="oc-row"><span>Top Weight</span><b>${round1(toDisplayWeight(prev.maxWeight))} ${unitLabel()}</b></div>
        <div class="oc-row"><span>Total Reps</span><b>${prev.totalReps}</b></div>
        <div class="oc-row"><span>Volume</span><b>${round0(toDisplayWeight(prev.volume))} ${unitLabel()}</b></div>
        ` : `<div class="empty-state">No earlier session</div>`}
      </div>
      <div class="oc-col"><h4>Last Session (${fmtDateShort(last.date)})</h4>
        <div class="oc-row"><span>Top Weight</span><b>${round1(toDisplayWeight(last.maxWeight))} ${unitLabel()}</b></div>
        <div class="oc-row"><span>Total Reps</span><b>${last.totalReps}</b></div>
        <div class="oc-row"><span>Volume</span><b>${round0(toDisplayWeight(last.volume))} ${unitLabel()}</b></div>
      </div>`;
  }
}

function deltaPill(diff){
  if(diff>0) return `<span class="delta-pill delta-up">+${round1(diff)}</span>`;
  if(diff<0) return `<span class="delta-pill delta-down">${round1(diff)}</span>`;
  return `<span class="delta-pill delta-same">0</span>`;
}

function renderOverloadTable(){
  const tbody = $('#overloadTable tbody');
  const rows = store.exercises.map(ex=>{
    const sessions = getExerciseSessions(ex.id);
    if(sessions.length===0) return null;
    const last = sessions[sessions.length-1];
    const prev = sessions.length>=2 ? sessions[sessions.length-2] : null;
    const wDiff = prev ? toDisplayWeight(last.maxWeight)-toDisplayWeight(prev.maxWeight) : 0;
    const rDiff = prev ? last.totalReps-prev.totalReps : 0;
    const vDiff = prev ? toDisplayWeight(last.volume)-toDisplayWeight(prev.volume) : 0;
    return `<tr>
      <td>${escapeHtml(ex.name)}</td>
      <td>${fmtDateShort(last.date)}</td>
      <td>${prev? fmtDateShort(prev.date) : '—'}</td>
      <td>${prev? deltaPill(wDiff) : '<span class="muted">first session</span>'}</td>
      <td>${prev? deltaPill(rDiff) : ''}</td>
      <td>${prev? deltaPill(vDiff) : ''}</td>
    </tr>`;
  }).filter(Boolean);
  tbody.innerHTML = rows.length ? rows.join('') : `<tr><td colspan="6" class="empty-state">Log some workouts to see progressive overload trends</td></tr>`;
}


/* ============================================================
   12. BODY WEIGHT TRACKER
   ============================================================ */
let bwChartInst=null;

function renderBodyweightPage(){
  if(!$('#bwDate').value) $('#bwDate').value = todayISO();
  const sorted = [...store.bodyweight].sort((a,b)=> a.date.localeCompare(b.date));
  const cur = sorted.length ? sorted[sorted.length-1].weight : null;
  const start = store.settings.startWeight ?? (sorted.length ? sorted[0].weight : null);
  const goal = store.settings.goalWeight;

  $('#bwCurrent').textContent = cur!=null ? `${toDisplayWeight(cur)} ${unitLabel()}` : '—';
  $('#bwStart').textContent = start!=null ? `${toDisplayWeight(start)} ${unitLabel()}` : '—';
  $('#bwGoal').textContent = goal!=null ? `${toDisplayWeight(goal)} ${unitLabel()}` : '—';
  $('#bwGoalInput').value = goal!=null ? toDisplayWeight(goal) : '';

  const weekEntries = sorted.filter(e=> isSameWeek(e.date));
  const monthEntries = sorted.filter(e=> isSameMonth(e.date));
  $('#bwWeekAvg').textContent = weekEntries.length ? `${round1(toDisplayWeight(avg(weekEntries.map(e=>e.weight))))} ${unitLabel()}` : '—';
  $('#bwMonthAvg').textContent = monthEntries.length ? `Monthly avg: ${round1(toDisplayWeight(avg(monthEntries.map(e=>e.weight))))} ${unitLabel()}` : '';

  const last30 = sorted.slice(-30);
  const ctx = $('#bwChart');
  if(bwChartInst) bwChartInst.destroy();
  bwChartInst = new Chart(ctx, lineChartConfig(last30.map(e=>fmtDateShort(e.date)), last30.map(e=>toDisplayWeight(e.weight)), unitLabel(), '#22d3ee'));

  const tbody = $('#bwTable tbody');
  const rev = [...sorted].reverse();
  tbody.innerHTML = rev.length ? rev.map((e,idx)=>{
    const prevEntry = sorted[sorted.indexOf(e)-1];
    const diff = prevEntry ? toDisplayWeight(e.weight)-toDisplayWeight(prevEntry.weight) : 0;
    return `<tr>
      <td>${fmtDate(e.date)}</td>
      <td>${toDisplayWeight(e.weight)} ${unitLabel()}</td>
      <td>${prevEntry ? deltaPillInverse(diff) : '—'}</td>
      <td><button class="btn-icon-sm" data-del-bw="${e.id}"><i data-ic="trash"></i></button></td>
    </tr>`;
  }).join('') : `<tr><td colspan="4" class="empty-state">No entries yet</td></tr>`;
  renderIcons(tbody);
  $$('[data-del-bw]', tbody).forEach(b=> b.addEventListener('click', ()=>{
    store.bodyweight = store.bodyweight.filter(x=>x.id!==b.dataset.delBw);
    save(); renderBodyweightPage();
  }));
}
function avg(arr){ return arr.reduce((a,b)=>a+b,0)/arr.length; }
function deltaPillInverse(diff){
  // for bodyweight, context-neutral: just show sign colored (down=green typically for cut, but keep neutral blue-ish via amber/green/red based on direction only)
  if(diff>0) return `<span class="delta-pill delta-up">+${round1(diff)}</span>`;
  if(diff<0) return `<span class="delta-pill delta-down">${round1(diff)}</span>`;
  return `<span class="delta-pill delta-same">0</span>`;
}

$('#saveBwBtn').addEventListener('click', ()=>{
  const date = $('#bwDate').value || todayISO();
  const wVal = parseFloat($('#bwWeightInput').value);
  if(!wVal || wVal<=0){ toast('Enter a valid weight','error'); return; }
  const weight = toStoreWeight(wVal);
  const existing = store.bodyweight.find(e=>e.date===date);
  if(existing) existing.weight = weight;
  else store.bodyweight.push({id:uid(), date, weight});

  if(store.settings.startWeight==null) store.settings.startWeight = weight;
  const goalVal = parseFloat($('#bwGoalInput').value);
  if(goalVal) store.settings.goalWeight = toStoreWeight(goalVal);

  save();
  $('#bwWeightInput').value='';
  renderBodyweightPage();
  toast('Body weight logged');
});

/* ============================================================
   13. FOOD TRACKER  (search via Open Food Facts public API, no key)
   ============================================================ */
function renderFoodPage(){
  if(!$('#foodDate').value) $('#foodDate').value = todayISO();
  $('#foodDateLabel').textContent = fmtDate($('#foodDate').value);
  renderFoodMacroBars();
  renderFoodLogTable();
}
$('#foodDate').addEventListener('change', ()=>{ $('#foodDateLabel').textContent = fmtDate($('#foodDate').value); renderFoodPage(); });

function renderFoodMacroBars(){
  renderMacroBarsInto('#foodMacroBars', $('#foodDate').value || todayISO());
}

function renderFoodLogTable(){
  const date = $('#foodDate').value || todayISO();
  const logs = store.foodLog.filter(f=>f.date===date);
  const tbody = $('#foodLogTable tbody');
  const totalCal = logs.reduce((s,f)=>s+f.calories,0);
  $('#foodDayTotal').textContent = `${round0(totalCal)} kcal total`;
  tbody.innerHTML = logs.length ? logs.map(f=>`
    <tr>
      <td>${escapeHtml(f.name)}</td>
      <td>${f.quantity}</td>
      <td>${round0(f.calories)}</td>
      <td>${round1(f.protein)}g</td>
      <td>${round1(f.carbs)}g</td>
      <td>${round1(f.fat)}g</td>
      <td><button class="btn-icon-sm" data-del-food="${f.id}"><i data-ic="trash"></i></button></td>
    </tr>`).join('') : `<tr><td colspan="7" class="empty-state">No foods logged for this day</td></tr>`;
  renderIcons(tbody);
  $$('[data-del-food]', tbody).forEach(b=> b.addEventListener('click', ()=>{
    store.foodLog = store.foodLog.filter(x=>x.id!==b.dataset.delFood);
    save(); renderFoodPage();
  }));
}

let foodSearchTimer=null;
$('#foodSearchInput').addEventListener('input', e=>{
  const q = e.target.value.trim();
  clearTimeout(foodSearchTimer);
  const results = $('#foodSearchResults');
  if(q.length<2){ results.classList.remove('show'); results.innerHTML=''; return; }
  foodSearchTimer = setTimeout(()=> searchFoodAPI(q), 450);
});
document.addEventListener('click', e=>{
  if(!e.target.closest('.global-search')) { $$('.search-results').forEach(r=>r.classList.remove('show')); }
});

async function searchFoodAPI(query){
  const results = $('#foodSearchResults');
  results.innerHTML = `<div class="search-result-item"><span>Searching…</span></div>`;
  results.classList.add('show');
  $('#foodApiHint').textContent = '';
  try{
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=12`;
    const res = await fetch(url);
    if(!res.ok) throw new Error('API error');
    const data = await res.json();
    const products = (data.products||[]).filter(p=> p.product_name && p.nutriments && (p.nutriments['energy-kcal_100g']!=null));
    if(products.length===0){
      results.innerHTML = `<div class="search-result-item"><span>No results — try "Add Manually" instead.</span></div>`;
      return;
    }
    results.innerHTML = products.slice(0,10).map((p,i)=>`
      <div class="search-result-item" data-food-idx="${i}">
        <span>${escapeHtml(p.product_name)}${p.brands? ' — '+escapeHtml(p.brands.split(',')[0]) : ''}</span>
        <span class="srt">${round0(p.nutriments['energy-kcal_100g'])} kcal/100g</span>
      </div>`).join('');
    renderIcons(results);
    $$('[data-food-idx]', results).forEach(el=>{
      el.addEventListener('click', ()=>{
        const p = products[+el.dataset.foodIdx];
        openFoodQuantityModal({
          name: p.product_name,
          caloriesPer100: p.nutriments['energy-kcal_100g']||0,
          proteinPer100: p.nutriments['proteins_100g']||0,
          carbsPer100: p.nutriments['carbohydrates_100g']||0,
          fatPer100: p.nutriments['fat_100g']||0,
        });
        results.classList.remove('show');
        $('#foodSearchInput').value='';
      });
    });
  }catch(err){
    results.innerHTML = `<div class="search-result-item"><span>Search unavailable — use "Add Manually".</span></div>`;
    $('#foodApiHint').textContent = 'Live nutrition lookup could not be reached. You can always add foods manually with exact macros.';
  }
}

function openFoodQuantityModal(food){
  // food: {name, caloriesPer100, proteinPer100, carbsPer100, fatPer100} per 100g
  openModal(`
    <h3>${escapeHtml(food.name)}</h3>
    <div class="field" style="margin-bottom:12px;">
      <label>Quantity (grams)</label>
      <input type="number" id="fqGrams" value="100" min="1">
    </div>
    <div class="hint" id="fqPreview" style="margin-bottom:14px;"></div>
    <div class="modal-actions">
      <button class="btn btn-secondary" id="fqCancel">Cancel</button>
      <button class="btn btn-primary" id="fqAdd"><i data-ic="check"></i> Add to Log</button>
    </div>
  `);
  const updatePreview = ()=>{
    const g = parseFloat($('#fqGrams').value)||0;
    const mult = g/100;
    $('#fqPreview').textContent = `${round0(food.caloriesPer100*mult)} kcal · P ${round1(food.proteinPer100*mult)}g · C ${round1(food.carbsPer100*mult)}g · F ${round1(food.fatPer100*mult)}g`;
  };
  updatePreview();
  $('#fqGrams').addEventListener('input', updatePreview);
  $('#fqCancel').addEventListener('click', closeModal);
  $('#fqAdd').addEventListener('click', ()=>{
    const g = parseFloat($('#fqGrams').value)||100;
    const mult = g/100;
    const date = $('#foodDate').value || todayISO();
    store.foodLog.push({
      id: uid(), date, name: food.name, quantity: `${g}g`,
      calories: food.caloriesPer100*mult, protein: food.proteinPer100*mult,
      carbs: food.carbsPer100*mult, fat: food.fatPer100*mult
    });
    save(); closeModal(); renderFoodPage();
    toast('Food added to log');
  });
}

$('#manualFoodBtn').addEventListener('click', ()=>{
  openModal(`
    <h3>Add Food Manually</h3>
    <div class="field" style="margin-bottom:12px;"><label>Food Name</label><input type="text" id="mfName" placeholder="e.g. Homemade Omelette"></div>
    <div class="form-row">
      <div class="field"><label>Quantity Label</label><input type="text" id="mfQty" placeholder="e.g. 1 serving" value="1 serving"></div>
      <div class="field"><label>Calories</label><input type="number" id="mfCal" placeholder="0"></div>
    </div>
    <div class="form-row">
      <div class="field"><label>Protein (g)</label><input type="number" id="mfPro" placeholder="0"></div>
      <div class="field"><label>Carbs (g)</label><input type="number" id="mfCarb" placeholder="0"></div>
      <div class="field"><label>Fat (g)</label><input type="number" id="mfFat" placeholder="0"></div>
    </div>
    <div class="modal-actions">
      <button class="btn btn-secondary" id="mfCancel">Cancel</button>
      <button class="btn btn-primary" id="mfSave"><i data-ic="check"></i> Add to Log</button>
    </div>
  `);
  $('#mfCancel').addEventListener('click', closeModal);
  $('#mfSave').addEventListener('click', ()=>{
    const name = $('#mfName').value.trim();
    if(!name){ toast('Enter a food name','error'); return; }
    const date = $('#foodDate').value || todayISO();
    store.foodLog.push({
      id: uid(), date, name, quantity: $('#mfQty').value.trim()||'1 serving',
      calories: parseFloat($('#mfCal').value)||0, protein: parseFloat($('#mfPro').value)||0,
      carbs: parseFloat($('#mfCarb').value)||0, fat: parseFloat($('#mfFat').value)||0
    });
    save(); closeModal(); renderFoodPage();
    toast('Food added to log');
  });
});


/* ============================================================
   14. FOOD HISTORY
   ============================================================ */
let foodHistoryRange = 'today';

function renderFoodHistoryPage(){
  $$('#foodHistoryFilters .chip').forEach(c=> c.classList.toggle('active', c.dataset.range===foodHistoryRange));
  $('#foodHistoryDate').style.display = foodHistoryRange==='date' ? 'inline-flex' : 'none';
  const logs = getFoodLogsForRange(foodHistoryRange);
  const totals = logs.reduce((acc,f)=>({cal:acc.cal+f.calories,pro:acc.pro+f.protein,carb:acc.carb+f.carbs,fat:acc.fat+f.fat}),{cal:0,pro:0,carb:0,fat:0});
  $('#fhCalories').textContent = round0(totals.cal);
  $('#fhProtein').textContent = round1(totals.pro)+'g';
  $('#fhCarbs').textContent = round1(totals.carb)+'g';
  $('#fhFat').textContent = round1(totals.fat)+'g';

  const byDate = {};
  logs.forEach(f=>{ (byDate[f.date] ??= []).push(f); });
  const dates = Object.keys(byDate).sort().reverse();
  const wrap = $('#foodHistoryList');
  wrap.innerHTML = dates.length ? dates.map(d=>{
    const items = byDate[d];
    const dayCal = items.reduce((s,f)=>s+f.calories,0);
    return `<div class="detail-block">
      <h4>${fmtDateFull(d)} — ${round0(dayCal)} kcal</h4>
      ${items.map(f=>`<div class="detail-set-line"><span>${escapeHtml(f.name)} (${f.quantity})</span><span>${round0(f.calories)} kcal</span></div>`).join('')}
    </div>`;
  }).join('') : `<div class="empty-state">No food logged in this range</div>`;
}
function getFoodLogsForRange(range){
  if(range==='today') return store.foodLog.filter(f=>f.date===todayISO());
  if(range==='yesterday') return store.foodLog.filter(f=>f.date===daysAgo(1));
  if(range==='week') return store.foodLog.filter(f=>isSameWeek(f.date));
  if(range==='month') return store.foodLog.filter(f=>isSameMonth(f.date));
  if(range==='date'){ const d=$('#foodHistoryDate').value||todayISO(); return store.foodLog.filter(f=>f.date===d); }
  return store.foodLog;
}
$('#foodHistoryFilters').addEventListener('click', e=>{
  const chip = e.target.closest('.chip'); if(!chip) return;
  foodHistoryRange = chip.dataset.range;
  if(foodHistoryRange==='date' && !$('#foodHistoryDate').value) $('#foodHistoryDate').value = todayISO();
  renderFoodHistoryPage();
});
$('#foodHistoryDate').addEventListener('change', renderFoodHistoryPage);

/* ============================================================
   15. WORKOUT HISTORY
   ============================================================ */
let workoutHistoryRange = 'week';

function renderWorkoutHistoryPage(){
  $$('#workoutHistoryFilters .chip').forEach(c=> c.classList.toggle('active', c.dataset.range===workoutHistoryRange));
  $('#workoutHistoryDate').style.display = workoutHistoryRange==='date' ? 'inline-flex' : 'none';
  const list = getWorkoutsForRange(workoutHistoryRange).sort((a,b)=> b.date.localeCompare(a.date));
  const wrap = $('#workoutHistoryList');
  wrap.innerHTML = list.length ? list.map(w=>{
    const totalVolume = w.exercises.reduce((s,e)=>s+e.volume,0);
    return `<div class="wh-card" data-wid="${w.id}">
      <div class="wh-top">
        <div><div class="wh-date">${fmtDate(w.date)}</div><div class="wh-meta">${w.exercises.length} exercise${w.exercises.length!==1?'s':''} · Volume ${round0(toDisplayWeight(totalVolume))} ${unitLabel()}</div></div>
        <i data-ic="chevright"></i>
      </div>
      <div class="wh-tags">${w.exercises.map(e=>`<span class="wh-tag">${escapeHtml(e.exerciseName)}</span>`).join('')}</div>
    </div>`;
  }).join('') : `<div class="empty-state">No workouts in this range</div>`;
  renderIcons(wrap);
  $$('.wh-card', wrap).forEach(c=> c.addEventListener('click', ()=> openWorkoutDetail(c.dataset.wid)));
}
function getWorkoutsForRange(range){
  if(range==='today') return store.workouts.filter(w=>w.date===todayISO());
  if(range==='yesterday') return store.workouts.filter(w=>w.date===daysAgo(1));
  if(range==='week') return store.workouts.filter(w=>isSameWeek(w.date));
  if(range==='month') return store.workouts.filter(w=>isSameMonth(w.date));
  if(range==='date'){ const d=$('#workoutHistoryDate').value||todayISO(); return store.workouts.filter(w=>w.date===d); }
  return store.workouts;
}
$('#workoutHistoryFilters').addEventListener('click', e=>{
  const chip = e.target.closest('.chip'); if(!chip) return;
  workoutHistoryRange = chip.dataset.range;
  if(workoutHistoryRange==='date' && !$('#workoutHistoryDate').value) $('#workoutHistoryDate').value = todayISO();
  renderWorkoutHistoryPage();
});
$('#workoutHistoryDate').addEventListener('change', renderWorkoutHistoryPage);

function openWorkoutDetail(id){
  const w = store.workouts.find(x=>x.id===id);
  if(!w) return;
  const totalVolume = w.exercises.reduce((s,e)=>s+e.volume,0);
  const topWeight = Math.max(...w.exercises.map(e=>e.maxWeight));
  openModal(`
    <h3>${fmtDateFull(w.date)}</h3>
    <div class="hint" style="margin-bottom:14px;">Volume: ${round0(toDisplayWeight(totalVolume))} ${unitLabel()} · Top set: ${round1(toDisplayWeight(topWeight))} ${unitLabel()}</div>
    ${w.exercises.map(e=>`
      <div class="detail-block">
        <h4>${escapeHtml(e.exerciseName)} — Est. 1RM ${round1(toDisplayWeight(e.est1RM))} ${unitLabel()}</h4>
        ${e.sets.map((s,i)=>`<div class="detail-set-line"><span>Set ${i+1}: ${toDisplayWeight(s.weight)} ${unitLabel()} × ${s.reps}${s.rpe?` @RPE ${s.rpe}`:''}</span><span>${s.notes?escapeHtml(s.notes):''}</span></div>`).join('')}
      </div>`).join('')}
    ${w.notes ? `<div class="detail-block"><h4>Notes</h4><p style="font-size:13px;color:var(--text-dim);">${escapeHtml(w.notes)}</p></div>` : ''}
    <div class="modal-actions">
      <button class="btn btn-danger" id="whDelete"><i data-ic="trash"></i> Delete</button>
      <button class="btn btn-secondary" id="whClose">Close</button>
    </div>
  `);
  $('#whClose').addEventListener('click', closeModal);
  $('#whDelete').addEventListener('click', ()=>{
    openConfirm('Delete this workout entry?', ()=>{
      store.workouts = store.workouts.filter(x=>x.id!==id);
      save(); closeModal(); renderWorkoutHistoryPage();
      toast('Workout deleted');
    });
  });
}


/* ============================================================
   16. CALENDAR
   ============================================================ */
let calCursor = new Date();

function renderCalendarPage(){
  const year = calCursor.getFullYear(), month = calCursor.getMonth();
  $('#calMonthLabel').textContent = calCursor.toLocaleDateString(undefined,{month:'long', year:'numeric'});
  const grid = $('#calendarGrid');
  const dowNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  let html = dowNames.map(d=>`<div class="cal-dow">${d}</div>`).join('');

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();
  const todayStr = todayISO();

  for(let i=0;i<firstDay;i++) html += `<div class="cal-day empty"></div>`;
  for(let d=1; d<=daysInMonth; d++){
    const iso = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const hasWorkout = store.workouts.some(w=>w.date===iso);
    const hasPR = store.prs.some(p=>p.date===iso);
    const hasFood = store.foodLog.some(f=>f.date===iso);
    const hasWeight = store.bodyweight.some(b=>b.date===iso);
    html += `<div class="cal-day ${iso===todayStr?'today':''}" data-date="${iso}">
      <span class="cd-num">${d}</span>
      <div class="cd-dots">
        ${hasWorkout?'<span class="cd-dot workout"></span>':''}
        ${hasPR?'<span class="cd-dot pr"></span>':''}
        ${hasFood?'<span class="cd-dot food"></span>':''}
        ${hasWeight?'<span class="cd-dot weight"></span>':''}
      </div>
    </div>`;
  }
  grid.innerHTML = html;
  $$('.cal-day[data-date]', grid).forEach(el=> el.addEventListener('click', ()=> openDayDetail(el.dataset.date)));
}
$('#calPrev').addEventListener('click', ()=>{ calCursor.setMonth(calCursor.getMonth()-1); renderCalendarPage(); });
$('#calNext').addEventListener('click', ()=>{ calCursor.setMonth(calCursor.getMonth()+1); renderCalendarPage(); });

function openDayDetail(iso){
  const workouts = store.workouts.filter(w=>w.date===iso);
  const prs = store.prs.filter(p=>p.date===iso);
  const foods = store.foodLog.filter(f=>f.date===iso);
  const weight = store.bodyweight.find(b=>b.date===iso);
  const totalCal = foods.reduce((s,f)=>s+f.calories,0);

  let body = '';
  if(weight) body += `<div class="detail-block"><h4>Body Weight</h4><div class="detail-set-line"><span>Recorded</span><span>${toDisplayWeight(weight.weight)} ${unitLabel()}</span></div></div>`;
  if(workouts.length){
    body += `<div class="detail-block"><h4>Workouts</h4>` + workouts.map(w=> w.exercises.map(e=>`<div class="detail-set-line"><span>${escapeHtml(e.exerciseName)}</span><span>${e.sets.length} sets · Vol ${round0(toDisplayWeight(e.volume))} ${unitLabel()}</span></div>`).join('')).join('') + `</div>`;
  }
  if(prs.length){
    body += `<div class="detail-block"><h4>PRs</h4>` + prs.map(p=>`<div class="detail-set-line"><span>${escapeHtml(p.exerciseName)}</span><span>${round1(toDisplayWeight(p.newPR))} ${unitLabel()}</span></div>`).join('') + `</div>`;
  }
  if(foods.length){
    body += `<div class="detail-block"><h4>Foods (${round0(totalCal)} kcal)</h4>` + foods.map(f=>`<div class="detail-set-line"><span>${escapeHtml(f.name)}</span><span>${round0(f.calories)} kcal</span></div>`).join('') + `</div>`;
  }
  if(!body) body = `<div class="empty-state">No activity recorded on this day.</div>`;

  openModal(`<h3>${fmtDateFull(iso)}</h3>${body}<div class="modal-actions"><button class="btn btn-secondary" id="ddClose">Close</button></div>`);
  $('#ddClose').addEventListener('click', closeModal);
}

/* ============================================================
   17. STATISTICS
   ============================================================ */
let statCharts = {};
function destroyStatCharts(){ Object.values(statCharts).forEach(c=>c && c.destroy()); statCharts={}; }

function renderStatsPage(){
  destroyStatCharts();

  // Weight progress (all entries)
  const bw = [...store.bodyweight].sort((a,b)=>a.date.localeCompare(b.date));
  statCharts.weight = new Chart($('#statWeightChart'), lineChartConfig(bw.map(e=>fmtDateShort(e.date)), bw.map(e=>toDisplayWeight(e.weight)), unitLabel(), '#7c5cfc'));

  // Calories last 14 days
  const calLabels=[], calData=[];
  for(let i=13;i>=0;i--){ const d=daysAgo(i); calLabels.push(fmtDateShort(d)); calData.push(round0(caloriesForDate(d))); }
  statCharts.cal = new Chart($('#statCalorieChart'), barChartConfig(calLabels, calData, 'Calories', '#fb7185'));

  // Workout volume over time (per workout date)
  const volSorted = [...store.workouts].sort((a,b)=>a.date.localeCompare(b.date));
  statCharts.vol = new Chart($('#statVolumeChart'), lineChartConfig(
    volSorted.map(w=>fmtDateShort(w.date)),
    volSorted.map(w=>round0(toDisplayWeight(w.exercises.reduce((s,e)=>s+e.volume,0)))),
    `Volume (${unitLabel()})`, '#22d3ee'
  ));

  // Exercise frequency
  const freq = {};
  store.workouts.forEach(w=> w.exercises.forEach(e=> freq[e.exerciseName]=(freq[e.exerciseName]||0)+1));
  const freqEntries = Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,8);
  statCharts.freq = new Chart($('#statFreqChart'), barChartConfig(freqEntries.map(e=>e[0]), freqEntries.map(e=>e[1]), 'Sessions', '#34d399'));

  // PR improvements over time (cumulative)
  const prsSorted = [...store.prs].sort((a,b)=>a.date.localeCompare(b.date));
  let cum=0;
  const prLabels = prsSorted.map(p=>fmtDateShort(p.date));
  const prCum = prsSorted.map(p=>{ cum++; return cum; });
  statCharts.pr = new Chart($('#statPRChart'), lineChartConfig(prLabels, prCum, 'Cumulative PRs', '#fbbf24'));

  // Weekly consistency — workouts per week for last 8 weeks
  const weekLabels=[], weekCounts=[];
  for(let i=7;i>=0;i--){
    const end = new Date(); end.setDate(end.getDate()-(i*7));
    const start = new Date(end); start.setDate(end.getDate()-6);
    const count = store.workouts.filter(w=>{ const d=new Date(w.date+'T00:00:00'); return d>=start && d<=end; }).length;
    weekLabels.push(`${fmtDateShort(start.toISOString().slice(0,10))}`);
    weekCounts.push(count);
  }
  statCharts.consistency = new Chart($('#statConsistencyChart'), barChartConfig(weekLabels, weekCounts, 'Workouts/week', '#7c5cfc'));
}

/* ============================================================
   18. GLOBAL SEARCH
   ============================================================ */
function runGlobalSearch(query, targetSel='#searchResults'){
  const results = $(targetSel);
  const q = query.trim().toLowerCase();
  if(q.length<1){ results.classList.remove('show'); results.innerHTML=''; return; }
  const hits = [];

  store.exercises.forEach(e=>{
    if(e.name.toLowerCase().includes(q) || (e.notes||'').toLowerCase().includes(q))
      hits.push({type:'Exercise', label:e.name, action:()=>{ goToPage('exercises'); }});
  });
  store.foodLog.forEach(f=>{
    if(f.name.toLowerCase().includes(q))
      hits.push({type:'Food', label:`${f.name} (${fmtDateShort(f.date)})`, action:()=>{ $('#foodDate').value=f.date; goToPage('food'); }});
  });
  store.workouts.forEach(w=>{
    if(w.date.includes(q) || (w.notes||'').toLowerCase().includes(q) || w.exercises.some(e=>e.exerciseName.toLowerCase().includes(q)))
      hits.push({type:'Workout', label:`Workout — ${fmtDate(w.date)}`, action:()=>{ goToPage('workouthistory'); setTimeout(()=>openWorkoutDetail(w.id),50); }});
  });
  store.prs.forEach(p=>{
    if(p.exerciseName.toLowerCase().includes(q))
      hits.push({type:'PR', label:`${p.exerciseName} PR (${fmtDateShort(p.date)})`, action:()=>{ goToPage('pr'); }});
  });

  if(hits.length===0){ results.innerHTML = `<div class="search-result-item"><span>No matches found</span></div>`; }
  else{
    results.innerHTML = hits.slice(0,20).map((h,i)=>`<div class="search-result-item" data-hit="${i}"><span>${escapeHtml(h.label)}</span><span class="srt">${h.type}</span></div>`).join('');
    $$('[data-hit]', results).forEach(el=> el.addEventListener('click', ()=>{ hits[+el.dataset.hit].action(); results.classList.remove('show'); }));
  }
  results.classList.add('show');
}
$('#globalSearch').addEventListener('input', e=> runGlobalSearch(e.target.value));
$('#globalSearch').addEventListener('focus', e=> { if(e.target.value) runGlobalSearch(e.target.value); });


/* ============================================================
   19. SETTINGS
   ============================================================ */
function renderSettingsPage(){
  $$('#themeSegment button').forEach(b=> b.classList.toggle('active', b.dataset.theme===store.settings.theme));
  $$('#unitSegment button').forEach(b=> b.classList.toggle('active', b.dataset.unit===store.settings.unit));
  $('#settingCalorieGoal').value = store.settings.calorieGoal;
  $('#settingProteinGoal').value = store.settings.proteinGoal;
  $('#settingCarbGoal').value = store.settings.carbGoal;
  $('#settingFatGoal').value = store.settings.fatGoal;
  $('#settingWaterGoal').value = store.settings.waterGoal;
  $('#missedWorkoutToggle').checked = !!store.settings.missedWorkoutAlert;
}

$('#themeSegment').addEventListener('click', e=>{
  const b = e.target.closest('button'); if(!b) return;
  setTheme(b.dataset.theme);
});
function setTheme(theme){
  store.settings.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  save();
  renderSettingsPage();
  $('#themeToggle').innerHTML = '';
  $('#themeToggle').setAttribute('data-ic', theme==='dark' ? 'moon':'sun');
  renderIcons($('#themeToggle').parentElement);
  refreshAllChartsIfVisible();
}
$('#themeToggle').addEventListener('click', ()=> setTheme(store.settings.theme==='dark' ? 'light':'dark'));

$('#unitSegment').addEventListener('click', e=>{
  const b = e.target.closest('button'); if(!b) return;
  store.settings.unit = b.dataset.unit;
  save();
  $('#unitToggle').textContent = store.settings.unit.toUpperCase();
  renderSettingsPage();
  refreshAllChartsIfVisible();
});
$('#unitToggle').addEventListener('click', ()=>{
  store.settings.unit = store.settings.unit==='kg' ? 'lbs':'kg';
  save();
  $('#unitToggle').textContent = store.settings.unit.toUpperCase();
  renderSettingsPage();
  refreshAllChartsIfVisible();
});

function refreshAllChartsIfVisible(){
  const active = $('.page.active');
  if(active) renderPage(active.id.replace('page-',''));
}

$('#saveGoalsBtn').addEventListener('click', ()=>{
  store.settings.calorieGoal = parseFloat($('#settingCalorieGoal').value)||2200;
  store.settings.proteinGoal = parseFloat($('#settingProteinGoal').value)||150;
  store.settings.carbGoal = parseFloat($('#settingCarbGoal').value)||220;
  store.settings.fatGoal = parseFloat($('#settingFatGoal').value)||70;
  store.settings.waterGoal = parseFloat($('#settingWaterGoal').value)||8;
  save();
  toast('Goals updated');
});
$('#missedWorkoutToggle').addEventListener('change', e=>{
  store.settings.missedWorkoutAlert = e.target.checked;
  save();
  if(e.target.checked) maybeCheckMissedWorkout();
});

$('#exportBtn').addEventListener('click', ()=>{
  const blob = new Blob([JSON.stringify(store, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `forge-backup-${todayISO()}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
  toast('Data exported');
});
$('#importBtn').addEventListener('click', ()=> $('#importFile').click());
$('#importFile').addEventListener('change', e=>{
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = ()=>{
    try{
      const parsed = JSON.parse(reader.result);
      openConfirm('Importing will replace all current data. Continue?', ()=>{
        const def = defaultState();
        store = Object.assign(def, parsed, {settings: Object.assign(def.settings, parsed.settings||{})});
        save();
        document.documentElement.setAttribute('data-theme', store.settings.theme);
        $('#unitToggle').textContent = store.settings.unit.toUpperCase();
        toast('Data imported successfully');
        goToPage('dashboard');
      });
    }catch(err){ toast('Invalid JSON file','error'); }
  };
  reader.readAsText(file);
  e.target.value='';
});
$('#resetBtn').addEventListener('click', ()=>{
  openConfirm('This will permanently delete ALL data (workouts, exercises, foods, weight, everything). This cannot be undone.', ()=>{
    store = defaultState();
    save();
    document.documentElement.setAttribute('data-theme', store.settings.theme);
    $('#unitToggle').textContent = store.settings.unit.toUpperCase();
    toast('All data reset');
    goToPage('dashboard');
  });
});


/* ============================================================
   20. EXTRAS — Rest Timer, Stopwatch, BMI, Water, Habits, Sleep
   ============================================================ */

/* --- Rest Timer --- */
let restTimerSeconds = 90, restTimerRemaining = 90, restTimerInterval = null;
function updateRestTimerDisplay(){
  const m = Math.floor(restTimerRemaining/60), s = restTimerRemaining%60;
  $('#restTimerDisplay').textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}
$$('.timer-preset').forEach(b=> b.addEventListener('click', ()=>{
  restTimerSeconds = +b.dataset.sec; restTimerRemaining = restTimerSeconds;
  clearInterval(restTimerInterval); restTimerInterval=null;
  updateRestTimerDisplay();
}));
$('#restTimerStart').addEventListener('click', ()=>{
  if(restTimerInterval) return;
  restTimerInterval = setInterval(()=>{
    restTimerRemaining--;
    if(restTimerRemaining<=0){
      clearInterval(restTimerInterval); restTimerInterval=null;
      restTimerRemaining=0; updateRestTimerDisplay();
      toast('Rest time complete — back to it!');
      try{ new AudioContext(); }catch(e){}
      return;
    }
    updateRestTimerDisplay();
  },1000);
});
$('#restTimerReset').addEventListener('click', ()=>{
  clearInterval(restTimerInterval); restTimerInterval=null;
  restTimerRemaining = restTimerSeconds; updateRestTimerDisplay();
});

/* --- Workout Stopwatch --- */
let stopwatchSeconds=0, stopwatchInterval=null;
function updateStopwatchDisplay(){
  const h=Math.floor(stopwatchSeconds/3600), m=Math.floor((stopwatchSeconds%3600)/60), s=stopwatchSeconds%60;
  $('#workoutTimerDisplay').textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}
$('#workoutTimerStart').addEventListener('click', ()=>{
  if(stopwatchInterval) return;
  stopwatchInterval = setInterval(()=>{ stopwatchSeconds++; updateStopwatchDisplay(); },1000);
});
$('#workoutTimerPause').addEventListener('click', ()=>{ clearInterval(stopwatchInterval); stopwatchInterval=null; });
$('#workoutTimerReset').addEventListener('click', ()=>{ clearInterval(stopwatchInterval); stopwatchInterval=null; stopwatchSeconds=0; updateStopwatchDisplay(); });

/* --- BMI Calculator --- */
$('#bmiCalcBtn').addEventListener('click', ()=>{
  const h = parseFloat($('#bmiHeight').value), w = parseFloat($('#bmiWeight').value);
  if(!h || !w){ toast('Enter height and weight','error'); return; }
  const bmi = w / ((h/100)**2);
  let cat='Normal', color='green';
  if(bmi<18.5){cat='Underweight';color='cyan';}
  else if(bmi>=25 && bmi<30){cat='Overweight';color='amber';}
  else if(bmi>=30){cat='Obese';color='red';}
  const el = $('#bmiResult');
  el.classList.add('show');
  el.innerHTML = `Your BMI is <b style="font-family:var(--font-mono);">${round1(bmi)}</b> <span class="bmi-badge" style="background:var(--${color});color:#0a0d14;">${cat}</span>`;
});

/* --- Water Tracker --- */
function renderWaterTracker(){
  const date = todayISO();
  $('#waterDateLabel').textContent = fmtDate(date);
  const count = store.water[date]||0;
  const goal = store.settings.waterGoal||8;
  $('#waterGoalLabel').textContent = goal;
  $('#waterTotal').textContent = count;
  const wrap = $('#waterTracker');
  let html='';
  const total = Math.max(goal, count);
  for(let i=1;i<=total;i++){
    html += `<button class="water-cup ${i<=count?'filled':''}" data-cup="${i}"><i data-ic="apple"></i></button>`;
  }
  wrap.innerHTML = html;
  renderIcons(wrap);
  $$('.water-cup', wrap).forEach(c=> c.addEventListener('click', ()=>{
    const clicked = +c.dataset.cup;
    store.water[date] = (store.water[date]===clicked) ? clicked-1 : clicked;
    save(); renderWaterTracker();
  }));
}

/* --- Habit Tracker --- */
$('#addHabitBtn').addEventListener('click', ()=>{
  const val = $('#newHabitInput').value.trim();
  if(!val) return;
  store.habits.push({id:uid(), name:val, log:{}});
  $('#newHabitInput').value='';
  save(); renderHabits();
});
$('#newHabitInput').addEventListener('keydown', e=>{ if(e.key==='Enter') $('#addHabitBtn').click(); });
function renderHabits(){
  const date = todayISO();
  const wrap = $('#habitList');
  wrap.innerHTML = store.habits.length ? store.habits.map(h=>`
    <div class="habit-row">
      <button class="habit-check ${h.log[date]?'done':''}" data-habit-toggle="${h.id}">${h.log[date]?'<i data-ic="check"></i>':''}</button>
      <span class="h-name">${escapeHtml(h.name)}</span>
      <button class="habit-del" data-habit-del="${h.id}"><i data-ic="x"></i></button>
    </div>`).join('') : `<div class="empty-state">No habits yet — add one above.</div>`;
  renderIcons(wrap);
  $$('[data-habit-toggle]', wrap).forEach(b=> b.addEventListener('click', ()=>{
    const h = store.habits.find(x=>x.id===b.dataset.habitToggle);
    h.log[date] = !h.log[date];
    save(); renderHabits();
  }));
  $$('[data-habit-del]', wrap).forEach(b=> b.addEventListener('click', ()=>{
    store.habits = store.habits.filter(x=>x.id!==b.dataset.habitDel);
    save(); renderHabits();
  }));
}

/* --- Sleep Tracker --- */
let sleepChartInst=null;
$('#saveSleepBtn').addEventListener('click', ()=>{
  const date = $('#sleepDate').value || todayISO();
  const hours = parseFloat($('#sleepHours').value);
  if(!hours || hours<=0){ toast('Enter valid sleep hours','error'); return; }
  const existing = store.sleep.find(s=>s.date===date);
  if(existing) existing.hours = hours;
  else store.sleep.push({id:uid(), date, hours});
  save();
  $('#sleepHours').value='';
  toast('Sleep logged');
  renderSleepChart();
});
function renderSleepChart(){
  const sorted = [...store.sleep].sort((a,b)=>a.date.localeCompare(b.date)).slice(-14);
  if(sleepChartInst) sleepChartInst.destroy();
  sleepChartInst = new Chart($('#sleepChart'), barChartConfig(sorted.map(s=>fmtDateShort(s.date)), sorted.map(s=>s.hours), 'Hours', '#7c5cfc'));
}

function renderExtrasPage(){
  updateRestTimerDisplay();
  updateStopwatchDisplay();
  if(!$('#sleepDate').value) $('#sleepDate').value = todayISO();
  renderWaterTracker();
  renderHabits();
  renderSleepChart();
}

/* ============================================================
   21. MISSED WORKOUT NOTIFICATION CHECK
   ============================================================ */
function maybeCheckMissedWorkout(){
  if(!store.settings.missedWorkoutAlert) return;
  const y = daysAgo(1);
  const hadYesterday = store.workouts.some(w=>w.date===y);
  const hadToday = store.workouts.some(w=>w.date===todayISO());
  if(!hadYesterday && !hadToday && store.workouts.length>0){
    setTimeout(()=> toast("You haven't logged a workout in a day or two — keep the streak alive!"), 1200);
  }
}

/* ============================================================
   22. KEYBOARD SHORTCUTS
   ============================================================ */
let gPressed=false;
document.addEventListener('keydown', e=>{
  const tag = (e.target.tagName||'').toLowerCase();
  const typing = tag==='input' || tag==='textarea' || tag==='select';
  if(e.key==='/' && !typing){ e.preventDefault(); $('#globalSearch').focus(); }
  if(!typing && e.key.toLowerCase()==='g'){ gPressed=true; setTimeout(()=>gPressed=false,900); return; }
  if(!typing && gPressed && e.key.toLowerCase()==='d'){ goToPage('dashboard'); gPressed=false; }
  if(!typing && e.key.toLowerCase()==='n' && !modalBackdrop().classList.contains('show')){ goToPage('workout'); }
});

/* ============================================================
   23. INIT / BOOTSTRAP
   ============================================================ */
function init(){
  renderIcons();
  document.documentElement.setAttribute('data-theme', store.settings.theme);
  $('#unitToggle').textContent = store.settings.unit.toUpperCase();
  $('#themeToggle').innerHTML='';
  $('#themeToggle').setAttribute('data-ic', store.settings.theme==='dark' ? 'moon':'sun');
  renderIcons($('#themeToggle').parentElement);

  populateExerciseSelects();

  // seed a few starter exercises if empty, so the app isn't blank on first run
  if(store.exercises.length===0){
    store.exercises = [
      {id:uid(), name:'Barbell Bench Press', muscleGroup:'Chest', notes:'Flat bench, medium grip', favorite:true},
      {id:uid(), name:'Back Squat', muscleGroup:'Legs', notes:'Below parallel', favorite:true},
      {id:uid(), name:'Deadlift', muscleGroup:'Back', notes:'Conventional stance', favorite:false},
      {id:uid(), name:'Overhead Press', muscleGroup:'Shoulders', notes:'', favorite:false},
      {id:uid(), name:'Pull-Up', muscleGroup:'Back', notes:'Bodyweight or weighted', favorite:false},
    ];
    save();
    populateExerciseSelects();
  }

  goToPage('dashboard');
  maybeCheckMissedWorkout();
}

init();

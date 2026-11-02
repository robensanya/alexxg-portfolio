const colors=['#d87c94','#bd4d60','#b89ac9','#db9d7d','#8d708d'],names=['Румяна','Красный лак','Хайлайтер','Бальзам','Тушь'];
function icon(t){return '<img class="product" src="assets/'+(t===1?'nail':t)+'.jpg" alt="" draggable="false">'}
let a=[],selected=-1,score=0,moves=20,busy=false,epoch=0,best=0;try{best=+localStorage.elianBest||0}catch{}const $=id=>document.getElementById(id),sleep=ms=>new Promise(r=>setTimeout(r,ms));
function matches(b=a){let s=new Set();for(let i=0;i<49;i++){let c=i%7,r=Math.floor(i/7);if(c<5&&b[i]===b[i+1]&&b[i]===b[i+2]){let j=i;while(j<r*7+7&&b[j]===b[i])s.add(j++)}if(r<5&&b[i]===b[i+7]&&b[i]===b[i+14]){let j=i;while(j<49&&b[j]===b[i]){s.add(j);j+=7}}}return [...s]}
function pair(){for(let i=0;i<49;i++)for(let j of [i%7<6?i+1:-1,i+7<49?i+7:-1]){if(j<0)continue;[a[i],a[j]]=[a[j],a[i]];let ok=matches().length;[a[i],a[j]]=[a[j],a[i]];if(ok)return[i,j]}return null}
function fresh(){do{a=[];for(let i=0;i<49;i++){let t;do{t=Math.floor(Math.random()*5)}while((i%7>1&&a[i-1]===t&&a[i-2]===t)||(i>=14&&a[i-7]===t&&a[i-14]===t));a.push(t)}}while(!pair())}
function draw(){ $('board').innerHTML=a.map((t,i)=>'<button class="tile '+(i===selected?'sel':'')+'" aria-label="'+names[t]+', ряд '+(Math.floor(i/7)+1)+', колонка '+(i%7+1)+'" data-i="'+i+'">'+icon(t)+'</button>').join('');$('score').textContent=score;$('moves').textContent=moves;$('best').textContent=best;$('progress').style.width=Math.min(100,score/15)+'%'}

const reduced=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
async function motion(el,frames,ms=300){if(reduced())return;await el.animate(frames,{duration:ms,easing:'cubic-bezier(.22,.8,.25,1)',fill:'none'}).finished.catch(()=>{});}
async function swapMotion(i,j,offset){
 const els=$('board').children,ri=els[i].getBoundingClientRect(),rj=els[j].getBoundingClientRect();
 const dx=rj.left-ri.left,dy=rj.top-ri.top;
 els[j].style.zIndex=5;els[i].style.zIndex=4;
 await Promise.all([motion(els[i],[{transform:'none'},{transform:'translate('+dx+'px,'+dy+'px)'}],260),
 motion(els[j],[{transform:offset?'translate('+offset.x+'px,'+offset.y+'px)':'none'},{transform:'translate('+(-dx)+'px,'+(-dy)+'px)'}],260)]);
}
async function choose(i,offset){
 if(busy||moves===0)return;
 if(selected<0){selected=i;draw();return}
 let j=selected;selected=-1;
 if(i===j){draw();return}
 if(!(Math.abs(i-j)===7||(Math.floor(i/7)===Math.floor(j/7)&&Math.abs(i-j)===1))){selected=i;draw();return}
 busy=true;const run=epoch;
 await swapMotion(i,j,offset);if(run!==epoch)return;
 [a[i],a[j]]=[a[j],a[i]];draw();
 let hit=matches();
 if(!hit.length){
 await swapMotion(i,j);if(run!==epoch)return;
 [a[i],a[j]]=[a[j],a[i]];
 $('message').textContent='Нужны три в ряд. Этот ход не потрачен.';
 busy=false;draw();return;
 }
 moves--;let combo=0;
 while(hit.length){
 combo++;score+=hit.length*10*combo;
 $('score').textContent=score;$('moves').textContent=moves;
 await Promise.all(hit.map(k=>motion($('board').children[k],[{transform:'scale(1)',opacity:1},{transform:'scale(1.12)',opacity:1,offset:.25},{transform:'scale(.15)',opacity:0}],260)));
 if(run!==epoch)return;
 const drops={};
 for(let c=0;c<7;c++){
 let col=[];
 for(let r=6;r>=0;r--)if(!hit.includes(r*7+c))col.push({t:a[r*7+c],from:r});
 let n=0;while(col.length<7)col.push({t:Math.floor(Math.random()*5),from:-1-n++});
 for(let r=6;r>=0;r--){let v=col[6-r];a[r*7+c]=v.t;drops[r*7+c]=r-v.from;}
 }
 draw();
 const step=$('board').children[7].getBoundingClientRect().top-$('board').children[0].getBoundingClientRect().top;
 await Promise.all(Object.entries(drops).filter(([,n])=>n>0).map(([k,n])=>motion($('board').children[k],[{transform:'translateY('+(-n*step)+'px)',opacity:.3},{transform:'translateY(0)',opacity:1}],Math.min(520,300+n*35))));
 if(run!==epoch)return;
 $('message').textContent=combo>1?'Каскад ×'+combo+' ✦':'Красивое совпадение ✦';
 hit=matches();
 }
 best=Math.max(best,score);try{localStorage.elianBest=best}catch{}
 if(!moves)$('message').textContent=score>=1500?'Цель достигнута! ✦':'Игра окончена: '+score+' очков. Попробуешь ещё?';
 else if(!pair()){fresh();$('message').textContent='Перемешали поле без потери хода.'}
 busy=false;draw();
}

$('board').onclick=e=>{let b=e.target.closest('button');if(b)choose(+b.dataset.i)};$('restart').onclick=()=>{epoch++;busy=false;score=0;moves=20;selected=-1;fresh();draw();$('message').textContent='Собери 1500 очков за 20 ходов ✦'};$('hint').onclick=()=>{if(busy||!moves)return;let p=pair();if(p){selected=-1;draw();p.forEach(i=>$('board').children[i].classList.add('sel'));$('message').textContent='Поменяй выделенные продукты местами.'}};$('restart').click();

let drag=null;
const board=$('board');
board.style.touchAction='none';
board.addEventListener('pointerdown',e=>{
 const tile=e.target.closest('.tile');if(!tile||busy||!moves||e.button>0)return;
 drag={id:e.pointerId,i:+tile.dataset.i,x:e.clientX,y:e.clientY,tile,moved:false};
 tile.setPointerCapture(e.pointerId);
});
board.addEventListener('pointermove',e=>{
 if(!drag||drag.id!==e.pointerId)return;
 const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
 if(Math.hypot(dx,dy)>7)drag.moved=true;
 if(drag.moved){e.preventDefault();drag.tile.style.transform='translate('+dx+'px,'+dy+'px) scale(1.12)';drag.tile.style.zIndex=10;drag.tile.style.opacity='.85';}
});
function finishDrag(e,cancel=false){
 if(!drag||drag.id!==e.pointerId)return;
 const d=drag;drag=null;d.tile.style.transform='';d.tile.style.zIndex='';d.tile.style.opacity='';
 if(!d.moved)return;
 suppressUntil=Date.now()+400;
 if(cancel)return;
 const dx=e.clientX-d.x,dy=e.clientY-d.y;
 if(Math.max(Math.abs(dx),Math.abs(dy))<18)return;
 let target=d.i+(Math.abs(dx)>Math.abs(dy)?(dx>0?1:-1):(dy>0?7:-7));
 if(target<0||target>=49||(Math.abs(dx)>Math.abs(dy)&&Math.floor(target/7)!==Math.floor(d.i/7)))return;
 selected=d.i;choose(target,{x:dx,y:dy});
}
board.addEventListener('pointerup',e=>finishDrag(e));
board.addEventListener('pointercancel',e=>finishDrag(e,true));
let suppressUntil=0;
board.onclick=e=>{if(Date.now()<suppressUntil)return;let b=e.target.closest('button');if(b)choose(+b.dataset.i)};

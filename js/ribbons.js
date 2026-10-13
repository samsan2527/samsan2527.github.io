// Flowing ribbon strands beneath the approach statement. Decorative only; 2D canvas, no dependencies.
export function initRibbons(canvas) {
  const ctx=canvas?.getContext('2d');
  if(!ctx)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let paused=document.documentElement.classList.contains('motion-paused'),visible=true,frame=0,last=0,time=0,width=0,height=0;
  const bundles=[
    {y:.52,amp:.2,freq:1.4,speed:.32,phase:0,strands:9,stops:['#5aa9ff','#9b7bff','#c79bff','#ffd66b']},
    {y:.6,amp:.14,freq:2.1,speed:-.24,phase:2.1,strands:7,stops:['#7cc4ff','#a98bff','#f3a6e2','#ffe27a']},
    {y:.46,amp:.1,freq:1.1,speed:.18,phase:4.2,strands:5,stops:['#4c8dff','#b58cff','#ffd1a8','#fff06b']},
  ];
  function resize(){
    const ratio=Math.min(devicePixelRatio||1,2),r=canvas.getBoundingClientRect();
    width=r.width;height=r.height;canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);
    ctx.setTransform(ratio,0,0,ratio,0,0);draw();
  }
  function draw(){
    ctx.clearRect(0,0,width,height);
    const light=document.documentElement.dataset.theme==='light';
    ctx.globalCompositeOperation=light?'source-over':'lighter';
    for(const b of bundles){
      const gradient=ctx.createLinearGradient(0,0,width,0);
      b.stops.forEach((color,i)=>gradient.addColorStop(i/(b.stops.length-1),color));
      ctx.strokeStyle=gradient;
      for(let s=0;s<b.strands;s++){
        const offset=s/b.strands,spread=(offset-.5)*.09;
        ctx.lineWidth=s%3===0?14+offset*10:1.2+offset*3;
        ctx.globalAlpha=(s%3===0?.16:.5)*(light?.75:1);
        ctx.beginPath();
        for(let x=-20;x<=width+20;x+=12){
          const u=x/width;
          const y=height*(b.y+spread*Math.sin(u*3+time*.4+s))
            +height*b.amp*Math.sin(u*b.freq*Math.PI*2+time*b.speed+b.phase+offset*.9)
            +height*b.amp*.45*Math.sin(u*b.freq*4.3-time*b.speed*1.3+b.phase*1.7);
          x<0?ctx.moveTo(x,y):ctx.lineTo(x,y);
        }
        ctx.stroke();
      }
    }
    ctx.globalAlpha=1;
  }
  const running=()=>visible&&!paused&&!document.hidden&&!reduced.matches;
  function tick(now){frame=0;if(!running())return;time+=last?Math.min((now-last)/1000,.05):0;last=now;draw();frame=requestAnimationFrame(tick);}
  function sync(){if(running()&&!frame){last=0;frame=requestAnimationFrame(tick);}else if(!running()&&frame){cancelAnimationFrame(frame);frame=0;}}
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();}).observe(canvas);
  document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
  document.addEventListener('motionchange',event=>{paused=event.detail.paused;sync();});
  document.addEventListener('themechange',draw);
  resize();sync();
}

// A slow, domain-warped color field. CSS provides the static/failure fallback.
export async function initFluid() {
  const host=document.querySelector('#aurora');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  if(!host||reduced.matches)return;
  const THREE=await import('https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js');
  if(reduced.matches)return;
  let renderer;
  try{renderer=new THREE.WebGLRenderer({alpha:false,antialias:false,powerPreference:'low-power'});}catch{return;}
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
  const scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);
  camera.position.z=1;
  const material=new THREE.ShaderMaterial({
    uniforms:{uTime:{value:0},uAspect:{value:1},uPointer:{value:new THREE.Vector2(0,0)}},
    vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}',
    fragmentShader:`precision highp float;
      varying vec2 vUv;uniform float uTime;uniform float uAspect;uniform vec2 uPointer;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
      float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=noise(p)*a;p=mat2(.8,-.6,.6,.8)*p*2.02+3.7;a*=.5;}return v;}
      void main(){vec2 p=vUv*vec2(uAspect,1.)*2.2+uPointer*.12;float t=uTime*.045;
        vec2 q=vec2(fbm(p+vec2(t,-t*.4)),fbm(p+vec2(5.2,1.3)+t*.3));
        vec2 r=vec2(fbm(p+3.1*q+vec2(1.7,9.2)+t*.4),fbm(p+3.4*q+vec2(8.3,2.8)-t*.25));
        float f=fbm(p+2.8*r);float band=sin(p.x*1.2+p.y*.8+f*5.+t*.3)*.5+.5;
        vec3 sea=vec3(.9,.23,.38),sage=vec3(1.,.67,.32),sand=vec3(1.,.92,.42),clay=vec3(1.,.36,.22),sky=vec3(.32,.7,.91);
        vec3 col=mix(sea,sage,smoothstep(.22,.69,f));col=mix(col,clay,smoothstep(.3,.8,r.x)*.85);col=mix(col,sand,smoothstep(.48,.83,q.y)*.85);col=mix(col,sky,smoothstep(.5,.93,band)*smoothstep(.2,.65,r.y)*.75);
        col+=.035*sin((f+r.y*.4)*22.);gl_FragColor=vec4(col,1.);
      }`
  });
  const geometry=new THREE.PlaneGeometry(2,2);scene.add(new THREE.Mesh(geometry,material));
  host.append(renderer.domElement);
  let visible=true,paused=document.documentElement.classList.contains('motion-paused'),frame=0,last=0,time=0;
  let targetX=0,targetY=0;
  function resize(){const {width,height}=host.getBoundingClientRect();renderer.setSize(width,height);material.uniforms.uAspect.value=width/height;}
  const resizer=new ResizeObserver(resize);resizer.observe(host);resize();
  function running(){return visible&&!paused&&!document.hidden&&!reduced.matches;}
  function render(now){frame=0;if(!running())return;time+=last?Math.min((now-last)/1000,.05):0;last=now;material.uniforms.uTime.value=time;material.uniforms.uPointer.value.lerp(new THREE.Vector2(targetX,targetY),.025);renderer.render(scene,camera);frame=requestAnimationFrame(render);}
  function sync(){renderer.domElement.hidden=reduced.matches;if(running()&&!frame){last=0;frame=requestAnimationFrame(render);}else if(!running()&&frame){cancelAnimationFrame(frame);frame=0;}}
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();});observer.observe(host);
  host.closest('.hero').addEventListener('pointermove',event=>{const r=host.getBoundingClientRect();targetX=(event.clientX-r.left)/r.width-.5;targetY=(event.clientY-r.top)/r.height-.5;},{passive:true});
  document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
  document.addEventListener('motionchange',event=>{paused=event.detail.paused;sync();});
  renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();paused=true;renderer.domElement.style.display='none';sync();});
  addEventListener('pagehide',()=>{cancelAnimationFrame(frame);frame=0;});addEventListener('pageshow',sync);
  sync();
}

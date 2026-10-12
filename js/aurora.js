// Loaded only on the home page, after content. CDN failure keeps the CSS aurora.
export async function initAurora() {
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');if(reduced.matches)return;
  const host=document.querySelector('#aurora');if(!host)return;
  const probe=document.createElement('canvas');const context=probe.getContext('webgl2',{alpha:true,antialias:false,powerPreference:'low-power'});if(!context)return;
  const THREE=await import('https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js');
  if(reduced.matches)return;
  let renderer;try{renderer=new THREE.WebGLRenderer({canvas:probe,context,alpha:true,antialias:false,powerPreference:'low-power'});}catch{return;}
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.setSize(innerWidth,innerHeight);host.append(renderer.domElement);
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(42,innerWidth/innerHeight,.1,100);camera.position.z=8;
  const mobile=innerWidth<700,count=mobile?2:4,planes=[];
  const vertex=`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;
  const fragment=`precision highp float;
    varying vec2 vUv;uniform float uTime;uniform float uLayer;uniform float uScroll;
    vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
    vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
    vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
    float snoise(vec2 v){const vec4 C=vec4(.2113248654,.3660254038,-.5773502692,.0243902439);vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1=x0.x>x0.y?vec2(1.,0.):vec2(0.,1.);vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod289(i);vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);m=m*m;m=m*m;vec3 x=2.*fract(p*C.www)-1.;vec3 h=abs(x)-.5;vec3 ox=floor(x+.5);vec3 a0=x-ox;m*=1.792842914-.853734721*(a0*a0+h*h);vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.*dot(m,g);}
    float fbm(vec2 p){float f=0.;float a=.5;for(int i=0;i<4;i++){f+=a*snoise(p);p=p*2.03+vec2(12.7,3.1);a*=.5;}return f;}
    void main(){vec2 uv=vUv;float t=uTime*.035+uLayer*2.4;float x=uv.x;float bend=fbm(vec2(x*2.1+t*.13,t*.3))*.14;float curve=.29+pow(max(x,0.),1.8)*.52+bend+uLayer*.028;float dist=uv.y-curve;float curtain=exp(-abs(dist)*18.)*(.65+.35*smoothstep(-.1,.08,dist));float edge=exp(-abs(dist)*100.)*.12;float streak=.5+.5*snoise(vec2(x*64.+fbm(vec2(x*4.,t))*4.,t*.5));float haze=.65+.25*fbm(vec2(x*6.,uv.y*2.-t));float strength=(curtain*(.2+streak*.15)+edge)*smoothstep(.25,.7,x)*haze;strength*=smoothstep(0.,.16,uv.y)*(1.-smoothstep(.83,1.,uv.y));vec3 teal=vec3(.08,.8,.53);vec3 cobalt=vec3(.10,.21,.75);vec3 color=mix(teal,cobalt,smoothstep(.6,1.,x)*.52+uLayer*.07+uScroll*.08);gl_FragColor=vec4(color,strength*(1.-uScroll*.4)*.64);}`;
  for(let i=0;i<count;i++){const material=new THREE.ShaderMaterial({vertexShader:vertex,fragmentShader:fragment,uniforms:{uTime:{value:0},uLayer:{value:i},uScroll:{value:0}},transparent:true,depthWrite:false,blending:THREE.AdditiveBlending});const mesh=new THREE.Mesh(new THREE.PlaneGeometry(18,10),material);mesh.position.set(.4,0,-i*.65);scene.add(mesh);planes.push(mesh);}
  const positions=new Float32Array(300*3);for(let i=0;i<positions.length;i+=3){positions[i]=(Math.random()-.3)*16;positions[i+1]=(Math.random()-.5)*9;positions[i+2]=-Math.random()*4;}
  const particlesGeo=new THREE.BufferGeometry();particlesGeo.setAttribute('position',new THREE.BufferAttribute(positions,3));const particles=new THREE.Points(particlesGeo,new THREE.PointsMaterial({size:.012,color:0x7eae9d,transparent:true,opacity:.35,depthWrite:false}));scene.add(particles);
  const grid=new THREE.GridHelper(30,40,0x15392b,0x12281f);grid.position.set(0,-3.3,-5);grid.material.transparent=true;grid.material.opacity=.13;scene.add(grid);scene.fog=new THREE.FogExp2(0x08090b,.07);
  let targetX=0,targetY=0,x=0,y=0,visible=true,paused=document.documentElement.classList.contains('motion-paused'),raf=0,last=0,elapsed=0;
  function canRun(){return visible&&!document.hidden&&!paused&&!reduced.matches;}
  function draw(now){raf=0;if(!canRun())return;const dt=last?Math.min((now-last)/1000,.05):0;last=now;elapsed+=dt;x+=(targetX-x)*.035;y+=(targetY-y)*.035;const scroll=Math.min(scrollY/innerHeight,1);planes.forEach((plane,i)=>{plane.position.x=.4+x*(i+1)*.11;plane.position.y=y*(i+1)*.08;plane.material.uniforms.uTime.value=elapsed;plane.material.uniforms.uScroll.value=scroll;});particles.rotation.z=elapsed*.003;renderer.render(scene,camera);raf=requestAnimationFrame(draw);}
  function sync(){if(canRun()&&!raf){last=0;raf=requestAnimationFrame(draw);}else if(!canRun()&&raf){cancelAnimationFrame(raf);raf=0;}renderer.domElement.hidden=reduced.matches;}
  document.addEventListener('pointermove',event=>{targetX=event.clientX/innerWidth-.5;targetY=.5-event.clientY/innerHeight;},{passive:true});
  // No permission prompt: tilt is used only when already available.
  window.addEventListener('deviceorientation',event=>{if(event.gamma!==null){targetX=Math.max(-.5,Math.min(.5,event.gamma/60));targetY=Math.max(-.5,Math.min(.5,((event.beta||0)-45)/90));}},{passive:true});
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();});observer.observe(document.querySelector('.hero'));
  document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);document.addEventListener('motionchange',event=>{paused=event.detail.paused;sync();});
  renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();paused=true;renderer.domElement.style.display='none';sync();});
  window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.setSize(innerWidth,innerHeight);},{passive:true});
  window.addEventListener('pagehide',()=>{cancelAnimationFrame(raf);raf=0;});window.addEventListener('pageshow',sync);sync();
}

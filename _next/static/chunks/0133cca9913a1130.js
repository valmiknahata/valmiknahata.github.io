(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,91865,(e,t,i)=>{"use strict";var r=e.r(94921).__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;i.c=function(e){return r.H.useMemoCache(e)}},25780,(e,t,i)=>{"use strict";t.exports=e.r(91865)},20866,e=>{"use strict";var t=e.i(45678),i=e.i(25780),r=e.i(94921);let o=`#version 300 es
precision mediump float;

layout(location = 0) in vec4 a_position;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_imageAspectRatio;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;
uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

out vec2 v_objectUV;
out vec2 v_objectBoxSize;
out vec2 v_responsiveUV;
out vec2 v_responsiveBoxGivenSize;
out vec2 v_patternUV;
out vec2 v_patternBoxSize;
out vec2 v_imageUV;

vec3 getBoxSize(float boxRatio, vec2 givenBoxSize) {
  vec2 box = vec2(0.);
  // fit = none
  box.x = boxRatio * min(givenBoxSize.x / boxRatio, givenBoxSize.y);
  float noFitBoxWidth = box.x;
  if (u_fit == 1.) { // fit = contain
    box.x = boxRatio * min(u_resolution.x / boxRatio, u_resolution.y);
  } else if (u_fit == 2.) { // fit = cover
    box.x = boxRatio * max(u_resolution.x / boxRatio, u_resolution.y);
  }
  box.y = box.x / boxRatio;
  return vec3(box, noFitBoxWidth);
}

void main() {
  gl_Position = a_position;

  vec2 uv = gl_Position.xy * .5;
  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  float r = u_rotation * 3.14159265358979323846 / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);


  // ===================================================

  float fixedRatio = 1.;
  vec2 fixedRatioBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );

  v_objectBoxSize = getBoxSize(fixedRatio, fixedRatioBoxGivenSize).xy;
  vec2 objectWorldScale = u_resolution.xy / v_objectBoxSize;

  v_objectUV = uv;
  v_objectUV *= objectWorldScale;
  v_objectUV += boxOrigin * (objectWorldScale - 1.);
  v_objectUV += graphicOffset;
  v_objectUV /= u_scale;
  v_objectUV = graphicRotation * v_objectUV;

  // ===================================================

  v_responsiveBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  float responsiveRatio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
  vec2 responsiveBoxSize = getBoxSize(responsiveRatio, v_responsiveBoxGivenSize).xy;
  vec2 responsiveBoxScale = u_resolution.xy / responsiveBoxSize;

  #ifdef ADD_HELPERS
  v_responsiveHelperBox = uv;
  v_responsiveHelperBox *= responsiveBoxScale;
  v_responsiveHelperBox += boxOrigin * (responsiveBoxScale - 1.);
  #endif

  v_responsiveUV = uv;
  v_responsiveUV *= responsiveBoxScale;
  v_responsiveUV += boxOrigin * (responsiveBoxScale - 1.);
  v_responsiveUV += graphicOffset;
  v_responsiveUV /= u_scale;
  v_responsiveUV.x *= responsiveRatio;
  v_responsiveUV = graphicRotation * v_responsiveUV;
  v_responsiveUV.x /= responsiveRatio;

  // ===================================================

  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
  vec2 patternBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  patternBoxRatio = patternBoxGivenSize.x / patternBoxGivenSize.y;

  vec3 boxSizeData = getBoxSize(patternBoxRatio, patternBoxGivenSize);
  v_patternBoxSize = boxSizeData.xy;
  float patternBoxNoFitBoxWidth = boxSizeData.z;
  vec2 patternBoxScale = u_resolution.xy / v_patternBoxSize;

  v_patternUV = uv;
  v_patternUV += graphicOffset / patternBoxScale;
  v_patternUV += boxOrigin;
  v_patternUV -= boxOrigin / patternBoxScale;
  v_patternUV *= u_resolution.xy;
  v_patternUV /= u_pixelRatio;
  if (u_fit > 0.) {
    v_patternUV *= (patternBoxNoFitBoxWidth / v_patternBoxSize.x);
  }
  v_patternUV /= u_scale;
  v_patternUV = graphicRotation * v_patternUV;
  v_patternUV += boxOrigin / patternBoxScale;
  v_patternUV -= boxOrigin;
  // x100 is a default multiplier between vertex and fragmant shaders
  // we use it to avoid UV presision issues
  v_patternUV *= .01;

  // ===================================================

  vec2 imageBoxSize;
  if (u_fit == 1.) { // contain
    imageBoxSize.x = min(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else if (u_fit == 2.) { // cover
    imageBoxSize.x = max(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else {
    imageBoxSize.x = min(10.0, 10.0 / u_imageAspectRatio * u_imageAspectRatio);
  }
  imageBoxSize.y = imageBoxSize.x / u_imageAspectRatio;
  vec2 imageBoxScale = u_resolution.xy / imageBoxSize;

  v_imageUV = uv;
  v_imageUV *= imageBoxScale;
  v_imageUV += boxOrigin * (imageBoxScale - 1.);
  v_imageUV += graphicOffset;
  v_imageUV /= u_scale;
  v_imageUV.x *= u_imageAspectRatio;
  v_imageUV = graphicRotation * v_imageUV;
  v_imageUV.x /= u_imageAspectRatio;

  v_imageUV += .5;
  v_imageUV.y = 1. - v_imageUV.y;
}`,a=8294400;class s{parentElement;canvasElement;gl;program=null;uniformLocations={};fragmentShader;rafId=null;lastRenderTime=0;currentFrame=0;speed=0;currentSpeed=0;providedUniforms;mipmaps=[];hasBeenDisposed=!1;resolutionChanged=!0;textures=new Map;minPixelRatio;maxPixelCount;isSafari=(function(){let e=navigator.userAgent.toLowerCase();return e.includes("safari")&&!e.includes("chrome")&&!e.includes("android")})();uniformCache={};textureUnitMap=new Map;constructor(e,t,i,r,o=0,s=0,n=2,c=a,h=[]){if(e instanceof HTMLElement)this.parentElement=e;else throw Error("Paper Shaders: parent element must be an HTMLElement");if(!document.querySelector("style[data-paper-shader]")){const e=document.createElement("style");e.innerHTML=l,e.setAttribute("data-paper-shader",""),document.head.prepend(e)}const u=document.createElement("canvas");this.canvasElement=u,this.parentElement.prepend(u),this.fragmentShader=t,this.providedUniforms=i,this.mipmaps=h,this.currentFrame=s,this.minPixelRatio=n,this.maxPixelCount=c;const p=u.getContext("webgl2",r);if(!p)throw Error("Paper Shaders: WebGL is not supported in this browser");this.gl=p,this.initProgram(),this.setupPositionAttribute(),this.setupUniforms(),this.setUniformValues(this.providedUniforms),this.setupResizeObserver(),visualViewport?.addEventListener("resize",this.handleVisualViewportChange),this.setSpeed(o),this.parentElement.setAttribute("data-paper-shader",""),this.parentElement.paperShaderMount=this,document.addEventListener("visibilitychange",this.handleDocumentVisibilityChange)}initProgram=()=>{let e=function(e,t,i){let r=e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT),o=r?r.precision:null;o&&o<23&&(t=t.replace(/precision\s+(lowp|mediump)\s+float;/g,"precision highp float;"),i=i.replace(/precision\s+(lowp|mediump)\s+float/g,"precision highp float").replace(/\b(uniform|varying|attribute)\s+(lowp|mediump)\s+(\w+)/g,"$1 highp $3"));let a=n(e,e.VERTEX_SHADER,t),s=n(e,e.FRAGMENT_SHADER,i);if(!a||!s)return null;let l=e.createProgram();return l?(e.attachShader(l,a),e.attachShader(l,s),e.linkProgram(l),e.getProgramParameter(l,e.LINK_STATUS))?(e.detachShader(l,a),e.detachShader(l,s),e.deleteShader(a),e.deleteShader(s),l):(console.error("Unable to initialize the shader program: "+e.getProgramInfoLog(l)),e.deleteProgram(l),e.deleteShader(a),e.deleteShader(s),null):null}(this.gl,o,this.fragmentShader);e&&(this.program=e)};setupPositionAttribute=()=>{let e=this.gl.getAttribLocation(this.program,"a_position"),t=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,t),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),this.gl.STATIC_DRAW),this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0)};setupUniforms=()=>{let e={u_time:this.gl.getUniformLocation(this.program,"u_time"),u_pixelRatio:this.gl.getUniformLocation(this.program,"u_pixelRatio"),u_resolution:this.gl.getUniformLocation(this.program,"u_resolution")};Object.entries(this.providedUniforms).forEach(([t,i])=>{if(e[t]=this.gl.getUniformLocation(this.program,t),i instanceof HTMLImageElement){let i=`${t}AspectRatio`;e[i]=this.gl.getUniformLocation(this.program,i)}}),this.uniformLocations=e};renderScale=1;parentWidth=0;parentHeight=0;parentDevicePixelWidth=0;parentDevicePixelHeight=0;devicePixelsSupported=!1;resizeObserver=null;setupResizeObserver=()=>{this.resizeObserver=new ResizeObserver(([e])=>{if(e?.borderBoxSize[0]){let t=e.devicePixelContentBoxSize?.[0];void 0!==t&&(this.devicePixelsSupported=!0,this.parentDevicePixelWidth=t.inlineSize,this.parentDevicePixelHeight=t.blockSize),this.parentWidth=e.borderBoxSize[0].inlineSize,this.parentHeight=e.borderBoxSize[0].blockSize}this.handleResize()}),this.resizeObserver.observe(this.parentElement)};handleVisualViewportChange=()=>{this.resizeObserver?.disconnect(),this.setupResizeObserver()};handleResize=()=>{let e=0,t=0,i=Math.max(1,window.devicePixelRatio),r=visualViewport?.scale??1;if(this.devicePixelsSupported){let o=Math.max(1,this.minPixelRatio/i);e=this.parentDevicePixelWidth*o*r,t=this.parentDevicePixelHeight*o*r}else{let o,a,s=Math.max(i,this.minPixelRatio)*r;this.isSafari&&(s*=Math.max(1,(a=Math.round(100*(o=outerWidth/((visualViewport?.scale??1)*(visualViewport?.width??window.innerWidth)+(window.innerWidth-document.documentElement.clientWidth)))))%5==0?a/100:33===a?1/3:67===a?2/3:133===a?4/3:o)),e=Math.round(this.parentWidth)*s,t=Math.round(this.parentHeight)*s}let o=Math.min(1,Math.sqrt(this.maxPixelCount)/Math.sqrt(e*t)),a=Math.round(e*o),s=Math.round(t*o),n=a/Math.round(this.parentWidth);(this.canvasElement.width!==a||this.canvasElement.height!==s||this.renderScale!==n)&&(this.renderScale=n,this.canvasElement.width=a,this.canvasElement.height=s,this.resolutionChanged=!0,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.render(performance.now()))};render=e=>{if(this.hasBeenDisposed)return;if(null===this.program)return void console.warn("Tried to render before program or gl was initialized");let t=e-this.lastRenderTime;this.lastRenderTime=e,0!==this.currentSpeed&&(this.currentFrame+=t*this.currentSpeed),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.useProgram(this.program),this.gl.uniform1f(this.uniformLocations.u_time,.001*this.currentFrame),this.resolutionChanged&&(this.gl.uniform2f(this.uniformLocations.u_resolution,this.gl.canvas.width,this.gl.canvas.height),this.gl.uniform1f(this.uniformLocations.u_pixelRatio,this.renderScale),this.resolutionChanged=!1),this.gl.drawArrays(this.gl.TRIANGLES,0,6),0!==this.currentSpeed?this.requestRender():this.rafId=null};requestRender=()=>{null!==this.rafId&&cancelAnimationFrame(this.rafId),this.rafId=requestAnimationFrame(this.render)};setTextureUniform=(e,t)=>{if(!t.complete||0===t.naturalWidth)throw Error(`Paper Shaders: image for uniform ${e} must be fully loaded`);let i=this.textures.get(e);i&&this.gl.deleteTexture(i),this.textureUnitMap.has(e)||this.textureUnitMap.set(e,this.textureUnitMap.size);let r=this.textureUnitMap.get(e);this.gl.activeTexture(this.gl.TEXTURE0+r);let o=this.gl.createTexture();this.gl.bindTexture(this.gl.TEXTURE_2D,o),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,t),this.mipmaps.includes(e)&&(this.gl.generateMipmap(this.gl.TEXTURE_2D),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR_MIPMAP_LINEAR));let a=this.gl.getError();if(a!==this.gl.NO_ERROR||null===o)return void console.error("Paper Shaders: WebGL error when uploading texture:",a);this.textures.set(e,o);let s=this.uniformLocations[e];if(s){this.gl.uniform1i(s,r);let i=`${e}AspectRatio`,o=this.uniformLocations[i];if(o){let e=t.naturalWidth/t.naturalHeight;this.gl.uniform1f(o,e)}}};areUniformValuesEqual=(e,t)=>e===t||!!(Array.isArray(e)&&Array.isArray(t))&&e.length===t.length&&e.every((e,i)=>this.areUniformValuesEqual(e,t[i]));setUniformValues=e=>{this.gl.useProgram(this.program),Object.entries(e).forEach(([e,t])=>{let i=t;if(t instanceof HTMLImageElement&&(i=`${t.src.slice(0,200)}|${t.naturalWidth}x${t.naturalHeight}`),this.areUniformValuesEqual(this.uniformCache[e],i))return;this.uniformCache[e]=i;let r=this.uniformLocations[e];if(!r)return void console.warn(`Uniform location for ${e} not found`);if(t instanceof HTMLImageElement)this.setTextureUniform(e,t);else if(Array.isArray(t)){let i=null,o=null;if(void 0!==t[0]&&Array.isArray(t[0])){let r=t[0].length;if(!t.every(e=>e.length===r))return void console.warn(`All child arrays must be the same length for ${e}`);i=t.flat(),o=r}else o=(i=t).length;switch(o){case 2:this.gl.uniform2fv(r,i);break;case 3:this.gl.uniform3fv(r,i);break;case 4:this.gl.uniform4fv(r,i);break;case 9:this.gl.uniformMatrix3fv(r,!1,i);break;case 16:this.gl.uniformMatrix4fv(r,!1,i);break;default:console.warn(`Unsupported uniform array length: ${o}`)}}else"number"==typeof t?this.gl.uniform1f(r,t):"boolean"==typeof t?this.gl.uniform1i(r,+!!t):console.warn(`Unsupported uniform type for ${e}: ${typeof t}`)})};getCurrentFrame=()=>this.currentFrame;setFrame=e=>{this.currentFrame=e,this.lastRenderTime=performance.now(),this.render(performance.now())};setSpeed=(e=1)=>{this.speed=e,this.setCurrentSpeed(document.hidden?0:e)};setCurrentSpeed=e=>{this.currentSpeed=e,null===this.rafId&&0!==e&&(this.lastRenderTime=performance.now(),this.rafId=requestAnimationFrame(this.render)),null!==this.rafId&&0===e&&(cancelAnimationFrame(this.rafId),this.rafId=null)};setMaxPixelCount=(e=a)=>{this.maxPixelCount=e,this.handleResize()};setMinPixelRatio=(e=2)=>{this.minPixelRatio=e,this.handleResize()};setUniforms=e=>{this.setUniformValues(e),this.providedUniforms={...this.providedUniforms,...e},this.render(performance.now())};handleDocumentVisibilityChange=()=>{this.setCurrentSpeed(document.hidden?0:this.speed)};dispose=()=>{this.hasBeenDisposed=!0,null!==this.rafId&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.gl&&this.program&&(this.textures.forEach(e=>{this.gl.deleteTexture(e)}),this.textures.clear(),this.gl.deleteProgram(this.program),this.program=null,this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,null),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,null),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.getError()),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),visualViewport?.removeEventListener("resize",this.handleVisualViewportChange),document.removeEventListener("visibilitychange",this.handleDocumentVisibilityChange),this.uniformLocations={},this.canvasElement.remove(),delete this.parentElement.paperShaderMount}}function n(e,t,i){let r=e.createShader(t);return r?(e.shaderSource(r,i),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS))?r:(console.error("An error occurred compiling the shaders: "+e.getShaderInfoLog(r)),e.deleteShader(r),null):null}let l=`@layer paper-shaders {
  :where([data-paper-shader]) {
    isolation: isolate;
    position: relative;

    & canvas {
      contain: strict;
      display: block;
      position: absolute;
      inset: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      corner-shape: inherit;
    }
  }
}`;async function c(e){let t={},i=[];return Object.entries(e).forEach(([e,r])=>{if("string"==typeof r){if(!r){t[e]=function(){if("undefined"==typeof window)return void console.warn("Paper Shaders: can’t create an image on the server");let e=new Image;return e.src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",e}();return}if(!(e=>{try{if(e.startsWith("/"))return!0;return new URL(e),!0}catch{return!1}})(r))return void console.warn(`Uniform "${e}" has invalid URL "${r}". Skipping image loading.`);let o=new Promise((i,o)=>{let a=new Image;(e=>{try{if(e.startsWith("/"))return!1;return new URL(e,window.location.origin).origin!==window.location.origin}catch{return!1}})(r)&&(a.crossOrigin="anonymous"),a.onload=()=>{t[e]=a,i()},a.onerror=()=>{console.error(`Could not set uniforms. Failed to load image at ${r}`),o()},a.src=r});i.push(o)}else t[e]=r}),await Promise.all(i),t}let h=(0,r.forwardRef)(function({fragmentShader:e,uniforms:i,webGlContextAttributes:o,speed:a=0,frame:n=0,width:l,height:h,minPixelRatio:u,maxPixelCount:p,mipmaps:m,style:d,...f},x){var g;let v,_,[S,b]=(0,r.useState)(!1),U=(0,r.useRef)(null),y=(0,r.useRef)(null),R=(0,r.useRef)(o);(0,r.useEffect)(()=>((async()=>{let t=await c(i);U.current&&!y.current&&(y.current=new s(U.current,e,t,R.current,a,n,u,p,m),b(!0))})(),()=>{y.current?.dispose(),y.current=null}),[e]),(0,r.useEffect)(()=>{let e=!1;return(async()=>{let t=await c(i);e||y.current?.setUniforms(t)})(),()=>{e=!0}},[i,S]),(0,r.useEffect)(()=>{y.current?.setSpeed(a)},[a,S]),(0,r.useEffect)(()=>{y.current?.setMaxPixelCount(p)},[p,S]),(0,r.useEffect)(()=>{y.current?.setMinPixelRatio(u)},[u,S]),(0,r.useEffect)(()=>{y.current?.setFrame(n)},[n,S]);let z=(g=[U,x],v=r.useRef(void 0),_=r.useCallback(e=>{let t=g.map(t=>{if(null!=t){if("function"==typeof t){let i=t(e);return"function"==typeof i?i:()=>{t(null)}}return t.current=e,()=>{t.current=null}}});return()=>{t.forEach(e=>e?.())}},g),r.useMemo(()=>g.every(e=>null==e)?null:e=>{v.current&&(v.current(),v.current=void 0),null!=e&&(v.current=_(e))},g));return(0,t.jsx)("div",{ref:z,style:void 0!==l||void 0!==h?{width:"string"==typeof l&&!1===isNaN(+l)?+l:l,height:"string"==typeof h&&!1===isNaN(+h)?+h:h,...d}:d,...f})});function u(e){if(Array.isArray(e))return 4===e.length?e:3===e.length?[...e,1]:m;if("string"!=typeof e)return m;let t,i,r,o=1;if(e.startsWith("#")){var a;[t,i,r,o]=(3===(a=(a=e).replace(/^#/,"")).length&&(a=a.split("").map(e=>e+e).join("")),6===a.length&&(a+="ff"),[parseInt(a.slice(0,2),16)/255,parseInt(a.slice(2,4),16)/255,parseInt(a.slice(4,6),16)/255,parseInt(a.slice(6,8),16)/255])}else if(e.startsWith("rgb")){let a;[t,i,r,o]=(a=e.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)$/i))?[parseInt(a[1]??"0")/255,parseInt(a[2]??"0")/255,parseInt(a[3]??"0")/255,void 0===a[4]?1:parseFloat(a[4])]:[0,0,0,1]}else{let a;if(!e.startsWith("hsl"))return console.error("Unsupported color format",e),m;[t,i,r,o]=function(e){let t,i,r,[o,a,s,n]=e,l=o/360,c=a/100,h=s/100;if(0===a)t=i=r=h;else{let e=(e,t,i)=>(i<0&&(i+=1),i>1&&(i-=1),i<1/6)?e+(t-e)*6*i:i<.5?t:i<2/3?e+(t-e)*(2/3-i)*6:e,o=h<.5?h*(1+c):h+c-h*c,a=2*h-o;t=e(a,o,l+1/3),i=e(a,o,l),r=e(a,o,l-1/3)}return[t,i,r,n]}((a=e.match(/^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([0-9.]+))?\s*\)$/i))?[parseInt(a[1]??"0"),parseInt(a[2]??"0"),parseInt(a[3]??"0"),void 0===a[4]?1:parseFloat(a[4])]:[0,0,0,1])}return[p(t,0,1),p(i,0,1),p(r,0,1),p(o,0,1)]}h.displayName="ShaderMount";let p=(e,t,i)=>Math.min(Math.max(e,t),i),m=[0,0,0,1],d=`
#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846
`,f=`
  float hash11(float p) {
    p = fract(p * 0.3183099) + 0.1;
    p *= p + 19.19;
    return fract(p * p);
  }
`,x=`
  float hash21(vec2 p) {
    p = fract(p * vec2(0.3183099, 0.3678794)) + 0.1;
    p += dot(p, p + 19.19);
    return fract(p.x * p.y);
  }
`,g=`
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`,v=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;
uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

uniform float u_pxSize;
uniform vec4 u_colorBack;
uniform vec4 u_colorFront;
uniform float u_shape;
uniform float u_type;

out vec4 fragColor;

${g}
${d}
${f}
${x}

float getSimplexNoise(vec2 uv, float t) {
  float noise = .5 * snoise(uv - vec2(0., .3 * t));
  noise += .5 * snoise(2. * uv + vec2(0., .32 * t));

  return noise;
}

const int bayer2x2[4] = int[4](0, 2, 3, 1);
const int bayer4x4[16] = int[16](
0, 8, 2, 10,
12, 4, 14, 6,
3, 11, 1, 9,
15, 7, 13, 5
);

const int bayer8x8[64] = int[64](
0, 32, 8, 40, 2, 34, 10, 42,
48, 16, 56, 24, 50, 18, 58, 26,
12, 44, 4, 36, 14, 46, 6, 38,
60, 28, 52, 20, 62, 30, 54, 22,
3, 35, 11, 43, 1, 33, 9, 41,
51, 19, 59, 27, 49, 17, 57, 25,
15, 47, 7, 39, 13, 45, 5, 37,
63, 31, 55, 23, 61, 29, 53, 21
);

float getBayerValue(vec2 uv, int size) {
  ivec2 pos = ivec2(fract(uv / float(size)) * float(size));
  int index = pos.y * size + pos.x;

  if (size == 2) {
    return float(bayer2x2[index]) / 4.0;
  } else if (size == 4) {
    return float(bayer4x4[index]) / 16.0;
  } else if (size == 8) {
    return float(bayer8x8[index]) / 64.0;
  }
  return 0.0;
}


void main() {
  float t = .5 * u_time;

  float pxSize = u_pxSize * u_pixelRatio;
  vec2 pxSizeUV = gl_FragCoord.xy - .5 * u_resolution;
  pxSizeUV /= pxSize;
  vec2 canvasPixelizedUV = (floor(pxSizeUV) + .5) * pxSize;
  vec2 normalizedUV = canvasPixelizedUV / u_resolution;

  vec2 ditheringNoiseUV = canvasPixelizedUV;
  vec2 shapeUV = normalizedUV;

  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  float r = u_rotation * PI / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);

  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
  vec2 boxSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  
  if (u_shape > 3.5) {
    vec2 objectBoxSize = vec2(0.);
    // fit = none
    objectBoxSize.x = min(boxSize.x, boxSize.y);
    if (u_fit == 1.) { // fit = contain
      objectBoxSize.x = min(u_resolution.x, u_resolution.y);
    } else if (u_fit == 2.) { // fit = cover
      objectBoxSize.x = max(u_resolution.x, u_resolution.y);
    }
    objectBoxSize.y = objectBoxSize.x;
    vec2 objectWorldScale = u_resolution.xy / objectBoxSize;

    shapeUV *= objectWorldScale;
    shapeUV += boxOrigin * (objectWorldScale - 1.);
    shapeUV += vec2(-u_offsetX, u_offsetY);
    shapeUV /= u_scale;
    shapeUV = graphicRotation * shapeUV;
  } else {
    vec2 patternBoxSize = vec2(0.);
    // fit = none
    patternBoxSize.x = patternBoxRatio * min(boxSize.x / patternBoxRatio, boxSize.y);
    float patternWorldNoFitBoxWidth = patternBoxSize.x;
    if (u_fit == 1.) { // fit = contain
      patternBoxSize.x = patternBoxRatio * min(u_resolution.x / patternBoxRatio, u_resolution.y);
    } else if (u_fit == 2.) { // fit = cover
      patternBoxSize.x = patternBoxRatio * max(u_resolution.x / patternBoxRatio, u_resolution.y);
    }
    patternBoxSize.y = patternBoxSize.x / patternBoxRatio;
    vec2 patternWorldScale = u_resolution.xy / patternBoxSize;

    shapeUV += vec2(-u_offsetX, u_offsetY) / patternWorldScale;
    shapeUV += boxOrigin;
    shapeUV -= boxOrigin / patternWorldScale;
    shapeUV *= u_resolution.xy;
    shapeUV /= u_pixelRatio;
    if (u_fit > 0.) {
      shapeUV *= (patternWorldNoFitBoxWidth / patternBoxSize.x);
    }
    shapeUV /= u_scale;
    shapeUV = graphicRotation * shapeUV;
    shapeUV += boxOrigin / patternWorldScale;
    shapeUV -= boxOrigin;
    shapeUV += .5;
  }

  float shape = 0.;
  if (u_shape < 1.5) {
    // Simplex noise
    shapeUV *= .001;

    shape = 0.5 + 0.5 * getSimplexNoise(shapeUV, t);
    shape = smoothstep(0.3, 0.9, shape);

  } else if (u_shape < 2.5) {
    // Warp
    shapeUV *= .003;

    for (float i = 1.0; i < 6.0; i++) {
      shapeUV.x += 0.6 / i * cos(i * 2.5 * shapeUV.y + t);
      shapeUV.y += 0.6 / i * cos(i * 1.5 * shapeUV.x + t);
    }

    shape = .15 / max(0.001, abs(sin(t - shapeUV.y - shapeUV.x)));
    shape = smoothstep(0.02, 1., shape);

  } else if (u_shape < 3.5) {
    // Dots
    shapeUV *= .05;

    float stripeIdx = floor(2. * shapeUV.x / TWO_PI);
    float rand = hash11(stripeIdx * 10.);
    rand = sign(rand - .5) * pow(.1 + abs(rand), .4);
    shape = sin(shapeUV.x) * cos(shapeUV.y - 5. * rand * t);
    shape = pow(abs(shape), 6.);

  } else if (u_shape < 4.5) {
    // Sine wave
    shapeUV *= 4.;

    float wave = cos(.5 * shapeUV.x - 2. * t) * sin(1.5 * shapeUV.x + t) * (.75 + .25 * cos(3. * t));
    shape = 1. - smoothstep(-1., 1., shapeUV.y + wave);

  } else if (u_shape < 5.5) {
    // Ripple

    float dist = length(shapeUV);
    float waves = sin(pow(dist, 1.7) * 7. - 3. * t) * .5 + .5;
    shape = waves;

  } else if (u_shape < 6.5) {
    // Swirl

    float l = length(shapeUV);
    float angle = 6. * atan(shapeUV.y, shapeUV.x) + 4. * t;
    float twist = 1.2;
    float offset = 1. / pow(max(l, 1e-6), twist) + angle / TWO_PI;
    float mid = smoothstep(0., 1., pow(l, twist));
    shape = mix(0., fract(offset), mid);

  } else {
    // Sphere
    shapeUV *= 2.;

    float d = 1. - pow(length(shapeUV), 2.);
    vec3 pos = vec3(shapeUV, sqrt(max(0., d)));
    vec3 lightPos = normalize(vec3(cos(1.5 * t), .8, sin(1.25 * t)));
    shape = .5 + .5 * dot(lightPos, pos);
    shape *= step(0., d);
  }


  int type = int(floor(u_type));
  float dithering = 0.0;

  switch (type) {
    case 1: {
      dithering = step(hash21(ditheringNoiseUV), shape);
    } break;
    case 2:
    dithering = getBayerValue(pxSizeUV, 2);
    break;
    case 3:
    dithering = getBayerValue(pxSizeUV, 4);
    break;
    default :
    dithering = getBayerValue(pxSizeUV, 8);
    break;
  }

  dithering -= .5;
  float res = step(.5, shape + dithering);

  vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
  float fgOpacity = u_colorFront.a;
  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  float bgOpacity = u_colorBack.a;

  vec3 color = fgColor * res;
  float opacity = fgOpacity * res;

  color += bgColor * (1. - opacity);
  opacity += bgOpacity * (1. - opacity);

  fragColor = vec4(color, opacity);
}
`,_={simplex:1,warp:2,dots:3,wave:4,ripple:5,swirl:6,sphere:7},S={random:1,"2x2":2,"4x4":3,"8x8":4},b={fit:"none",scale:1,rotation:0,offsetX:0,offsetY:0,originX:.5,originY:.5,worldWidth:0,worldHeight:0},U={none:0,contain:1,cover:2},y={name:"Default",params:{...b,speed:1,frame:0,scale:.6,colorBack:"#000000",colorFront:"#00b2ff",shape:"sphere",type:"4x4",size:2}},R=(0,r.memo)(function({speed:e=y.params.speed,frame:i=y.params.frame,colorBack:r=y.params.colorBack,colorFront:o=y.params.colorFront,shape:a=y.params.shape,type:s=y.params.type,pxSize:n,size:l=void 0===n?y.params.size:n,fit:c=y.params.fit,scale:p=y.params.scale,rotation:m=y.params.rotation,originX:d=y.params.originX,originY:f=y.params.originY,offsetX:x=y.params.offsetX,offsetY:g=y.params.offsetY,worldWidth:b=y.params.worldWidth,worldHeight:R=y.params.worldHeight,...z}){let B={u_colorBack:u(r),u_colorFront:u(o),u_shape:_[a],u_type:S[s],u_pxSize:l,u_fit:U[c],u_scale:p,u_rotation:m,u_offsetX:x,u_offsetY:g,u_originX:d,u_originY:f,u_worldWidth:b,u_worldHeight:R};return(0,t.jsx)(h,{...z,speed:e,frame:i,fragmentShader:v,uniforms:B})});function z(){let e,o,a,s,n,l,c,h,u,p,m,d,f,x,g,v,_,S,b,U,y,z=(0,i.c)(32),[B,w]=(0,r.useState)(!0),A=`w-full md:w-1/2 p-8 font-mono relative z-10 ${B?"bg-black text-white":"bg-white text-black"}`;z[0]!==B?(e=()=>w(!B),z[0]=B,z[1]=e):e=z[1];let E=`absolute top-8 right-8 p-2 rounded-full transition-colors ${B?"hover:bg-white/10":"hover:bg-black/10"}`;z[2]!==B?(o=B?(0,t.jsxs)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,t.jsx)("circle",{cx:"12",cy:"12",r:"5"}),(0,t.jsx)("path",{d:"M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"})]}):(0,t.jsx)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,t.jsx)("path",{d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"})}),z[2]=B,z[3]=o):o=z[3],z[4]!==e||z[5]!==E||z[6]!==o?(a=(0,t.jsx)("button",{onClick:e,className:E,"aria-label":"Toggle theme",children:o}),z[4]=e,z[5]=E,z[6]=o,z[7]=a):a=z[7],z[8]===Symbol.for("react.memo_cache_sentinel")?(s=(0,t.jsx)("h1",{className:"text-lg font-normal mb-8",children:"VALMIK NAHATA"}),z[8]=s):s=z[8],z[9]===Symbol.for("react.memo_cache_sentinel")?(n=(0,t.jsxs)("div",{className:"mb-12",children:[s,(0,t.jsxs)("div",{className:"mb-8",children:[(0,t.jsx)("h2",{className:"text-lg font-normal",children:"VALMIK NAHATA"}),(0,t.jsx)("h3",{className:"text-lg font-normal",children:"DATA SCIENTIST & AI RESEARCHER"})]})]}),z[9]=n):n=z[9],z[10]===Symbol.for("react.memo_cache_sentinel")?(l=(0,t.jsx)("div",{className:"text-sm uppercase tracking-widest text-zinc-500 mb-2",children:"// OCCUPATIONS"}),z[10]=l):l=z[10],z[11]===Symbol.for("react.memo_cache_sentinel")?(c=(0,t.jsxs)("div",{className:"flex",children:[(0,t.jsx)("span",{className:"w-20",children:"UC San Diego"}),(0,t.jsx)("span",{className:"mx-2",children:"Data Science"}),(0,t.jsx)("span",{className:"mx-4",children:"2024 → ...."})]}),z[11]=c):c=z[11],z[12]===Symbol.for("react.memo_cache_sentinel")?(h=(0,t.jsxs)("div",{className:"flex",children:[(0,t.jsx)("span",{className:"w-20",children:"Harvard & MGH"}),(0,t.jsx)("span",{className:"mx-2",children:"Undergraduate Researcher"}),(0,t.jsx)("span",{className:"mx-4",children:"2025 → ...."})]}),z[12]=h):h=z[12],z[13]===Symbol.for("react.memo_cache_sentinel")?(u=(0,t.jsxs)("div",{className:"flex",children:[(0,t.jsx)("span",{className:"w-20",children:"Dartmouth Hitchcock"}),(0,t.jsx)("span",{className:"mx-2",children:"Intern"}),(0,t.jsx)("span",{className:"mx-4",children:"Recent"})]}),z[13]=u):u=z[13],z[14]===Symbol.for("react.memo_cache_sentinel")?(p=(0,t.jsxs)("div",{className:"mb-12 space-y-1",children:[l,c,h,u,(0,t.jsxs)("div",{className:"flex",children:[(0,t.jsx)("span",{className:"w-20",children:"Various"}),(0,t.jsx)("span",{className:"mx-2",children:"Hackathon Winner"}),(0,t.jsx)("span",{className:"mx-4",children:"Ongoing"})]})]}),z[14]=p):p=z[14],z[15]===Symbol.for("react.memo_cache_sentinel")?(m=(0,t.jsxs)("div",{className:"mb-12",children:[(0,t.jsx)("div",{className:"text-sm uppercase tracking-widest text-zinc-500 mb-2",children:"// INTERESTS"}),(0,t.jsx)("div",{className:"text-sm leading-relaxed",children:"SLMs/LLMs, multimodal models, AI agents, reasoning (e.g. chain-of-thought), AI alignment and ethics, efficient training/inference, AI applications in science (e.g., drug discovery, protein folding)."})]}),z[15]=m):m=z[15],z[16]===Symbol.for("react.memo_cache_sentinel")?(d=(0,t.jsx)("div",{className:"text-sm uppercase tracking-widest text-zinc-500 mb-2",children:"// PROJECTS"}),z[16]=d):d=z[16],z[17]===Symbol.for("react.memo_cache_sentinel")?(f=(0,t.jsx)("strong",{children:"Active:"}),z[17]=f):f=z[17],z[18]===Symbol.for("react.memo_cache_sentinel")?(x=(0,t.jsxs)("div",{className:"mb-12",children:[d,(0,t.jsxs)("div",{className:"text-sm leading-relaxed space-y-1",children:[f," Reasoning CoT improvements for LLMs in clinical usage (Harvard & MGH thesis), Labry (democratizing research opportunities).",(0,t.jsx)("br",{}),(0,t.jsx)("strong",{children:"Past:"})," GeoCheater, 3D Carbon Timeline, Signly, IndustryBench, Blume, Economic Impacts of AI, Bucks Fan Models, POS QR Automation, Pathology Reports RAG, Crab Pulsar Analysis, Triangle Counting, Steam Scripts, Tree-Plenish, IoT Weather, Node2Node."]})]}),z[18]=x):x=z[18],z[19]===Symbol.for("react.memo_cache_sentinel")?(g=(0,t.jsxs)("div",{className:"mb-12",children:[(0,t.jsx)("div",{className:"text-sm uppercase tracking-widest text-zinc-500 mb-2",children:"// BIO"}),(0,t.jsx)("div",{className:"text-sm leading-relaxed",children:"Jersey native, Californian resident, (Massachusetts employed), New Yorker at heart. Childhood in puzzles and violin. Interested in AI and pattern-matching."})]}),z[19]=g):g=z[19],z[20]===Symbol.for("react.memo_cache_sentinel")?(v=(0,t.jsxs)("div",{className:"mb-12",children:[(0,t.jsx)("div",{className:"text-sm uppercase tracking-widest text-zinc-500 mb-2",children:"// COLLABORATION"}),(0,t.jsx)("div",{className:"text-sm leading-relaxed",children:"Open to research collaborations. Send short message with context, constraints, outcome."})]}),z[20]=v):v=z[20],z[21]===Symbol.for("react.memo_cache_sentinel")?(_=(0,t.jsx)("div",{className:"absolute bottom-8 left-8",children:(0,t.jsxs)("div",{className:"flex space-x-4 text-lg font-mono",children:[(0,t.jsx)("a",{href:"https://www.linkedin.com/in/valmiknahata",target:"_blank",rel:"noopener noreferrer",className:"hover:underline",children:"LinkedIn"}),(0,t.jsx)("a",{href:"mailto:vnahata@ucsd.edu",className:"hover:underline",children:"Email"}),(0,t.jsx)("a",{href:"https://scholar.google.com/citations?user=nv1ym54AAAAJ&hl=en",target:"_blank",rel:"noopener noreferrer",className:"hover:underline",children:"Scholar"})]})}),z[21]=_):_=z[21],z[22]!==A||z[23]!==a?(S=(0,t.jsxs)("div",{className:A,children:[a,n,p,m,x,g,v,_]}),z[22]=A,z[23]=a,z[24]=S):S=z[24],z[25]===Symbol.for("react.memo_cache_sentinel")?(b={height:"100%",width:"100%"},z[25]=b):b=z[25];let V=B?"hsl(0, 0%, 0%)":"hsl(0, 0%, 95%)",T=B?"hsl(320, 100%, 70%)":"hsl(220, 100%, 70%)";return z[26]!==V||z[27]!==T?(U=(0,t.jsx)("div",{className:"w-full md:w-1/2 relative",children:(0,t.jsx)(R,{style:b,colorBack:V,colorFront:T,shape:"simplex",type:"4x4",pxSize:3,offsetX:0,offsetY:0,scale:.8,rotation:0,speed:.1})}),z[26]=V,z[27]=T,z[28]=U):U=z[28],z[29]!==S||z[30]!==U?(y=(0,t.jsxs)("div",{className:"relative min-h-screen overflow-hidden flex flex-col md:flex-row",children:[S,U]}),z[29]=S,z[30]=U,z[31]=y):y=z[31],y}e.s(["default",()=>z],20866)}]);
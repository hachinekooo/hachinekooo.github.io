import{Z as P}from"./graph-e9862b7e-Ceux2qbv.js";import{ag as F,L as g,J as v,T as _,n as R,F as q,M as E,v as $,z as A,e as z,b as j,d as V,ah as G,ak as Z,i as J}from"./mermaid.esm.min-CmTilOTN.js";import{b as U}from"./index-5e3196ce-7vxNjql5.js";import{e as W}from"./channel-93f63185-DB2nCWHz.js";function X(e){return new G([document.querySelectorAll(e)],[document.documentElement])}function de(e,o){return!!e.children(o).length}function pe(e){return B(e.v)+":"+B(e.w)+":"+B(e.name)}var H=/:/g;function B(e){return e?String(e).replace(H,"\\:"):""}function K(e,o){o&&e.attr("style",o)}function be(e,o,c){o&&e.attr("class",o).attr("class",c+" "+e.attr("class"))}function we(e,o){var c=o.graph();if(Z(c)){var a=c.transition;if(J(a))return a(e)}return e}function Q(e,o){var c=e.append("foreignObject").attr("width","100000"),a=c.append("xhtml:div");a.attr("xmlns","http://www.w3.org/1999/xhtml");var i=o.label;switch(typeof i){case"function":a.insert(i);break;case"object":a.insert(function(){return i});break;default:a.html(i)}K(a,o.labelStyle),a.style("display","inline-block"),a.style("white-space","nowrap");var p=a.node().getBoundingClientRect();return c.attr("width",p.width).attr("height",p.height),c}const I={},Y=function(e){const o=Object.keys(e);for(const c of o)I[c]=e[c]},O=async function(e,o,c,a,i,p){const u=a.select(`[id="${c}"]`),n=Object.keys(e);for(const b of n){const r=e[b];let y="default";r.classes.length>0&&(y=r.classes.join(" ")),y=y+" flowchart-label";const f=E(r.styles);let t=r.text!==void 0?r.text:r.id,s;if(g.info("vertex",r,r.labelType),r.labelType==="markdown")g.info("vertex",r,r.labelType);else if(V(v().flowchart.htmlLabels))s=Q(u,{label:t}).node(),s.parentNode.removeChild(s);else{const k=i.createElementNS("http://www.w3.org/2000/svg","text");k.setAttribute("style",f.labelStyle.replace("color:","fill:"));const T=t.split(j.lineBreakRegex);for(const C of T){const d=i.createElementNS("http://www.w3.org/2000/svg","tspan");d.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),d.setAttribute("dy","1em"),d.setAttribute("x","1"),d.textContent=C,k.appendChild(d)}s=k}let w=0,l="";switch(r.type){case"round":w=5,l="rect";break;case"square":l="rect";break;case"diamond":l="question";break;case"hexagon":l="hexagon";break;case"odd":l="rect_left_inv_arrow";break;case"lean_right":l="lean_right";break;case"lean_left":l="lean_left";break;case"trapezoid":l="trapezoid";break;case"inv_trapezoid":l="inv_trapezoid";break;case"odd_right":l="rect_left_inv_arrow";break;case"circle":l="circle";break;case"ellipse":l="ellipse";break;case"stadium":l="stadium";break;case"subroutine":l="subroutine";break;case"cylinder":l="cylinder";break;case"group":l="rect";break;case"doublecircle":l="doublecircle";break;default:l="rect"}const S=await z(t,v());o.setNode(r.id,{labelStyle:f.labelStyle,shape:l,labelText:S,labelType:r.labelType,rx:w,ry:w,class:y,style:f.style,id:r.id,link:r.link,linkTarget:r.linkTarget,tooltip:p.db.getTooltip(r.id)||"",domId:p.db.lookUpDomId(r.id),haveCallback:r.haveCallback,width:r.type==="group"?500:void 0,dir:r.dir,type:r.type,props:r.props,padding:v().flowchart.padding}),g.info("setNode",{labelStyle:f.labelStyle,labelType:r.labelType,shape:l,labelText:S,rx:w,ry:w,class:y,style:f.style,id:r.id,domId:p.db.lookUpDomId(r.id),width:r.type==="group"?500:void 0,type:r.type,dir:r.dir,props:r.props,padding:v().flowchart.padding})}},M=async function(e,o,c){g.info("abc78 edges = ",e);let a=0,i={},p,u;if(e.defaultStyle!==void 0){const n=E(e.defaultStyle);p=n.style,u=n.labelStyle}for(const n of e){a++;const b="L-"+n.start+"-"+n.end;i[b]===void 0?(i[b]=0,g.info("abc78 new entry",b,i[b])):(i[b]++,g.info("abc78 new entry",b,i[b]));let r=b+"-"+i[b];g.info("abc78 new link id to be used is",b,r,i[b]);const y="LS-"+n.start,f="LE-"+n.end,t={style:"",labelStyle:""};switch(t.minlen=n.length||1,n.type==="arrow_open"?t.arrowhead="none":t.arrowhead="normal",t.arrowTypeStart="arrow_open",t.arrowTypeEnd="arrow_open",n.type){case"double_arrow_cross":t.arrowTypeStart="arrow_cross";case"arrow_cross":t.arrowTypeEnd="arrow_cross";break;case"double_arrow_point":t.arrowTypeStart="arrow_point";case"arrow_point":t.arrowTypeEnd="arrow_point";break;case"double_arrow_circle":t.arrowTypeStart="arrow_circle";case"arrow_circle":t.arrowTypeEnd="arrow_circle";break}let s="",w="";switch(n.stroke){case"normal":s="fill:none;",p!==void 0&&(s=p),u!==void 0&&(w=u),t.thickness="normal",t.pattern="solid";break;case"dotted":t.thickness="normal",t.pattern="dotted",t.style="fill:none;stroke-width:2px;stroke-dasharray:3;";break;case"thick":t.thickness="thick",t.pattern="solid",t.style="stroke-width: 3.5px;fill:none;";break;case"invisible":t.thickness="invisible",t.pattern="solid",t.style="stroke-width: 0;fill:none;";break}if(n.style!==void 0){const l=E(n.style);s=l.style,w=l.labelStyle}t.style=t.style+=s,t.labelStyle=t.labelStyle+=w,n.interpolate!==void 0?t.curve=$(n.interpolate,A):e.defaultInterpolate!==void 0?t.curve=$(e.defaultInterpolate,A):t.curve=$(I.curve,A),n.text===void 0?n.style!==void 0&&(t.arrowheadStyle="fill: #333"):(t.arrowheadStyle="fill: #333",t.labelpos="c"),t.labelType=n.labelType,t.label=await z(n.text.replace(j.lineBreakRegex,`
`),v()),n.style===void 0&&(t.style=t.style||"stroke: #333; stroke-width: 1.5px;fill:none;"),t.labelStyle=t.labelStyle.replace("color:","fill:"),t.id=r,t.classes="flowchart-link "+y+" "+f,o.setEdge(n.start,n.end,t,a)}},ee=function(e,o){return o.db.getClasses()},te=async function(e,o,c,a){g.info("Drawing flowchart");let i=a.db.getDirection();i===void 0&&(i="TD");const{securityLevel:p,flowchart:u}=v(),n=u.nodeSpacing||50,b=u.rankSpacing||50;let r;p==="sandbox"&&(r=_("#i"+o));const y=p==="sandbox"?_(r.nodes()[0].contentDocument.body):_("body"),f=p==="sandbox"?r.nodes()[0].contentDocument:document,t=new P({multigraph:!0,compound:!0}).setGraph({rankdir:i,nodesep:n,ranksep:b,marginx:0,marginy:0}).setDefaultEdgeLabel(function(){return{}});let s;const w=a.db.getSubGraphs();g.info("Subgraphs - ",w);for(let d=w.length-1;d>=0;d--)s=w[d],g.info("Subgraph - ",s),a.db.addVertex(s.id,{text:s.title,type:s.labelType},"group",void 0,s.classes,s.dir);const l=a.db.getVertices(),S=a.db.getEdges();g.info("Edges",S);let k=0;for(k=w.length-1;k>=0;k--){s=w[k],X("cluster").append("text");for(let d=0;d<s.nodes.length;d++)g.info("Setting up subgraphs",s.nodes[d],s.id),t.setParent(s.nodes[d],s.id)}await O(l,t,o,y,f,a),await M(S,t);const T=y.select(`[id="${o}"]`),C=y.select("#"+o+" g");if(await U(C,t,["point","circle","cross"],"flowchart",o),R.insertTitle(T,"flowchartTitleText",u.titleTopMargin,a.db.getDiagramTitle()),q(t,T,u.diagramPadding,u.useMaxWidth),a.db.indexNodes("subGraph"+k),!u.htmlLabels){const d=f.querySelectorAll('[id="'+o+'"] .edgeLabel .label');for(const x of d){const m=x.getBBox(),h=f.createElementNS("http://www.w3.org/2000/svg","rect");h.setAttribute("rx",0),h.setAttribute("ry",0),h.setAttribute("width",m.width),h.setAttribute("height",m.height),x.insertBefore(h,x.firstChild)}}Object.keys(l).forEach(function(d){const x=l[d];if(x.link){const m=_("#"+o+' [id="'+d+'"]');if(m){const h=f.createElementNS("http://www.w3.org/2000/svg","a");h.setAttributeNS("http://www.w3.org/2000/svg","class",x.classes.join(" ")),h.setAttributeNS("http://www.w3.org/2000/svg","href",x.link),h.setAttributeNS("http://www.w3.org/2000/svg","rel","noopener"),p==="sandbox"?h.setAttributeNS("http://www.w3.org/2000/svg","target","_top"):x.linkTarget&&h.setAttributeNS("http://www.w3.org/2000/svg","target",x.linkTarget);const L=m.insert(function(){return h},":first-child"),N=m.select(".label-container");N&&L.append(function(){return N.node()});const D=m.select(".label");D&&L.append(function(){return D.node()})}}})},ue={setConf:Y,addVertices:O,addEdges:M,getClasses:ee,draw:te},re=(e,o)=>{const c=W,a=c(e,"r"),i=c(e,"g"),p=c(e,"b");return F(a,i,p,o)},oe=e=>`.label {
    font-family: ${e.fontFamily};
    color: ${e.nodeTextColor||e.textColor};
  }
  .cluster-label text {
    fill: ${e.titleColor};
  }
  .cluster-label span,p {
    color: ${e.titleColor};
  }

  .label text,span,p {
    fill: ${e.nodeTextColor||e.textColor};
    color: ${e.nodeTextColor||e.textColor};
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${e.mainBkg};
    stroke: ${e.nodeBorder};
    stroke-width: 1px;
  }
  .flowchart-label text {
    text-anchor: middle;
  }
  // .flowchart-label .text-outer-tspan {
  //   text-anchor: middle;
  // }
  // .flowchart-label .text-inner-tspan {
  //   text-anchor: start;
  // }

  .node .katex path {
    fill: #000;
    stroke: #000;
    stroke-width: 1px;
  }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${e.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${e.lineColor};
    stroke-width: 2.0px;
  }

  .flowchart-link {
    stroke: ${e.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${e.edgeLabelBackground};
    rect {
      opacity: 0.5;
      background-color: ${e.edgeLabelBackground};
      fill: ${e.edgeLabelBackground};
    }
    text-align: center;
  }

  /* For html labels only */
  .labelBkg {
    background-color: ${re(e.edgeLabelBackground,.5)};
    // background-color: 
  }

  .cluster rect {
    fill: ${e.clusterBkg};
    stroke: ${e.clusterBorder};
    stroke-width: 1px;
  }

  .cluster text {
    fill: ${e.titleColor};
  }

  .cluster span,p {
    color: ${e.titleColor};
  }
  /* .cluster div {
    color: ${e.titleColor};
  } */

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${e.fontFamily};
    font-size: 12px;
    background: ${e.tertiaryColor};
    border: 1px solid ${e.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .flowchartTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${e.textColor};
  }
`,fe=oe;export{X as Z,be as b,K as e,de as f,fe as h,pe as p,Q as t,we as u,ue as w};

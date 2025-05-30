import{f as Ut,N as zt,I as Mt,D as Ht,O as Jt,$ as Xt,J as F,b as lt,L as $,g as Kt,b3 as Vt}from"./mermaid.esm.min-CmTilOTN.js";var mt=function(){var t=function(T,i,r,o){for(r=r||{},o=T.length;o--;r[T[o]]=i);return r},s=[1,2],n=[1,3],c=[1,4],p=[2,4],d=[1,9],y=[1,11],b=[1,15],u=[1,16],_=[1,17],G=[1,18],O=[1,30],j=[1,19],Y=[1,20],U=[1,21],z=[1,22],M=[1,23],H=[1,25],J=[1,26],X=[1,27],K=[1,28],V=[1,29],W=[1,32],q=[1,33],Q=[1,34],Z=[1,35],R=[1,31],l=[1,4,5,15,16,18,20,21,23,24,25,26,27,28,32,34,36,37,41,44,45,46,47,50],tt=[1,4,5,13,14,15,16,18,20,21,23,24,25,26,27,28,32,34,36,37,41,44,45,46,47,50],xt=[4,5,15,16,18,20,21,23,24,25,26,27,28,32,34,36,37,41,44,45,46,47,50],ct={trace:function(){},yy:{},symbols_:{error:2,start:3,SPACE:4,NL:5,SD:6,document:7,line:8,statement:9,classDefStatement:10,cssClassStatement:11,idStatement:12,DESCR:13,"-->":14,HIDE_EMPTY:15,scale:16,WIDTH:17,COMPOSIT_STATE:18,STRUCT_START:19,STRUCT_STOP:20,STATE_DESCR:21,AS:22,ID:23,FORK:24,JOIN:25,CHOICE:26,CONCURRENT:27,note:28,notePosition:29,NOTE_TEXT:30,direction:31,acc_title:32,acc_title_value:33,acc_descr:34,acc_descr_value:35,acc_descr_multiline_value:36,classDef:37,CLASSDEF_ID:38,CLASSDEF_STYLEOPTS:39,DEFAULT:40,class:41,CLASSENTITY_IDS:42,STYLECLASS:43,direction_tb:44,direction_bt:45,direction_rl:46,direction_lr:47,eol:48,";":49,EDGE_STATE:50,STYLE_SEPARATOR:51,left_of:52,right_of:53,$accept:0,$end:1},terminals_:{2:"error",4:"SPACE",5:"NL",6:"SD",13:"DESCR",14:"-->",15:"HIDE_EMPTY",16:"scale",17:"WIDTH",18:"COMPOSIT_STATE",19:"STRUCT_START",20:"STRUCT_STOP",21:"STATE_DESCR",22:"AS",23:"ID",24:"FORK",25:"JOIN",26:"CHOICE",27:"CONCURRENT",28:"note",30:"NOTE_TEXT",32:"acc_title",33:"acc_title_value",34:"acc_descr",35:"acc_descr_value",36:"acc_descr_multiline_value",37:"classDef",38:"CLASSDEF_ID",39:"CLASSDEF_STYLEOPTS",40:"DEFAULT",41:"class",42:"CLASSENTITY_IDS",43:"STYLECLASS",44:"direction_tb",45:"direction_bt",46:"direction_rl",47:"direction_lr",49:";",50:"EDGE_STATE",51:"STYLE_SEPARATOR",52:"left_of",53:"right_of"},productions_:[0,[3,2],[3,2],[3,2],[7,0],[7,2],[8,2],[8,1],[8,1],[9,1],[9,1],[9,1],[9,2],[9,3],[9,4],[9,1],[9,2],[9,1],[9,4],[9,3],[9,6],[9,1],[9,1],[9,1],[9,1],[9,4],[9,4],[9,1],[9,2],[9,2],[9,1],[10,3],[10,3],[11,3],[31,1],[31,1],[31,1],[31,1],[48,1],[48,1],[12,1],[12,1],[12,3],[12,3],[29,1],[29,1]],performAction:function(T,i,r,o,h,e,g){var a=e.length-1;switch(h){case 3:return o.setRootDoc(e[a]),e[a];case 4:this.$=[];break;case 5:e[a]!="nl"&&(e[a-1].push(e[a]),this.$=e[a-1]);break;case 6:case 7:this.$=e[a];break;case 8:this.$="nl";break;case 11:this.$=e[a];break;case 12:const N=e[a-1];N.description=o.trimColon(e[a]),this.$=N;break;case 13:this.$={stmt:"relation",state1:e[a-2],state2:e[a]};break;case 14:const ut=o.trimColon(e[a]);this.$={stmt:"relation",state1:e[a-3],state2:e[a-1],description:ut};break;case 18:this.$={stmt:"state",id:e[a-3],type:"default",description:"",doc:e[a-1]};break;case 19:var C=e[a],v=e[a-2].trim();if(e[a].match(":")){var et=e[a].split(":");C=et[0],v=[v,et[1]]}this.$={stmt:"state",id:C,type:"default",description:v};break;case 20:this.$={stmt:"state",id:e[a-3],type:"default",description:e[a-5],doc:e[a-1]};break;case 21:this.$={stmt:"state",id:e[a],type:"fork"};break;case 22:this.$={stmt:"state",id:e[a],type:"join"};break;case 23:this.$={stmt:"state",id:e[a],type:"choice"};break;case 24:this.$={stmt:"state",id:o.getDividerId(),type:"divider"};break;case 25:this.$={stmt:"state",id:e[a-1].trim(),note:{position:e[a-2].trim(),text:e[a].trim()}};break;case 28:this.$=e[a].trim(),o.setAccTitle(this.$);break;case 29:case 30:this.$=e[a].trim(),o.setAccDescription(this.$);break;case 31:case 32:this.$={stmt:"classDef",id:e[a-1].trim(),classes:e[a].trim()};break;case 33:this.$={stmt:"applyClass",id:e[a-1].trim(),styleClass:e[a].trim()};break;case 34:o.setDirection("TB"),this.$={stmt:"dir",value:"TB"};break;case 35:o.setDirection("BT"),this.$={stmt:"dir",value:"BT"};break;case 36:o.setDirection("RL"),this.$={stmt:"dir",value:"RL"};break;case 37:o.setDirection("LR"),this.$={stmt:"dir",value:"LR"};break;case 40:case 41:this.$={stmt:"state",id:e[a].trim(),type:"default",description:""};break;case 42:this.$={stmt:"state",id:e[a-2].trim(),classes:[e[a].trim()],type:"default",description:""};break;case 43:this.$={stmt:"state",id:e[a-2].trim(),classes:[e[a].trim()],type:"default",description:""};break}},table:[{3:1,4:s,5:n,6:c},{1:[3]},{3:5,4:s,5:n,6:c},{3:6,4:s,5:n,6:c},t([1,4,5,15,16,18,21,23,24,25,26,27,28,32,34,36,37,41,44,45,46,47,50],p,{7:7}),{1:[2,1]},{1:[2,2]},{1:[2,3],4:d,5:y,8:8,9:10,10:12,11:13,12:14,15:b,16:u,18:_,21:G,23:O,24:j,25:Y,26:U,27:z,28:M,31:24,32:H,34:J,36:X,37:K,41:V,44:W,45:q,46:Q,47:Z,50:R},t(l,[2,5]),{9:36,10:12,11:13,12:14,15:b,16:u,18:_,21:G,23:O,24:j,25:Y,26:U,27:z,28:M,31:24,32:H,34:J,36:X,37:K,41:V,44:W,45:q,46:Q,47:Z,50:R},t(l,[2,7]),t(l,[2,8]),t(l,[2,9]),t(l,[2,10]),t(l,[2,11],{13:[1,37],14:[1,38]}),t(l,[2,15]),{17:[1,39]},t(l,[2,17],{19:[1,40]}),{22:[1,41]},t(l,[2,21]),t(l,[2,22]),t(l,[2,23]),t(l,[2,24]),{29:42,30:[1,43],52:[1,44],53:[1,45]},t(l,[2,27]),{33:[1,46]},{35:[1,47]},t(l,[2,30]),{38:[1,48],40:[1,49]},{42:[1,50]},t(tt,[2,40],{51:[1,51]}),t(tt,[2,41],{51:[1,52]}),t(l,[2,34]),t(l,[2,35]),t(l,[2,36]),t(l,[2,37]),t(l,[2,6]),t(l,[2,12]),{12:53,23:O,50:R},t(l,[2,16]),t(xt,p,{7:54}),{23:[1,55]},{23:[1,56]},{22:[1,57]},{23:[2,44]},{23:[2,45]},t(l,[2,28]),t(l,[2,29]),{39:[1,58]},{39:[1,59]},{43:[1,60]},{23:[1,61]},{23:[1,62]},t(l,[2,13],{13:[1,63]}),{4:d,5:y,8:8,9:10,10:12,11:13,12:14,15:b,16:u,18:_,20:[1,64],21:G,23:O,24:j,25:Y,26:U,27:z,28:M,31:24,32:H,34:J,36:X,37:K,41:V,44:W,45:q,46:Q,47:Z,50:R},t(l,[2,19],{19:[1,65]}),{30:[1,66]},{23:[1,67]},t(l,[2,31]),t(l,[2,32]),t(l,[2,33]),t(tt,[2,42]),t(tt,[2,43]),t(l,[2,14]),t(l,[2,18]),t(xt,p,{7:68}),t(l,[2,25]),t(l,[2,26]),{4:d,5:y,8:8,9:10,10:12,11:13,12:14,15:b,16:u,18:_,20:[1,69],21:G,23:O,24:j,25:Y,26:U,27:z,28:M,31:24,32:H,34:J,36:X,37:K,41:V,44:W,45:q,46:Q,47:Z,50:R},t(l,[2,20])],defaultActions:{5:[2,1],6:[2,2],44:[2,44],45:[2,45]},parseError:function(T,i){if(i.recoverable)this.trace(T);else{var r=new Error(T);throw r.hash=i,r}},parse:function(T){var i=this,r=[0],o=[],h=[null],e=[],g=this.table,a="",C=0,v=0,et=2,N=1,ut=e.slice.call(arguments,1),f=Object.create(this.lexer),D={yy:{}};for(var dt in this.yy)Object.prototype.hasOwnProperty.call(this.yy,dt)&&(D.yy[dt]=this.yy[dt]);f.setInput(T,D.yy),D.yy.lexer=f,D.yy.parser=this,typeof f.yylloc>"u"&&(f.yylloc={});var pt=f.yylloc;e.push(pt);var jt=f.options&&f.options.ranges;typeof D.yy.parseError=="function"?this.parseError=D.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function Yt(){var x;return x=o.pop()||f.lex()||N,typeof x!="number"&&(x instanceof Array&&(o=x,x=o.pop()),x=i.symbols_[x]||x),x}for(var S,A,k,yt,I={},st,E,$t,it;;){if(A=r[r.length-1],this.defaultActions[A]?k=this.defaultActions[A]:((S===null||typeof S>"u")&&(S=Yt()),k=g[A]&&g[A][S]),typeof k>"u"||!k.length||!k[0]){var ft="";it=[];for(st in g[A])this.terminals_[st]&&st>et&&it.push("'"+this.terminals_[st]+"'");f.showPosition?ft="Parse error on line "+(C+1)+`:
`+f.showPosition()+`
Expecting `+it.join(", ")+", got '"+(this.terminals_[S]||S)+"'":ft="Parse error on line "+(C+1)+": Unexpected "+(S==N?"end of input":"'"+(this.terminals_[S]||S)+"'"),this.parseError(ft,{text:f.match,token:this.terminals_[S]||S,line:f.yylineno,loc:pt,expected:it})}if(k[0]instanceof Array&&k.length>1)throw new Error("Parse Error: multiple actions possible at state: "+A+", token: "+S);switch(k[0]){case 1:r.push(S),h.push(f.yytext),e.push(f.yylloc),r.push(k[1]),S=null,v=f.yyleng,a=f.yytext,C=f.yylineno,pt=f.yylloc;break;case 2:if(E=this.productions_[k[1]][1],I.$=h[h.length-E],I._$={first_line:e[e.length-(E||1)].first_line,last_line:e[e.length-1].last_line,first_column:e[e.length-(E||1)].first_column,last_column:e[e.length-1].last_column},jt&&(I._$.range=[e[e.length-(E||1)].range[0],e[e.length-1].range[1]]),yt=this.performAction.apply(I,[a,v,C,D.yy,k[1],h,e].concat(ut)),typeof yt<"u")return yt;E&&(r=r.slice(0,-1*E*2),h=h.slice(0,-1*E),e=e.slice(0,-1*E)),r.push(this.productions_[k[1]][0]),h.push(I.$),e.push(I._$),$t=g[r[r.length-2]][r[r.length-1]],r.push($t);break;case 3:return!0}}return!0}},Gt=function(){var T={EOF:1,parseError:function(i,r){if(this.yy.parser)this.yy.parser.parseError(i,r);else throw new Error(i)},setInput:function(i,r){return this.yy=r||this.yy||{},this._input=i,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var i=this._input[0];this.yytext+=i,this.yyleng++,this.offset++,this.match+=i,this.matched+=i;var r=i.match(/(?:\r\n?|\n).*/g);return r?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),i},unput:function(i){var r=i.length,o=i.split(/(?:\r\n?|\n)/g);this._input=i+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-r),this.offset-=r;var h=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),o.length-1&&(this.yylineno-=o.length-1);var e=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:o?(o.length===h.length?this.yylloc.first_column:0)+h[h.length-o.length].length-o[0].length:this.yylloc.first_column-r},this.options.ranges&&(this.yylloc.range=[e[0],e[0]+this.yyleng-r]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(i){this.unput(this.match.slice(i))},pastInput:function(){var i=this.matched.substr(0,this.matched.length-this.match.length);return(i.length>20?"...":"")+i.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var i=this.match;return i.length<20&&(i+=this._input.substr(0,20-i.length)),(i.substr(0,20)+(i.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var i=this.pastInput(),r=new Array(i.length+1).join("-");return i+this.upcomingInput()+`
`+r+"^"},test_match:function(i,r){var o,h,e;if(this.options.backtrack_lexer&&(e={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(e.yylloc.range=this.yylloc.range.slice(0))),h=i[0].match(/(?:\r\n?|\n).*/g),h&&(this.yylineno+=h.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:h?h[h.length-1].length-h[h.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+i[0].length},this.yytext+=i[0],this.match+=i[0],this.matches=i,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(i[0].length),this.matched+=i[0],o=this.performAction.call(this,this.yy,this,r,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),o)return o;if(this._backtrack){for(var g in e)this[g]=e[g];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var i,r,o,h;this._more||(this.yytext="",this.match="");for(var e=this._currentRules(),g=0;g<e.length;g++)if(o=this._input.match(this.rules[e[g]]),o&&(!r||o[0].length>r[0].length)){if(r=o,h=g,this.options.backtrack_lexer){if(i=this.test_match(o,e[g]),i!==!1)return i;if(this._backtrack){r=!1;continue}else return!1}else if(!this.options.flex)break}return r?(i=this.test_match(r,e[h]),i!==!1?i:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var i=this.next();return i||this.lex()},begin:function(i){this.conditionStack.push(i)},popState:function(){var i=this.conditionStack.length-1;return i>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(i){return i=this.conditionStack.length-1-Math.abs(i||0),i>=0?this.conditionStack[i]:"INITIAL"},pushState:function(i){this.begin(i)},stateStackSize:function(){return this.conditionStack.length},options:{"case-insensitive":!0},performAction:function(i,r,o,h){switch(o){case 0:return 40;case 1:return 44;case 2:return 45;case 3:return 46;case 4:return 47;case 5:break;case 6:break;case 7:return 5;case 8:break;case 9:break;case 10:break;case 11:break;case 12:return this.pushState("SCALE"),16;case 13:return 17;case 14:this.popState();break;case 15:return this.begin("acc_title"),32;case 16:return this.popState(),"acc_title_value";case 17:return this.begin("acc_descr"),34;case 18:return this.popState(),"acc_descr_value";case 19:this.begin("acc_descr_multiline");break;case 20:this.popState();break;case 21:return"acc_descr_multiline_value";case 22:return this.pushState("CLASSDEF"),37;case 23:return this.popState(),this.pushState("CLASSDEFID"),"DEFAULT_CLASSDEF_ID";case 24:return this.popState(),this.pushState("CLASSDEFID"),38;case 25:return this.popState(),39;case 26:return this.pushState("CLASS"),41;case 27:return this.popState(),this.pushState("CLASS_STYLE"),42;case 28:return this.popState(),43;case 29:return this.pushState("SCALE"),16;case 30:return 17;case 31:this.popState();break;case 32:this.pushState("STATE");break;case 33:return this.popState(),r.yytext=r.yytext.slice(0,-8).trim(),24;case 34:return this.popState(),r.yytext=r.yytext.slice(0,-8).trim(),25;case 35:return this.popState(),r.yytext=r.yytext.slice(0,-10).trim(),26;case 36:return this.popState(),r.yytext=r.yytext.slice(0,-8).trim(),24;case 37:return this.popState(),r.yytext=r.yytext.slice(0,-8).trim(),25;case 38:return this.popState(),r.yytext=r.yytext.slice(0,-10).trim(),26;case 39:return 44;case 40:return 45;case 41:return 46;case 42:return 47;case 43:this.pushState("STATE_STRING");break;case 44:return this.pushState("STATE_ID"),"AS";case 45:return this.popState(),"ID";case 46:this.popState();break;case 47:return"STATE_DESCR";case 48:return 18;case 49:this.popState();break;case 50:return this.popState(),this.pushState("struct"),19;case 51:break;case 52:return this.popState(),20;case 53:break;case 54:return this.begin("NOTE"),28;case 55:return this.popState(),this.pushState("NOTE_ID"),52;case 56:return this.popState(),this.pushState("NOTE_ID"),53;case 57:this.popState(),this.pushState("FLOATING_NOTE");break;case 58:return this.popState(),this.pushState("FLOATING_NOTE_ID"),"AS";case 59:break;case 60:return"NOTE_TEXT";case 61:return this.popState(),"ID";case 62:return this.popState(),this.pushState("NOTE_TEXT"),23;case 63:return this.popState(),r.yytext=r.yytext.substr(2).trim(),30;case 64:return this.popState(),r.yytext=r.yytext.slice(0,-8).trim(),30;case 65:return 6;case 66:return 6;case 67:return 15;case 68:return 50;case 69:return 23;case 70:return r.yytext=r.yytext.trim(),13;case 71:return 14;case 72:return 27;case 73:return 51;case 74:return 5;case 75:return"INVALID"}},rules:[/^(?:default\b)/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:[\s]+)/i,/^(?:((?!\n)\s)+)/i,/^(?:#[^\n]*)/i,/^(?:%[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:classDef\s+)/i,/^(?:DEFAULT\s+)/i,/^(?:\w+\s+)/i,/^(?:[^\n]*)/i,/^(?:class\s+)/i,/^(?:(\w+)+((,\s*\w+)*))/i,/^(?:[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:state\s+)/i,/^(?:.*<<fork>>)/i,/^(?:.*<<join>>)/i,/^(?:.*<<choice>>)/i,/^(?:.*\[\[fork\]\])/i,/^(?:.*\[\[join\]\])/i,/^(?:.*\[\[choice\]\])/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:["])/i,/^(?:\s*as\s+)/i,/^(?:[^\n\{]*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n\s\{]+)/i,/^(?:\n)/i,/^(?:\{)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:\})/i,/^(?:[\n])/i,/^(?:note\s+)/i,/^(?:left of\b)/i,/^(?:right of\b)/i,/^(?:")/i,/^(?:\s*as\s*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n]*)/i,/^(?:\s*[^:\n\s\-]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:[\s\S]*?end note\b)/i,/^(?:stateDiagram\s+)/i,/^(?:stateDiagram-v2\s+)/i,/^(?:hide empty description\b)/i,/^(?:\[\*\])/i,/^(?:[^:\n\s\-\{]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:-->)/i,/^(?:--)/i,/^(?::::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{LINE:{rules:[9,10],inclusive:!1},struct:{rules:[9,10,22,26,32,39,40,41,42,51,52,53,54,68,69,70,71,72],inclusive:!1},FLOATING_NOTE_ID:{rules:[61],inclusive:!1},FLOATING_NOTE:{rules:[58,59,60],inclusive:!1},NOTE_TEXT:{rules:[63,64],inclusive:!1},NOTE_ID:{rules:[62],inclusive:!1},NOTE:{rules:[55,56,57],inclusive:!1},CLASS_STYLE:{rules:[28],inclusive:!1},CLASS:{rules:[27],inclusive:!1},CLASSDEFID:{rules:[25],inclusive:!1},CLASSDEF:{rules:[23,24],inclusive:!1},acc_descr_multiline:{rules:[20,21],inclusive:!1},acc_descr:{rules:[18],inclusive:!1},acc_title:{rules:[16],inclusive:!1},SCALE:{rules:[13,14,30,31],inclusive:!1},ALIAS:{rules:[],inclusive:!1},STATE_ID:{rules:[45],inclusive:!1},STATE_STRING:{rules:[46,47],inclusive:!1},FORK_STATE:{rules:[],inclusive:!1},STATE:{rules:[9,10,33,34,35,36,37,38,43,44,48,49,50],inclusive:!1},ID:{rules:[9,10],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,8,10,11,12,15,17,19,22,26,29,32,50,54,65,66,67,68,69,70,71,73,74,75],inclusive:!0}}};return T}();ct.lexer=Gt;function ht(){this.yy={}}return ht.prototype=ct,ct.Parser=ht,new ht}();mt.parser=mt;const xe=mt,Wt="LR",$e="TB",gt="state",Lt="relation",qt="classDef",Qt="applyClass",Tt="default",Zt="divider",bt="[*]",vt="start",It=bt,Ot="end",Ct="color",Dt="fill",te="bgFill",ee=",";function Rt(){return{}}let Nt=Wt,at=[],B=Rt();const Bt=()=>({relations:[],states:{},documents:{}});let ot={root:Bt()},m=ot.root,w=0,At=0;const se={LINE:0,DOTTED_LINE:1},ie={AGGREGATION:0,EXTENSION:1,COMPOSITION:2,DEPENDENCY:3},rt=t=>JSON.parse(JSON.stringify(t)),re=t=>{$.info("Setting root doc",t),at=t},ne=()=>at,nt=(t,s,n)=>{if(s.stmt===Lt)nt(t,s.state1,!0),nt(t,s.state2,!1);else if(s.stmt===gt&&(s.id==="[*]"?(s.id=n?t.id+"_start":t.id+"_end",s.start=n):s.id=s.id.trim()),s.doc){const c=[];let p=[],d;for(d=0;d<s.doc.length;d++)if(s.doc[d].type===Zt){const y=rt(s.doc[d]);y.doc=rt(p),c.push(y),p=[]}else p.push(s.doc[d]);if(c.length>0&&p.length>0){const y={stmt:gt,id:Vt(),type:"divider",doc:rt(p)};c.push(rt(y)),s.doc=c}s.doc.forEach(y=>nt(s,y,!0))}},ae=()=>(nt({id:"root"},{id:"root",doc:at},!0),{id:"root",doc:at}),oe=t=>{let s;t.doc?s=t.doc:s=t,$.info(s),wt(!0),$.info("Extract",s),s.forEach(n=>{switch(n.stmt){case gt:L(n.id.trim(),n.type,n.doc,n.description,n.note,n.classes,n.styles,n.textStyles);break;case Lt:Pt(n.state1,n.state2,n.description);break;case qt:Ft(n.id.trim(),n.classes);break;case Qt:Et(n.id.trim(),n.styleClass);break}})},L=function(t,s=Tt,n=null,c=null,p=null,d=null,y=null,b=null){const u=t==null?void 0:t.trim();m.states[u]===void 0?($.info("Adding state ",u,c),m.states[u]={id:u,descriptions:[],type:s,doc:n,note:p,classes:[],styles:[],textStyles:[]}):(m.states[u].doc||(m.states[u].doc=n),m.states[u].type||(m.states[u].type=s)),c&&($.info("Setting state description",u,c),typeof c=="string"&&kt(u,c.trim()),typeof c=="object"&&c.forEach(_=>kt(u,_.trim()))),p&&(m.states[u].note=p,m.states[u].note.text=lt.sanitizeText(m.states[u].note.text,F())),d&&($.info("Setting state classes",u,d),(typeof d=="string"?[d]:d).forEach(_=>Et(u,_.trim()))),y&&($.info("Setting state styles",u,y),(typeof y=="string"?[y]:y).forEach(_=>ge(u,_.trim()))),b&&($.info("Setting state styles",u,y),(typeof b=="string"?[b]:b).forEach(_=>Se(u,_.trim())))},wt=function(t){ot={root:Bt()},m=ot.root,w=0,B=Rt(),t||Kt()},P=function(t){return m.states[t]},le=function(){return m.states},ce=function(){$.info("Documents = ",ot)},he=function(){return m.relations};function St(t=""){let s=t;return t===bt&&(w++,s=`${vt}${w}`),s}function _t(t="",s=Tt){return t===bt?vt:s}function ue(t=""){let s=t;return t===It&&(w++,s=`${Ot}${w}`),s}function de(t="",s=Tt){return t===It?Ot:s}function pe(t,s,n){let c=St(t.id.trim()),p=_t(t.id.trim(),t.type),d=St(s.id.trim()),y=_t(s.id.trim(),s.type);L(c,p,t.doc,t.description,t.note,t.classes,t.styles,t.textStyles),L(d,y,s.doc,s.description,s.note,s.classes,s.styles,s.textStyles),m.relations.push({id1:c,id2:d,relationTitle:lt.sanitizeText(n,F())})}const Pt=function(t,s,n){if(typeof t=="object")pe(t,s,n);else{const c=St(t.trim()),p=_t(t),d=ue(s.trim()),y=de(s);L(c,p),L(d,y),m.relations.push({id1:c,id2:d,title:lt.sanitizeText(n,F())})}},kt=function(t,s){const n=m.states[t],c=s.startsWith(":")?s.replace(":","").trim():s;n.descriptions.push(lt.sanitizeText(c,F()))},ye=function(t){return t.substring(0,1)===":"?t.substr(2).trim():t.trim()},fe=()=>(At++,"divider-id-"+At),Ft=function(t,s=""){B[t]===void 0&&(B[t]={id:t,styles:[],textStyles:[]});const n=B[t];s!=null&&s.split(ee).forEach(c=>{const p=c.replace(/([^;]*);/,"$1").trim();if(c.match(Ct)){const d=p.replace(Dt,te).replace(Ct,Dt);n.textStyles.push(d)}n.styles.push(p)})},me=function(){return B},Et=function(t,s){t.split(",").forEach(function(n){let c=P(n);if(c===void 0){const p=n.trim();L(p),c=P(p)}c.classes.push(s)})},ge=function(t,s){const n=P(t);n!==void 0&&n.textStyles.push(s)},Se=function(t,s){const n=P(t);n!==void 0&&n.textStyles.push(s)},_e=()=>Nt,ke=t=>{Nt=t},Te=t=>t&&t[0]===":"?t.substr(1).trim():t.trim(),Ce={getConfig:()=>F().state,addState:L,clear:wt,getState:P,getStates:le,getRelations:he,getClasses:me,getDirection:_e,addRelation:Pt,getDividerId:fe,setDirection:ke,cleanupLabel:ye,lineType:se,relationType:ie,logDocuments:ce,getRootDoc:ne,setRootDoc:re,getRootDocV2:ae,extract:oe,trimColon:Te,getAccTitle:Xt,setAccTitle:Jt,getAccDescription:Ht,setAccDescription:Mt,addStyleClass:Ft,setCssClass:Et,addDescription:kt,setDiagramTitle:zt,getDiagramTitle:Ut},be=t=>`
defs #statediagram-barbEnd {
    fill: ${t.transitionColor};
    stroke: ${t.transitionColor};
  }
g.stateGroup text {
  fill: ${t.nodeBorder};
  stroke: none;
  font-size: 10px;
}
g.stateGroup text {
  fill: ${t.textColor};
  stroke: none;
  font-size: 10px;

}
g.stateGroup .state-title {
  font-weight: bolder;
  fill: ${t.stateLabelColor};
}

g.stateGroup rect {
  fill: ${t.mainBkg};
  stroke: ${t.nodeBorder};
}

g.stateGroup line {
  stroke: ${t.lineColor};
  stroke-width: 1;
}

.transition {
  stroke: ${t.transitionColor};
  stroke-width: 1;
  fill: none;
}

.stateGroup .composit {
  fill: ${t.background};
  border-bottom: 1px
}

.stateGroup .alt-composit {
  fill: #e0e0e0;
  border-bottom: 1px
}

.state-note {
  stroke: ${t.noteBorderColor};
  fill: ${t.noteBkgColor};

  text {
    fill: ${t.noteTextColor};
    stroke: none;
    font-size: 10px;
  }
}

.stateLabel .box {
  stroke: none;
  stroke-width: 0;
  fill: ${t.mainBkg};
  opacity: 0.5;
}

.edgeLabel .label rect {
  fill: ${t.labelBackgroundColor};
  opacity: 0.5;
}
.edgeLabel .label text {
  fill: ${t.transitionLabelColor||t.tertiaryTextColor};
}
.label div .edgeLabel {
  color: ${t.transitionLabelColor||t.tertiaryTextColor};
}

.stateLabel text {
  fill: ${t.stateLabelColor};
  font-size: 10px;
  font-weight: bold;
}

.node circle.state-start {
  fill: ${t.specialStateColor};
  stroke: ${t.specialStateColor};
}

.node .fork-join {
  fill: ${t.specialStateColor};
  stroke: ${t.specialStateColor};
}

.node circle.state-end {
  fill: ${t.innerEndBackground};
  stroke: ${t.background};
  stroke-width: 1.5
}
.end-state-inner {
  fill: ${t.compositeBackground||t.background};
  // stroke: ${t.background};
  stroke-width: 1.5
}

.node rect {
  fill: ${t.stateBkg||t.mainBkg};
  stroke: ${t.stateBorder||t.nodeBorder};
  stroke-width: 1px;
}
.node polygon {
  fill: ${t.mainBkg};
  stroke: ${t.stateBorder||t.nodeBorder};;
  stroke-width: 1px;
}
#statediagram-barbEnd {
  fill: ${t.lineColor};
}

.statediagram-cluster rect {
  fill: ${t.compositeTitleBackground};
  stroke: ${t.stateBorder||t.nodeBorder};
  stroke-width: 1px;
}

.cluster-label, .nodeLabel {
  color: ${t.stateLabelColor};
}

.statediagram-cluster rect.outer {
  rx: 5px;
  ry: 5px;
}
.statediagram-state .divider {
  stroke: ${t.stateBorder||t.nodeBorder};
}

.statediagram-state .title-state {
  rx: 5px;
  ry: 5px;
}
.statediagram-cluster.statediagram-cluster .inner {
  fill: ${t.compositeBackground||t.background};
}
.statediagram-cluster.statediagram-cluster-alt .inner {
  fill: ${t.altBackground?t.altBackground:"#efefef"};
}

.statediagram-cluster .inner {
  rx:0;
  ry:0;
}

.statediagram-state rect.basic {
  rx: 5px;
  ry: 5px;
}
.statediagram-state rect.divider {
  stroke-dasharray: 10,10;
  fill: ${t.altBackground?t.altBackground:"#efefef"};
}

.note-edge {
  stroke-dasharray: 5;
}

.statediagram-note rect {
  fill: ${t.noteBkgColor};
  stroke: ${t.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}
.statediagram-note rect {
  fill: ${t.noteBkgColor};
  stroke: ${t.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}

.statediagram-note text {
  fill: ${t.noteTextColor};
}

.statediagram-note .nodeLabel {
  color: ${t.noteTextColor};
}
.statediagram .edgeLabel {
  color: red; // ${t.noteTextColor};
}

#dependencyStart, #dependencyEnd {
  fill: ${t.lineColor};
  stroke: ${t.lineColor};
  stroke-width: 1;
}

.statediagramTitleText {
  text-anchor: middle;
  font-size: 18px;
  fill: ${t.textColor};
}
`,De=be;export{Ce as A,$e as C,xe as D,Tt as E,Lt as I,De as L,gt as _,Zt as t};

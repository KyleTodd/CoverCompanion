import{S as be,i as ve,s as _e,e as a,a as w,A as te,t as y,b as t,h as ie,c as re,d as e,C as le,m as ee,p as Ee,v as z,G as V,D as we,F as ye,E as W,f as ce,H as ae,U as ke,r as $e,g as De,q as Te,x as Pe,y as oe}from"./index.28ceac01.js";import{I as ne}from"./Icon.9347ffee.js";import{g as fe,i as Z}from"./policyTypes.f03c44ef.js";function ge(l,i,n){const c=l.slice();return c[11]=i[n],c}function me(l){let i,n,c=l[11].daysUntilExpiry+"",r,v;return{c(){i=a("div"),n=y("Expired "),r=y(c),v=y(" days ago"),t(i,"class","date datebg-red")},m(d,u){re(d,i,u),e(i,n),e(i,r),e(i,v)},p(d,u){u&4&&c!==(c=d[11].daysUntilExpiry+"")&&z(r,c)},d(d){d&&ce(i)}}}function he(l){let i,n,c,r,v,d,u,M=l[11].DESCRIPTION+"",k,D,T,N,B=fe(l[11].TYPE)+"",o,Y,P=l[11].POLICY_NUMBER+"",b,h,m,$,J,q=l[11].E_DATE+"",H,U,j,x,C,S,A,O,L,K,R;r=new ne({props:{icon:Z[l[11].TYPE]||Z.default,color:"black",width:"3.5em",height:"3.5em"}});let p=l[11].daysUntilExpiry&&me(l);S=new ne({props:{icon:"material-symbols:search",color:"white",width:"30",height:"30"}});function Q(){return l[9](l[11])}return{c(){i=a("div"),n=a("div"),c=a("div"),te(r.$$.fragment),v=w(),d=a("div"),u=a("h5"),k=y(M),D=w(),T=a("p"),N=a("b"),o=y(B),Y=y(" - "),b=y(P),h=w(),m=a("div"),$=a("div"),J=y("Expiry date: "),H=y(q),U=w(),p&&p.c(),j=w(),x=a("div"),C=a("button"),te(S.$$.fragment),A=y(" View Policy"),O=w(),t(c,"class","col-sm-1 col-md-1 col-2 d-flex justify-content-center align-items-center"),t(u,"class","policy-desc"),t(T,"class","card-subtitle text-muted"),t(d,"class","col-md-4 col-10 d-flex flex-column justify-content-center align-items-start"),t($,"class","date datebg-dark"),t(m,"class","col-md-4 col-12 d-flex flex-column align-items-center align-items-sm-start align-self-center align-self-md-start p-2"),t(C,"class","btn btn-dark"),ie(C,"height","2.5em"),t(x,"class","justify-content-sm-end justify-content-center col-md-3 col-12 d-flex align-self-md-center "),t(n,"class","card-body row "),t(i,"class","card border-1 shadow mb-3")},m(_,I){re(_,i,I),e(i,n),e(n,c),le(r,c,null),e(n,v),e(n,d),e(d,u),e(u,k),e(d,D),e(d,T),e(T,N),e(N,o),e(T,Y),e(T,b),e(n,h),e(n,m),e(m,$),e($,J),e($,H),e(m,U),p&&p.m(m,null),e(n,j),e(n,x),e(x,C),le(S,C,null),e(C,A),e(i,O),L=!0,K||(R=ee(C,"click",Q),K=!0)},p(_,I){l=_;const X={};I&4&&(X.icon=Z[l[11].TYPE]||Z.default),r.$set(X),(!L||I&4)&&M!==(M=l[11].DESCRIPTION+"")&&z(k,M),(!L||I&4)&&B!==(B=fe(l[11].TYPE)+"")&&z(o,B),(!L||I&4)&&P!==(P=l[11].POLICY_NUMBER+"")&&z(b,P),(!L||I&4)&&q!==(q=l[11].E_DATE+"")&&z(H,q),l[11].daysUntilExpiry?p?p.p(l,I):(p=me(l),p.c(),p.m(m,null)):p&&(p.d(1),p=null)},i(_){L||(V(r.$$.fragment,_),V(S.$$.fragment,_),L=!0)},o(_){W(r.$$.fragment,_),W(S.$$.fragment,_),L=!1},d(_){_&&ce(i),ae(r),p&&p.d(),ae(S),K=!1,R()}}}function Ce(l){let i,n,c,r,v,d,u,M,k,D,T,N,B,o,Y,P,b,h,m,$,J,q,H,U,j,x,C,S,A,O,L,K,R,p,Q=l[2].length+"",_,I,X,F,se,ue;m=new ne({props:{icon:"ion:person-sharp",color:"white",width:"20",height:"20"}}),j=new ne({props:{icon:"material-symbols:logout",color:"red",width:"20",height:"20"}});let G=l[2],f=[];for(let s=0;s<G.length;s+=1)f[s]=he(ge(l,G,s));const pe=s=>W(f[s],1,1,()=>{f[s]=null});return{c(){i=a("html"),n=a("body"),c=a("nav"),r=a("div"),v=a("a"),v.innerHTML='<img src="https://www.bespokeinsurancegroup.com.au/uploads/site_logo/site_logo.png"/>',d=w(),u=a("button"),u.innerHTML='<span class="navbar-toggler-icon"></span>',M=w(),k=a("div"),D=a("ul"),T=a("li"),N=a("a"),N.textContent="Current Policies",B=w(),o=a("li"),o.innerHTML='<a class="nav-link active" href="#"><b>Expired Policies</b></a>',Y=w(),P=a("ul"),b=a("li"),h=a("button"),te(m.$$.fragment),$=w(),J=y(l[0]),q=w(),H=a("li"),U=a("button"),te(j.$$.fragment),x=y(" Logout"),S=w(),A=a("div"),O=a("div"),L=a("h1"),L.textContent="Expired Policies:",K=w(),R=a("h5"),p=y("There are "),_=y(Q),I=y(" expired policies on your account."),X=w();for(let s=0;s<f.length;s+=1)f[s].c();t(v,"class","navbar-brand"),t(v,"href","https://www.bespokeinsurancegroup.com.au/"),t(u,"class","navbar-toggler"),t(u,"type","button"),t(u,"data-bs-toggle","collapse"),t(u,"data-bs-target","#navbarNav"),t(u,"aria-controls","navbarNav"),t(u,"aria-expanded","false"),t(u,"aria-label","Toggle navigation"),t(N,"class","nav-link"),t(N,"href","#"),t(T,"class","nav-item"),t(o,"class","nav-item active"),t(D,"class","navbar-nav me-auto mb-2 mb-lg-0"),t(h,"class","btn btn-outline-light"),t(h,"href","#"),t(b,"class","nav-item end-button"),t(U,"class","btn btn-outline-danger"),t(U,"href","#"),t(H,"class","nav-item end-button"),t(P,"class","navbar-nav ml-auto"),t(k,"class",C="navbar-collapse "+(l[3]?"":"collapse")),t(k,"id","navbarNav"),t(r,"class","container-fluid"),t(c,"class","navbar navbar-expand-lg bg-dark navbar-dark"),ie(R,"color","grey"),ie(O,"padding-bottom","1em"),t(A,"class","container-fluid mt-4"),t(n,"class","body-bg"),t(i,"lang","en"),t(i,"class","body-dark")},m(s,E){re(s,i,E),e(i,n),e(n,c),e(c,r),e(r,v),e(r,d),e(r,u),e(r,M),e(r,k),e(k,D),e(D,T),e(T,N),e(D,B),e(D,o),e(k,Y),e(k,P),e(P,b),e(b,h),le(m,h,null),e(h,$),e(h,J),e(P,q),e(P,H),e(H,U),le(j,U,null),e(U,x),e(n,S),e(n,A),e(A,O),e(O,L),e(O,K),e(O,R),e(R,p),e(R,_),e(R,I),e(A,X);for(let g=0;g<f.length;g+=1)f[g].m(A,null);F=!0,se||(ue=[ee(u,"click",l[7]),ee(N,"click",Ee(l[8])),ee(U,"click",l[5])],se=!0)},p(s,[E]){if((!F||E&1)&&z(J,s[0]),(!F||E&8&&C!==(C="navbar-collapse "+(s[3]?"":"collapse")))&&t(k,"class",C),(!F||E&4)&&Q!==(Q=s[2].length+"")&&z(_,Q),E&70){G=s[2];let g;for(g=0;g<G.length;g+=1){const de=ge(s,G,g);f[g]?(f[g].p(de,E),V(f[g],1)):(f[g]=he(de),f[g].c(),V(f[g],1),f[g].m(A,null))}for(we(),g=G.length;g<f.length;g+=1)pe(g);ye()}},i(s){if(!F){V(m.$$.fragment,s),V(j.$$.fragment,s);for(let E=0;E<G.length;E+=1)V(f[E]);F=!0}},o(s){W(m.$$.fragment,s),W(j.$$.fragment,s),f=f.filter(Boolean);for(let E=0;E<f.length;E+=1)W(f[E]);F=!1},d(s){s&&ce(i),ae(m),ae(j),ke(f,s),se=!1,$e(ue)}}}function Le(l,i,n){let c;De(l,Pe,o=>n(4,c=o));let r="",v="",d=[];function u(){oe.get("http://localhost:3000/logout",{withCredentials:!0}).then(o=>{o.status===200?(localStorage.removeItem("session"),console.log("Session Cleared"),c("/Login")):console.log("Logout failed with status: "+o.status)}).catch(o=>{console.error(o)})}Te(async()=>{try{const o=await oe.get("http://localhost:3000/getUsername",{withCredentials:!0});n(0,r=o.data.email),n(1,v=o.data.username),console.log(o),r==null?(console.log("Not logged in"),c("/Login")):(console.log("Logged in "+r),k().catch(console.error))}catch(o){console.error(o)}});function M(o,Y){c(`/Pdf?username=${o}&policyNumber=${Y}`)}const k=async()=>{const o=await oe.get("http://localhost:3000/getPolicies",{withCredentials:!0});n(2,d=o.data);const Y=new Date;n(2,d=d.filter(b=>{let h=new Date(b.E_DATE);b.E_DATE=`${("0"+h.getDate()).slice(-2)}/${("0"+(h.getMonth()+1)).slice(-2)}/${h.getFullYear()}`;let m=h.getTime()-Y.getTime(),$=Math.ceil(m/(1e3*3600*24));return $<=31&&(b.daysUntilExpiry=$),$<=0}).sort((b,h)=>{let m=new Date(b.E_DATE.split("/").reverse().join("-")),$=new Date(h.E_DATE.split("/").reverse().join("-"));return m-$}));const P=d.map(b=>b.E_DATE);console.log(P)};let D=!1;function T(){n(3,D=!D)}return[r,v,d,D,c,u,M,T,()=>c("/ListPolicies"),o=>M(v,o.POLICY_NUMBER)]}class Ue extends be{constructor(i){super(),ve(this,i,Le,Ce,_e,{})}}export{Ue as default};

import{S as D,i as E,s as F,e as h,a as A,t as C,b as u,h as G,j as H,c as R,d as o,k as j,l as O,m as U,p as I,o as K,n as T,f as B,r as Q,g as V,q as W,v as X,w as Y,x as Z,y as z,z as x}from"./index.28ceac01.js";function J(s,a,e){const r=s.slice();return r[2]=a[e],r}function P(s,a){let e,r=a[2]+"",_,l;return{key:s,first:null,c(){e=h("option"),_=C(r),e.__value=l=a[2],e.value=e.__value,this.first=e},m(n,f){R(n,e,f),o(e,_)},p(n,f){a=n,f&2&&r!==(r=a[2]+"")&&X(_,r),f&2&&l!==(l=a[2])&&(e.__value=l,e.value=e.__value)},d(n){n&&B(e)}}}function $(s){let a,e,r,_,l,n,f,d,k,i,m,S,p,b=[],L=new Map,q,v,w,M,y=s[1];const N=t=>t[2];for(let t=0;t<y.length;t+=1){let c=J(s,y,t),g=N(c);L.set(g,b[t]=P(g,c))}return{c(){a=h("div"),e=h("form"),r=h("h5"),r.textContent="Add Linked User",_=A(),l=h("div"),n=h("label"),f=C(`User Name:
        `),d=h("input"),k=A(),i=h("div"),m=h("label"),S=C(`Linked Account:
        `),p=h("select");for(let t=0;t<b.length;t+=1)b[t].c();q=A(),v=h("button"),v.textContent="Add User",u(d,"type","text"),u(d,"maxlength","10"),u(d,"class","form-control"),d.required=!0,u(n,"class","form-label"),u(l,"class","mb-3"),u(p,"class","form-control"),u(p,"placeholder","Select..."),G(p,"color","black"),s[0]===void 0&&H(()=>s[5].call(p)),u(m,"class","form-label"),u(i,"class","mb-3"),u(v,"type","submit"),u(v,"class","btn btn-primary"),u(e,"class","m-5"),u(a,"class","container mt-5 text-align-center")},m(t,c){R(t,a,c),o(a,e),o(e,r),o(e,_),o(e,l),o(l,n),o(n,f),o(n,d),j(d,s[2]),o(e,k),o(e,i),o(i,m),o(m,S),o(m,p);for(let g=0;g<b.length;g+=1)b[g].m(p,null);O(p,s[0]),o(e,q),o(e,v),w||(M=[U(d,"input",s[4]),U(p,"change",s[5]),U(e,"submit",I(s[3]))],w=!0)},p(t,[c]){c&4&&d.value!==t[2]&&j(d,t[2]),c&2&&(y=t[1],b=K(b,c,N,1,t,y,L,p,Y,P,null,J)),c&3&&O(p,t[0])},i:T,o:T,d(t){t&&B(a);for(let c=0;c<b.length;c+=1)b[c].d();w=!1,Q(M)}}}function ee(s,a,e){let r;V(s,Z,i=>e(6,r=i));let _="",l="",n=[];W(async()=>{try{const i=await z.get("http://localhost:3000/getbUsername",{withCredentials:!0});if(e(0,l=i.data.busername),l==null)console.log("Not logged in"),r("/brokerLogin");else{console.log("Logged in AddUser "+l);const m=await z.get("http://localhost:3000/usernames",{withCredentials:!0});e(1,n=m.data)}}catch(i){console.error(i)}});async function f(){const i=await fetch("http://localhost:3000/addLinkedUsername",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:_,linkedAccount:l})});if(i.ok)alert("Added user successfully"),location.reload();else{const m=await i.text();alert("Username is too long or has invalid characters",m)}}function d(){_=this.value,e(2,_)}function k(){l=x(this),e(0,l),e(1,n)}return[l,n,_,f,d,k]}class le extends D{constructor(a){super(),E(this,a,ee,$,F,{})}}export{le as default};

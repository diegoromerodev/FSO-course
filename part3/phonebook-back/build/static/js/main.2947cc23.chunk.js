(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{40:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var r=n(1),c=n(16),i=n.n(c),u=n(3),s=n(0),o=function(e){var t=e.setFilter,n=e.filter;return Object(s.jsxs)("div",{children:["filter: ",Object(s.jsx)("input",{onChange:function(e){t(e.target.value)},value:n})]})},a=function(e){var t=e.notification;return t.message?Object(s.jsx)("div",{className:t.type,children:Object(s.jsx)("p",{children:t.message})}):null},f=n(4),d=n.n(f),j="/api/persons/",l=function(){return d.a.get(j).then((function(e){return e.data}))},b=function(e){return d.a.post(j,e).then((function(e){return e.data}))},h=function(e){return d.a.put(j+e.id,e).then((function(e){return e.data}))},p=function(e){return d.a.delete(j+e)},m=function(e){var t=e.persons,n=e.setPersons,c=e.setNotification,i=Object(r.useState)(""),o=Object(u.a)(i,2),a=o[0],f=o[1],d=Object(r.useState)(""),j=Object(u.a)(d,2),l=j[0],p=j[1],m=function(e){c({message:"".concat(e,"'s info had already been deleted."),type:"warning"}),n(t.filter((function(t){return t.name!==e}))),setTimeout((function(){return c({})}),3e3)};return Object(s.jsxs)("form",{onSubmit:function(e){if(e.preventDefault(),a&&l){var r=function(e){var n=new RegExp(e,"i");return t.find((function(e){return n.test(e.name)}))}(a);if(r)return!!confirm("".concat(a," is already present in the phonebook, do you want to update the number?"))&&(r.number=l,f(""),p(""),h(r).then((function(){n(t.map((function(e){return e.id===r.id?r:e}))),c({message:"Successfully updated ".concat(r.name,"'s number."),type:"success"}),setTimeout((function(){return c({})}),3e3)})).catch((function(){m(r.name)})),!0);var i={name:a,number:l};b(i).then((function(e){n(t.concat(e)),c({message:"Successfully added ".concat(i.name,"'s number."),type:"success"}),setTimeout((function(){return c({})}),3e3)})).catch((function(){m(i.name)})),f(""),p("")}},children:[Object(s.jsxs)("div",{children:["name: ",Object(s.jsx)("input",{onChange:function(e){f(e.target.value)},value:a})]}),Object(s.jsxs)("div",{children:["number: ",Object(s.jsx)("input",{onChange:function(e){p(e.target.value)},value:l})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",children:"add"})})]})},O=function(e){var t=e.person,n=e.handleDelete;return Object(s.jsxs)("div",{style:{border:"2px solid #333",padding:"10px",margin:"10px",marginRight:"50%"},children:[Object(s.jsxs)("p",{children:[t.name," - ",t.number]}),Object(s.jsx)("button",{type:"button",style:{backgroundColor:"lightcoral",color:"#fafafa"},onClick:n,children:"delete?"})]})},x=function(e){var t=e.persons,n=e.filter,r=e.setPersons;return Object(s.jsx)(s.Fragment,{children:t.reduce((function(e,c){return n&&!c.name.includes(n)||e.push(Object(s.jsx)(O,{handleDelete:function(){return function(e){var n=e.id,c=e.name;if(!window.confirm("Delete ".concat(c,"?")))return!1;p(n).then((function(){r(t.filter((function(e){return e.id!==n})))}))}(c)},person:c},c.id)),e}),[])})};var v=function(){var e=Object(r.useState)([]),t=Object(u.a)(e,2),n=t[0],c=t[1],i=Object(r.useState)(""),f=Object(u.a)(i,2),d=f[0],j=f[1],b=Object(r.useState)({}),h=Object(u.a)(b,2),p=h[0],O=h[1];return Object(r.useEffect)((function(){l().then(c)}),[]),Object(s.jsxs)("div",{children:[Object(s.jsx)(a,{notification:p}),Object(s.jsx)("h2",{children:"Phonebook"}),Object(s.jsx)(o,{filter:d,setFilter:j}),Object(s.jsx)(m,{persons:n,setPersons:c,setNotification:O}),Object(s.jsx)("h2",{children:"Numbers"}),Object(s.jsx)(x,{filter:d,persons:n,setPersons:c})]})};n(40);i.a.render(Object(s.jsx)(v,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.2947cc23.chunk.js.map
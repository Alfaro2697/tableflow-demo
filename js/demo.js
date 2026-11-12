"use strict";
// Fully static, read-only demonstration. No API requests or credentials.
const $ = id => document.getElementById(id);
const PRODUCTS = [
 {name:'Chocolate Cake',sku:'DES-001',category:'Desserts',price:6,stock:5,active:true},
 {name:'Iced Lemonade',sku:'DRK-001',category:'Drinks',price:3.5,stock:40,active:true},
 {name:'Caesar Salad',sku:'SAL-001',category:'Salads',price:8,stock:5,active:true},
 {name:'Classic Burger',sku:'BUR-001',category:'Burgers',price:10.5,stock:16,active:true},
 {name:'Margherita Pizza',sku:'PIZ-001',category:'Pizza',price:12,stock:23,active:true}
];
const ORDERS = [
 {number:'DEMO-1005',date:'2026-11-11',customer:'Jordan Lee',items:[['Chocolate Cake',1]],total:6,status:'cancelled'},
 {number:'DEMO-1004',date:'2026-11-11',customer:'Alex Rivera',items:[['Chocolate Cake',3],['Margherita Pizza',1]],total:30,status:'pending'},
 {number:'DEMO-1003',date:'2026-11-11',customer:'Morgan Brooks',items:[['Chocolate Cake',1]],total:6,status:'completed'},
 {number:'DEMO-1002',date:'2026-11-10',customer:'Taylor Smith',items:[['Caesar Salad',1]],total:8,status:'pending'},
 {number:'DEMO-1001',date:'2026-11-09',customer:'Sam Morgan',items:[['Margherita Pizza',2]],total:24,status:'completed'}
];
const money = x => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(x);
const badge = s => { const b=document.createElement('span'); b.className='badge-status badge-'+s; b.textContent=s; return b; };
function cell(tr,text,bold=false){const td=document.createElement('td'); const node=bold?document.createElement('strong'):document.createElement('span');node.textContent=String(text);td.append(node);tr.append(td);return td;}
function page(key){
 for(const n of ['overview','products','orders','settings']) $(n+'Page').classList.toggle('d-none',n!==key);
 document.querySelectorAll('[data-page]').forEach(b=>b.classList.toggle('active',b.dataset.page===key));
 $('pageTitle').textContent={overview:'Overview',products:'Products',orders:'Orders',settings:'Settings'}[key];
}
function renderOverview(){
 $('restaurantLabel').textContent='Flores Restaurant · Demo';
 $('statRevenue').textContent=money(68); $('statOrders').textContent=ORDERS.length;
 $('statProducts').textContent=PRODUCTS.length; $('statStock').textContent=PRODUCTS.filter(p=>p.stock<=5).length;
 const chart=$('salesChart');chart.replaceChildren();
 const values=[0,0,0,0,0,0,0,0,0,0,0,0,0,68];
 values.forEach((v,i)=>{const col=document.createElement('div');col.className='sales-column';
 const bar=document.createElement('div');bar.className='sales-bar';bar.style.height=(v?96:1)+'%';bar.title=money(v);
 const date=document.createElement('small'); date.textContent=(i<3?'10/':'11/')+String(i<3?29+i: i-2); col.append(bar,date);chart.append(col);});
 const top=$('topProductsChart');top.replaceChildren();
 [['Chocolate Cake',4],['Margherita Pizza',3],['Caesar Salad',1]].forEach(([name,q])=>{
 const row=document.createElement('div');row.className='top-product-row';
 const heading=document.createElement('div');heading.className='d-flex justify-content-between gap-2 small';
 const title=document.createElement('span');title.textContent=name;const qty=document.createElement('strong');qty.textContent=q+' sold';heading.append(title,qty);
 const track=document.createElement('div');track.className='progress-track';const fill=document.createElement('div');fill.className='progress-fill';fill.style.width=(q/4*100)+'%';track.append(fill);row.append(heading,track);top.append(row);
 });
 const rec=$('recentOrders');rec.replaceChildren();ORDERS.forEach(o=>{const tr=document.createElement('tr');cell(tr,o.number,true);cell(tr,o.customer);cell(tr,money(o.total));const td=document.createElement('td');td.append(badge(o.status));tr.append(td);rec.append(tr);});
}
function renderProducts(){
 const search=$('productSearch').value.trim().toLowerCase(),filter=$('stockFilter').value;
 const list=PRODUCTS.filter(p=>[p.name,p.sku,p.category].some(x=>x.toLowerCase().includes(search))&&(filter==='all'||filter==='active'&&p.active||filter==='low'&&p.stock<=5));
 const body=$('productsTable');body.replaceChildren();
 for(const p of list){const tr=document.createElement('tr');cell(tr,p.name,true);cell(tr,p.sku);cell(tr,p.category);cell(tr,money(p.price));const stock=cell(tr,p.stock);if(p.stock<=5)stock.classList.add('stock-low');const td=cell(tr,'Preview only');td.classList.add('text-end','demo-note');body.append(tr);}
 if(!list.length){const tr=document.createElement('tr'),td=cell(tr,'No products match your search');td.colSpan=6;body.append(tr);}
}
function renderOrders(){
 const search=$('orderSearch').value.trim().toLowerCase(),filter=$('orderStatusFilter').value;
 const list=ORDERS.filter(o=>(o.number.toLowerCase().includes(search)||o.customer.toLowerCase().includes(search))&&(filter==='all'||o.status===filter));
 const body=$('ordersTable');body.replaceChildren();
 for(const o of list){const tr=document.createElement('tr');const num=cell(tr,o.number,true);const date=document.createElement('div');date.className='text-secondary small';date.textContent=o.date;num.append(date);cell(tr,o.customer);const items=cell(tr,'');items.replaceChildren();o.items.forEach(([name,q],i)=>{if(i)items.append(document.createElement('br'));items.append(document.createTextNode(q+' × '+name));});cell(tr,money(o.total));const td=document.createElement('td');td.append(badge(o.status));tr.append(td);body.append(tr);}
 if(!list.length){const tr=document.createElement('tr'),td=cell(tr,'No orders match your search');td.colSpan=5;body.append(tr);}
}
document.querySelectorAll('[data-page]').forEach(b=>b.addEventListener('click',()=>page(b.dataset.page)));
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>page(b.dataset.go)));
$('productSearch').addEventListener('input',renderProducts);$('stockFilter').addEventListener('change',renderProducts);
$('orderSearch').addEventListener('input',renderOrders);$('orderStatusFilter').addEventListener('change',renderOrders);
$('restaurantName').value='Flores Restaurant';$('currencyChoice').value='USD';
renderOverview();renderProducts();renderOrders();page('overview');

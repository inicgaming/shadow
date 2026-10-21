const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fa=n=>Number(n).toLocaleString('fa-IR');
const ld=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}};
const sv=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){toast('حافظه مرورگر پر است؛ اطلاعات ذخیره نشد')}};
const DEFCATS=[["موبایل","📱"],["لپ‌تاپ","💻"],["لوازم خانگی","🏠"],["پوشاک","👕"],["آشپزخانه","🍳"],["ورزش","⚽"],["زیبایی","💄"],["کتاب","📚"]];
const SEED=[
{id:1,n:"گوشی موبایل سامسونگ مدل Galaxy A55 128 گیگابایت",p:18900000,c:"موبایل",e:"📱",d:"گوشی هوشمند با صفحه‌نمایش بزرگ، حافظه داخلی ۱۲۸ گیگابایت، دوربین سه‌گانه و باتری پرظرفیت برای استفاده روزمره."},
{id:2,n:"لپ‌تاپ ۱۵ اینچی ایسوس مدل Vivobook",p:34500000,c:"لپ‌تاپ",e:"💻",d:"لپ‌تاپ ۱۵ اینچی مناسب کارهای اداری، دانشجویی و تماشای فیلم، با باتری مناسب و بدنه سبک."},
{id:3,n:"جاروبرقی ۲۰۰۰ وات مدل پاور",p:6800000,c:"لوازم خانگی",e:"🧹",d:"جاروبرقی با موتور ۲۰۰۰ وات، قدرت مکش بالا و مجهز به فیلتر برای تمیز کردن راحت فرش و کف خانه."},
{id:4,n:"کفش ورزشی مردانه مدل رانر",p:2100000,c:"پوشاک",e:"👟",d:"کفش ورزشی مردانه با زیره سبک و ضدلغزش، مناسب پیاده‌روی و دویدن. دارای رویه تنفس‌پذیر."},
{id:5,n:"سرخ‌کن بدون روغن ۵ لیتری",p:4900000,c:"آشپزخانه",e:"🍟",d:"سرخ‌کن بدون روغن با ظرفیت ۵ لیتر و کنترل دما و زمان‌سنج، برای پخت سالم‌تر و سریع‌تر غذا."},
{id:6,n:"توپ فوتبال سایز ۵",p:850000,c:"ورزش",e:"⚽",d:"توپ فوتبال استاندارد سایز ۵ با روکش مقاوم، مناسب بازی در زمین چمن و خاکی."},
{id:7,n:"عطر زنانه ۱۰۰ میلی‌لیتر",p:3200000,c:"زیبایی",e:"🌸",d:"عطر زنانه با رایحه ماندگار و ملایم، در بطری ۱۰۰ میلی‌لیتری."},
{id:8,n:"کتاب شازده کوچولو",p:140000,c:"کتاب",e:"📖",d:"داستان کلاسیک و دوست‌داشتنی درباره شاهزاده‌ای کوچک و سفرش میان سیاره‌ها؛ مناسب همه سنین."}];
const DEV='kose.khoshkel@gmail.com';
let P=ld('tp',SEED),C=ld('tc',[]),U=ld('tu',null),O=ld('to',[]),CATS=ld('tcat',DEFCATS);
P.forEach(p=>{if(!p.d){const x=SEED.find(y=>y.id==p.id);if(x)p.d=x.d}});
const isDev=()=>U&&U.e&&U.e.toLowerCase()===DEV.toLowerCase();
const sp=()=>sv('tp',P),sc=()=>sv('tc',C);
const fixC=()=>{C=C.filter(c=>P.some(p=>p.id==c.id));sc()};fixC();
const img=p=>p.i?`<img src="${p.i}" alt="">`:esc(p.e||'🛍️');
const card=p=>`<a class="pc" href="#/p/${p.id}"><div class="im">${img(p)}</div><div class="nm">${esc(p.n)}</div><div class="pr">از ${fa(p.p)} تومان</div></a>`;
let tt;function toast(m){const t=$('#t');t.textContent=m;t.className='s';clearTimeout(tt);tt=setTimeout(()=>t.className='',1800)}
function add(id){const x=C.find(i=>i.id==id);x?x.q++:C.push({id:+id,q:1});sc();toast('به سبد خرید اضافه شد');nav()}
function chg(id,d){const x=C.find(i=>i.id==id);if(!x)return;x.q=Math.min(99,x.q+d);if(x.q<1)C=C.filter(i=>i.id!=id);sc();go(1)}
function rm(id){C=C.filter(i=>i.id!=id);sc();go(1)}
function nav(){const r=(location.hash||'#/').split('/')[1]||'',k=({c:'cats',checkout:'cart',pay:'cart',done:'cart',dev:'me'})[r]||r,h='#/'+k,n=C.reduce((a,i)=>a+i.q,0);
const L=[['#/','🏠','خانه'],['#/cats','🗂️','دسته‌بندی'],['#/cart','🛒','سبد خرید'],['#/me','👤','حساب کاربری']];
const H=L.map(([u,i,t])=>`<a href="${u}" class="${h==u?'on':''}"><b>${i}</b>${t}${u=='#/cart'&&n?`<span class="bd">${fa(n)}</span>`:''}</a>`).join('');$('#n').innerHTML=H;$('#dn').innerHTML=H}
const home=()=>`<div class="ban"><h2>خرید آسان، قیمت مناسب</h2><p>جدیدترین محصولات را ببینید و سفارش دهید</p></div>
<div class="sec"><div class="cats">${CATS.map(([n,e])=>`<a class="ct" href="#/c/${encodeURIComponent(n)}"><i>${esc(e)}</i>${esc(n)}</a>`).join('')}</div></div>
<div class="sec"><h3>🔥 پیشنهاد ویژه</h3><div class="hs">${P.slice(0,6).map(card).join('')}</div></div>
<div class="sec"><h3>جدیدترین محصولات</h3><div class="gr">${P.slice().reverse().map(card).join('')}</div></div>`;
const cats=()=>`<div class="sec"><h3>دسته‌بندی‌ها</h3>${CATS.map(([n,e])=>`<a class="row" href="#/c/${encodeURIComponent(n)}"><div style="font-size:26px">${esc(e)}</div><div>${esc(n)}</div><span class="chip">${fa(P.filter(p=>p.c==n).length)} کالا</span></a>`).join('')}</div>`;
const list=(t,a)=>`<div class="sec"><h3>${esc(t)}</h3>${a.length?`<div class="gr">${a.map(card).join('')}</div>`:'<div class="empty">کالایی پیدا نشد</div>'}</div>`;
function prod(id){const p=P.find(x=>x.id==id);if(!p)return'<div class="empty">محصول پیدا نشد</div>';
return `<div class="sec"><div class="im big">${img(p)}</div><h3>${esc(p.n)}</h3><span class="chip">${esc(p.c)}</span><div class="pr" style="font-size:17px">از ${fa(p.p)} تومان</div></div>
<div class="sec"><h3>توضیحات</h3><p class="dsc">${p.d?esc(p.d).replace(/\n/g,'<br>'):'توضیحاتی برای این محصول ثبت نشده است.'}</p></div>
<div class="sec"><button class="btn" onclick="add(${p.id})">افزودن به سبد خرید</button></div>`}
function cart(){if(!C.length)return'<div class="empty"><div style="font-size:60px">🛒</div>سبد خرید شما خالی است<br><br><a class="btn" href="#/">مشاهده محصولات</a></div>';
const it=C.map(c=>({...P.find(p=>p.id==c.id),q:c.q})).filter(x=>x.n);
const t=it.reduce((a,i)=>a+i.p*i.q,0);
return `<div class="sec"><h3>سبد خرید (${fa(it.length)} کالا)</h3>${it.map(i=>`<div class="row"><div class="im">${img(i)}</div><div><div class="nm" style="height:auto">${esc(i.n)}</div><div class="pr">${fa(i.p*i.q)} تومان</div><div class="q"><button onclick="chg(${i.id},1)">+</button><b>${fa(i.q)}</b><button onclick="chg(${i.id},-1)">−</button></div></div><button onclick="rm(${i.id})" style="border:0;background:none;font-size:18px">🗑️</button></div>`).join('')}</div>
<div class="tot"><div><div class="sh">مبلغ قابل پرداخت</div><b>${fa(t)} تومان</b></div><button class="btn" onclick="location.hash='#/checkout'">ادامه خرید</button></div>`}
function me(){if(!U)return authBox()+menu();
return `<div class="sec" style="display:flex;gap:12px;align-items:center"><div class="im" style="width:56px;height:56px;border-radius:50%;font-size:28px;margin:0">👤</div><div style="flex:1"><b>${esc(U.n)}</b><div class="sh">${esc(U.p)}<br>${esc(U.e||'')}</div></div><button class="btn o" style="width:auto;padding:8px 14px" onclick="U=null;sv('tu',null);go()">خروج</button></div>`+menu()}
const THEMES=[['light','☀️ روشن'],['dark','🌙 تاریک'],['auto','📱 پیش‌فرض سیستم']];
const themeBox=()=>{const m=ld('tth','auto');return `<div class="sec" id="tb"><h3>ظاهر سایت</h3><div class="seg">${THEMES.map(([k,t])=>`<button class="${m==k?'on':''}" onclick="setTheme('${k}')">${t}</button>`).join('')}</div></div>`};
function applyTheme(){const m=ld('tth','auto'),r=document.documentElement;m=='auto'?r.removeAttribute('data-theme'):r.setAttribute('data-theme',m)}
function setTheme(m){sv('tth',m);applyTheme();$('#tb').outerHTML=themeBox()}
const menu=()=>themeBox()+`<div class="sec menu"><a href="#/cart">🛒 سبد خرید<span>‹</span></a><a href="#/cats">🗂️ دسته‌بندی‌ها<span>‹</span></a>${isDev()?'<a href="#/dev">🛠️ پنل توسعه‌دهنده<span>‹</span></a>':''}</div>`;
const dev=()=>!isDev()?'<div class="empty"><div style="font-size:60px">🔒</div>این بخش فقط برای توسعه‌دهنده سایت است.<br>با ایمیل توسعه‌دهنده وارد شوید.<br><br><a class="btn" href="#/me">ورود</a></div>':`${catsBox()}<div class="sec"><h3>🛠️ افزودن محصول</h3>
<label>نام محصول</label><input class="f" id="dn">
<label>قیمت (تومان)</label><input class="f" id="dp" type="number" inputmode="numeric">
<label>دسته‌بندی</label><select class="f" id="dc">${CATS.map(([n])=>`<option>${esc(n)}</option>`).join('')}</select>
<label>ایموجی (در صورت نبودن عکس)</label><input class="f" id="de" value="🛍️" maxlength="4">
<label>توضیحات محصول</label><textarea class="f" id="dd" rows="4"></textarea>
<label>عکس محصول (اختیاری)</label><input class="f" id="di" type="file" accept="image/*">
<button class="btn" onclick="addP()">افزودن محصول</button></div>
<div class="sec"><h3>محصولات (${fa(P.length)})</h3>${P.map(p=>`<div class="row"><div class="im">${img(p)}</div><div><div class="nm" style="height:auto">${esc(p.n)}</div><div class="sh">${fa(p.p)} تومان</div></div><button onclick="delP(${p.id})" style="border:0;background:none;font-size:18px">🗑️</button></div>`).join('')}
<button class="btn o" style="margin-top:12px" onclick="resetP()">بازگشت به محصولات اولیه</button></div>
${ordersBox()}`;
function addP(){const n=$('#dn').value.trim(),p=+$('#dp').value;if(!n||!(p>0))return toast('نام و قیمت را وارد کنید');if(!CATS.length)return toast('ابتدا یک دسته‌بندی بسازید');
const o={id:Date.now(),n,p,c:$('#dc').value,e:$('#de').value||'🛍️',d:$('#dd').value.trim().slice(0,2000)};
const f=$('#di').files[0];
const fin=()=>{P.push(o);sp();toast('محصول اضافه شد');go(1)};
if(!f)return fin();
const r=new FileReader();r.onload=()=>{const im=new Image();im.onerror=()=>toast('فایل تصویر معتبر نیست');im.onload=()=>{const k=300/Math.max(im.width,im.height,300),c=document.createElement('canvas');c.width=im.width*k;c.height=im.height*k;c.getContext('2d').drawImage(im,0,0,c.width,c.height);o.i=c.toDataURL('image/jpeg',.7);fin()};im.src=r.result};r.readAsDataURL(f)}
function delP(id){P=P.filter(p=>p.id!=id);fixC();sp();go(1)}
function resetP(){P=SEED.slice();sp();DEFCATS.forEach(d=>{if(!CATS.some(c=>c[0]==d[0]))CATS.push(d)});sv('tcat',CATS);fixC();go(1)}
const cartItems=()=>C.map(c=>({...P.find(p=>p.id==c.id),q:c.q})).filter(x=>x.n);
const en=s=>s.replace(/[۰-۹٠-٩]/g,d=>d.charCodeAt(0)&15);
const nz=s=>en(String(s)).toLowerCase().replace(/ي/g,'ی').replace(/ك/g,'ک').replace(/\u200c/g,' ').trim();
function checkout(){if(!cartItems().length)return cart();const t=cartItems().reduce((a,i)=>a+i.p*i.q,0),u=U||{};
return `<div class="sec"><h3>اطلاعات ارسال</h3><label>نام و نام خانوادگی</label><input class="f" id="cn" value="${esc(u.n||'')}"><label>شماره موبایل</label><input class="f" id="cp" type="tel" inputmode="numeric" placeholder="09123456789" value="${esc(u.p||'')}"><label>کد پستی (۱۰ رقمی)</label><input class="f" id="cz" inputmode="numeric" maxlength="10"><label>آدرس کامل</label><textarea class="f" id="ca" rows="3"></textarea><div class="row"><div style="flex:1">مبلغ قابل پرداخت</div><b>${fa(t)} تومان</b></div><button class="btn" onclick="pay()">پرداخت و ثبت سفارش</button></div>`}
function pay(){const n=$('#cn').value.trim(),p=en($('#cp').value.trim()),z=en($('#cz').value.trim()),a=$('#ca').value.trim();
if(n.length<3)return toast('نام را وارد کنید');if(!/^09\d{9}$/.test(p))return toast('شماره موبایل معتبر نیست');if(!/^\d{10}$/.test(z))return toast('کد پستی باید ۱۰ رقم باشد');if(a.length<10)return toast('آدرس را کامل وارد کنید');
const items=cartItems().map(i=>({n:i.n,p:i.p,q:i.q}));if(!items.length)return toast('سبد خرید خالی است');
const o={id:Date.now().toString().slice(-8),n,p,z,a,items,t:items.reduce((s,i)=>s+i.p*i.q,0),st:'pending',d:new Date().toISOString()};
O=O.filter(x=>x.st=='paid'||x.st=='shipped');O.push(o);sv('to',O);location.hash='#/pay/'+o.id}
function gate(id){const o=O.find(x=>x.id==id);if(!o||o.st!='pending')return'<div class="empty">تراکنش معتبر نیست</div>';
return `<div class="sec ok"><div style="font-size:48px">🏦</div><h3>درگاه پرداخت (نسخه آزمایشی)</h3><p class="sh">این صفحه شبیه‌ساز درگاه است و اطلاعات کارت دریافت نمی‌کند. برای پرداخت واقعی باید به درگاه پرداخت متصل شود.</p><div class="row"><div style="flex:1">شماره سفارش</div><b>${o.id}</b></div><div class="row"><div style="flex:1">مبلغ</div><b>${fa(o.t)} تومان</b></div><button class="btn" onclick="settle('${o.id}',1)">پرداخت موفق</button><button class="btn o" onclick="settle('${o.id}',0)">انصراف از پرداخت</button></div>`}
function settle(id,ok){const o=O.find(x=>x.id==id);if(!o||o.st!='pending')return;o.st=ok?'paid':'failed';sv('to',O);if(ok){C=[];sc()}else toast('پرداخت انجام نشد');location.hash=ok?'#/done/'+id:'#/cart'}
function done(id){const o=O.find(x=>x.id==id&&x.st=='paid');if(!o)return'<div class="empty">سفارش پیدا نشد</div>';
return `<div class="sec ok"><div style="font-size:56px">✅</div><h3>پرداخت موفق بود</h3><p class="sh">سفارش شماره ${o.id} ثبت شد و برای ارسال آماده می‌شود.</p><a class="btn" href="#/">بازگشت به خانه</a></div>`}
const lockBox=()=>'<div class="empty"><div style="font-size:60px">🔒</div>این بخش فقط برای توسعه‌دهنده سایت است.<br>با ایمیل توسعه‌دهنده وارد شوید.<br><br><a class="btn" href="#/me">ورود</a></div>';
const ordCard=(o,b)=>`<div class="ord"><div class="oh"><b>#${o.id}</b><span class="chip">${new Date(o.d).toLocaleString('fa-IR')}</span><b class="pr" style="margin-right:auto">${fa(o.t)} تومان</b></div><div>👤 ${esc(o.n)} - 📞 ${esc(o.p)}</div><div>📮 کد پستی: ${esc(o.z)}</div><div>📍 ${esc(o.a)}</div><div class="sh" style="margin-top:6px">${o.items.map(i=>esc(i.n)+' × '+fa(i.q)).join('<br>')}</div>${b}</div>`;
function ordersBox(){const L=O.filter(o=>o.st=='paid').slice().reverse(),tot=L.reduce((s,o)=>s+o.t,0),n=O.filter(o=>o.st=='shipped').length;
return `<div class="sec"><h3>📦 سفارش‌های پرداخت‌شده (${fa(L.length)})</h3><a class="btn o" href="#/dev/shipped" style="margin-bottom:10px;text-align:center">📬 سفارش‌های ارسال‌شده (${fa(n)})</a>${L.length?`<div class="sh" style="margin-bottom:8px">مجموع فروش: ${fa(tot)} تومان</div>`+L.map(o=>ordCard(o,`<button class="btn" style="margin-top:8px" onclick="ship('${o.id}')">✅ ارسال شد</button>`)).join(''):'<div class="sh">سفارشی در انتظار ارسال نیست</div>'}</div>`}
function shipped(){const L=O.filter(o=>o.st=='shipped').slice().reverse();
return `<div class="sec"><a href="#/dev" class="chip">‹ بازگشت به پنل</a><h3 style="margin-top:12px">📬 سفارش‌های ارسال‌شده (${fa(L.length)})</h3>${L.length?L.map(o=>ordCard(o,`<div class="sh" style="margin-top:6px">زمان ارسال: ${new Date(o.sd||o.d).toLocaleString('fa-IR')}</div><button class="btn o" style="margin-top:8px" onclick="unship('${o.id}')">بازگرداندن به لیست پرداخت‌شده</button>`)).join(''):'<div class="sh">هنوز سفارشی ارسال نشده</div>'}</div>`}
function mv(id,st){if(!isDev())return;const o=O.find(x=>x.id==id);if(!o)return;o.st=st;o.sd=new Date().toISOString();sv('to',O);go(1);toast(st=='shipped'?'به سفارش‌های ارسال‌شده منتقل شد':'به لیست پرداخت‌شده برگشت')}
function ship(id){mv(id,'shipped')}
function unship(id){mv(id,'paid')}
function catsBox(){return `<div class="sec"><h3>🗂️ مدیریت دسته‌بندی‌ها (${fa(CATS.length)})</h3><label>نام دسته‌بندی جدید</label><input class="f" id="kn" maxlength="30"><label>ایموجی دسته‌بندی</label><input class="f" id="ke" value="🏷️" maxlength="4"><button class="btn" onclick="addCat()">افزودن دسته‌بندی</button><div style="margin-top:12px">${CATS.map(([n,e],i)=>`<div class="row"><div style="font-size:24px">${esc(e)}</div><div style="flex:1">${esc(n)}</div><span class="chip">${fa(P.filter(p=>p.c==n).length)} کالا</span><button onclick="delCat(${i})" style="border:0;background:none;font-size:18px">🗑️</button></div>`).join('')}</div></div>`}
function addCat(){if(!isDev())return;const n=$('#kn').value.trim(),e=$('#ke').value.trim()||'🏷️';if(!n)return toast('نام دسته‌بندی را وارد کنید');if(CATS.some(c=>c[0]==n))return toast('این دسته‌بندی وجود دارد');CATS.push([n,e]);sv('tcat',CATS);toast('دسته‌بندی اضافه شد');go(1)}
function delCat(i){if(!isDev()||!CATS[i])return;const n=CATS[i][0];if(P.some(p=>p.c==n))return toast('ابتدا محصولات این دسته را حذف کنید');CATS=CATS.filter(c=>c[0]!=n);sv('tcat',CATS);go(1)}
let AM='in';
function setAM(m){AM=m;go(1)}
const hx=b=>[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('');
async function hp(pw,salt){const k=await crypto.subtle.importKey('raw',new TextEncoder().encode(pw),'PBKDF2',false,['deriveBits']);return hx(await crypto.subtle.deriveBits({name:'PBKDF2',salt:new TextEncoder().encode(salt),iterations:150000,hash:'SHA-256'},k,256))}
function authBox(){const r=AM=='up';return `<div class="sec"><div class="seg" style="margin-bottom:12px"><button class="${r?'':'on'}" onclick="setAM('in')">ورود</button><button class="${r?'on':''}" onclick="setAM('up')">ثبت‌نام</button></div>${r?`<label>نام و نام خانوادگی</label><input class="f" id="un" autocomplete="name">`:''}<label>ایمیل</label><input class="f" id="ue" type="email" dir="ltr" autocomplete="email" placeholder="name@example.com">${r?`<label>شماره موبایل</label><input class="f" id="up" type="tel" inputmode="numeric" placeholder="09123456789">`:''}<label>رمز عبور</label><input class="f" id="uw" type="password" dir="ltr" autocomplete="${r?'new-password':'current-password'}">${r?`<label>تکرار رمز عبور</label><input class="f" id="uw2" type="password" dir="ltr" autocomplete="new-password">`:''}<button class="btn" onclick="${r?'signup()':'login()'}">${r?'ثبت‌نام':'ورود'}</button></div>`}
async function signup(){const n=$('#un').value.trim(),e=$('#ue').value.trim().toLowerCase(),p=en($('#up').value.trim()),w=$('#uw').value;
if(n.length<3)return toast('نام را وارد کنید');if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e))return toast('ایمیل معتبر نیست');if(!/^09\d{9}$/.test(p))return toast('شماره موبایل معتبر نیست');if(w.length<8)return toast('رمز عبور باید حداقل ۸ کاراکتر باشد');if(w!==$('#uw2').value)return toast('تکرار رمز عبور مطابقت ندارد');
if(!window.crypto||!crypto.subtle)return toast('مرورگر شما از رمزنگاری پشتیبانی نمی‌کند');
const X=ld('tx',[]);if(X.some(u=>u.e==e))return toast('با این ایمیل قبلاً ثبت‌نام شده است');
const s=hx(crypto.getRandomValues(new Uint8Array(16)));X.push({n,e,p,s,h:await hp(w,s)});sv('tx',X);U={n,e,p};sv('tu',U);go()}
async function login(){const e=$('#ue').value.trim().toLowerCase(),w=$('#uw').value;if(!e||!w)return toast('ایمیل و رمز عبور را وارد کنید');
if(!window.crypto||!crypto.subtle)return toast('مرورگر شما از رمزنگاری پشتیبانی نمی‌کند');
const u=ld('tx',[]).find(x=>x.e==e);if(!u||await hp(w,u.s)!==u.h)return toast('ایمیل یا رمز عبور اشتباه است');
U={n:u.n,e:u.e,p:u.p};sv('tu',U);go()}
function go(keep){const h=(location.hash||'#/').slice(1),[,r,a]=h.split('/');let arg=a||'';try{arg=decodeURIComponent(arg)}catch(e){}
let x;
if(r==='cats')x=cats();else if(r==='cart')x=cart();else if(r==='me')x=me();else if(r==='dev')x=!isDev()?lockBox():arg==='shipped'?shipped():dev();
else if(r==='checkout')x=checkout();else if(r==='pay')x=gate(arg);else if(r==='done')x=done(arg);
else if(r==='p')x=prod(arg);
else if(r==='c')x=list(arg,P.filter(p=>p.c==arg));
else if(r==='s')x=list('نتایج جستجو برای «'+arg+'»',P.filter(p=>nz(p.n).includes(nz(arg))));
else x=home();
$('#v').innerHTML=x;nav();if(keep!==1)window.scrollTo(0,0)}
$('#q').addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.value.trim())location.hash='#/s/'+encodeURIComponent(e.target.value.trim())});
addEventListener('hashchange',go);applyTheme();go();

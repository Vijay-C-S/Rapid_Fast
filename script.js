const preloader=document.getElementById('preloader');if(preloader){window.addEventListener('load',()=>{setTimeout(()=>{preloader.classList.add('hidden');},2000);});}
const navbar=document.getElementById('navbar');if(navbar){window.addEventListener('scroll',()=>{if(window.scrollY>50){navbar.classList.add('scrolled');}else{navbar.classList.remove('scrolled');}});}
const hamburger=document.getElementById('hamburger');const navMenu=document.getElementById('nav-menu');const navLinks=document.querySelectorAll('.nav-link');if(hamburger&&navMenu){hamburger.addEventListener('click',()=>{hamburger.classList.toggle('active');navMenu.classList.toggle('active');});navLinks.forEach(link=>{link.addEventListener('click',()=>{hamburger.classList.remove('active');navMenu.classList.remove('active');});});}
const sections=document.querySelectorAll('section[id]');if(sections.length>0&&navLinks.length>0){window.addEventListener('scroll',()=>{const scrollY=window.pageYOffset;sections.forEach(section=>{const sectionHeight=section.offsetHeight;const sectionTop=section.offsetTop-100;const sectionId=section.getAttribute('id');const navLink=document.querySelector(`.nav-link[href="#${sectionId}"], .nav-link[href="/#${sectionId}"]`);if(navLink&&scrollY>sectionTop&&scrollY<=sectionTop+sectionHeight){navLinks.forEach(link=>link.classList.remove('active'));navLink.classList.add('active');}});});}
const themeToggle=document.getElementById('theme-toggle');const body=document.body;const savedTheme=localStorage.getItem('theme');const initialTheme=(savedTheme==='dark'||savedTheme==='light')?savedTheme:'light';body.setAttribute('data-theme',initialTheme);
if(themeToggle){themeToggle.addEventListener('click',()=>{const currentTheme=body.getAttribute('data-theme');const newTheme=currentTheme==='dark'?'light':'dark';body.setAttribute('data-theme',newTheme);localStorage.setItem('theme',newTheme);});}

// Global WhatsApp floating channel button for all pages.
(function(){
if(document.querySelector('.whatsapp-float'))return;
const waStyle=document.createElement('style');waStyle.textContent=`
.whatsapp-float{position:fixed;bottom:42px;right:42px;width:60px;height:60px;background-color:#25d366;border-radius:50%;display:flex;justify-content:center;align-items:center;box-shadow:2px 2px 10px rgba(0,0,0,0.2);z-index:2147483647;animation:pulse-animation 2s infinite}
.whatsapp-float img{width:35px;height:35px}
@keyframes pulse-animation{0%{transform:scale(1);box-shadow:0 0 0 0 rgba(37,211,102,0.7)}50%{transform:scale(1.1);box-shadow:0 0 0 15px rgba(37,211,102,0)}100%{transform:scale(1);box-shadow:0 0 0 0 rgba(37,211,102,0)}}
.whatsapp-float:hover{animation:none;transform:scale(1.1);transition:transform 0.2s ease-in-out}
@media (max-width:576px){.whatsapp-float{right:18px;bottom:22px;width:52px;height:52px}.whatsapp-float img{width:28px;height:28px}}
`;document.head.appendChild(waStyle);
const waLink=document.createElement('a');waLink.href='https://whatsapp.com/channel/0029Vb7OqCF3QxS6oVWKm83a';waLink.className='whatsapp-float';waLink.target='_blank';waLink.rel='noopener noreferrer';waLink.setAttribute('aria-label','Follow us on WhatsApp Channel');waLink.innerHTML='<img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="Chat with us on WhatsApp" />';document.body.appendChild(waLink);
})();

const counters=document.querySelectorAll('.stat-number');const counterObserver=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){const counter=entry.target;const target=parseInt(counter.getAttribute('data-count'));animateCounter(counter,target);counterObserver.unobserve(counter);}});},{threshold:0.5});counters.forEach(counter=>counterObserver.observe(counter));function animateCounter(element,target){let current=0;const increment=target/100;const duration=2000;const stepTime=duration/100;const timer=setInterval(()=>{current+=increment;if(current>=target){element.textContent=target.toLocaleString();clearInterval(timer);}else{element.textContent=Math.floor(current).toLocaleString();}},stepTime);}
const filterBtns=document.querySelectorAll('.filter-btn');const jobCards=document.querySelectorAll('.job-card');function getActiveFilter(){const activeBtn=document.querySelector('.filter-btn.active');return activeBtn?activeBtn.getAttribute('data-filter'):'all';}function getSearchQuery(){const searchInput=document.getElementById('job-search');return searchInput?searchInput.value.toLowerCase().trim():'';}function getCardSearchText(card){const title=card.querySelector('.job-title');const company=card.querySelector('.job-info h4');const location=card.querySelector('.job-location');const tags=card.querySelectorAll('.tag');const badge=card.querySelector('.job-badge');const salary=card.querySelector('.salary');const jobType=card.querySelector('.job-type');let text='';if(title)text+=title.textContent+' ';if(company)text+=company.textContent+' ';if(location)text+=location.textContent+' ';if(badge)text+=badge.textContent+' ';if(salary)text+=salary.textContent+' ';if(jobType)text+=jobType.textContent+' ';tags.forEach(tag=>{text+=tag.textContent+' ';});return text.toLowerCase();}function filterAndSearchJobs(){const filter=getActiveFilter();const query=getSearchQuery();let visibleCount=0;const totalCount=jobCards.length;jobCards.forEach(card=>{const matchesFilter=filter==='all'||card.getAttribute('data-type')===filter;const matchesSearch=!query||getCardSearchText(card).includes(query);if(matchesFilter&&matchesSearch){card.style.display='block';card.style.animation='fadeIn 0.5s ease';visibleCount++;}else{card.style.display='none';}});const noResults=document.getElementById('no-results');const searchCount=document.getElementById('job-search-count');if(noResults){noResults.style.display=visibleCount===0?'block':'none';}if(searchCount){if(query){searchCount.textContent=`Showing ${visibleCount} of ${totalCount} jobs`;}else{searchCount.textContent='';}}}filterBtns.forEach(btn=>{btn.addEventListener('click',()=>{filterBtns.forEach(b=>b.classList.remove('active'));btn.classList.add('active');filterAndSearchJobs();});});const jobSearchInput=document.getElementById('job-search');const jobSearchClear=document.getElementById('job-search-clear');if(jobSearchInput){let searchTimeout;jobSearchInput.addEventListener('input',()=>{clearTimeout(searchTimeout);searchTimeout=setTimeout(()=>{filterAndSearchJobs();if(jobSearchClear){jobSearchClear.style.display=jobSearchInput.value?'flex':'none';}},200);});}if(jobSearchClear){jobSearchClear.addEventListener('click',()=>{jobSearchInput.value='';jobSearchClear.style.display='none';filterAndSearchJobs();jobSearchInput.focus();});}const style=document.createElement('style');style.textContent=`
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;document.head.appendChild(style);function checkJobDeadlines(){const jobCardsWithDeadline=document.querySelectorAll('.job-card[data-deadline]');const now=new Date();jobCardsWithDeadline.forEach(card=>{const deadlineStr=card.getAttribute('data-deadline');const deadline=new Date(deadlineStr);if(now>deadline){const deadlineTag=card.querySelector('.deadline-tag')||card.querySelector('.tag[style*="color: #ef4444"]');const applyBtn=card.querySelector('.apply-btn');const badge=card.querySelector('.job-badge');if(deadlineTag){deadlineTag.textContent='❌ Registration Closed';deadlineTag.style.background='#f3f4f6';deadlineTag.style.color='#6b7280';}
if(applyBtn){applyBtn.textContent='Registration Closed';applyBtn.style.background='#9ca3af';applyBtn.style.cursor='not-allowed';applyBtn.style.pointerEvents='none';applyBtn.removeAttribute('href');}
const viewJobBtn=card.querySelector('.view-job-btn');if(viewJobBtn){viewJobBtn.innerHTML='<i class="fas fa-ban"></i> Registration Closed';viewJobBtn.style.background='#9ca3af';viewJobBtn.style.cursor='not-allowed';viewJobBtn.style.pointerEvents='none';viewJobBtn.removeAttribute('href');}
if(badge){badge.textContent='⏰ EXPIRED';badge.style.background='linear-gradient(135deg, #6b7280, #4b5563)';}
card.style.borderColor='#d1d5db';card.classList.remove('hot-job');card.classList.add('expired-job');}});}
checkJobDeadlines();setInterval(checkJobDeadlines,60000);const bookmarkBtns=document.querySelectorAll('.bookmark-btn');bookmarkBtns.forEach(btn=>{btn.addEventListener('click',()=>{const icon=btn.querySelector('i');icon.classList.toggle('far');icon.classList.toggle('fas');if(icon.classList.contains('fas')){showNotification('Job bookmarked successfully! 📌');}else{showNotification('Bookmark removed');}});});function showNotification(message){const notification=document.createElement('div');notification.className='notification';notification.innerHTML=message;notification.style.cssText=`
        position: fixed;
        bottom: 100px;
        right: 30px;
        padding: 1rem 1.5rem;
        background: linear-gradient(135deg, #6366f1, #ec4899);
        color: white;
        border-radius: 10px;
        font-weight: 500;
        z-index: 9999;
        animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s;
        box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
    `;document.body.appendChild(notification);setTimeout(()=>{notification.remove();},3000);}
const notifStyle=document.createElement('style');notifStyle.textContent=`
    @keyframes slideIn {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideOut {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
    }
`;document.head.appendChild(notifStyle);function updateCountdowns(){const countdowns=document.querySelectorAll('.countdown');countdowns.forEach(countdown=>{let time=countdown.textContent.split(':');let hours=parseInt(time[0]);let minutes=parseInt(time[1]);let seconds=parseInt(time[2]);seconds--;if(seconds<0){seconds=59;minutes--;}
if(minutes<0){minutes=59;hours--;}
if(hours<0){hours=23;}
countdown.textContent=`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;});}
setInterval(updateCountdowns,1000);const backToTop=document.getElementById('back-to-top');window.addEventListener('scroll',()=>{if(window.scrollY>500){backToTop.classList.add('visible');}else{backToTop.classList.remove('visible');}});backToTop.addEventListener('click',()=>{window.scrollTo({top:0,behavior:'smooth'});});const newsletterForm=document.getElementById('newsletter-form');const contactForm=document.getElementById('contact-form');newsletterForm.addEventListener('submit',(e)=>{e.preventDefault();const email=newsletterForm.querySelector('input').value;if(validateEmail(email)){showNotification('🎉 Successfully subscribed! Welcome aboard!');newsletterForm.reset();}else{showNotification('❌ Please enter a valid email address');}});contactForm.addEventListener('submit',(e)=>{e.preventDefault();showNotification('✅ Message sent successfully! We\'ll get back to you soon.');contactForm.reset();});function validateEmail(email){const re=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;return re.test(email);}
const revealElements=document.querySelectorAll('.service-card, .tech-card, .job-card, .income-card, .offer-card, .testimonial-card');const revealObserver=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.style.opacity='1';entry.target.style.transform='translateY(0)';revealObserver.unobserve(entry.target);}});},{threshold:0.1,rootMargin:'0px 0px -50px 0px'});revealElements.forEach(element=>{element.style.opacity='0';element.style.transform='translateY(30px)';element.style.transition='opacity 0.6s ease, transform 0.6s ease';revealObserver.observe(element);});window.addEventListener('scroll',()=>{const scrolled=window.pageYOffset;const shapes=document.querySelectorAll('.shape');shapes.forEach((shape,index)=>{const speed=(index+1)*0.1;shape.style.transform=`translateY(${scrolled * speed}px)`;});});const heroTitle=document.querySelector('.hero-title');if(heroTitle){const spans=heroTitle.querySelectorAll('.gradient-text');spans.forEach((span,index)=>{span.style.animation=`fadeInUp 0.8s ease ${index * 0.3}s forwards`;span.style.opacity='0';});}
const typingStyle=document.createElement('style');typingStyle.textContent=`
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;document.head.appendChild(typingStyle);document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach(anchor=>{anchor.addEventListener('click',function(e){const href=this.getAttribute('href');const hash=href.includes('#')?'#'+href.split('#')[1]:href;const target=document.querySelector(hash);if(target){e.preventDefault();const offsetTop=target.offsetTop-80;window.scrollTo({top:offsetTop,behavior:'smooth'});}});});const cards=document.querySelectorAll('.service-card, .job-card, .income-card, .offer-card');cards.forEach(card=>{card.addEventListener('mousemove',(e)=>{const rect=card.getBoundingClientRect();const x=e.clientX-rect.left;const y=e.clientY-rect.top;const centerX=rect.width/2;const centerY=rect.height/2;const rotateX=(y-centerY)/20;const rotateY=(centerX-x)/20;card.style.transform=`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;});card.addEventListener('mouseleave',()=>{card.style.transform='perspective(1000px) rotateX(0) rotateY(0) translateY(0)';});});if('serviceWorker'in navigator){window.addEventListener('load',()=>{console.log('GetUpdated website loaded successfully!');});}
const konamiCode=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];let konamiIndex=0;document.addEventListener('keydown',(e)=>{if(e.key===konamiCode[konamiIndex]){konamiIndex++;if(konamiIndex===konamiCode.length){showNotification('🎮 Konami Code activated! You found the secret! 🎉');document.body.style.animation='rainbow 2s ease';konamiIndex=0;}}else{konamiIndex=0;}});const rainbowStyle=document.createElement('style');rainbowStyle.textContent=`
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;document.head.appendChild(rainbowStyle);document.addEventListener('DOMContentLoaded',()=>{console.log('%c GetUpdated','font-size: 24px; font-weight: bold; color: #6366f1');console.log('%c Welcome to GetUpdated - Your Gateway to Success!','font-size: 14px; color: #ec4899;');});(function(){if(localStorage.getItem('cookieConsent'))return;const banner=document.createElement('div');banner.id='cookie-consent';banner.innerHTML=`
        <div style="position:fixed;bottom:0;left:0;right:0;background:#1e1e2e;color:#e0e0e0;padding:16px 24px;z-index:99999;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:12px;font-family:'Poppins',sans-serif;font-size:14px;box-shadow:0 -2px 20px rgba(0,0,0,0.3);">
            <p style="margin:0;flex:1;min-width:0;max-width:100%;line-height:1.6;overflow-wrap:anywhere;word-break:break-word;">
                We use cookies to enhance your experience, serve personalized ads through Google AdSense, and analyze traffic.
                By clicking "Accept All", you consent to our use of cookies.
                <a href="/privacy-policy.html" style="color:#818cf8;text-decoration:underline;">Privacy Policy</a>
            </p>
            <div style="display:flex;gap:8px;flex-shrink:0;">
                <button id="cookie-reject" style="padding:10px 20px;border:1px solid #818cf8;background:transparent;color:#818cf8;border-radius:8px;cursor:pointer;font-family:inherit;font-size:13px;font-weight:500;">Reject</button>
                <button id="cookie-accept" style="padding:10px 20px;border:none;background:linear-gradient(135deg,#6366f1,#ec4899);color:#fff;border-radius:8px;cursor:pointer;font-family:inherit;font-size:13px;font-weight:600;">Accept All</button>
            </div>
        </div>
    `;document.body.appendChild(banner);document.getElementById('cookie-accept').addEventListener('click',function(){localStorage.setItem('cookieConsent','accepted');banner.remove();});document.getElementById('cookie-reject').addEventListener('click',function(){localStorage.setItem('cookieConsent','rejected');banner.remove();});})();

// Temporary Adsterra fallback while AdSense is suspended. Keeps existing AdSense code untouched.
(function(){
const fallbackWindowDays=29;
const activationKey='getupdated_adsterra_activation_date';
const existingActivation=localStorage.getItem(activationKey);
const activationTime=existingActivation?Number(existingActivation):Date.now();
if(!existingActivation){localStorage.setItem(activationKey,String(activationTime));}
if(Number.isNaN(activationTime))return;
if(Date.now()-activationTime>fallbackWindowDays*24*60*60*1000)return;

const adsterraConfig=window.GETUPDATED_ADSTERRA||{
banner300:{
key:'8c8e95641949eb53920ed955003e36a9',
format:'iframe',
height:250,
width:300,
params:{}
},
banner728:{
key:'935fe7821d46927df6296fe874433356',
format:'iframe',
height:90,
width:728,
params:{}
}
};

const bannerUnits=[adsterraConfig.banner300,adsterraConfig.banner728].filter(unit=>{
if(!unit||typeof unit!=='object')return false;
if(typeof unit.key!=='string'||unit.key.trim()==='')return false;
if(typeof unit.width!=='number'||typeof unit.height!=='number')return false;
return true;
});
if(bannerUnits.length===0)return;

if(!document.getElementById('adsterra-fallback-style')){
const style=document.createElement('style');
style.id='adsterra-fallback-style';
style.textContent=`
.adsterra-slot{width:100%;display:flex;justify-content:center;align-items:center;margin:22px 0;overflow:hidden}
.adsterra-slot iframe{max-width:100%}
`;document.head.appendChild(style);
}

function insertSlot(afterNode,minHeight){
if(!afterNode||!afterNode.parentNode)return null;
const slot=document.createElement('div');
slot.className='adsterra-slot';
slot.style.minHeight=minHeight+'px';
afterNode.parentNode.insertBefore(slot,afterNode.nextSibling);
return slot;
}

const articleParagraphs=document.querySelectorAll('.article-content p,.blog-content p,article p,main p');
let primarySlot=null;
let secondarySlot=null;

if(articleParagraphs.length>=3){primarySlot=insertSlot(articleParagraphs[2],250);}
if(articleParagraphs.length>=8){secondarySlot=insertSlot(articleParagraphs[7],90);}

if(!primarySlot){
const firstMainBlock=document.querySelector('main .container, main, .main-content, .content-wrapper, .blogs-grid, .jobs-grid, .offers-grid');
if(firstMainBlock){
primarySlot=document.createElement('div');
primarySlot.className='adsterra-slot';
primarySlot.style.minHeight='250px';
firstMainBlock.prepend(primarySlot);
}
}

if(!secondarySlot){
const footer=document.querySelector('footer');
if(footer){
secondarySlot=document.createElement('div');
secondarySlot.className='adsterra-slot';
secondarySlot.style.minHeight='90px';
footer.parentNode.insertBefore(secondarySlot,footer);
}
}

const targets=[];
if(primarySlot)targets.push(primarySlot);
if(secondarySlot)targets.push(secondarySlot);
if(targets.length===0)return;

function loadBannerUnit(target,unit){
return new Promise(resolve=>{
if(!target||!unit){resolve();return;}
const payload={
key:unit.key,
format:unit.format||'iframe',
height:unit.height,
width:unit.width,
params:unit.params||{}
};
const optionsScript=document.createElement('script');
optionsScript.text='atOptions = '+JSON.stringify(payload)+';';
document.body.appendChild(optionsScript);
optionsScript.remove();
const invokeScript=document.createElement('script');
invokeScript.src='https://www.highperformanceformat.com/'+unit.key+'/invoke.js';
invokeScript.async=false;
invokeScript.onload=()=>resolve();
invokeScript.onerror=()=>resolve();
target.appendChild(invokeScript);
});
}

const placements=[
{slot:primarySlot,unit:bannerUnits[0]},
{slot:secondarySlot,unit:bannerUnits[1]}
].filter(item=>item.slot&&item.unit);

(async()=>{
for(const placement of placements){
await loadBannerUnit(placement.slot,placement.unit);
}
})();
})();

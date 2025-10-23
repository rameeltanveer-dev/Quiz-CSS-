/* CSS Quiz JS - Full Version by Rameel Tanveer */

const TOTAL_MINUTES = 40;
const PER_QUESTION_SECONDS = 40;
const TOTAL_SECONDS = TOTAL_MINUTES * 60;

// ---------- QUESTION BANK ----------
const BANK = [
  // Colors
  {q:"Which CSS property sets text color?", a:"color", o:["font-color","text-color","color","foreground"], topic:"Colors"},
  {q:"Which HEX code represents black?", a:"#000000", o:["#FFFFFF","#000000","#FF0000","#00FF00"], topic:"Colors"},
  {q:"How to prevent background image repeating?", a:"background-repeat: no-repeat;", o:["background-repeat: repeat-x;","background-repeat: no-repeat;","background-attach: fixed;","repeat: none;"], topic:"Colors"},
  {q:"Which property sets background color?", a:"background-color", o:["bgcolor","background-color","color-bg","bg"], topic:"Colors"},
  {q:"What does rgba(0,0,0,0.5) control?", a:"color with opacity", o:["font size","color with opacity","border style","background-image"], topic:"Colors"},
  {q:"HEX #FFFFFF means which color?", a:"white", o:["black","white","gray","transparent"], topic:"Colors"},

  // Text & Fonts
  {q:"Which property controls font size?", a:"font-size", o:["font-weight","font-size","font-family","text-size"], topic:"Text & Fonts"},
  {q:"Which property makes text bold?", a:"font-weight", o:["font-style","font-weight","font-variant","text-bold"], topic:"Text & Fonts"},
  {q:"How to make text uppercase?", a:"text-transform: uppercase;", o:["text-case: upper;","text-transform: uppercase;","font-variant: caps;","transform-text:upper"], topic:"Text & Fonts"},
  {q:"Which property sets font family?", a:"font-family", o:["font","font-family","font-type","typeface"], topic:"Text & Fonts"},
  {q:"How to underline text via CSS?", a:"text-decoration: underline;", o:["text-underline: true;","text-decoration: underline;","underline:true;","font-decoration: underline;"], topic:"Text & Fonts"},
  {q:"Which property changes line height?", a:"line-height", o:["line-space","line-height","text-gap","height-line"], topic:"Text & Fonts"},
  {q:"What property adjusts letter spacing?", a:"letter-spacing", o:["word-spacing","letter-spacing","text-space","char-spacing"], topic:"Text & Fonts"},

  // Box Model
  {q:"Which property sets inner spacing?", a:"padding", o:["margin","padding","border","gap"], topic:"Box Model"},
  {q:"Which property sets outer spacing?", a:"margin", o:["padding","margin","gap","spacing"], topic:"Box Model"},
  {q:"Shorthand for border width, style and color?", a:"border: 2px solid black;", o:["border: 2px solid black;","border-width:2px;","border-style:solid;","border-color:black;"], topic:"Box Model"},
  {q:"How to make corners rounded?", a:"border-radius", o:["border-round","border-radius","corner-radius","round-corner"], topic:"Box Model"},
  {q:"Which property controls overflow?", a:"overflow", o:["overflow","wrap","clip","flow"], topic:"Box Model"},
  {q:"Which sets width of box?", a:"width", o:["size","width","box-width","max-width"], topic:"Box Model"},
  {q:"Which property controls box shadow?", a:"box-shadow", o:["shadow","box-shadow","text-shadow","drop-shadow"], topic:"Box Model"},

  // Positioning
  {q:"position: absolute; positions relative to?", a:"nearest positioned ancestor", o:["viewport","nearest positioned ancestor","body element","document"], topic:"Positioning"},
  {q:"What does position: fixed do?", a:"fixes element relative to viewport", o:["fixes within parent","fixes element relative to viewport","makes element static","removes element"], topic:"Positioning"},
  {q:"How to center block horizontally?", a:"margin: 0 auto;", o:["align:center;","margin:0 auto;","text-align:center;","position:center;"], topic:"Positioning"},
  {q:"Which property controls stacking order?", a:"z-index", o:["z-index","stack-order","order","layer"], topic:"Positioning"},
  {q:"Which position keeps element in normal flow?", a:"static", o:["static","relative","absolute","fixed"], topic:"Positioning"},
  {q:"Relative position moves element relative to?", a:"its normal position", o:["viewport","parent","its normal position","document"], topic:"Positioning"},

  // Flexbox
  {q:"How to make a container flex?", a:"display: flex;", o:["display:block;","display:flex;","display:inline;","flex:yes;"], topic:"Flexbox"},
  {q:"Center items horizontally in flex?", a:"justify-content: center;", o:["align-items:center;","justify-content:center;","flex-center:true;","center-items:both;"], topic:"Flexbox"},
  {q:"Center items vertically in flex?", a:"align-items: center;", o:["align-items:center;","justify-items:center;","vertical-align:center;","align-content:center;"], topic:"Flexbox"},
  {q:"Space between items in flex?", a:"justify-content: space-between;", o:["space-between","justify:space","justify-content: space-between;","gap:space"], topic:"Flexbox"},
  {q:"Which property wraps flex items?", a:"flex-wrap", o:["wrap","flex-wrap","flex-flow","flex-direction"], topic:"Flexbox"},
  {q:"How to set direction in flex?", a:"flex-direction", o:["flex-direction","direction","flex-flow","align-direction"], topic:"Flexbox"},
  {q:"Shorthand for flex grow/shrink/basis?", a:"flex", o:["flex","flex-basis","flex-flow","flex-grow"], topic:"Flexbox"},

  // Misc
  {q:"Which rule imports fonts?", a:"@import url('font-link');", o:["@font-face","@import url('font-link');","@font-link","@font"], topic:"Misc"},
  {q:"How to hide element but keep space?", a:"visibility: hidden;", o:["display:none;","visibility:hidden;","opacity:0;","hide:true;"], topic:"Misc"},
  {q:"Which hides element completely and removes space?", a:"display: none;", o:["visibility:hidden;","display:none;","opacity:0;","hidden:true;"], topic:"Misc"},
  {q:"How to write CSS comment?", a:"/* comment */", o:["// comment","/* comment */","<!-- comment -->","# comment"], topic:"Misc"},
  {q:"What does box-sizing:border-box do?", a:"includes padding in width", o:["excludes padding","includes padding in width","collapses margin","adds border outside"], topic:"Misc"},
  {q:"Which selects class in CSS?", a:".classname", o:["#classname",".classname","classname","*classname"], topic:"Misc"},
  {q:"Which property centers inline text?", a:"text-align", o:["align","text-align","center-inline","inline-align"], topic:"Misc"}
];

// ---------- STATE ----------
let userName=null;
let attemptedKey='css_quiz_attempts_v1';
let questions=[],current=0,correct=0,wrong=0,perTopic={},totalSecondsLeft=TOTAL_SECONDS,perQuestionSecondsLeft=PER_QUESTION_SECONDS,globalTimerId=null,questionTimerId=null,answeredThisQ=false;
const FIXED_WHATSAPP='+923196393269';
const FIXED_EMAIL='rameeltanveer19@gmail.com';

// ---------- UI refs ----------
const loginSection=document.getElementById('loginSection');
const nameInput=document.getElementById('nameInput');
const startWithName=document.getElementById('startWithName');
const loginMsg=document.getElementById('loginMsg');
const quizApp=document.getElementById('quizApp');
const progressText=document.getElementById('progressText');
const topicBadge=document.getElementById('topicBadge');
const questionText=document.getElementById('questionText');
const optionsList=document.getElementById('optionsList');
const nextBtn=document.getElementById('nextBtn');
const prevBtn=document.getElementById('prevBtn');
const globalTimerEl=document.getElementById('globalTimer');
const qTimerEl=document.getElementById('qTimer');

// ---------- HELPERS ----------
function formatTime(s){ const m=Math.floor(s/60).toString().padStart(2,'0'); const sec=(s%60).toString().padStart(2,'0'); return `${m}:${sec}`; }
function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]] } return a; }
function escapeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function unescapeHtml(s){ return String(s).replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&'); }
function getDeviceKey(){ return navigator.userAgent + navigator.platform; }
function hasAttempted(name){ const raw=localStorage.getItem(attemptedKey); if(!raw) return false; try{ const t=JSON.parse(raw); return !!t[name.trim().toLowerCase()] && t[name.trim().toLowerCase()].device===getDeviceKey(); }catch(e){ return false; } }
function markAttempted(name,resultObj){ const raw=localStorage.getItem(attemptedKey); let t={}; if(raw){ try{ t=JSON.parse(raw) }catch(e){ t={}; } } t[name.trim().toLowerCase()]={time:Date.now(),result:resultObj,device:getDeviceKey()}; localStorage.setItem(attemptedKey,JSON.stringify(t)); }

// ---------- QUIZ FLOW ----------
startWithName.addEventListener('click',()=>{
  const val=(nameInput.value||'').trim();
  if(!val){ loginMsg.textContent="Please enter your name"; return; }
  if(hasAttempted(val)){ loginMsg.textContent="You have already attempted this quiz from this device."; return; }
  userName=val; beginQuiz();
});
nameInput.addEventListener('keydown',(e)=>{ if(e.key==='Enter') startWithName.click(); });

function beginQuiz(){
  questions=shuffle(BANK.slice(0,40));
  current=0; correct=0;
wrong=0; perTopic={};
questions.forEach(q=>{ if(!perTopic[q.topic]) perTopic[q.topic]={total:0,correct:0,wrong:0}; perTopic[q.topic].total++; });

loginSection.classList.add('hidden'); 
quizApp.classList.remove('hidden');

totalSecondsLeft=TOTAL_SECONDS; 
perQuestionSecondsLeft=PER_QUESTION_SECONDS;
globalTimerEl.textContent=formatTime(totalSecondsLeft);
qTimerEl.textContent=formatTime(perQuestionSecondsLeft);

startGlobalTimer(); 
loadQuestion();
}

// ---------- TIMERS ----------
function startGlobalTimer(){ 
    stopGlobalTimer(); 
    globalTimerId=setInterval(()=>{
        totalSecondsLeft--; 
        if(totalSecondsLeft<0){ clearInterval(globalTimerId); finishQuiz(); return; } 
        globalTimerEl.textContent=formatTime(totalSecondsLeft); 
    },1000); 
}
function stopGlobalTimer(){ if(globalTimerId) clearInterval(globalTimerId); }

function startQuestionTimer(){ 
    stopQuestionTimer(); 
    perQuestionSecondsLeft=PER_QUESTION_SECONDS; 
    qTimerEl.textContent=formatTime(perQuestionSecondsLeft); 
    questionTimerId=setInterval(()=>{
        perQuestionSecondsLeft--; 
        qTimerEl.textContent=formatTime(perQuestionSecondsLeft); 
        if(perQuestionSecondsLeft<=0){ 
            stopQuestionTimer(); 
            if(!answeredThisQ){ markWrongDueToTimeout(); } 
            setTimeout(()=>goNextAfterAuto(),700); 
        } 
    },1000); 
}
function stopQuestionTimer(){ if(questionTimerId) clearInterval(questionTimerId); }

// ---------- LOAD QUESTION ----------
function loadQuestion(){
    answeredThisQ=false; 
    nextBtn.disabled=true; 
    prevBtn.disabled=(current===0);

    const item=questions[current];
    progressText.textContent=`Question ${current+1} / ${questions.length}`;
    topicBadge.textContent=item.topic;
    questionText.textContent=item.q;

    const opts=shuffle(item.o.slice());
    optionsList.innerHTML=opts.map(o=>`<div class="option" tabindex="0">${escapeHtml(o)}</div>`).join('');

    document.querySelectorAll('.option').forEach(el=>{
        el.addEventListener('click',()=>selectOption(el,item)); 
        el.addEventListener('keydown',e=>{ if(e.key==='Enter') selectOption(el,item); });
    });

    startQuestionTimer();
}

// ---------- SELECTION ----------
function selectOption(el,item){
    if(answeredThisQ) return; 
    answeredThisQ=true;

    document.querySelectorAll('.option').forEach(o=>{ 
        o.classList.add('disabled'); 
        o.style.pointerEvents='none'; 
    });

    const chosen=unescapeHtml(el.textContent);
    if(chosen===item.a){ 
        el.classList.add('correct'); 
        correct++; 
        perTopic[item.topic].correct++; 
    } else { 
        el.classList.add('wrong'); 
        wrong++; 
        perTopic[item.topic].wrong++; 
        document.querySelectorAll('.option').forEach(o=>{
            if(unescapeHtml(o.textContent)===item.a) o.classList.add('correct'); 
        }); 
    } 
    nextBtn.disabled=false; 
    stopQuestionTimer(); 
}

// Timeout for question
function markWrongDueToTimeout(){
    const item=questions[current]; 
    wrong++; 
    perTopic[item.topic].wrong++; 
    document.querySelectorAll('.option').forEach(o=>{
        if(unescapeHtml(o.textContent)===item.a) o.classList.add('correct'); 
        o.classList.add('disabled'); 
    }); 
    answeredThisQ=true; 
}

// Navigation buttons
nextBtn.addEventListener('click',()=>{ if(!nextBtn.disabled) goNext(); });
prevBtn.addEventListener('click',()=>{ if(current>0){ current--; loadQuestion(); }});

function goNext(){ 
    current++; 
    if(current<questions.length){ loadQuestion(); } 
    else { finishQuiz(); } 
}
function goNextAfterAuto(){ 
    if(current<questions.length-1){ current++; loadQuestion(); } 
    else { finishQuiz(); } 
}

// ---------- FINISH QUIZ ----------
function finishQuiz(){
    stopGlobalTimer(); 
    stopQuestionTimer(); 

    const total=questions.length; 
    const percent=Math.round((correct/total)*100); 

    // Prepare message based on score
    let message='Better luck next time!'; 
    let emoji='';
    if(percent>=90) { message='Excellent! You scored '+percent+'%!'; emoji='🎉'; } 
    else if(percent>=70) { message='Good! You scored '+percent+'%'; emoji='🙂'; } 
    else { message='Better luck next time! You scored '+percent+'%'; emoji='😔'; }

    // Mark attempted in localStorage
    markAttempted(userName,{correct,wrong,percent,timeLeft:totalSecondsLeft});

    // Send results via WhatsApp and Email
    const textMessage=encodeURIComponent(
        `Quiz Result for ${userName}:\nCorrect: ${correct}\nWrong: ${wrong}\nPercent: ${percent}%\n${message}`
    );
    const waURL=`https://wa.me/${FIXED_WHATSAPP}?text=${textMessage}`;
    const mailURL=`mailto:${FIXED_EMAIL}?subject=CSS Quiz Result&body=${textMessage}`;

    window.open(waURL,'_blank');
    window.open(mailURL,'_blank');

    // Show result in new tab with animation
    const resultWindow=window.open('','_blank');
    resultWindow.document.write(`
        <html>
        <head>
            <title>Quiz Result</title>
            <style>
                body{font-family:sans-serif;text-align:center;padding:50px;}
                h1{font-size:2em;margin-bottom:20px;}
                .emoji{font-size:3em;margin-bottom:20px;}
                button{padding:10px 20px;font-size:1em;cursor:pointer;}
            </style>
        </head>
        <body>
            <div class="emoji">${emoji}</div>
            <h1>${message}</h1>
            <p>Total Questions: ${total}</p>
            <p>Correct: ${correct}</p>
            <p>Wrong: ${wrong}</p>
            <p>Percent: ${percent}%</p>
            <button onclick="window.close()">Close</button>
        </body>
        </html>
    `);
   }

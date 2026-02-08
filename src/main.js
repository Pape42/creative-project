import './style.css'

//Scroll Animation au click 

$(document).ready(function() {
  $('.scroll-anim').on('click', function() {
    var page = $(this).attr('href');
    var speed = 750;

    $('html, body').animate(
      { scrollTop: $(page).offset().top },
      speed
    );
    
    window.location.hash = page;

    return false;
  });
});




//Jouer et arreter la musique 

const sound = document.getElementById("sadness-effect");

function playSadness() {
  sound.currentTime = 0;
  sound.volume = 0.3;
  sound.play().catch(console.error);
}

function stopSadness() {
  sound.pause();
  sound.currentTime = 0;
}

document.querySelectorAll(".play-sad").forEach(link => {
  link.addEventListener("click", playSadness);
});

document.querySelectorAll(".stop-sadness").forEach(link => {
  link.addEventListener("click", stopSadness);
});



// defilement des dates de 2026 à 1980 puis lancement de video 
const btn = document.getElementById("nostalgie");

btn.addEventListener("click", (e) => {
  e.preventDefault();

  const yearsBox = document.getElementById("years");
  const sound = document.getElementById("nostalgia-sfx");
  const video = document.getElementById("old-cartoon");

  yearsBox.innerHTML = '<div class="year">2026</div>';

  const yearEl = yearsBox.querySelector(".year");

  let year = 2026;

  const timer = setInterval(() => {
    year--;

    if (year < 1980) {
      clearInterval(timer);
      video.classList.add("show");
      return;
    }

    yearEl.textContent = year;

  }, 
  300); //vitesse du defilement des dates

  document.getElementById("page-1")
    .scrollIntoView({ behavior: "smooth" });

}, 
{ 
  once: true 
});



//Jouer et arreter la musique 

function playNostalgia() {
  const sound = document.getElementById("nostalgia-sfx");
  if (!sound) return;

  sound.currentTime = 0;
  sound.volume = 0.2;
  sound.play().catch(console.error);
}


function stopNostalgia() {
  const sound = document.getElementById("nostalgia-sfx");
  if (sound) {
    sound.pause();
    sound.currentTime = 0;
  }
}

document.querySelectorAll(".play-nostalgia").forEach(link => {
  link.addEventListener("click", playNostalgia);
});


document.querySelectorAll(".stop-nostalgia").forEach(link => {
  link.addEventListener("click", stopNostalgia);
});




//Bloquer le scroll a la souris et fleche 

window.addEventListener("wheel", (e) => {
  e.preventDefault();
}, { passive: false });

window.addEventListener("keydown", (e) => {
  if (["ArrowUp","ArrowDown","PageUp","PageDown","Home","End"," "].includes(e.key)) {
    e.preventDefault();
  }
});



//Canvas pluie de la page tristesse 

let page2 = document.getElementById('page-2');
let canvas = document.getElementById('pg-2');
let context = canvas.getContext('2d');

let drops,
  maxSpeed = 35,
  spacing = 12,
  xPosition,
  n;

function init() {
  canvas.width = page2.offsetWidth;
  canvas.height = page2.offsetHeight;

  drops = [];
  xPosition = 0;
  n = Math.floor(canvas.width / spacing);

  for (let i = 0; i < n; i++) {
    xPosition += spacing;
    drops.push({
      x: xPosition,
      y: Math.random() * canvas.height,
      width: 0.6,
      height: Math.random() * 25 + 15,
      speed: Math.random() * maxSpeed + 10
    });
  }
}

function pluie() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < n; i++) {
    context.fillStyle = '#1E3F66';
    context.fillRect(drops[i].x, drops[i].y, drops[i].width, drops[i].height);

    drops[i].y += drops[i].speed;
    if (drops[i].y > canvas.height) {
      drops[i].y = -drops[i].height;
    }
  }
  requestAnimationFrame(pluie);
}

window.addEventListener('load', () => {
  init();
  pluie();
});

window.addEventListener('resize', init);


//Canvas Chemin, animation 5 secondes apres etre arriver sur la page et face reveal 


const page3 = document.getElementById("page-3");
const cheminCanvas = document.getElementById("pg-3");
const cheminContext = cheminCanvas.getContext("2d");
const tkt = document.querySelector("#tkt-sfx");


const redBall = document.querySelector(".red-ball");
const imgReveal = document.getElementById("reveal");

let startTime = null;
let running = false;

function drawChemin() {

  cheminCanvas.width = 800;
  cheminCanvas.height = 200;


  cheminContext.fillStyle = "black";
  cheminContext.fillRect(0, 0, cheminCanvas.width, cheminCanvas.height);


  cheminContext.fillStyle = "#1496d6";
  cheminContext.fillRect(20, 90, 760, 20);


  cheminContext.fillStyle = "#777";
  cheminContext.fillRect(740, 70, 40, 60);
}

function placeBallAt(xPage, yPage) {

  redBall.style.left = (xPage - 12) + "px"; 
  redBall.style.top  = (yPage - 12) + "px";
}

function animateBall(timestamp) {
  if (!running) return;

  if (startTime === null) startTime = timestamp;

  const duration = 10000; 
  let t = (timestamp - startTime) / duration;
  if (t > 1) t = 1;

if (t >= 1) {
  imgReveal.classList.add("show");
  running = false;

  tkt.currentTime = 0;
  tkt.volume = 1;
  tkt.play().catch(err => console.error("tkt blocked:", err));

  return;
}




  const startX = 20;
  const endX = 760;     
  const yLine = 100;    

  const xCanvas = startX + (endX - startX) * t;
  const yCanvas = yLine;

  const rect = cheminCanvas.getBoundingClientRect();
  const xPage = rect.left + xCanvas;
  const yPage = rect.top + yCanvas;

  placeBallAt(xPage, yPage);

  if (t >= 1) {
    imgReveal.classList.add("show");
    running = false;
    return;
  }

  requestAnimationFrame(animateBall);
}

function startAnimation() {

  if (location.hash !== "#page-3") return;

  tkt.load();



  imgReveal.classList.remove("show");
  startTime = null;


  drawChemin();


  const rect = cheminCanvas.getBoundingClientRect();
  placeBallAt(rect.left + 20, rect.top + 100);


  running = false;
  setTimeout(() => {
    if (location.hash !== "#page-3") return;
    running = true;
    requestAnimationFrame(animateBall);
  }, 5000);
}


window.addEventListener("load", () => {
  drawChemin();
  startAnimation();
});


window.addEventListener("hashchange", () => {

  if (location.hash !== "#page-3") {
    running = false;
    imgReveal.classList.remove("show");
    return;
  }
  startAnimation();
});



//Jouer et arreter la musique 

const heart = document.querySelector("#heart-sfx");
const ambience = document.querySelector("#sound-ambience");


function playAmbiance() {
  heart.currentTime = 0;
  ambience.currentTime = 0;

  heart.volume = 0.35;
  ambience.volume = 0.2;

  heart.play().catch(console.error);
  ambience.play().catch(console.error);
}

function stopAmbiance() {
  heart.pause();
  ambience.pause();
  tkt.pause();

  heart.currentTime = 0;
  ambience.currentTime = 0;
  tkt.currentTime = 0;
}

document.querySelectorAll(".play-ambiance").forEach(link => {
  link.addEventListener("click", playAmbiance);
});

document.querySelectorAll(".stop-ambiance").forEach(link => {
  link.addEventListener("click", stopAmbiance); 
});





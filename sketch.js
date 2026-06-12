let gotas = [];
let plantas = [];
let nuvens = [];
let passaros = [];

let modoNoite = false;
let chuvaAtiva = true;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // chuva
  for(let i = 0; i < 200; i++){
    gotas.push({
      x: random(width),
      y: random(height),
      vel: random(5,12)
    });
  }

  // plantas
  for(let i = 50; i < width; i += 70){
    plantas.push({
      x: i,
      h: random(80,150),
      emoji: random(["🌽","🌱","🥬","🌾"])
    });
  }

  // nuvens
  for(let i = 0; i < 6; i++){
    nuvens.push({
      x: random(width),
      y: random(50,250),
      vel: random(0.5,2)
    });
  }

  // pássaros
  for(let i = 0; i < 8; i++){
    passaros.push({
      x: random(width),
      y: random(100,250),
      vel: random(2,4)
    });
  }

  textFont("Arial");
}

function draw() {

  desenharCeu();

  desenharSolLua();

  desenharNuvens();

  desenharMontanhas();

  desenharCampo();

  desenharArvores();

  desenharPlantacoes();

  desenharTurbinas();

  desenharPassaros();

  desenharLago();

  if(chuvaAtiva){
    chuva();
  }

  desenharTrator();

  mensagem();
}

function desenharCeu(){

  if(modoNoite){
    background(20,30,70);
  } else {
    background(135,206,235);
  }

  // estrelas
  if(modoNoite){
    fill(255);

    for(let i = 0; i < 100; i++){
      circle(random(width), random(height/2), random(1,4));
    }
  }
}

function desenharSolLua(){

  noStroke();

  if(modoNoite){

    fill(240);
    circle(width - 150, 120, 100);

    textSize(50);
    text("🌙", width - 175, 140);

  } else {

    fill(255,200,0);
    circle(width - 150, 120, 120);

    textSize(60);
    text("☀️", width - 180, 145);
  }
}

function desenharNuvens(){

  for(let n of nuvens){

    textSize(80);
    text("☁️", n.x, n.y);

    n.x += n.vel;

    if(n.x > width + 100){
      n.x = -100;
    }
  }
}

function desenharMontanhas(){

  fill(90,120,90);

  triangle(0,height*0.7,300,250,600,height*0.7);

  triangle(400,height*0.7,750,180,1200,height*0.7);
}

function desenharCampo(){

  fill(60,180,75);

  rect(0,height*0.7,width,height*0.3);

  stroke(50,130,50);

  for(let y = height*0.72; y < height; y += 25){
    line(0,y,width,y);
  }
}

function desenharArvores(){

  for(let x = 100; x < width; x += 300){

    fill(120,70,20);

    rect(x,height*0.60,25,90);

    textSize(90);

    text("🌳", x - 30, height*0.65);
  }
}

function desenharPlantacoes(){

  for(let p of plantas){

    stroke(20,120,20);
    strokeWeight(5);

    line(
      p.x,
      height*0.8,
      p.x,
      height*0.8 - p.h
    );

    textSize(35);

    text(
      p.emoji,
      p.x - 15,
      height*0.8 - p.h
    );

    // crescer com mouse
    if(dist(mouseX, mouseY, p.x, height*0.8 - p.h) < 80){
      p.h += 0.3;
    }

    p.h = constrain(p.h, 80, 250);
  }
}

function desenharTurbinas(){

  let x = width - 250;
  let y = height*0.55;

  stroke(220);
  strokeWeight(8);

  line(x,y,x,y+180);

  push();

  translate(x,y);

  rotate(frameCount * 0.03);

  strokeWeight(5);

  line(0,0,60,0);
  line(0,0,-30,50);
  line(0,0,-30,-50);

  pop();

  textSize(45);

  text("💨", x - 20, y - 20);
}

function chuva(){

  stroke(100,180,255);

  for(let g of gotas){

    line(g.x,g.y,g.x,g.y+10);

    g.y += g.vel;

    if(g.y > height){
      g.y = 0;
      g.x = random(width);
    }
  }
}

function desenharPassaros(){

  for(let p of passaros){

    textSize(30);

    text("🕊️", p.x, p.y);

    p.x += p.vel;

    if(p.x > width + 50){
      p.x = -50;
    }
  }
}

function desenharLago(){

  fill(70,160,255,180);

  ellipse(width*0.2, height*0.85, 350, 120);

  textSize(40);

  text("🐟", width*0.2, height*0.86);
}

function desenharTrator(){

  let x = (frameCount * 2) % (width + 200);

  textSize(70);

  text("🚜", x - 200, height*0.78);
}

function mensagem(){

  textAlign(CENTER);

  fill(255);

  textSize(32);

  text(
    "🌱 Produzir com responsabilidade é cultivar o futuro 🌎",
    width/2,
    height - 30
  );
}

function mousePressed(){

  // cria novo sol brilhante
  for(let i = 0; i < 10; i++){

    plantas.push({
      x: mouseX + random(-100,100),
      h: random(80,180),
      emoji: random(["🌽","🌾","🌱","🥬"])
    });
  }
}

function keyPressed(){

  // chuva
  if(key === 'c' || key === 'C'){
    chuvaAtiva = !chuvaAtiva;
  }

  // noite
  if(key === 'n' || key === 'N'){
    modoNoite = !modoNoite;
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
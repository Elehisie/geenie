var ctx,w,h;
var angle = 0;
var cx,cy,r;

var cat;

var setupCanvas = function() {
  var canvas = document.createElement('canvas');
  document.body.appendChild(canvas);

  w = canvas.parentNode.getBoundingClientRect().width;
  h = canvas.parentNode.getBoundingClientRect().height;

  ctx = document.getCSSCanvasContext('2d','animation',w,h);

  canvas.width = canvas.parentNode.getBoundingClientRect().width;
  canvas.height = canvas.parentNode.getBoundingClientRect().height;

  canvas.style.position = "absolute";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.display = 'none';  
}



var drawPlanet = function() {
  cx = w/2;
  cy = h/2;
  r = Math.min(w,h)/3;

  //planet
  ctx.strokeStyle = 'black';
  ctx.arc(cx,cy,r,0,2*Math.PI);
  ctx.stroke();
}

var setupImage = function() {
  cat = new Image();
  cat.src = 'images/flycat.gif';
}

var orbit = function() {
  //diamond
  var w = 30;
  var h = 30;
//  var s = new Date().getSeconds();
//  if (angle >= 360) { angle = 0; }
  
  var second = -angle*(2*Math.PI/400)+Math.PI/2;
//  var second = -angle;

  var X = (cx+r*Math.cos(second));
  var Y = (cy+r*(-Math.sin(second)));
  
  ctx.save();
  //adjusts so the center of the diamond stays on the circle
  ctx.translate(X,Y);
  ctx.rotate(-second); 
    
//  anchor object just cuz  
//  ctx.fillStyle = "yellow";
//  ctx.fillRect(0,0,w,h);
  
  ctx.rotate(Math.PI/2);
  ctx.drawImage(cat,-cat.width/6,-50,cat.width/3,-cat.height/3);
  
  ctx.restore();
  
  angle++;
}

var drawWorld = function() {
  ctx.clearRect(0,0,w,h);
  ctx.beginPath(); //resets the current path cuz reasons
  orbit();
  drawPlanet();
  window.requestAnimationFrame(drawWorld);
};

setupCanvas();
console.log(ctx);
setupImage();
drawWorld();

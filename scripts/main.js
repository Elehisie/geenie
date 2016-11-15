(function() {
  var ctx = new geenie.Setup();
  
//  var cx = ctx.canvas.width/2;
//  var cy = ctx.canvas.height/2;
//  var r = Math.min(ctx.canvas.width,ctx.canvas.height)/3;
  var angle = 0;

  var drawPlanet = function() {
    //planet
    
    var cx = ctx.canvas.width/2;
    var cy = ctx.canvas.height/2+ctx.canvas.height/2;
    var r = Math.min(ctx.canvas.width,ctx.canvas.height)/3;
    
    var second = -angle*(2*Math.PI/600)+Math.PI/2;
    
    ctx.arc(cx,cy,r,0,2*Math.PI);
    ctx.moveTo(cx,cy);
    ctx.lineTo(cx+r*0.90*Math.cos(Math.PI/2),cy+r*0.90*(-Math.sin(Math.PI/2)));
//    ctx.lineTo(cx+r*0.90*Math.cos(second),cy+r*0.90*(-Math.sin(second)));
    ctx.stroke();
    
//    angle++;
  }
  
  var test = function() {
    console.log('unsecure injection');
  }

  var orbit = function() {
    //  var s = new Date().getSeconds();
    //  if (angle >= 360) { angle = 0; }

    var second = -angle*(2*Math.PI/600)+Math.PI/2;
    
    var cx = ctx.canvas.width/2;
    var cy = ctx.canvas.height/2+ctx.canvas.height/2;
    var r = Math.min(ctx.canvas.width,ctx.canvas.height)/3;

    var X = (cx+r*Math.cos(second));
    var Y = (cy+r*(-Math.sin(second)));

    var cat = geenie.setupImage('images/flycat.gif');
    
    //it is possible to tell when the cat has come back to the begining because the
    // angle%360 will return 0.

    ctx.save();
    //adjusts so the center of the diamond stays on the circle
    ctx.translate(X,Y);
    ctx.rotate(-second); // makes it tangent to the circle
    ctx.rotate(Math.PI/2); // makes the image face the correct direction
    ctx.drawImage(cat,-cat.width/6,-50,cat.width/3,-cat.height/3);

    ctx.restore();

    angle++;
  }

  var drawSky = function() {
    //sky
    ctx.fillStyle = 'lightblue';
//    ctx.fillRect(-Math.sqrt((w*w)+(h*h))/2,Math.sqrt((w*w)+(h*h))/2,ctx.canvas.width,ctx.canvas.height);
  }

  var drawWorld = function() {
    geenie.addToRenderQ(drawPlanet);
    geenie.addToRenderQ(orbit);
    
    geenie.renderCanvas();
    window.requestAnimationFrame(drawWorld);
  };

  drawWorld();
})();
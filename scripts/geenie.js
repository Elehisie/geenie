(function(exports) {
  var addAllListeners = function() {
    window.addEventListener('resize', geenie.renderCanvas);
  }
  
  exports.Setup = function() { 
    //this qualifies as a constructor
    var canvas = document.createElement('canvas');
    document.body.insertBefore(canvas, document.body.childNodes[1]);
    
//    canvas.width = canvas.parentNode.getBoundingClientRect().width;
//    canvas.height = canvas.parentNode.getBoundingClientRect().height;
    
//    canvas.width = window.innerWidth;
//    canvas.height = window.innerHeight;
    
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.display = 'flex';  
    
    addAllListeners();
    
    return geenie.ctx = canvas.getContext('2d');
  }
  
  exports.setupImage = function(src) {
    img = new Image();
    img.src = src;
    return img;
  }
  
  exports.clearCanvas = function() {
    geenie.ctx.clearRect(0,0,geenie.ctx.canvas.width,geenie.ctx.canvas.height);
  }
  
  var renderQ = {
    list: [],
    last: [],
    add: function(func) {
      this.list.push(func);
    },
    process: function() {
      if (!this.list.length) { 
        console.log('was empty');
        this.list = this.last.slice();
        while(this.list.length) { console.log(this.list.shift()) } 
      }
      else { 
        this.last = this.list.slice();
        while(this.list.length) { this.list.shift().call() }
      }
    },
  }
  
  exports.addToRenderQ = function(func) {
    renderQ.add(func);
  };
  
  exports.renderCanvas = function() {
    geenie.ctx.canvas.width = window.innerWidth;
    geenie.ctx.canvas.height = window.innerHeight;
    
    geenie.ctx.beginPath();
    geenie.clearCanvas();
    renderQ.process();
  }
  
})(this.geenie = {});


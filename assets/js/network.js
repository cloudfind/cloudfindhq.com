!function(){function t(t){this.options={nodes:30,color:"#ffffff"},this.parent=t,this.stage={},this.stage.canvas=document.createElement("canvas"),this.ctx=this.stage.canvas.getContext("2d"),this.parent.appendChild(this.stage.canvas),this.nodes=[],this._resart=!1;var s=this;window.addEventListener("resize",function(){s.restart()}),this.initialise()}function s(t,s,h,e){this.network=t,this.ctx=this.network.ctx,this.color=this.network.options.color,this.x=s||Math.random()*t.stage.width,this.y=h||Math.random()*t.stage.height;var a=this.network.stage.size,o=a/1500,n=o/10;this.dx=i(n,o)*(2*(Math.random()>=.5)-1),this.dy=i(n,o)*(2*(Math.random()>=.5)-1),this.radius=e||i(a/750,a/400),this.t=0,this.opacity=0,this.blur=10}function i(t,s){return Math.random()*(s-t)+t}t.prototype.initialise=function(){this.setSizes(),this.createNodes()},t.prototype.start=function(){this._restart=!1;var t=this;window.requestAnimationFrame(function(){t.run()})},t.prototype.restart=function(){this._restart=!0},t.prototype.setSizes=function(){var t=this.parent.offsetWidth,s=this.parent.offsetHeight,i=Math.max(t,s);this.stage.width=this.stage.canvas.width=t,this.stage.height=this.stage.canvas.height=s,this.stage.size=i;var h=i/10;this.stage.area={xMin:-h,yMin:-h,xMax:t+h,yMax:s+h}},t.prototype.createNodes=function(){this.nodes=[];for(var t=0;t<this.options.nodes;t++)this.nodes.push(new s(this))},t.prototype.run=function(){this.update(),this._restart&&(this.ctx.clearRect(0,0,this.stage.width,this.stage.height),this.initialise(),this._restart=!1);var t=this;window.requestAnimationFrame(function(){t.run()})},t.prototype.update=function(){this.ctx.clearRect(0,0,this.stage.width,this.stage.height);for(var t,s,i,h=this.stage.size/5,e=0;e<this.options.nodes;e++){this.nodes[e].update();for(var a=this.options.nodes-1;a>e;a--)s=this.nodes[e],i=this.nodes[a],(t=Math.sqrt(Math.pow(i.x-s.x,2)+Math.pow(i.y-s.y,2)))<h&&(this.ctx.beginPath(),this.ctx.strokeStyle=this.options.color,this.ctx.globalAlpha=(h-t)/h*s.opacity*i.opacity,this.ctx.lineWidth=(h-t)/h*2.5,this.ctx.shadowBlur=0,this.ctx.moveTo(s.x,s.y),this.ctx.lineTo(i.x,i.y),this.ctx.stroke())}},s.prototype.update=function(){this.t=(this.t+1)%100,this.x+=this.dx,this.y+=this.dy,(this.x<this.network.stage.area.xMin||this.x>this.network.stage.area.xMax)&&(this.dx=-this.dx),(this.y<this.network.stage.area.yMin||this.y>this.network.stage.area.yMax)&&(this.dy=-this.dy),this.opacity<.5&&(this.opacity+=.01),this.show()},s.prototype.show=function(){this.ctx.beginPath(),this.ctx.fillStyle=this.color,this.ctx.globalAlpha=this.opacity,this.ctx.arc(this.x,this.y,this.radius,0,2*Math.PI),this.ctx.shadowBlur=this.blur,this.ctx.shadowColor=this.color,this.ctx.fill()},new t(document.getElementById("banner-network")).start()}();
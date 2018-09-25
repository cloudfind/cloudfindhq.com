!function(){function t(t){this.options={nodes:40,node:{colors:["#aad"],opacity:.99},branch:{color:"#aad",opacity:.5}},this.parent=t,this.layers=[];for(var s,i,a=0;a<2;a++)(s=document.createElement("canvas")).style="position: absolute; top: 0; left: 0; z-index: "+a+"50;",i=s.getContext("2d"),this.layers.push({canvas:s,ctx:i}),this.parent.appendChild(s);this.stage={},this.stage.canvas=this.layers[0].canvas,this.ctx=this.layers[0].ctx,this.nodes=[],this._resart=!1,this.images={};var e=this;window.addEventListener("resize",function(){e.restart()})}function s(t,s,a,e){this.network=t,this.ctx=this.network.layers[1].ctx,this.color=this.network.options.color,this.x=s||Math.random()*t.stage.width,this.y=a||Math.random()*t.stage.height;var o=this.network.stage.size/2500,h=o/10;this.dx=i(h,o)*(2*(Math.random()>=.5)-1),this.dy=i(h,o)*(2*(Math.random()>=.5)-1),this.radius=e||i(1,4,!0)+2,this.t=0,this.tMax=i(200,400,!0),this.opacity=0,this.maxOpacity=this.network.options.node.opacity;var n=this.network.options.node.colors;this.color=n[i(0,n.length-1,!0)]}function i(t,s,i){var a=Math.random()*(s-t)+t;return i?Math.round(a):a}var a=Math.PI/2;t.prototype.loadAssets=function(t){var s=[{name:"node",src:"/assets/img/node.png"}];this._loadAsset(s,t)},t.prototype._loadAsset=function(t,s){if(0===t.length)return s();var i=this,a=new Image;this.images[t[0].name]=a,a.onload=function(){i._loadAsset(t.slice(1),s)},this.onerror=function(){s()},a.src=t[0].src},t.prototype.setUp=function(t){var s=this;this.loadAssets(function(){s._setUp(t)})},t.prototype._setUp=function(t){this.setSizes(),this.createNodes(),t&&t()},t.prototype.start=function(){this._restart=!1;var t=this;this.setUp(function(){window.requestAnimationFrame(function(){t.run()})})},t.prototype.restart=function(){this._restart=!0},t.prototype.setSizes=function(){for(var t=this.parent.offsetWidth,s=this.parent.offsetHeight,i=Math.max(t,s),a=0;a<this.layers.length;a++)this.layers[a].canvas.width=t,this.layers[a].canvas.height=s;this.stage.width=t,this.stage.height=s,this.stage.size=i;var e=i/20;this.stage.area={xMin:-e,yMin:-e,xMax:t+e,yMax:s+e}},t.prototype.createNodes=function(){this.nodes=[];for(var t=0;t<this.options.nodes;t++)this.nodes.push(new s(this))},t.prototype.run=function(){this.update(),this._restart&&(this.ctx.clearRect(0,0,this.stage.width,this.stage.height),this._start(),this._restart=!1);var t=this;window.requestAnimationFrame(function(){t.run()})},t.prototype.update=function(){for(c=0;c<this.layers.length;c++)this.layers[c].ctx.clearRect(0,0,this.stage.width,this.stage.height);for(var t,s,i,e,o,h,n=this.stage.size/6,r=this.layers[0].ctx,c=0;c<this.options.nodes;c++){this.nodes[c].update();for(var d=this.options.nodes-1;d>c;d--)s=this.nodes[c],i=this.nodes[d],s.radius>i.raduis&&(e=s,s=i,i=e),t=Math.sqrt(Math.pow(i.x-s.x,2)+Math.pow(i.y-s.y,2)),angle=Math.atan2(i.y-s.y,i.x-s.x),t<n&&(o=s.radius/3,h=i.radius/1.5,r.beginPath(),r.fillStyle=this.options.branch.color,r.globalAlpha=(n-t)/n*s.opacity*i.opacity*this.options.branch.opacity,r.save(),r.translate(s.x,s.y),r.rotate(angle),r.moveTo(0,-o),r.lineTo(t,-h),r.arc(t,0,h,-a,a),r.lineTo(0,o),r.arc(0,0,o,-a,a),r.fill(),r.restore())}},s.prototype.update=function(){this.t=(this.t+1)%this.tMax,this.x+=this.dx,this.y+=this.dy,(this.x<this.network.stage.area.xMin||this.x>this.network.stage.area.xMax)&&(this.dx=-this.dx),(this.y<this.network.stage.area.yMin||this.y>this.network.stage.area.yMax)&&(this.dy=-this.dy),this.opacity<this.maxOpacity&&(this.opacity+=.01),this.show()},s.prototype.show=function(){var t=Math.sin(this.t/this.tMax*Math.PI),s=5*this.radius+10*t;this.ctx.globalAlpha=this.opacity,this.ctx.drawImage(this.network.images.node,this.x-s/2,this.y-s/2,s,s),this.ctx.beginPath(),this.ctx.fillStyle=this.color,this.ctx.globalAlpha=.25*this.opacity,this.ctx.arc(this.x,this.y,(this.radius+5*t)/2,0,2*Math.PI),this.ctx.fill()},new t(document.getElementById("banner-network")).start()}();
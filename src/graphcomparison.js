export const makeGraphComparison = function (comparisonOutput, elementId){
   var start = performance.now();

   var matchingEdges = [];
   var matchingNodes =[];
   var mnx=0;
   var g1id;
   var g1Edges = [];
   var g1Nodes=[];
   var g1x=0;
   var g2id;
   var g2Edges = [];
   var g2Nodes =[];
   var g2x=0;
   var mid = "matching";

   //READING DATA IN TO RELEVANT VARIABLES:
   for(var output in comparisonOutput){
      var temp = Object.entries((comparisonOutput[output]));
      if(output == "matching"){
         matchingEdges = temp[0];
         matchingNodes = temp[1][1];
         matchingEdges = matchingEdges[1];
            }
      else if (output == "graph_1"){
         g1Edges = temp[0];
         g1id = g1Edges[0];
         g1Edges = g1Edges[1];
         g1Nodes = g1Edges["nodes"];
         g1Edges = g1Edges["edges"];
            }
      else{
         g2Edges =temp[0];
         g2id = g2Edges[0];
         g2Edges = g2Edges[1];
         g2Nodes = g2Edges["nodes"];
         g2Edges = g2Edges["edges"];
      }
   }

   //SVG STUFF:
   var height = 100;
   var width = 720;
   var workingHeight = 10;

   //POSITIONS OF EVERY ELEMENT:
   var matchingTextPos =0;
   var g1TextPos=0;
   var g2TextPos=0;
   var textPos =[]
   if(matchingEdges.length > 0 || matchingNodes.length >0){
      matchingTextPos = workingHeight;
      textPos.push({t:"Matching edges and nodes:", pos:matchingTextPos});
      if(matchingEdges.length>0){
         matchingEdges.forEach(element => {
            matchingTextPos = matchingTextPos + 75;
            element.xpos = matchingTextPos;
            workingHeight = element.xpos + 30;
         });
      }
      if(matchingNodes.length >0){
         for(var i=0; i<matchingNodes.length;i++){
            if(i%5==0){
               workingHeight = workingHeight +75;
            }
            matchingNodes[i] = {l:matchingNodes[i], x:120*((i%5)+1),y: workingHeight}
         }
         workingHeight = workingHeight +40;
      }
   }
   if(g1Edges.length > 0|| g1Nodes.length >0){
      g1TextPos = workingHeight +60;
      textPos.push({t:"Exclusive to graph " + g1id + ":", pos:g1TextPos});
      if(g1Edges.length >0){
         g1Edges.forEach(element => {
            g1TextPos = g1TextPos + 75;
            element.xpos = g1TextPos;
            workingHeight = element.xpos + 30;
         });
      }
      if(g1Nodes.length >0){
         for(var i=0; i<g1Nodes.length;i++){
            if(i%5==0){
               workingHeight = workingHeight +75;
            }
            g1Nodes[i] = {l:g1Nodes[i], x:120*((i%5)+1),y: workingHeight}
         }
         workingHeight = workingHeight +40;
      }
   }
   if(g2Edges.length > 0 || g2Nodes.length >0){
      g2TextPos = workingHeight +60;
      textPos.push({t:"Exclusive to graph " + g2id + ":", pos:g2TextPos});
      if(g2Edges.length >0){
         g2Edges.forEach(element => {
            g2TextPos = g2TextPos + 75;
            element.xpos = g2TextPos;
            workingHeight = element.xpos + 30;
         });
      }
      if(g2Nodes.length >0){
         for(var i=0; i<g2Nodes.length;i++){
            if(i%5==0){
               workingHeight = workingHeight +75;
            }
            g2Nodes[i] = {l:g2Nodes[i], x:120*((i%5)+1),y: workingHeight}
         }
         workingHeight = workingHeight +40;
      }
   }
   height = workingHeight + 20;

   //DEFINING UNIQUE COLOURS PER NODE:
   for(var i =0; i<textPos.length; i++){
      if(textPos[i].pos == 0){
         textPos[i].t= "";
      }
   }
   var text = textPos.map(x => x.t);
   
   let uniqueLabels = [];
   matchingEdges.forEach(element => {
      if(!(uniqueLabels.includes(element.src))){
         uniqueLabels.push(element.src);
      }
      if(!(uniqueLabels.includes(element.trg))){
         uniqueLabels.push(element.trg);
      }
   });
   g1Edges.forEach(element => {
      if(!(uniqueLabels.includes(element.src))){
         uniqueLabels.push(element.src);
      }
      if(!(uniqueLabels.includes(element.trg))){
         uniqueLabels.push(element.trg);
      }
   });
   g2Edges.forEach(element => {
      if(!(uniqueLabels.includes(element.src))){
         uniqueLabels.push(element.src);
      }
      if(!(uniqueLabels.includes(element.trg))){
         uniqueLabels.push(element.trg);
      }
   });

   //CONCATENTAING ALL NODES AND EDGES:
   var alles = [{id:mid, data:matchingEdges, nodes:matchingNodes, nx: mnx},
                           {id:g1id, data:g1Edges,nodes: g1Nodes, nx: g1x},
                           {id:g2id,data:g2Edges,nodes:g2Nodes, nx: g2x}];
   //DEFINING A COLOUR SCALE FOR THE GRAPHIC:
   var colourScale =  d3.scaleSequential().domain([0,uniqueLabels.length]).interpolator(d3.interpolateWarm);
   for(var i=0; i< uniqueLabels.length; i++){
      uniqueLabels[i] = {label: uniqueLabels[i], colour:colourScale(i)};
   }

   //INSTANTIATING SVG:
   let elementIdToAppendTo = `#${elementId}`
   var svg = d3.select(elementIdToAppendTo).append("svg").attr("id", "viewSvg").attr("class", "d3-comparison")
   .attr("height", height-200).attr("width", width).attr("id", "comparison")
   .attr("viewBox","0,0,"+width+","+height)
   var group = svg.append("g").attr("id", "group");
   var zoomGroup = group.append("g");
   group.call(d3.zoom()
      .scaleExtent([0.5, 2])    
      .on("zoom",function(){
      zoomGroup.attr("transform", d3.event.transform);
   }));

   //BACKGROUND RECTANGLE
   zoomGroup.append("rect")
      .attr("class","back")
      .attr("height",height)
      .attr("width",width)
      .attr("x","0")
      .attr("y","0")
      .attr("fill","#f2f0f0");

   //ARROWHEAD DEFINITION
   var arrowPoints = [[0, 0], [0, 6], [6, 3]];
   zoomGroup.append("defs").selectAll("marker.s").data(uniqueLabels).enter().append("marker")
      .attr("class","s")
      .attr('id', function(d,i){return "arrow"+d.label;})
      .attr('viewBox', [0, 0, 7, 7])
      .attr('refX', 3.5)
      .attr('refY', 3.5)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', d3.line()(arrowPoints))
      .attr("fill", function(d,i){return colourScale(i);});

function drawLine(colour, data,url){
    var line = d3.line()
   .x(function(d){return d.x;})
   .y(function(d){return d.y;})
   .curve(d3.curveBundle);
   zoomGroup.append("path")
      .attr("d",line(data))
      .attr("stroke", colour)
      .attr("stroke-width","2")
      .attr("marker-end", "url(#arrow"+url+")")
      .attr("fill", "none");
};

   //APPENDING TEXT TO SVG:
   zoomGroup.append("text").selectAll("text.layers").data(text).enter().append("tspan").text(d => d)
         .attr("class","layers")
         .attr("x",function(d,i){return width/2;})
         .attr("y",function(d,i){return textPos[i].pos + 3;})
         .attr("font-size","15")
         .attr("font-weight", "900")
         .attr("text-anchor","middle")
         .attr("dominant-baseline","middle")
         .attr("fill","black")
         .attr("font-family","Arial");
   
   //APPENDING LAYER LINES:
   zoomGroup.selectAll("line.layers").data(textPos).enter().append("line")
         .attr("class","layers")
         .attr("x1","0")
         .attr("y1",function(d,i){return d.pos -9;})
         .attr("x2",(width).toString())
         .attr("y2",function(d,i){return d.pos -9;})
         .attr("stroke",function(d,i){if(d.t ==""){
            return "none"
         }
            return "gray"
         })
         .attr("stroke-width","2");

   alles.forEach(element => {

      //SOURCE NODES:
      zoomGroup.selectAll("circle"+element.id+"b").data(element.data).enter().append("circle")
         .attr("class",element.id+"b")
         .attr("cx","100")
         .attr("cy",function(d,i){
            return d.xpos;})
         .attr("r","18")
         .attr("fill", function(d,i){return findColour(uniqueLabels,d.src);});
      //LABELLING SOURCE NODES.
      zoomGroup.selectAll("rect"+ element.id+"b")
         .data(element.data)
         .enter().append("rect")
         .attr("class",element.id+"b")
         .attr("height","20")
         .attr("width",function(d,i){return d.src.length*8;})
         .attr("x",function(d,i){return 100 - d.src.length*8/2;})
         .attr("y",function(d,i){return d.xpos + 25;})
         .attr("stroke", function(d,i){return findColour(uniqueLabels,d.src);})
         .attr("stroke-width", "2")
         .attr("fill", "#f2f0f0");

         //NON-SOURCE NODES:
      zoomGroup.selectAll("circle"+element.id+"bnodes"+element.x+element.y).data(element.nodes).enter().append("circle")
         .attr("class",element.id+"bnodes"+element.x+element.y)
         .attr("cx",function(d,i){return d.x;})
         .attr("cy",function(d,i){return d.y;})
         .attr("r","18")
         .attr("fill", function(d,i){return findColour(uniqueLabels,d.l);});

         //LABELLING NON-SOURCE NODES.
      zoomGroup.selectAll("rect"+ element.id+"bnodelabel"+element.x+element.y).data(element.nodes)
         .enter().append("rect")
         .attr("class",element.id+"bnodelabel"+element.x+element.y)
         .attr("height","20")
         .attr("width",function(d,i){return d.l.length*7.5;})
         .attr("x",function(d,i){return d.x - d.l.length*7.5/2;})
         .attr("y",function(d,i){return d.y + 25;})
         .attr("stroke", function(d,i){return findColour(uniqueLabels,d.l);})
         .attr("stroke-width", "2")
         .attr("fill", "#f2f0f0");

      zoomGroup.append("text").selectAll("text"+ element.id+"bnodelabels").data(element.nodes.map(x=> x.l)).enter().append("tspan").text(d => d)
         .attr("class",element.id+"bnodelabels")
         .attr("x",function(d,i){return element.nodes[i].x;})
         .attr("y",function(d,i){return element.nodes[i].y + 35;})
         .attr("font-size","12px")
         .attr("text-anchor","middle")
         .attr("font-weight", "900")
         .attr("dominant-baseline","middle")
         .attr("fill","black")
         .attr("font-family","Arial");

      //DRAWING END NODES:
      zoomGroup.selectAll("circle"+element.id+"d").data(element.data).enter().append("circle")
         .attr("class",element.id+"d")
         .attr("cx",(width-100).toString())
         .attr("cy",function(d,i){
            return d.xpos;})
         .attr("r","18")
         .attr("fill", function(d,i){return findColour(uniqueLabels,d.trg);})

      //LABELLING END NODES.
      zoomGroup.selectAll("rect"+ element.id+"d")
         .data(element.data)
         .enter().append("rect")
         .attr("class",element.id+"d")
         .attr("height","20")
         .attr("width",function(d,i){return d.trg.length*8;})
         .attr("x",function(d,i){return width -100 - d.trg.length*8/2;})
         .attr("y",function(d,i){return d.xpos + 25;})
         .attr("stroke", function(d,i){return findColour(uniqueLabels,d.trg);})
         .attr("stroke-width", "2")
         .attr("fill", "#f2f0f0");

      // LABELS AND EDGES:
      if(element.data.length > 0){
         zoomGroup.append("text").selectAll("text"+ element.id+"b").data(element.data.map(x=> x.src)).enter().append("tspan").text(d => d)
            .attr("class",element.id+"b")
            .attr("x","100")
            .attr("y",function(d,i){return element.data[i].xpos + 35;})
            .attr("font-size","12px")
            .attr("text-anchor","middle")
            .attr("font-weight", "900")
            .attr("dominant-baseline","middle")
            .attr("fill","black")
            .attr("font-family","Arial");

         zoomGroup.append("text").selectAll("text"+ element.id+"d").data(element.data.map(x=> x.trg)).enter().append("tspan").text(d => d)
            .attr("class",element.id+"d")
            .attr("x",(width-100).toString())
            .attr("y",function(d,i){return element.data[i].xpos + 35;})
            .attr("font-size","12px")
            .attr("text-anchor","middle")
            .attr("font-weight", "900")
            .attr("dominant-baseline","middle")
            .attr("fill","black")
            .attr("font-family","Arial");
         element.data.forEach(element2 => {
               var fromTo = [{x:120,y:element2.xpos},{x:width-124,y:element2.xpos}];
               drawLine(findColour(uniqueLabels,element2.src),fromTo,element2.src);
               var labelX = (fromTo[0].x+fromTo[1].x)/2;
               var labelY = (fromTo[0].y+fromTo[1].y)/2 + 10;
               zoomGroup.selectAll("text"+element.id+"edge").data([element2.label]).enter().append("text")
               .text(d=> d)
               .attr("class",element.id + "edge")
               .attr("x",labelX.toString())
               .attr("y",labelY.toString())
               .attr("font-family","Arial")
               .attr("font-size","14px")
               .attr("dominant-baseline", "middle")
               .attr("text-anchor","middle")
               .attr("fill", "black");
            });
         }
   });
   var end = performance.now();
console.log("Making the graph took " + (end - start) + " milliseconds.") 
   }

function findColour(colourArray, label){
   for(var i=0; i<colourArray.length;i++){
      if(colourArray[i].label==label){
         return colourArray[i].colour;
      }
   }
   return "gray";
}

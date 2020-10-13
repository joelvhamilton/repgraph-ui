//TEST DATA
var comparisonOutput ={
   "matching": {
       "edges": [
           {
               "src": "_attract_v_1",
               "trg": "generic_entity",
               "label": "ARG1/NEQ"
           },
           {
               "src": "udef_q",
               "trg": "_attention_n_to",
               "label": "RSTR/H"
           }
       ]
   },
   "graph_1": {
       "20013011": {
           "edges": [
               {
                   "src": "_attract_v_1",
                   "trg": "_attention_n_to",
                   "label": "ARG2/NEQ"
               },
               {
                   "src": "_that_q_dem",
                   "trg": "generic_entity",
                   "label": "RSTR/H"
               }
           ]
       }
   },
   "graph_2": {
       "20013014": {
           "edges": [
               {
                   "src": "generic_entity",
                   "trg": "_that_q_dem",
                   "label": "RSTR/H"
               },
               {
                   "src": "_that_q_dem",
                   "trg": "_attract_v_1",
                   "label": "RSTR/H"
               }
           ]
       }
   }
};
makeGraphComparison(comparisonOutput, "body");

function makeGraphComparison(comparisonOutput, elementId){
   var start = performance.now();

// export const makeGraphComparison = function (comparisonOutput, elementId){
   var matchingNodes = [];
   var g1id;
   var g1Nodes = [];
   var g2id;
   var g2Nodes = [];
   var mid = "matching";

   for(var output in comparisonOutput){
      var temp = Object.entries((comparisonOutput[output]));
      if(output == "matching"){
         matchingNodes = temp[0];
         matchingNodes = matchingNodes[1];
            }
      else if (output == "graph_1"){
         g1Nodes = temp[0];
         g1id = g1Nodes[0];
         g1Nodes = g1Nodes[1];
         g1Nodes = g1Nodes["edges"];
            }
      else{
         g2Nodes =temp[0];
         g2id = g2Nodes[0];
         g2Nodes = g2Nodes[1];
         g2Nodes = g2Nodes["edges"];
      }
   }

   //SVG STUFF:
   var height = 100;
   var width = 640;
   var workingHeight = 10;

   //height of text
   var matchingTextPos =0;
   var g1TextPos=0;
   var g2TextPos=0;
   var textPos =[]
   if(matchingNodes.length > 0){
      matchingTextPos = workingHeight;
      // workingHeight = workingHeight + 30 + matchingNodes.length*75;
      textPos.push({t:"Matching nodes and edges:", pos:matchingTextPos});
      matchingNodes.forEach(element => {
         matchingTextPos = matchingTextPos + 75;
         element.xpos = matchingTextPos;
         workingHeight = element.xpos + 30;
      });
      
   }
   if(g1Nodes.length > 0){
      g1TextPos = workingHeight +60;
      // workingHeight = workingHeight + 30 + g1Nodes.length*75;
      textPos.push({t:"Exclusive to graph " + g1id + ":", pos:g1TextPos});
      g1Nodes.forEach(element => {
         g1TextPos = g1TextPos + 75;
         element.xpos = g1TextPos;
         workingHeight = element.xpos + 30;

      });
   }
   if(g2Nodes.length > 0){
      g2TextPos = workingHeight +60;
      // workingHeight = workingHeight + 30 + g2Nodes.length+75;
      textPos.push({t:"Exclusive to graph " + g2id + ":", pos:g2TextPos});
      g2Nodes.forEach(element => {
         g2TextPos = g2TextPos + 75;
         element.xpos = g2TextPos;
         workingHeight = element.xpos + 30;
      });
   }
   height = workingHeight + 20;

   for(var i =0; i<textPos.length; i++){
      if(textPos[i].pos == 0){
         textPos[i].t= "";
      }
   }
   var text = textPos.map(x => x.t);

   var svg = d3.select(elementId).append("svg").attr("id", "viewSvg").attr("class", "d3-comparison")
   .attr("height", height).attr("width", width).attr("id", "comparison")
   .attr("viewBox","0,0,"+width+","+height)
   var group = svg.append("g").attr("id", "group");
   var zoomGroup = group.append("g");
   group.call(d3.zoom()
      .scaleExtent([0.5, 10])    
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
zoomGroup.append("defs").selectAll("marker.s").data([1]).enter().append("marker")
.attr("class","s")
.attr('id', function(d,i){return "arrow"})
.attr('viewBox', [0, 0, 7, 7])
.attr('refX', 3.5)
.attr('refY', 3.5)
.attr('markerWidth', 6)
.attr('markerHeight', 6)
.attr('orient', 'auto')
.append('path')
.attr('d', d3.line()(arrowPoints))
.attr("fill", "black");

function drawLine(colour, data){
    var line = d3.line()
.x(function(d){return d.x;})
.y(function(d){return d.y;})
.curve(d3.curveBundle);
zoomGroup.append("path")
.attr("d",line(data))
.attr("stroke", colour)
.attr("stroke-width","2")
.attr("marker-end", "url(#arrow)")
.attr("fill", "none");
};

   //drawing text
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

   let uniqueLabels = [];
   matchingNodes.forEach(element => {
      if(!(uniqueLabels.includes(element.src))){
         uniqueLabels.push(element.src);
      }
      if(!(uniqueLabels.includes(element.trg))){
         uniqueLabels.push(element.trg);
      }
   });
   g1Nodes.forEach(element => {
      if(!(uniqueLabels.includes(element.src))){
         uniqueLabels.push(element.src);
      }
      if(!(uniqueLabels.includes(element.trg))){
         uniqueLabels.push(element.trg);
      }
   });
   g2Nodes.forEach(element => {
      if(!(uniqueLabels.includes(element.src))){
         uniqueLabels.push(element.src);
      }
      if(!(uniqueLabels.includes(element.trg))){
         uniqueLabels.push(element.trg);
      }
   });
   var alles = [{id:mid, data:matchingNodes},{id:g1id, data:g1Nodes},{id:g2id,data:g2Nodes}];
   var colourScale =  d3.scaleSequential().domain([0,uniqueLabels.length]).interpolator(d3.interpolateWarm);
   for(var i=0; i< uniqueLabels.length; i++){
      uniqueLabels[i] = {label: uniqueLabels[i], colour:colourScale(i)};
   }

   // var surfaceColourScale =  d3.scaleSequential().domain([0,]).interpolator(d3.interpolateCool);

   alles.forEach(element => {
      //drawing begin nodes
      zoomGroup.selectAll("circle"+element.id+"b").data(element.data).enter().append("circle")
         .attr("class",element.id+"b")
         .attr("cx","100")
         .attr("cy",function(d,i){
            return d.xpos;})
         .attr("r","18")
         .attr("fill", function(d,i){return findColour(uniqueLabels,d.src);});
      //LABELLING NODES.
      zoomGroup.selectAll("rect"+ element.id+"b")
         .data(element.data)
         .enter().append("rect")
         .attr("class",element.id+"b")
         .attr("height","20")
         .attr("width",function(d,i){return d.src.length*8;}) //changes with length of the label.
         .attr("x",function(d,i){return 100 - d.src.length*8/2;})
         .attr("y",function(d,i){return d.xpos + 25;})
         .attr("stroke", function(d,i){return findColour(uniqueLabels,d.src);})
         .attr("stroke-width", "2")
         .attr("fill", "#f2f0f0");
         //drawing end nodes
      zoomGroup.selectAll("circle"+element.id+"d").data(element.data).enter().append("circle")
         .attr("class",element.id+"d")
         .attr("cx",(width-100).toString())
         .attr("cy",function(d,i){
            return d.xpos;})
         .attr("r","18")
         .attr("fill", function(d,i){return findColour(uniqueLabels,d.trg);})
      //LABELLING NODES.
      zoomGroup.selectAll("rect"+ element.id+"d")
         .data(element.data)
         .enter().append("rect")
         .attr("class",element.id+"d")
         .attr("height","20")
         .attr("width",function(d,i){return d.trg.length*8;}) //changes with length of the label.
         .attr("x",function(d,i){return width -100 - d.trg.length*8/2;})
         .attr("y",function(d,i){return d.xpos + 25;})
         .attr("stroke", function(d,i){return findColour(uniqueLabels,d.trg);})
         .attr("stroke-width", "2")
         .attr("fill", "#f2f0f0");
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
               drawLine(findColour(uniqueLabels,element2.src),fromTo);
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
            //drawing end nodes
         }
         //eedges
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

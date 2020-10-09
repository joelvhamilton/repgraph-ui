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
               "src": "_attract_v_1",
               "trg": "_attention_n_to",
               "label": "ARG2/NEQ"
           },
           {
               "src": "_that_q_dem",
               "trg": "generic_entity",
               "label": "RSTR/H"
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
           "edges": []
       }
   },
   "graph_2": {
       "20013021": {
           "edges": []
       }
   }
};
 makeGraphComparison(comparisonOutput);

function makeGraphComparison(comparisonOutput){
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
            }
      else{
         g2Nodes =temp[0];
         g2id = g2Nodes[0];
         g2Nodes = g2Nodes[1];
      }
   }

   //SVG STUFF:
   var height = 100;
   if(g2Nodes.length> 0){
   height = height + g2Nodes.length*75;
   }
   if(g1Nodes.length> 0){
   height = height + g1Nodes.length*75;
   }
   if(matchingNodes.length> 0){
   height = height + matchingNodes.length*75;
   }

   var width = 600;
   var workingHeight = 10;
   var svg = d3.select("body").append("svg").attr("id", "viewSvg").attr("class", "d3-comparison")
   .attr("height", height).attr("width", width +8).attr("id", "comparison")
   .attr("viewBox","0,0,700,500")
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
   .attr("width",width +8)
   .attr("x","0")
   .attr("y","0")
   .attr("fill","#f2f0f0");

   //height of text
   var matchingTextPos =0;
   var g1TextPos=0;
   var g2TextPos=0;
   if(matchingNodes.length > 0){
      matchingTextPos = workingHeight;
      workingHeight = workingHeight + 30 + matchingNodes.length*75;
   }
   if(g1Nodes.length > 0){
      g1TextPos = workingHeight;
      workingHeight = workingHeight + 30 + g1Nodes.length*75;
   }
   if(g2Nodes.length > 0){
      g2TextPos = workingHeight;
      workingHeight = workingHeight + 30 + g2Nodes.length+75;
   }
    
   var textPos = [{t:"Matching nodes and edges:", pos:matchingTextPos},
               {t:"Exclusive to graph " + g1id + ":", pos:g1TextPos},
               {t:"Exclusive to graph " + g2id + ":", pos:g2TextPos}];
   for(var i =0; i<textPos.length; i++){
      if(textPos[i].pos == 0){
         textPos[i].t= "";
      }
   }
   var text = textPos.map(x => x.t);
   if(matchingNodes.length > 0){
      matchingNodes.forEach(element => {
         matchingTextPos = matchingTextPos + 75;
         element.xpos = matchingTextPos;
      });
   }
   if(g1Nodes.length > 0){
      g1Nodes.forEach(element => {
         g1TextPos = g1TextPos + 75;
         element.xpos = g1TextPos;
      });
   }
   if(g2Nodes.length > 0){
      g2Nodes.forEach(element => {
         g2TextPos = g2TextPos + 75;
         element.xpos = g2TextPos;
      });
   }
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
         .attr("x",function(d,i){return 5;})
         .attr("y",function(d,i){return textPos[i].pos;})
         .attr("font-size","15")
         .attr("text-anchor","start")
         .attr("dominant-baseline","middle")
         .attr("fill","black")
         .attr("font-family","Arial");
   
   zoomGroup.selectAll("line.layers").data(textPos).enter().append("line")
         .attr("class","layers")
         .attr("x1","0")
         .attr("y1",function(d,i){return d.pos -9;})
         .attr("x2",(width+8).toString())
         .attr("y2",function(d,i){return d.pos -9;})
         .attr("stroke",function(d,i){if(d.t ==""){
            return "none"
         }
            return "gray"
         })
         .attr("stroke-width","2");

   console.log(matchingNodes);
   var alles = [{id:mid, data:matchingNodes},{id:g1id, data:g1Nodes},{id:g2id,data:g2Nodes}];
   alles.forEach(element => {
            
      //drawing begin nodes
      zoomGroup.selectAll("circle"+element.id+"b").data(element.data).enter().append("circle")
         .attr("class",element.id+"b")
         .attr("cx","40")
         .attr("cy",function(d,i){
            return d.xpos;})
         .attr("r","18")
         .attr("fill", "black")
      //LABELLING NODES.
      zoomGroup.selectAll("rect"+ element.id+"b")
         .data(element.data)
         .enter().append("rect")
         .attr("class",element.id+"b")
         .attr("height","20")
         .attr("width","80") //changes with length of the label.
         .attr("x","0")
         .attr("y",function(d,i){return d.xpos + 25;})
         .attr("stroke", "black")
         .attr("stroke-width", "2")
         .attr("fill", "#f2f0f0");
         //drawing end nodes
      zoomGroup.selectAll("circle"+element.id+"d").data(element.data).enter().append("circle")
         .attr("class",element.id+"d")
         .attr("cx",(width-40).toString())
         .attr("cy",function(d,i){
            return d.xpos;})
         .attr("r","18")
         .attr("fill", "black")
      //LABELLING NODES.
      zoomGroup.selectAll("rect"+ element.id+"d")
         .data(element.data)
         .enter().append("rect")
         .attr("class",element.id+"d")
         .attr("height","20")
         .attr("width","80") //changes with length of the label.
         .attr("x",(width-80).toString())
         .attr("y",function(d,i){return d.xpos + 25;})
         .attr("stroke", "black")
         .attr("stroke-width", "2")
         .attr("fill", "#f2f0f0");
      if(element.data.length > 0){
         zoomGroup.append("text").selectAll("text"+ element.id+"b").data(element.data.map(x=> x.src)).enter().append("tspan").text(d => d)
            .attr("class",element.id+"b")
            .attr("x","40")
            .attr("y",function(d,i){return element.data[i].xpos + 35;})
            .attr("font-size","12px")
            .attr("text-anchor","middle")
            .attr("font-weight", "900")
            .attr("dominant-baseline","middle")
            .attr("fill","black")
            .attr("font-family","Arial");

         zoomGroup.append("text").selectAll("text"+ element.id+"d").data(element.data.map(x=> x.trg)).enter().append("tspan").text(d => d)
            .attr("class",element.id+"d")
            .attr("x",(width-40).toString())
            .attr("y",function(d,i){return element.data[i].xpos + 35;})
            .attr("font-size","12px")
            .attr("text-anchor","middle")
            .attr("font-weight", "900")
            .attr("dominant-baseline","middle")
            .attr("fill","black")
            .attr("font-family","Arial");
            //drawing end nodes
         }
         if(element.data.length > 0){
            element.data.forEach(element2 => {
               var fromTo = [{x:60,y:element2.xpos},{x:width-60,y:element2.xpos}];
               drawLine("black",fromTo);
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
         //eedges
   });
   }

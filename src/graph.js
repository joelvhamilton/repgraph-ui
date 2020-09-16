
var layers = {bottom:0,token:0,surface:0,top:10};
var dummyS =[];
var dummyA =[];
var dummyTokens =[];

d3.json("data.json").get(function(error,data){
    var a_nodes = Object.entries(data.a_nodes);
    var s_nodes = Object.entries(data.s_nodes);
    var dataEdges = Object.entries(data.edges);
    var dataTokens = Object.values(data.sentence);
    var top = Object.entries(data.tops);
    //TOP IS A SPECIFIC THING TAHT NEEDS TO BE READ IN FROM THE DATA AND IS NOT NECESSARILY LABELLED.
    dataTokens.forEach(element => {
        dummyTokens.push(element);
    });
    a_nodes.forEach(element => {
        var dummyNodeA = {index:element[0],tokens:element[1].anchors,label:element[1].label,edges:element[1].outgoing,edgelabels:[],xPos:0,yPos:0};
        //need to add edgelabel from edges
        dummyA.push(dummyNodeA);
    });
    s_nodes.forEach(element => {
        var dummyNodeS = {index:element[0],tokens:element[1].anchors,label:element[1].label,edges:element[1].outgoing,edgelabels:[],xPos:0,yPos:0};
        dummyS.push(dummyNodeS);
    });

    var dummySNodeIndexes = dummyS.map(x => x.index);
    var dummyANodeIndexes = dummyA.map(x => x.index);
    var SLabels = dummyS.map(x => x.label);
    var maxIndex = Math.max(Math.max(...dummyANodeIndexes),Math.max(...dummySNodeIndexes));

    top.forEach(element => {
        var i=1
        var dummyNodeA = {index:maxIndex +i,tokens:dummyS[SLabels.indexOf(element[1].label)].tokens,label:"TOP",edges:[],edgelabels:[],xPos:0,yPos:0};
        i++;
        dummyA.push(dummyNodeA);
    });

    dataEdges.forEach(element => {
        if(dummySNodeIndexes.includes(element[1].src.toString())){
            dummyS[dummySNodeIndexes.indexOf(element[1].src.toString())].edgelabels.push(element[1].label);
             //do stuff ehre
        }
        else{
            dummyA[dummyANodeIndexes.indexOf(element[1].src.toString())].edgelabels.push(element[1].label);
        }
    });
var tokenList = dummyTokens;


var sNodes = dummyS;
var aNodes = dummyA
    //  WORKS ON THE ASSUMPTION THAT TOKENS HERE REFERENCES THE TOKENS THAT ARE ANCHORED BY THE CHILDREN OF THE ANODE.
var sNodeLabels = sNodes.map(x => x.label);
var aNodeLabels = aNodes.map(x => x.label);
var sNodeIndexes =dummySNodeIndexes;
var aNodeIndexes =dummyANodeIndexes;

var width = tokenList.length*200;
var height;
var offset = width/(tokenList.length*2);
var maxSNodeHeight=0;
var maxANodeHeight = 0;
var minSNode = 0;
var TopNodeHeight=0;
var gapBetweenBottomNodeAndLayer = 100;

// GETTING POSITIONS OF NODE AND LAYER.
sNodes.forEach(element => {
    element.xPos = offset + (width/tokenList.length)*(element.tokens.reduce((a,b) => a+b,0)/element.tokens.length);
    element.yPos = 100*(element.tokens.length);
    maxSNodeHeight = Math.max(maxSNodeHeight,element.yPos);
});
aNodes.forEach(element => {
    element.xPos = offset + (width/tokenList.length)*(element.tokens.reduce((a,b) => a+b,0)/element.tokens.length);
    if(element.label == "TOP"){
        element.yPos = layers.top + 30; 
        TopNodeHeight = element.yPos;
    }
    else{
        element.yPos = 100*(element.tokens.length);
        maxANodeHeight = Math.max(maxANodeHeight,element.yPos);
    }
});

layers.surface = TopNodeHeight + gapBetweenBottomNodeAndLayer + maxANodeHeight; //height determined for surface layer marker.
aNodes.forEach(element => {
    if(element.label != "TOP"){
        element.yPos = layers.surface - element.yPos;
        aNodes.forEach(element2 => {
            if(element.xPos == element2.xPos && element.yPos == element2.yPos){
                element.xPos = element.xPos -50;
                element2.xPos = element2.xPos +50;
            }
        });
    }

});
sNodes.forEach(element => {
    element.yPos = layers.surface + 100 + maxSNodeHeight - element.yPos;
    minSNode = Math.max(minSNode,element.yPos);
});
layers.token = minSNode + 100;
layers.bottom = layers.token + 100;
height=layers.bottom +10;
//  AT THIS POINT NODE HEIGHTS AND LAYER HEIGHTS HAVE BEEN DETERMINED.
var layerVals = Object.values(layers);


var svg = d3.select("body").append("svg").attr("id", "viewSvg")
.attr("height", height +"px").attr("width", 1000+"px")
.attr("viewBox","0,0,"+width +","+ height )
var group = svg.append("g").attr("id", "group");
var zoomGroup = group.append("g");
group.call(d3.zoom()
    .scaleExtent([0.5, 10])    
    .on("zoom",function(){
    zoomGroup.attr("transform", d3.event.transform);
})); //allows for zooming

//ARROWHEAD DEFINITION
const markerBoxWidth = 6; //the width of the view area?
const markerBoxHeight = 6;
const refX = markerBoxWidth / 2; //sets the middle of the arrow
const refY = markerBoxHeight / 2;
const markerWidth = markerBoxWidth ;
const markerHeight = markerBoxHeight ;
const arrowPoints = [[0, 0], [0, 6], [6, 3]];
var defs = zoomGroup.append("defs")
    .append('marker')
        .attr('id', 'arrow')
        .attr('viewBox', [0, 0, markerBoxWidth+1, markerBoxHeight+1])
        .attr('refX', refX)
        .attr('refY', refY)
        .attr('markerWidth', markerBoxWidth)
        .attr('markerHeight', markerBoxHeight)
        .attr('orient', 'auto')
    .append('path')
        .attr('d', d3.line()(arrowPoints))
        .attr('stroke', 'gray')
        .attr("fill", "gray");

zoomGroup.append("rect")
    .attr("class","back")
    .attr("height","100%")
    .attr("width","100%")
    .attr("x","0")
    .attr("y","0")
    .attr("fill","#f2f0f0");

// DRAWING LAYER LINES
zoomGroup.selectAll("line.layers").data(layerVals).enter().append("line")
    .attr("class","layers")
    .attr("x1","0")
    .attr("y1",function(d,i){return d;})
    .attr("x2",width.toString())
    .attr("y2",function(d,i){return d;})
    .attr("stroke","gray")
    .attr("stroke-width","2");

//DRAWING TOKENS
zoomGroup.append("text").selectAll("text.tokens").data(tokenList).enter().append("tspan").text(d => d)
    .attr("class","tokens")
    .attr("x",function(d,i){return offset + i*(width/(tokenList.length));})
    .attr("y",function(){return layers.bottom - 50;}) //change with depth of token layer.
    .attr("font-size","30")
    .attr("text-anchor","middle")
    .attr("dominant-baseline","middle")
    .attr("fill","black")
    .attr("font-family","Arial");

// DRAWING SURFACE NODES
zoomGroup.selectAll("circle.nodes").data(sNodes).enter().append("circle")
    .attr("class","nodes")
    .attr("cx",function(d,i){return d.xPos})
    .attr("cy",function(d,i){return d.yPos;})
    .attr("r","20")
    .attr("fill", "none")
    .attr("stroke","orange")
    .attr("stroke-width","5");

// DRAWING TOKEN->NODE DASHES.
zoomGroup.selectAll("line.relations").data(sNodes).enter().append("line")
    .attr("class","relations")
    .attr("x1",function(d,i){return d.xPos;})
    .attr("y1",function(d,i){return d.yPos + 23;})
    .attr("x2",function(d,i){return d.xPos;})
    .attr("y2",function(d,i){return layers.bottom - 70;})
    .attr("stroke-dasharray","3,3")
    .attr("stroke","gray")
    .attr("stroke-width","2");

//LABELLING NODES.
zoomGroup.selectAll("rect.labels")
    .data(sNodes)
    .enter().append("rect")
    .attr("class","labels")
    .attr("height","20")
    .attr("width","60") //changes with length of the label.
    .attr("x",function(d,i){return d.xPos-30;})
    .attr("y",function(d,i){return d.yPos + 33;})
    .attr("fill", "#ffff99");
zoomGroup.append("text").selectAll("text.nodeLabels").data(sNodeLabels).enter().append("tspan").text(d => d)
    .attr("class","nodeLabels")
    .attr("x",function(d,i){return sNodes[i].xPos;})
    .attr("y",function(d,i){return sNodes[i].yPos + 43;})
    .attr("font-size","12")
    .attr("text-anchor","middle")
    .attr("dominant-baseline","middle")
    .attr("fill","black")
    .attr("font-family","Cambria");

// HIGHLIGHTING ANCHORS
zoomGroup.selectAll("rect.highlights")
    .data(sNodes)
    .enter().append("rect")
    .attr("class","highlights")
    .attr("height","35")
    .attr("width",function(d,i){return 120*d.tokens.length;})
    .attr("x",function(d,i){return d.xPos -120;})
    .attr("y",function(d,i){return layers.bottom - 67;})
    .attr("fill", function(d,i){
        if(d.tokens.length > 1){
            return"#ffff99" ;
        }return "none";})
    .style("opacity","0.4");

//  ABSTRACT NODES
zoomGroup.selectAll("circle.aNodes").data(aNodes).enter().append("circle")
    .attr("class","aNodes")
    .attr("cx",function(d,i){return d.xPos;})
    .attr("cy",function(d,i){return d.yPos;})
    .attr("r","20")
    .attr("fill", "none")
    .attr("stroke",function(d,i){if(d.label=="TOP"){
        return "red";
    }return "gray" ;})
    .attr("stroke-width","5");

//  SURFACE EDGES
sNodes.forEach(element => {
    if(element.edges[0] != -1){
        for(var i=0; i<element.edges.length ;i++){
            if(sNodeIndexes.includes(element.edges[i])){
                if(element.xPos >= sNodes[sNodeIndexes.indexOf(element.edges[i])].xPos ){
                    var fromToS = [{x:element.xPos -23,y:element.yPos -14},
                        {x:element.xPos -83 ,y:element.yPos -80 },
                        {x:sNodes[sNodeIndexes.indexOf(element.edges[i])].xPos +89,y:sNodes[sNodeIndexes.indexOf(element.edges[i])].yPos -80},
                        {x:sNodes[sNodeIndexes.indexOf(element.edges[i])].xPos +27,y:sNodes[sNodeIndexes.indexOf(element.edges[i])].yPos -14}]; //needs worku
                }
                else{
                    var fromToS = [{x:element.xPos +25,y:element.yPos},
                        {x:element.xPos +87,y:element.yPos -17+80},
                        {x:sNodes[sNodeIndexes.indexOf(element.edges[i])].xPos -83,y:sNodes[sNodeIndexes.indexOf(element.edges[i])].yPos -17+80},
                        {x:sNodes[sNodeIndexes.indexOf(element.edges[i])].xPos -28,y:sNodes[sNodeIndexes.indexOf(element.edges[i])].yPos + 8}]; //needs worku
                }
            }
            else{
                console.log(element);
                console.log(element.edges[i]);

                console.log(aNodeIndexes.indexOf(element.edges[i]));

                console.log(aNodes[aNodeIndexes.indexOf(element.edges[i])].xPos);
                if(element.xPos >= aNodes[aNodeIndexes.indexOf(element.edges[i])].xPos ){
                    var fromToS = [{x:element.xPos -23,y:element.yPos -14},
                        {x:element.xPos -83 ,y:element.yPos -80 },
                        {x:aNodes[aNodeIndexes.indexOf(element.edges[i])].xPos +89,y:aNodes[aNodeIndexes.indexOf(element.edges[i])].yPos -80},
                        {x:aNodes[aNodeIndexes.indexOf(element.edges[i])].xPos +27,y:aNodes[aNodeIndexes.indexOf(element.edges[i])].yPos -14}]; //needs worku
                }
                else{
                    var fromToS = [{x:element.xPos +25,y:element.yPos},
                        {x:element.xPos +87,y:element.yPos -17+80},
                        {x:aNodes[aNodeIndexes.indexOf(element.edges[i])].xPos -83,y:aNodes[aNodeIndexes.indexOf(element.edges[i])].yPos -17+80},
                        {x:aNodes[aNodeIndexes.indexOf(element.edges[i])].xPos -28,y:aNodes[aNodeIndexes.indexOf(element.edges[i])].yPos + 8}]; //needs worku
                }
            }
            var line = d3.line()
            .x(function(d){return d.x;})
            .y(function(d){return d.y;})
            .curve(d3.curveBundle);
        zoomGroup.append("path")
            .attr("d",line(fromToS))
            .attr("stroke", "orange")
            .attr("stroke-width","2")
            .attr("marker-end", "url(#arrow)")
            .attr("fill", "none");
 // LABEL
    var labelX = (fromToS.map(e => e.x)).reduce((a,b) => a+b,0)/fromToS.length +3;
    var labelY = (fromToS.map(e => e.y)).reduce((a,b) => a+b,0)/fromToS.length +3;
    zoomGroup.selectAll("text.aLabels").data([element]).enter().append("text")
        .text(d=> d.edgelabels[i])
        .attr("x",labelX.toString())
        .attr("y",labelY.toString())
        .attr("font-family","Arial")
        .attr("font-size","18px")
        .attr("dominant-baseline", "middle")
        .attr("text-anchor","middle")
        .attr("fill","#242424")
        .attr("fill", "gray");
        }
    }
});

//  EDGES AND SPANS OF ABSTRACT NODES
aNodes.forEach(element => {
    //SPANS - DO NOT WORRY FOR NOW

    //RETHINK THIS !!!!!

    // var shortX = Number.MAX_SAFE_INTEGER;
    // var longX = 0;
    // element.edges.forEach(edge => {
    //     shortX = Math.min(sNodes[edge].xPos,shortX);
    //     longX = Math.max(sNodes[edge].xPos,longX)
    // });
    // var colour = "gray";
    // var width = "0.5";
    // if(element.label =="TOP"){
    //     colour = "red";
    //     width = "1";
    // }
    // zoomGroup.selectAll("line.span1")
    //     .data([element])
    //     .enter().append("line")
    //     .attr("class","span1")
    //     .attr("x1",function(d,i){return d.xPos;})
    //     .attr("y1",function(d,i){return d.yPos +23;})
    //     .attr("x2",function(d,i){return d.xPos;})
    //     .attr("y2",function(d,i){return d.yPos + 53 ;})
    //     .attr("stroke", colour)
    //     .attr("stroke-width",width);
    // zoomGroup.selectAll("line.span2")
    //     .data([element])
    //     .enter().append("line")
    //     .attr("class","span2")
    //     .attr("x1",(shortX -23).toString())
    //     .attr("y1",function(d,i){return d.yPos +53;})
    //     .attr("x2",(longX +23).toString())
    //     .attr("y2",function(d,i){return d.yPos +53 ;})
    //     .attr("stroke", colour)
    //     .attr("stroke-width",width);
    // zoomGroup.selectAll("line.span3")
    //     .data([element])
    //     .enter().append("line")
    //     .attr("class","span3")
    //     .attr("x1",(shortX -23).toString())
    //     .attr("y1",function(d,i){return d.yPos +53;})
    //     .attr("x2",(shortX -23).toString())
    //     .attr("y2",function(d,i){return d.yPos +67 ;})
    //     .attr("stroke", colour)
    //     .attr("stroke-width",width);
    // zoomGroup.selectAll("line.span4")
    //     .data([element])
    //     .enter().append("line")
    //     .attr("class","span4")
    //     .attr("x1",(longX +23).toString())
    //     .attr("y1",function(d,i){return d.yPos +53;})
    //     .attr("x2",(longX +23).toString())
    //     .attr("y2",function(d,i){return d.yPos +67 ;})
    //     .attr("stroke", colour)
    //     .attr("stroke-width",width);
    //EDGE
    for(var i =0; i< element.edges.length; i++){
        if(sNodeIndexes.includes(element.edges[i])){
            var fromTo = [{x:element.xPos,y:element.yPos +23},{x:sNodes[sNodeIndexes.indexOf(element.edges[i])].xPos,y:sNodes[sNodeIndexes.indexOf(element.edges[i])].yPos-29}];
        }
        else{
            if(element.xPos >= aNodes[aNodeIndexes.indexOf(element.edges[i])].xPos){
                var fromTo = [{x:element.xPos -23,y:element.yPos},{x:aNodes[aNodeIndexes.indexOf(element.edges[i])].xPos+29,y:aNodes[aNodeIndexes.indexOf(element.edges[i])].yPos}];   
            }else{
                var fromTo = [{x:element.xPos +23 ,y:element.yPos},{x:aNodes[aNodeIndexes.indexOf(element.edges[i])].xPos -29,y:aNodes[aNodeIndexes.indexOf(element.edges[i])].yPos}];
            }

        }
        //ABOVE SEGMENT HAS NEVER BEEN TESTed        
        var line = d3.line()
                        .x(function(d){return d.x;})
                        .y(function(d){return d.y;});
        zoomGroup.append("path")
            .attr("d",line(fromTo))
            .attr("stroke", "gray")
            .attr("stroke-width","2")
            .attr("marker-end", "url(#arrow)")
            .attr("fill", "none");
        //LABEL
        var labelX = (fromTo[0].x + fromTo[1].x)/2 +3;
        var labelY = (fromTo[0].y + fromTo[1].y)/2 +2; //THIS WILL HAVE TO BE CHANGED IF PATHS BECOME CURVED.
        zoomGroup.selectAll("text.aLabels").data([element]).enter().append("text")
            .text(d=> d.edgelabels[i])
            .attr("x",labelX.toString())
            .attr("y",labelY.toString())
            .attr("font-family","Arial")
            .attr("font-size","18px")
            .attr("fill","#242424");
    }
//ABSTRACT NODE LABELS - redo this so edges dont overwrite?
zoomGroup.selectAll("rect.alabels")
    .data(aNodes)
    .enter().append("rect")
    .attr("class","alabels")
    .attr("height","20")
    .attr("width",function(d,i){if(d.label=="TOP"){
        return "30";
    }return "60";})
    .attr("x",function(d,i){if(d.label=="TOP"){
        return d.xPos-15;
     }
      return d.xPos-30;})
    .attr("y",function(d,i){return d.yPos + 30;})
    .attr("fill", function(d,i){if(d.label=="TOP"){
        return "red";
    }return "gray";});
zoomGroup.append("text").selectAll("text.anodeLabels").data(aNodeLabels).enter().append("tspan").text(d => d)
    .attr("class","anodeLabels")
    .attr("x",function(d,i){return aNodes[i].xPos;})
    .attr("y",function(d,i){return aNodes[i].yPos + 43;})
    .attr("font-size","12")
    .attr("text-anchor","middle")
    .attr("dominant-baseline","middle")
    .attr("fill","black")
    .attr("font-family","Cambria");

});
});

  
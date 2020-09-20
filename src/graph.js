
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
        var dummyNodeA = {index:element[0],tokens:element[1].anchors,label:element[1].label,edges:element[1].outgoing,edgelabels:[],xPos:0,yPos:0,colour:"green"};
        //need to add edgelabel from edges
        dummyA.push(dummyNodeA);
    });
    s_nodes.forEach(element => {
        var dummyNodeS = {index:element[0],tokens:element[1].anchors,label:element[1].label,edges:element[1].outgoing,edgelabels:[],xPos:0,yPos:0,colour:"green"};
        dummyS.push(dummyNodeS);
    });

    var dummySNodeIndexes = dummyS.map(x => x.index);
    var dummyANodeIndexes = dummyA.map(x => x.index);
    var SLabels = dummyS.map(x => x.label);
    var maxIndex = Math.max(Math.max(...dummyANodeIndexes),Math.max(...dummySNodeIndexes));

    top.forEach(element => {
        var i=1
        var dummyNodeA = {index:maxIndex +i,tokens:dummyS[SLabels.indexOf(element[1].label)].tokens,label:"TOP",edges:[],edgelabels:[],xPos:0,yPos:0, colour:"green"};
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
var abstractColourScale = d3.scaleLinear().domain([0,dummyANodeIndexes.length]).range(["yellow", "red"]);
var surfaceColourScale =  d3.scaleSequential().domain([0,dummySNodeIndexes.length]).interpolator(d3.interpolateCool);

var sNodes = dummyS;
var aNodes = dummyA;

for(var i=0; i<sNodes.length; i++){
    sNodes[i].colour = surfaceColourScale(i);
}
for(var i=0; i<aNodes.length; i++){
    aNodes[i].colour = abstractColourScale(i);
}
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

const arrowPoints = [[0, 0], [0, 6], [6, 3]];

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

zoomGroup.append("defs").selectAll("marker.s").data(sNodes).enter().append("marker")
        .attr("class","s")
        .attr('id', function(d,i){return "arrow-"+d.index;})
        .attr('viewBox', [0, 0, 7, 7])
        .attr('refX', 3.5)
        .attr('refY', 3.5)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
    .append('path')
        .attr('d', d3.line()(arrowPoints))
        .attr("fill", function(d,i){return d.colour;});
zoomGroup.select("defs").selectAll("marker.a").data(aNodes).enter().append("marker")
        .attr("class","a")
        .attr('id', function(d,i){return "arrow-"+d.index;})
        .attr('viewBox', [0, 0, 7, 7])
        .attr('refX', 3.5)
        .attr('refY', 3.5)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
    .append('path')
        .attr('d', d3.line()(arrowPoints))
        .attr("fill", function(d,i){return d.colour;});
// function arrowHead(colour){
//     zoomGroup.append("defs")
//     .append('marker')
//         .attr('id', 'arrow')
//         .attr("class","arrow")
//         .attr('viewBox', [0, 0, 7, 7])
//         .attr('refX', 3.5)
//         .attr('refY', 3.5)
//         .attr('markerWidth', 6)
//         .attr('markerHeight', 6)
//         .attr('orient', 'auto')
//     .append('path')
//         .attr('d', d3.line()(arrowPoints))
//         .attr("fill", colour);
// }

function drawLine(colour, data, index){
    var line = d3.line()
    .x(function(d){return d.x;})
    .y(function(d){return d.y;})
    .curve(d3.curveBundle);
zoomGroup.append("path")
    .attr("d",line(data))
    .attr("stroke", colour)
    .attr("stroke-width","2")
    .attr("marker-end", "url(#arrow-"+index+")")
    .attr("fill", "none");
};



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

// DRAWING TOKENS
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
    .attr("r","12")
    .attr("fill", function(d,i){return d.colour;});

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
            return d.colour;
        }return "none";})
    .style("opacity","0.4");

//  ABSTRACT NODES
zoomGroup.selectAll("circle.aNodes").data(aNodes).enter().append("circle")
    .attr("class","aNodes")
    .attr("cx",function(d,i){return d.xPos;})
    .attr("cy",function(d,i){return d.yPos;})
    .attr("r",function(d,i){
        if(d.label=="TOP"){
            return "20";
        }
        return "12";})
    .attr("fill", function(d,i){return d.colour;});
    

//  SURFACE EDGES
sNodes.forEach(element => {
    if(element.edges[0] != -1){
        for(var i=0; i<element.edges.length ;i++){
            var otherSNode = sNodes[sNodeIndexes.indexOf(element.edges[i].toString())];
            var otherANode = aNodes[aNodeIndexes.indexOf(element.edges[i].toString())];
            if(sNodeIndexes.includes(element.edges[i].toString())){
                if(element.xPos >= otherSNode.xPos ){
                    var fromToS = [{x:element.xPos -23,y:element.yPos -14},
                        {x:element.xPos -83 ,y:element.yPos -80 },
                        {x:otherSNode.xPos +89,y:otherSNode.yPos -80},
                        {x:otherSNode.xPos +27,y:otherSNode.yPos -14}]; //needs worku
                }
                else{
                    var fromToS = [{x:element.xPos +25,y:element.yPos},
                        {x:element.xPos +87,y:element.yPos -17+80},
                        {x:otherSNode.xPos -83,y:otherSNode.yPos -17+80},
                        {x:otherSNode.xPos -28,y:otherSNode.yPos + 8}]; //needs worku
                }
            }
            else{
                if(element.xPos >= otherANode.xPos ){
                    var fromToS = [{x:element.xPos -23,y:element.yPos -14},
                        {x:element.xPos -83 ,y:element.yPos -80 },
                        {x:otherANode.xPos +89,y:otherANode.yPos -80},
                        {x:otherANode.xPos +27,y:otherANode.yPos -14}]; //needs worku
                }
                else{
                    var fromToS = [{x:element.xPos +25,y:element.yPos},
                        {x:element.xPos +87,y:element.yPos -17+80},
                        {x:otherANode.xPos -83,y:otherANode.yPos -17+80},
                        {x:otherANode.xPos -28,y:otherANode.yPos + 8}]; //needs worku
                }
            }
            drawLine(element.colour,fromToS, element.index);
 // LABEL
    var labelX = (fromToS.map(e => e.x)).reduce((a,b) => a+b,0)/fromToS.length +3;
    var labelY = (fromToS.map(e => e.y)).reduce((a,b) => a+b,0)/fromToS.length +3;
    zoomGroup.selectAll("text.aLabels").data([element]).enter().append("text")
        .text(d=> d.edgelabels[i])
        .attr("x",labelX.toString())
        .attr("y",labelY.toString())
        .attr("font-family","Arial")
        .attr("font-size","12px")
        .attr("dominant-baseline", "middle")
        .attr("text-anchor","middle")
        .attr("fill","#242424")
        .attr("fill", "black");
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
        var otherSNode = sNodes[sNodeIndexes.indexOf(element.edges[i].toString())] ;
        var otherANode = aNodes[aNodeIndexes.indexOf(element.edges[i].toString())];
        if(sNodeIndexes.includes(element.edges[i].toString())){
            var fromTo = [{x:element.xPos,y:element.yPos +23},{x:otherSNode.xPos,y:otherSNode.yPos-29}];
        }
        else{
            if(element.xPos >= aNodes[aNodeIndexes.indexOf(element.edges[i].toString())].xPos){
                var fromTo = [{x:element.xPos -23,y:element.yPos},{x:otherANode.xPos+29,y:otherANode.yPos}];   
            }else{
                var fromTo = [{x:element.xPos +23 ,y:element.yPos},{x:otherANode.xPos -29,y:otherANode.yPos}];
            }

        }
        //ABOVE SEGMENT HAS NEVER BEEN TESTed        
        var line = d3.line()
                        .x(function(d){return d.x;})
                        .y(function(d){return d.y;});
        drawLine(element.colour,fromTo, element.index);

        //LABEL
        var labelX = (fromTo[0].x + fromTo[1].x)/2 +3;
        var labelY = (fromTo[0].y + fromTo[1].y)/2 +2; //THIS WILL HAVE TO BE CHANGED IF PATHS BECOME CURVED.
        zoomGroup.selectAll("text.aLabels").data([element]).enter().append("text")
            .text(d=> d.edgelabels[i])
            .attr("x",labelX.toString())
            .attr("y",labelY.toString())
            .attr("font-family","Arial")
            .attr("font-size","12px")
            .attr("fill","#242424");
    }
    
//LABELLING NODES.
zoomGroup.selectAll("rect.labels")
    .data(sNodes)
    .enter().append("rect")
    .attr("class","labels")
    .attr("height","20")
    .attr("width","60") //changes with length of the label.
    .attr("x",function(d,i){return d.xPos-30;})
    .attr("y",function(d,i){return d.yPos + 33;})
    .attr("fill", function(d,i){return d.colour;});
zoomGroup.append("text").selectAll("text.nodeLabels").data(sNodeLabels).enter().append("tspan").text(d => d)
    .attr("class","nodeLabels")
    .attr("x",function(d,i){return sNodes[i].xPos;})
    .attr("y",function(d,i){return sNodes[i].yPos + 43;})
    .attr("font-size","12")
    .attr("text-anchor","middle")
    .attr("dominant-baseline","middle")
    .attr("fill","black")
    .attr("font-family","Cambria");

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




  
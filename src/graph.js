
data = 'data.json';
makeGraph(data,true);
//remove above =====================================================
function makeGraph(data, showTokens){
// export const makeGraph = function (data,showTokens) {
    //ADD EXPORT TO THE ABOVE LINE and remove this ============
    // d3.json(data).get(function(error,data)
    //=========================================================

var start = performance.now();
var layers = {bottom:0,token:0,surface:0,top:10};
var sNodes =[];
var aNodes =[];
var tokenList =[];
    // debugger

d3.json(data).get(function(error,data){

    var id = data.id;
    var a_nodes = Object.entries(data.a_nodes);
    var s_nodes = Object.entries(data.s_nodes);
    var dataEdges = Object.entries(data.edges);
    var dataTokens = Object.entries(data.sentence);
    var top = Object.entries(data.tops);

    //TOP IS A SPECIFIC THING TAHT NEEDS TO BE READ IN FROM THE DATA AND IS NOT NECESSARILY LABELLED.
    dataTokens.forEach(element => {
        tokenList.push(element);
    });
    a_nodes.forEach(element => {
        var dummyNodeA = {index:element[0],tokens:element[1].anchors,label:element[1].label,edges:element[1].outgoing,edgelabels:[],xPos:0,yPos:0,colour:"green"};
        //need to add edgelabel from edges
        aNodes.push(dummyNodeA);
    });
    s_nodes.forEach(element => {
        var dummyNodeS = {index:element[0],tokens:element[1].anchors,label:element[1].label,edges:element[1].outgoing,edgelabels:[],xPos:0,yPos:0,colour:"green"};
        sNodes.push(dummyNodeS);
    });

    var sNodeIndexes = sNodes.map(x => x.index);
    var aNodeIndexes = aNodes.map(x => x.index);
    var sNodeLabels = sNodes.map(x => x.label);
    var aNodeLabels = aNodes.map(x => x.label);

    var maxIndex = Math.max(Math.max(...aNodeIndexes),Math.max(...sNodeIndexes));

    top.forEach(element => {
        var i=1
        if(element[1].label[0] == "_"){
            var dummyNodeA = {index:maxIndex +i,tokens:sNodes[sNodeLabels.indexOf(element[1].label)].tokens,label:"TOP",edges:[],edgelabels:[],xPos:0,yPos:0, colour:"green",relation: element[1].label, abstract: false};
        }
        else{
            var dummyNodeA = {index:maxIndex +i,tokens:aNodes[aNodeLabels.indexOf(element[1].label)].tokens,label:"TOP",edges:[],edgelabels:[],xPos:0,yPos:0, colour:"green",relation: element[1].label, abstract: true};
        }
        i++;
        aNodes.push(dummyNodeA);
        aNodeLabels.push("TOP");
        aNodeIndexes.push(dummyNodeA.index);
    });


    
    dataEdges.forEach(element => {
        if(sNodeIndexes.includes(element[1].src.toString())){
            sNodes[sNodeIndexes.indexOf(element[1].src.toString())].edgelabels.push(element[1].label);
                }
        else{
            aNodes[aNodeIndexes.indexOf(element[1].src.toString())].edgelabels.push(element[1].label);
        }
    });
var abstractColourScale = d3.scaleLinear().domain([0,aNodeIndexes.length]).range(["yellow", "red"]);
var surfaceColourScale =  d3.scaleSequential().domain([0,sNodeIndexes.length]).interpolator(d3.interpolateCool);

// determining the colour of each node.
for(var i=0; i<sNodes.length; i++){
    sNodes[i].colour = surfaceColourScale(i);
}
for(var i=0; i<aNodes.length; i++){
    aNodes[i].colour = abstractColourScale(i);
}

// GRAPH SIZE DEFINITIONS
var width = tokenList.length*200;
var offset = width/(tokenList.length*2);
var maxSNodeHeight=0;
var maxANodeHeight = 0;
var minSNode = 0;
var TopNodeHeight=0;
var gapBetweenBottomNodeAndLayer = 100;
var tokenGap = width/tokenList.length;

// ARROW SIZE DEFINIITONS
const arrowPoints = [[0, 0], [0, 6], [6, 3]];

// GETTING POSITIONS OF NODE AND LAYER.
sNodes.forEach(element => {
    element.xPos = offset + (width/tokenList.length)*(element.tokens.reduce((a,b) => a+b,0)/element.tokens.length);
    element.yPos = 50*(element.tokens.length);
    maxSNodeHeight = Math.max(maxSNodeHeight,element.yPos);
});
aNodes.forEach(element => {
    element.xPos = offset + (width/tokenList.length)*(element.tokens.reduce((a,b) => a+b,0)/element.tokens.length);
    if(element.label == "TOP"){
        element.yPos = layers.top + 25; 
        TopNodeHeight = element.yPos;
    }
    else{
        element.yPos = 50*(element.tokens.length);
        maxANodeHeight = Math.max(maxANodeHeight,element.yPos);
    }
});

layers.surface = TopNodeHeight + gapBetweenBottomNodeAndLayer + maxANodeHeight +25; //height determined for surface layer marker.
aNodes.forEach(element =>{
    if(element.label != "TOP"){
        element.yPos = layers.surface - element.yPos -25;
    }
})
for(var j=0;j<aNodes.length;j++){//this is expensive af
    if(aNodes[j].label != "TOP"){
        for(var i =0; i< aNodes.length; i++) { //NESTED FOR-LOOP, CAN PROBABLY BE DONE BETTER.
            if(aNodes[j].xPos == aNodes[i].xPos && aNodes[j].yPos == aNodes[i].yPos && aNodes[j].index != aNodes[i].index){
                aNodes[j].xPos = aNodes[j].xPos -75;
                aNodes[i].xPos = aNodes[i].xPos +75;
                j=0;
            }
        }
    }

}
sNodes.forEach(element => {
    element.yPos = layers.surface + 100 + maxSNodeHeight - element.yPos;
    minSNode = Math.max(minSNode,element.yPos);
});
layers.token = minSNode + 100;
layers.bottom = layers.token + 100;
let height=layers.bottom +10;

//  AT THIS POINT NODE HEIGHTS AND LAYER HEIGHTS HAVE BEEN DETERMINED.
var layerVals = Object.values(layers);

if (document.getElementsByClassName("d3-graph").length === 5){
    d3.select("svg").remove()
}

var svg = d3.select("body").append("svg").attr("id", "viewSvg").attr("class", "d3-graph")
.attr("height", "700px").attr("width", 1000+"px")
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


//BACKGROUND RECTANGLE
zoomGroup.append("rect")
    .attr("class","back")
    .attr("height",function(d,i){if(showTokens){
        return height;
    }
    return height-100;})
    .attr("width","100%")
    .attr("x","0")
    .attr("y","0")
    .attr("fill","#f2f0f0");

// DRAWING LAYER LINES
if(!(showTokens)){
    layerVals[0] = layerVals[1];
}
zoomGroup.selectAll("line.layers").data(layerVals).enter().append("line")
    .attr("class","layers")
    .attr("x1","0")
    .attr("y1",function(d,i){return d;})
    .attr("x2",width.toString())
    .attr("y2",function(d,i){return d;})
    .attr("stroke","gray")
    .attr("stroke-width","2");

// DRAWING TOKENS
if(showTokens){
    zoomGroup.append("text").selectAll("text.tokens").data(tokenList).enter().append("tspan").text(d => d)
        .attr("class","tokens")
        .attr("x",function(d,i){return offset + i*tokenGap;})
        .attr("y",function(){return layers.bottom - 50;}) //change with depth of token layer.
        .attr("font-size","30")
        .attr("text-anchor","middle")
        .attr("dominant-baseline","middle")
        .attr("fill","black")
        .attr("font-family","Arial");

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
}


// DRAWING SURFACE NODES
zoomGroup.selectAll("circle.nodes").data(sNodes).enter().append("circle")
    .attr("class","nodes")
    .attr("cx",function(d,i){return d.xPos})
    .attr("cy",function(d,i){return d.yPos;})
    .attr("r","12")
    .attr("fill", function(d,i){return d.colour;})
    .on("click", function(d,i){ console.log("Hello from graph: " + id + " and node: " + d.label);})
    .on("mouseover", function(d,i){mouseHover(d.colour,d.tokens)})
    .on("mouseout", mouseOut);;

// HIGHLIGHTING ANCHORS
if(showTokens){
    zoomGroup.selectAll("rect.highlights")
    .data(tokenList)
    .enter().append("rect")
    .attr("class",function(d,i){return "highlights rectangle"+i;}) //index of the token
    .attr("height","35")
    .attr("width",function(d,i){return 200;})
    .attr("x",function(d,i){return offset + i*tokenGap -100;})
    .attr("y",function(d,i){return layers.bottom - 67;})
    .attr("fill", "none")
    .style("opacity","0.4");
}


// ABSTRACT NODES
zoomGroup.selectAll("circle.aNodes").data(aNodes).enter().append("circle")
    .attr("class","aNodes")
    .attr("cx",function(d,i){return d.xPos;})
    .attr("cy",function(d,i){return d.yPos;})
    .attr("r",function(d,i){
        if(d.label=="TOP"){
            return "18";
        }
        return "12";})
    .attr("fill", function(d,i){return d.colour;})
    .on("click", function(d,i){ console.log("Hello from graph: " + id + " and node: " + d.label);})
    .on("mouseover", function(d,i){mouseHover(d.colour,d.tokens)})
    .on("mouseout", mouseOut);    

//  SURFACE EDGES
sNodes.forEach(element => {
    if(element.edges[0] != -1){
        for(var i=0; i<element.edges.length ;i++){
            var otherSNode = sNodes[sNodeIndexes.indexOf(element.edges[i].toString())];
            var otherANode = aNodes[aNodeIndexes.indexOf(element.edges[i].toString())];
            if(sNodeIndexes.includes(element.edges[i].toString())){
                var abDiffX = Math.abs(element.xPos - otherSNode.xPos);
                if(element.xPos >= otherSNode.xPos ){
                    if(abDiffX < 240){
                        var fromToS = [{x:element.xPos -17,y:element.yPos},{x:otherSNode.xPos +20,y:otherSNode.yPos}];
                    }
                    else{
                        var fromToS = [{x:element.xPos -17,y:element.yPos -14},
                            {x:element.xPos -abDiffX/11 ,y:element.yPos - abDiffX/11 },
                            {x:otherSNode.xPos +abDiffX/11,y:otherSNode.yPos -abDiffX/11},
                            {x:otherSNode.xPos +17,y:otherSNode.yPos -14}]; //needs worku
                    }
                }
                else{
                    if(abDiffX < 240){
                        var fromToS = [{x:element.xPos +17,y:element.yPos},{x:otherSNode.xPos -20,y:otherSNode.yPos}];
                    }
                    else{
                        var limitLine = 130;
                        var edgeLineYAxis = Math.min(limitLine, abDiffX/12);
                        var fromToS = [{x:element.xPos +17,y:element.yPos},
                            {x:element.xPos +edgeLineYAxis,y:element.yPos +edgeLineYAxis},
                            {x:otherSNode.xPos -edgeLineYAxis,y:otherSNode.yPos +edgeLineYAxis},
                            {x:otherSNode.xPos -20,y:otherSNode.yPos + 8}]; //needs worku
                    }
                }
            }
            else{
                if(element.xPos > otherANode.xPos){
                    var fromToS = [{x:element.xPos-10,y:element.yPos -15},
                        {x:element.xPos -83 ,y:element.yPos -80 },
                        {x:otherANode.xPos +89,y:otherANode.yPos -80},
                        {x:otherANode.xPos +15,y:otherANode.yPos -15}]; //needs worku
                }
                else if (element.xPos == otherANode.xPos){
                    var fromToS = [{x:element.xPos,y:element.yPos -17},
                        {x:element.xPos -83 ,y:element.yPos -80 },
                        {x:otherANode.xPos +89,y:otherANode.yPos -80},
                        {x:otherANode.xPos ,y:otherANode.yPos -17}]; //needs worku
                }
                else{
                    var fromToS = [{x:element.xPos + 14,y:element.yPos -14},
                        {x:element.xPos +87,y:element.yPos -60},
                        {x:otherANode.xPos -83,y:otherANode.yPos -17+80},
                        {x:otherANode.xPos -19,y:otherANode.yPos + 8}]; //needs worku
                }
            }
            drawLine(element.colour,fromToS, element.index);
 // LABEL
    var labelX = (fromToS[0].x+fromToS[1].x)/2 + 10;
    var labelY = (fromToS[0].y+fromToS[1].y)/2 + 10;
    zoomGroup.selectAll("text.aLabels").data([element]).enter().append("text")
        .text(d=> d.edgelabels[i])
        .attr("x",labelX.toString())
        .attr("y",labelY.toString())
        .attr("font-family","Arial")
        .attr("font-size","12px")
        .attr("dominant-baseline", "middle")
        .attr("text-anchor","middle")
        .attr("fill", "black");
        }
    }
});

//  EDGES OF ABSTRACT NODES
aNodes.forEach(element => {
    if(element.label == "TOP"){
    zoomGroup.selectAll("line.top").data([element]).enter().append("line")
        .attr("class","top")
        .attr("x1",function(d,i){return d.xPos;})
        .attr("y1",function(d,i){return d.yPos + 23;})
        .attr("x2",function(d,i){return d.xPos;})
        .attr("y2",function(d,i){if(!(element.abstract)){
            return sNodes[sNodeLabels.indexOf(d.relation.toString())].yPos -17;
        }
        else{
            return aNodes[aNodeLabels.indexOf(d.relation.toString())].yPos -17;
        }})
        .attr("stroke-dasharray","3,3")
        .attr("stroke",function(d,i){return d.colour;})
        .attr("stroke-width","2");
    };
    //EDGE
    for(var i =0; i< element.edges.length; i++){
        var otherSNode = sNodes[sNodeIndexes.indexOf(element.edges[i].toString())] ;
        var otherANode = aNodes[aNodeIndexes.indexOf(element.edges[i].toString())];
        if(sNodeIndexes.includes(element.edges[i].toString())){
            if(element.xPos > otherSNode.xPos){
                var fromTo = [{x:element.xPos -8 ,y:element.yPos +15},{x:otherSNode.xPos +8,y:otherSNode.yPos-20}];
            }
            else if(element.xPos == otherSNode.xPos){
                var fromTo = [{x:element.xPos ,y:element.yPos +17},{x:otherSNode.xPos,y:otherSNode.yPos-20}];
            }
            else{
                var fromTo = [{x:element.xPos +8 ,y:element.yPos +15},{x:otherSNode.xPos -8,y:otherSNode.yPos-20}];
            }
        }
        else{
            if(element.xPos >= otherANode.xPos){
                var fromTo = [{x:element.xPos -17,y:element.yPos},{x:otherANode.xPos+20,y:otherANode.yPos}];   
            }else{
                var fromTo = [{x:element.xPos +17 ,y:element.yPos},{x:otherANode.xPos -20,y:otherANode.yPos}];
            }

        }
        var line = d3.line()
                        .x(function(d){return d.x;})
                        .y(function(d){return d.y;});
        drawLine(element.colour,fromTo, element.index);

        //LABEL
        var labelX = (fromTo[0].x + fromTo[1].x)/2;
        var labelY = (fromTo[0].y + fromTo[1].y)/2 -8; //THIS WILL HAVE TO BE CHANGED IF PATHS BECOME CURVED.
        zoomGroup.selectAll("text.aLabels").data([element]).enter().append("text")
            .text(d=> d.edgelabels[i])
            .attr("x",labelX.toString())
            .attr("y",labelY.toString())
            .attr("font-family","Arial")
            .attr("font-size","12px")
            .attr("fill","#242424")
            .attr("text-anchor","middle");
    }
    
//LABELLING NODES.
zoomGroup.selectAll("rect.labels")
    .data(sNodes)
    .enter().append("rect")
    .attr("class","labels")
    .attr("height","20")
    .attr("width","70") //changes with length of the label.
    .attr("x",function(d,i){return d.xPos-35;})
    .attr("y",function(d,i){return d.yPos + 33;})
    .attr("stroke", function(d,i){return d.colour;})
    .attr("stroke-width", "2")
    .attr("fill", "#f2f0f0");
zoomGroup.append("text").selectAll("text.nodeLabels").data(sNodeLabels).enter().append("tspan").text(d => d)
    .attr("class","nodeLabels")
    .attr("x",function(d,i){return sNodes[i].xPos;})
    .attr("y",function(d,i){return sNodes[i].yPos + 43;})
    .attr("font-size","12")
    .attr("text-anchor","middle")
    .attr("dominant-baseline","middle")
    .attr("fill","black")
    .attr("font-family","Arial");

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
    .attr("stroke", function(d,i){return d.colour;})
    .attr("stroke-width", "2")
    .attr("fill", "#f2f0f0");
zoomGroup.append("text").selectAll("text.anodeLabels").data(aNodeLabels).enter().append("tspan").text(d => d)
    .attr("class","anodeLabels")
    .attr("x",function(d,i){return aNodes[i].xPos;})
    .attr("y",function(d,i){return aNodes[i].yPos + 43;})
    .attr("font-size","12")
    .attr("text-anchor","middle")
    .attr("dominant-baseline","middle")
    .attr("fill","black")
    .attr("font-family","Arial");

});

var end = performance.now();
console.log("Making the graph took " + (end - start) + " milliseconds.")
}); //REMOVE THIS=================================================================================
}

function mouseHover(colour, anchors){
    // console.log(colour);
    for(var i=0; i<anchors.length; i++){
        d3.selectAll("rect.rectangle"+anchors[i])
        .attr("fill", colour);
    }
};
function mouseOut(){
    d3.selectAll("rect.highlights")
    .attr("fill", "none");
};


// TEST DATA
var data = {
    "20008006": {
        "edges": [
            {
                "src": 17,
                "trg": 18,
                "label": "ARG2/NEQ"
            },
            {
                "src": 19,
                "trg": 18,
                "label": "RSTR/H"
            },
            {
                "src": 20,
                "trg": 18,
                "label": "ARG1/EQ"
            }
        ],
        "s_nodes": {
            "18": {
                "label": "normallabel",
                "anchors": [
                    15
                ]
            },
            "19": {
                "label": "def_implicit_q",
                "anchors": [
                    15
                ]
            }
        },
        "a_nodes": {
            "17": {
                "label": "_by_p_temp",
                "anchors": [
                    14
                ]
            },
            "20": {
                "label": "_then_p_temp",
                "anchors": [
                    15
                ]
            }
        },
        "tokens": {
            "14": {
                "form": "by",
                "lemma": "by"
            },
            "15": {
                "form": "then.",
                "lemma": "then"
            }
        },
        "tops": "18"
    }}

makeSubgraph(data,"body");

//  export const makeSubgraph = function (data, elementId){
function makeSubgraph(data,elementId){
        //remove above
var id;
for(var boog in data){
    var data = data[boog];
    id = boog;
}
console.log(id);

var sNodes =[];
var aNodes =[];
var selectedNode =[];

var a_nodes = Object.entries(data.a_nodes);
var s_nodes = Object.entries(data.s_nodes);
var dataEdges = Object.entries(data.edges);
var tops = parseInt(data.tops,10);
var selectedNodeIsAbstract;

a_nodes.forEach(element => {
    if(element[0] == tops){
        selectedNodeIsAbstract =true;
        var dummyNodeA = {index:element[0],top:true,tokens:element[1].anchors,label:element[1].label,edgelabels:[],outgoing:[],xPos:0,yPos:0,colour:"black"};
        selectedNode.push(dummyNodeA);
    }
    else{
        var dummyNodeA = {index:element[0],top:false,tokens:element[1].anchors,label:element[1].label,edgelabels:[],outgoing:[],xPos:0,yPos:0,colour:"black"};
        aNodes.push(dummyNodeA);
    }
});
s_nodes.forEach(element => {
    if(element[0]==tops){
        selectedNodeIsAbstract =false;
        var dummyNodeS = {index:element[0],top:true,tokens:element[1].anchors,label:element[1].label,edgelabels:[],outgoing:[],xPos:0,yPos:0,colour:"black"};
        selectedNode.push(dummyNodeS);
    }
    else{
        var dummyNodeS = {index:element[0],top:false,tokens:element[1].anchors,label:element[1].label,edgelabels:[],outgoing:[],xPos:0,yPos:0,colour:"black"};
        sNodes.push(dummyNodeS);
    }
});

var sNodeIndexes = sNodes.map(x => x.index);
var aNodeIndexes = aNodes.map(x => x.index);
var sNodeLabels = sNodes.map(x => x.label);
var aNodeLabels = aNodes.map(x => x.label);

dataEdges.forEach(element => {
    if(sNodeIndexes.includes(element[1].src.toString())){
        sNodes[sNodeIndexes.indexOf(element[1].src.toString())].edgelabels.push(element[1].label);
        sNodes[sNodeIndexes.indexOf(element[1].src.toString())].outgoing.push(element[1].trg);
    }
    else if (aNodeIndexes.includes(element[1].src.toString())){
        aNodes[aNodeIndexes.indexOf(element[1].src.toString())].edgelabels.push(element[1].label);
        aNodes[aNodeIndexes.indexOf(element[1].src.toString())].outgoing.push(element[1].trg);
    }
    else{
        selectedNode[0].edgelabels.push(element[1].label);
        selectedNode[0].outgoing.push(element[1].trg);
    }
});
console.log(sNodes);
console.log(aNodes);

var abstractColourScale = d3.scaleLinear().domain([0,Math.max(...aNodeIndexes)]).range(["yellow", "red"]);
var surfaceColourScale =  d3.scaleSequential().domain([0,Math.max(...sNodeIndexes)]).interpolator(d3.interpolateCool);

// determining the colour of each node.
for(var i=0; i<sNodeIndexes.length; i++){
    sNodes[i].colour = surfaceColourScale(sNodeIndexes[i]);
}
for(var i=0; i<aNodeIndexes.length; i++){
    aNodes[i].colour = abstractColourScale(aNodeIndexes[i]);
}

var width = Math.max(Math.max(aNodes.length, sNodes.length)*100,700);
var height = 500;
var abstractLayer = height/2;
var aNodeHeight = height -430;
var sNodeHeight = height -70;
var aNodeInterval = width/aNodes.length;
var sNodeInterval = width/sNodes.length;

var ai =0;
aNodes.forEach(element => {
    element.yPos = aNodeHeight;
    element.xPos = aNodeInterval/2 + (aNodeInterval*ai);
    console.log(element.xPos);
    ai++;
});
var si=0;
sNodes.forEach(element => {
    element.yPos = sNodeHeight;
    element.xPos = sNodeInterval/2 + (sNodeInterval*si);
    console.log(element.xPos);
    si++;
});
selectedNode.forEach(element => {
    element.xPos = width/2;
    if(selectedNodeIsAbstract){
        element.yPos = height/2 -50;
    }
    else{
        element.yPos = height/2 +25;
    }
    console.log(element.xPos);

});


if (elementId !== "body"){
    elementId = `#${elementId}`;
}
var allNodes = sNodes.concat(aNodes.concat(selectedNode));

//SVG definitions.
var svg = d3.select(elementId).append("svg").attr("id", "viewSvg").attr("class", "d3-subgraph")
.attr("height", "500px").attr("width", "700px")
.attr("viewBox","0,0,700,500")

var group = svg.append("g").attr("id", "group");

var zoomGroup = group.append("g");

group.call(d3.zoom()
    .scaleExtent([0.5, 10])    
    .on("zoom",function(){
    zoomGroup.attr("transform", d3.event.transform);
}));

// ARROW HEAD DEFINITIONS
const arrowPoints = [[0, 0], [0, 6], [6, 3]];
zoomGroup.append("defs").selectAll("marker.s").data(allNodes).enter().append("marker")
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
    .attr("height","100%")
    .attr("width",width)
    .attr("x","0")
    .attr("y","0")
    .attr("fill","#f2f0f0");

//ABSTRACT LINE
zoomGroup.selectAll("line.layers").data([abstractLayer]).enter().append("line")
    .attr("class","layers")
    .attr("x1","0")
    .attr("y1",function(d,i){return d;})
    .attr("x2",width.toString())
    .attr("y2",function(d,i){return d;})
    .attr("stroke","gray")
    .attr("stroke-width","2");

//LABELLING LAYERS
zoomGroup.append("text").selectAll("text.layerText").data(["Abstract node layer", "Surface node layer"]).enter().append("tspan").text(d => d)
    .attr("class","layerText")
    .attr("x",function(d,i){return 5;})
    .attr("y",function(d,i){if(i==0){
        return abstractLayer-5;
    }return height-5;})
    .attr("font-size","14")
    .attr("fill","gray")
    .attr("font-family","Arial");

// DRAWING SURFACE NODES
zoomGroup.selectAll("circle.nodes").data(sNodes).enter().append("circle")
    .attr("class","nodes")
    .attr("cx",function(d,i){return d.xPos})
    .attr("cy",function(d,i){return d.yPos;})
    .attr("r","12")
    .attr("fill", function(d,i){return d.colour;})

//LABELLING NODES.
zoomGroup.selectAll("rect.labels")
    .data(sNodes)
    .enter().append("rect")
    .attr("class","labels")
    .attr("height","20")
    .attr("width",function(d,i){return d.label.length*9;}) //changes with length of the label.
    .attr("x",function(d,i){return d.xPos-d.label.length*9/2;})
    .attr("y",function(d,i){return d.yPos + 15;})
    .attr("stroke", function(d,i){return d.colour;})
    .attr("stroke-width", "2")
    .attr("fill", "#f2f0f0");
zoomGroup.append("text").selectAll("text.nodeLabels").data(sNodeLabels).enter().append("tspan").text(d => d)
    .attr("class","nodeLabels")
    .attr("x",function(d,i){return sNodes[i].xPos;})
    .attr("y",function(d,i){return sNodes[i].yPos + 25;})
    .attr("font-size","12px")
    .attr("text-anchor","middle")
    .attr("font-weight", "900")
    .attr("dominant-baseline","middle")
    .attr("fill","black")
    .attr("font-family","Arial")

// ABSTRACT NODES
zoomGroup.selectAll("circle.aNodes").data(aNodes).enter().append("circle")
    .attr("class","aNodes")
    .attr("cx",function(d,i){return d.xPos;})
    .attr("cy",function(d,i){return d.yPos;})
    .attr("r","12")
    .attr("fill", function(d,i){return d.colour;})

//SELECTED NODE
zoomGroup.selectAll("circle.selectedNodes").data(selectedNode).enter().append("circle")
    .attr("class","selectedNodes")
    .attr("cx",function(d,i){return d.xPos;})
    .attr("cy",function(d,i){return d.yPos;})
    .attr("r","20")
    .attr("fill", function(d,i){return d.colour;})

//ABSTRACT NODE LABEL
zoomGroup.selectAll("rect.alabels")
    .data(aNodes)
    .enter().append("rect")
    .attr("class","alabels")
    .attr("height","20")
    .attr("width",function(d,i){return d.label.length*9;})
    .attr("x",function(d,i){ return d.xPos-d.label.length*9/2;})
    .attr("y",function(d,i){return d.yPos - 45;})
    .attr("stroke", function(d,i){return d.colour;})
    .attr("stroke-width", "2")
    .attr("fill", "#f2f0f0");
zoomGroup.append("text").selectAll("text.anodeLabels").data(aNodeLabels).enter().append("tspan").text(d => d)
    .attr("class","anodeLabels")
    .attr("x",function(d,i){return aNodes[i].xPos;})
    .attr("y",function(d,i){return aNodes[i].yPos - 33;})
    .attr("font-size","12px")
    .attr("text-anchor","middle")
    .attr("font-weight", "900")
    .attr("dominant-baseline","middle")
    .attr("fill","black")
    .attr("font-family","Arial");

//SELECTED NODE LABEL
zoomGroup.selectAll("rect.selectedlabels")
    .data(selectedNode)
    .enter().append("rect")
    .attr("class","selectedlabels")
    .attr("height","20")
    .attr("width",function(d,i){return d.label.length*9;})
    .attr("x",function(d,i){ return d.xPos + 50 - d.label.length*9/2 + d.label.length*4;})
    .attr("y",function(d,i){return d.yPos - 10;})
    .attr("stroke", function(d,i){return d.colour;})
    .attr("stroke-width", "2")
    .attr("fill", "#f2f0f0");
zoomGroup.append("text").selectAll("text.selectedLabels").data([selectedNode[0].label]).enter().append("tspan").text(d => d)
    .attr("class","selectedLabels")
    .attr("x",function(d,i){return selectedNode[i].xPos + 50 + d.length*4;})
    .attr("y",function(d,i){return selectedNode[i].yPos + 2;})
    .attr("font-size","12px")
    .attr("text-anchor","middle")
    .attr("font-weight", "900")
    .attr("dominant-baseline","middle")
    .attr("fill","black")
    .attr("font-family","Arial");

    //  SURFACE EDGES
sNodes.forEach(element => {
        for(var i=0; i<element.outgoing.length ;i++){
            var abDiffX = Math.abs(element.xPos - selectedNode[0].xPos);
            var scaleX = abDiffX/20;
            if(element.xPos >= selectedNode[0].xPos ){
                if(abDiffX > 40){ //node is not directly underneath selected node
                    var fromToS = [{x:element.xPos,y:element.yPos - 15},{x:selectedNode[0].xPos + abDiffX/scaleX,y:selectedNode[0].yPos + 25}];
                }
                else{
                    var fromToS = [{x:element.xPos,y:element.yPos -15},{x:selectedNode[0].xPos,y:selectedNode[0].yPos + 25}];
                }
            }
            else{
                if(abDiffX > 40){ //node is not directly underneath selected node
                    var fromToS = [{x:element.xPos,y:element.yPos - 15},{x:selectedNode[0].xPos - abDiffX/scaleX,y:selectedNode[0].yPos + 25}];
                }
                else{
                    var fromToS = [{x:element.xPos,y:element.yPos -15},{x:selectedNode[0].xPos,y:selectedNode[0].yPos + 25}];
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
        .attr("font-size","14px")
        .attr("dominant-baseline", "middle")
        .attr("text-anchor","middle")
        .attr("fill", "black");
        }
});

    //ABSTRACT EDGES
    aNodes.forEach(element => {
        for(var i=0; i<element.outgoing.length ;i++){
            var abDiffX = Math.abs(element.xPos - selectedNode[0].xPos);
            var scaleX = abDiffX/20;
            if(element.xPos >= selectedNode[0].xPos ){
                if(abDiffX > 40){ //node is not directly underneath selected node
                    var fromToS = [{x:element.xPos,y:element.yPos + 15},{x:selectedNode[0].xPos +abDiffX/scaleX,y:selectedNode[0].yPos - 32}];
                }
                else{
                    var fromToS = [{x:element.xPos,y:element.yPos +15},{x:selectedNode[0].xPos,y:selectedNode[0].yPos - 32}];
                }
            }
            else{
                if(abDiffX > 40){ //node is not directly underneath selected node
                    var fromToS = [{x:element.xPos,y:element.yPos + 15},{x:selectedNode[0].xPos -abDiffX/scaleX,y:selectedNode[0].yPos - 32}];
                }
                else{
                    var fromToS = [{x:element.xPos,y:element.yPos +15 },{x:selectedNode[0].xPos,y:selectedNode[0].yPos - 32}];
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
        .attr("font-size","14px")
        .attr("dominant-baseline", "middle")
        .attr("text-anchor","middle")
        .attr("fill", "black");
        }
});

    //  SELECTED EDGES
    selectedNode.forEach(element => {
        for(var i=0; i<element.outgoing.length ;i++){
            var isSNode = sNodeIndexes.includes(element.outgoing[i].toString());
            if(isSNode){
                var snode = sNodes[sNodeIndexes.indexOf(element.outgoing[i]+"")];
                var abDiffX = Math.abs(element.xPos - snode.xPos);
                var scaleX = abDiffX/40;
                if(element.xPos >= snode.xPos ){
                    if(abDiffX > 40){ //node is not directly underneath selected node
                        var fromToS = [{x:element.xPos -3,y:element.yPos +25},{x:snode.xPos ,y:snode.yPos -18}];
                    }
                    else{
                        var fromToS = [{x:element.xPos ,y:element.yPos +25},{x:snode.xPos,y:snode.yPos-18}];
                    }
                }
                else{
                    if(abDiffX > 40){ //node is not directly underneath selected node
                        var fromToS = [{x:element.xPos +3,y:element.yPos + 25},{x:snode.xPos ,y:snode.yPos -18}];
                    }
                    else{
                        var fromToS = [{x:element.xPos ,y:element.yPos + 25},{x:snode.xPos,y:snode.yPos -18}];
                    }
                }
            }
            else{
                var anode = aNodes[aNodeIndexes.indexOf(element.outgoing[i]+"")];
                var abDiffX = Math.abs(element.xPos - anode.xPos);
                var scaleX = abDiffX/40;
                if(element.xPos >= anode.xPos ){
                    if(abDiffX > 40){ //node is not directly underneath selected node
                        var fromToS = [{x:element.xPos - 3,y:element.yPos -32},{x:anode.xPos ,y:anode.yPos +18}];
                    }
                    else{
                        var fromToS = [{x:element.xPos ,y:element.yPos -32},{x:anode.xPos,y:anode.yPos+18}];
                    }
                }
                else{
                    if(abDiffX > 40){ //node is not directly underneath selected node
                        var fromToS = [{x:element.xPos +3,y:element.yPos - 32},{x:anode.xPos ,y:anode.yPos +18}];
                    }
                    else{
                        var fromToS = [{x:element.xPos ,y:element.yPos - 32},{x:anode.xPos,y:anode.yPos +18}];
                    }
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
                .attr("font-size","14px")
                .attr("dominant-baseline", "middle")
                .attr("text-anchor","middle")
                .attr("fill", "black");
        }
});

}







// TEST DATA
var data = {"20004008": {
    "edges": [
        {
            "src": 5,
            "trg": 4,
            "label": "RSTR/H"
        }
    ],
    "a_nodes": {
        "5": {
            "label": "proper_q",
            "anchors": [
                2,
                3
            ]
        },
        "4": {
            "label": "named",
            "anchors": [
                3
            ]
        }
    },
    "s_nodes": {},
    "tokens": {
        "3": {
            "form": "Malizia",
            "lemma": "Malizia",
            "carg": "Malizia"
        }
    },
    "tops": "5"
}
}

makeSubgraph(data);

function makeSubgraph(data){
        //remove above

for(var boog in data){
    var data = data[boog];
}

var sNodes =[];
var aNodes =[];

var a_nodes = Object.entries(data.a_nodes);
var s_nodes = Object.entries(data.s_nodes);
var dataEdges = Object.entries(data.edges);
var tops = parseInt(data.tops,10);
a_nodes.forEach(element => {
    if(element[0] == tops){
        var dummyNodeA = {index:element[0],top:true,tokens:element[1].anchors,label:element[1].label,edgelabels:[],outgoing:[],xPos:0,yPos:0,colour:"black"};
    }
    else{
        var dummyNodeA = {index:element[0],top:false,tokens:element[1].anchors,label:element[1].label,edgelabels:[],outgoing:[],xPos:0,yPos:0,colour:"black"};
    }
    aNodes.push(dummyNodeA);
});
s_nodes.forEach(element => {
    if(element[0]==tops){
        var dummyNodeS = {index:element[0],top:true,tokens:element[1].anchors,label:element[1].label,edgelabels:[],outgoing:[],xPos:0,yPos:0,colour:"black"};
    }
    else{
        var dummyNodeS = {index:element[0],top:false,tokens:element[1].anchors,label:element[1].label,edgelabels:[],outgoing:[],xPos:0,yPos:0,colour:"black"};
    }
    sNodes.push(dummyNodeS);
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
    else{
        aNodes[aNodeIndexes.indexOf(element[1].src.toString())].edgelabels.push(element[1].label);
        aNodes[aNodeIndexes.indexOf(element[1].src.toString())].outgoing.push(element[1].trg);
    }
});

//TODO DETERMINE SOME COLOUR SCHEME FOR NODES.

var width = Math.max(Math.max(aNodes.length, sNodes.length)*100,700);
var height = 500;
var hasAbstractlayer = true;
var abstractLayer = height/2;
var aNodeHeight = height -450;
var sNodeHeight = height -50;
var aNodeInterval = width/aNodes.length;
var sNodeInterval = width/sNodes.length;

var ai =0;
aNodes.forEach(element => {
    element.yPos = aNodeHeight;
    element.xPos = aNodeInterval/2 + (aNodeInterval*ai);
    ai++;
});
var si=0;
sNodes.forEach(element => {
    element.yPos = sNodeHeight;
    element.xPos = sNodeInterval/2 + (sNodeInterval*si);
    si++;
});

//SVG definitions.
var svg = d3.select("body").append("svg").attr("id", "viewSvg").attr("class", "d3-subgraph")
.attr("height", "500px").attr("width", "700px")
.attr("viewBox","0,0,700,500")
var group = svg.append("g").attr("id", "group");
var zoomGroup = group.append("g");
group.call(d3.zoom()
    .scaleExtent([0.5, 10])    
    .on("zoom",function(){
    zoomGroup.attr("transform", d3.event.transform);
}));

// ARROW DEFINITIONS
//TODO THIS NEEDS NODES TO HAVE COLOURS DEFINED TO WORK. AND MAY ACTUALLY NEED OTHER STUFF.
const arrowPoints = [[0, 0], [0, 6], [6, 3]];
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
    .attr("height","100%")
    .attr("width",width)
    .attr("x","0")
    .attr("y","0")
    .attr("fill","#f2f0f0");
}

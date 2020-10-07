
makeSubgraph("data.json");
function makeSubgraph(data){

d3.json(data).get(function(error,data){
        //remove above

var sNodes =[];
var aNodes =[];

var a_nodes = Object.entries(data.a_nodes);
var s_nodes = Object.entries(data.s_nodes);
var dataEdges = Object.entries(data.edges);

a_nodes.forEach(element => {
    var dummyNodeA = {index:element[0],tokens:element[1].anchors,label:element[1].label,edges:element[1].outgoing,edgelabels:[],xPos:0,yPos:0,colour:"green"};
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
        //TODO READ IN THE SELECTED NODE.................
dataEdges.forEach(element => {
    if(sNodeIndexes.includes(element[1].src.toString())){
        sNodes[sNodeIndexes.indexOf(element[1].src.toString())].edgelabels.push(element[1].label);
            }
    else{
        aNodes[aNodeIndexes.indexOf(element[1].src.toString())].edgelabels.push(element[1].label);
    }
});

//TODO DETERMINE SOME COLOUR SCHEME FOR NODES.

var width;
var height;
var hasAbstractlayer;
var abstractLayer;
var maxNodeHeight;
var maxSNodeHeight;

//TODO SOME WAY TO DETERMINE THE POSITION OF NODES. (TAKE INSPO FROM GRAPH.JS).

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
    .attr("width","100%")
    .attr("x","0")
    .attr("y","0")
    .attr("fill","#f2f0f0");


    });
    //remove above line
}

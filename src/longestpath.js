
// longestPath(data,"body");

export const longestPath = function (data, elementId){
    // function longestPath(data,elementId){
    // console.log(data);
    var connected = data.connected;
    var acyclic = data.acyclic;
    var graphId = data.id;
    var directedPaths = [];
    var undirectedPaths = [];

    var temp1 = Object.entries(data.longest_directed_path);
    for (var x in temp1){
        directedPaths.push(temp1[x]);
    }
    var temp2 = Object.entries(data.longest_undirected_path);
    for (var y in temp2){
        undirectedPaths.push(temp2[y]);
    }
    // console.log(undirectedPaths);

var width = Math.max(300,80 + undirectedPaths[0][1].edges.length*140 );
// height determined by the longest path in the data.

var height = undirectedPaths.length*55 + directedPaths.length*55 + 130;
var heightDP = 15;
var heightUDP = directedPaths.length*55 + 45;

// let elementIdToAppendTo = `#${elementId}`;
var svg = d3.select(elementId //elementIdToAppendTo
    ).append("svg").attr("id", "viewSvg").attr("class", "d3-comparison")
.attr("height", height).attr("width", width +8).attr("id", "comparison")
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
.attr("width",width +8)
.attr("x","0")
.attr("y","0")
.attr("fill","#f2f0f0");

for(var i=0; i<directedPaths.length;i++){
    // console.log(directedPaths[i][1].edges);
    var dColour =  d3.scaleSequential().domain([0,directedPaths[i][1].edges.length +1 + directedPaths.length]).interpolator(d3.interpolateCool);
    for(var j=0;j<directedPaths[i][1].edges.length;j++){
        directedPaths[i][1].edges[j].srcColour = dColour(j+i);// TODO TEST AN MAYBE ADD i HERE
        directedPaths[i][1].edges[j].trgColour = dColour(j+i+1);
    }
}
for(var i=0; i<undirectedPaths.length;i++){
    var udColour =  d3.scaleSequential().domain([0,undirectedPaths[i][1].edges.length +1 + undirectedPaths.length]).interpolator(d3.interpolatePlasma);
    for(var j=0;j<undirectedPaths[i][1].edges.length;j++){
        undirectedPaths[i][1].edges[j].srcColour = udColour(undirectedPaths[i][1].edges.length +1 + undirectedPaths.length-(j+i));
        undirectedPaths[i][1].edges[j].trgColour = udColour(undirectedPaths[i][1].edges.length +1 + undirectedPaths.length-(j+i+1));
    }
}

// ARROW DEFINITIONS
const arrowPoints = [[0, 0], [0, 6], [6, 3]];
function drawLine(colour, data, arrow,info){
    var line = d3.line()
    .x(function(d){return d.x;})
    .y(function(d){return d.y;})
    .curve(d3.curveBundle);
    if(arrow){
        zoomGroup.append("path")
        .attr("d",line(data))
        .attr("stroke", colour)
        .attr("stroke-width","2")
        .attr("marker-end", "url(#arrow-"+info[0]+info[1]+")")
        .attr("fill", "none");
    }
    else{
        zoomGroup.append("path")
        .attr("d",line(data))
        .attr("stroke", colour)
        .attr("stroke-width","2")
        .attr("fill", "none");
    }    
};

//text data
var header = "Test results for graph " + graphId + " :";
var connectedText = "• Graph: " +graphId + " is not connected.";
var acyclicText = "• Graph: " +graphId + " is not cyclic.";
if(connected == "True"){
    connectedText = "• Graph: " +graphId + " is connected.";
}
if(acyclic == "False"){
    acyclicText = "• Graph: " +graphId + " is cyclic.";
}
var ldp = "• Longest directed path(s):";
var ludp = "• Longest undirected path(s):";
var textPos =  [{text:connectedText, pos:40,width:400},
                {text:acyclicText, pos:60,width:400},{text:ldp, pos:85,width:400},
                {text:ludp, pos: 115 + directedPaths.length*55,width:400}];
var text = textPos.map(x=> x.text);
var headerText = {text:header, pos:15,width:900};
var defs = zoomGroup.append("defs.yo").attr("class","yo");

directedPaths.forEach(element => {
    for(var i=0; i<element[1].edges.length;i++ ){
        defs.selectAll("marker"+i).data([element[1].edges[i]]).enter().append("marker")
            .attr("class", i+"")
            .attr('id', function(d,i){return "arrow-" + d.src+d.trg;})
            .attr('viewBox', [0, 0, 7, 7]+"")
            .attr('refX', 3.5+"")
            .attr('refY', 3.5+"")
            .attr('markerWidth', 6+"")
            .attr('markerHeight', 6+"")
            .attr('orient', 'auto')
            .append('path')
            .attr('d', d3.line()(arrowPoints))
            .attr("fill", function(d,i){return d.srcColour;});
    }
});

zoomGroup.append("text").selectAll("text.layers").data(text).enter().append("tspan").text(d => d)
.attr("class","layers")
.attr("x",function(d,i){return 5;})
.attr("y",function(d,i){return textPos[i].pos + 3;})
.attr("font-size","15")
.attr("font-weight", textPos[i].width + "")
.attr("text-anchor","start")
.attr("dominant-baseline","middle")
.attr("fill","black")
.attr("font-family","Arial");

zoomGroup.append("text").selectAll("text.layers").data([headerText.text]).enter().append("tspan").text(d => d)
.attr("class","layers")
.attr("x",function(d,i){return 5;})
.attr("y",function(d,i){return headerText.pos + 3;})
.attr("font-size","15")
.attr("font-weight", headerText.width + "")
.attr("text-anchor","start")
.attr("dominant-baseline","middle")
.attr("fill","black")
.attr("font-family","Arial");

// console.log(directedPaths);
var pathPos = 115;
directedPaths.forEach(element => {
    //iterate through all the directed paths (may be more than 1)
    var count=0;
    var bNodePos = 30;
    var eNodePos = 170;
    for(var i=0; i<element[1].edges.length;i++ ){
        //iterate through all EDGES of each path.
        // console.log(element[1].edges[i]);
        if(i==0){//if its begin node, draw start node too lul.
            //drawing begin nodes
            zoomGroup.selectAll("circle"+count+"-"+i+"b").data([element[1].edges[i]]).enter().append("circle")
                .attr("class",count+"-"+i+"b")
                .attr("cx",bNodePos)
                .attr("cy",pathPos)
                .attr("r","12")
                .attr("fill", function(d,i){return d.srcColour;})
            zoomGroup.selectAll("rect"+ count+"-"+i+"b")
                .data([element[1].edges[i]])
                .enter().append("rect")
                .attr("class",count+"-"+i+"b")
                .attr("height","16")
                .attr("width","60") //changes with length of the label.
                .attr("x",bNodePos-30)
                .attr("y",pathPos +15)
                .attr("stroke", function(d,i){return d.srcColour;})
                .attr("stroke-width", "2")
                .attr("fill", "#f2f0f0");
            zoomGroup.append("text").selectAll("text"+ count+"-"+i+"b").data([element[1].edges[i].src]).enter().append("tspan").text(d => d)
                .attr("class",count+"-"+i+"b")
                .attr("x",bNodePos)
                .attr("y",pathPos +24)
                .attr("font-size","10px")
                .attr("text-anchor","middle")
                .attr("font-weight", "200")
                .attr("dominant-baseline","middle")
                .attr("fill","black")
                .attr("font-family","Arial");
            var fromTo = [{x:bNodePos+15,y:pathPos},{x:eNodePos-15,y:pathPos}];
            drawLine(element[1].edges[i].srcColour,fromTo,true,[element[1].edges[i].src,element[1].edges[i].trg]);//change to true when arrows are resolved.
            zoomGroup.selectAll("text"+count+"-"+i+"b").data([element[1].edges[i].label]).enter().append("text")
                .text(d=> d)
                .attr("class",count+"-"+i+"b")
                .attr("x",(bNodePos + eNodePos)/2+"")
                .attr("y",pathPos-5)
                .attr("font-family","Arial")
                .attr("font-size","10px")
                .attr("dominant-baseline", "middle")
                .attr("text-anchor","middle")
                .attr("fill", "black");
        }
        zoomGroup.selectAll("circle"+count+"-"+i+"b").data([element[1].edges[i]]).enter().append("circle")
        .attr("class",count+"-"+i+"b")
        .attr("cx",eNodePos)
        .attr("cy",pathPos)
        .attr("r","12")
        .attr("fill", function(d,i){return d.trgColour;})
        zoomGroup.selectAll("rect"+ count+"-"+i+"b").data([element[1].edges[i]])
        .enter().append("rect")
        .attr("class",count+"-"+i+"b")
        .attr("height","16")
        .attr("width","60") //changes with length of the label.
        .attr("x",eNodePos-30)
        .attr("y",pathPos +15)
        .attr("stroke", function(d,i){return d.trgColour;})
        .attr("stroke-width", "2")
        .attr("fill", "#f2f0f0");
        zoomGroup.append("text").selectAll("text"+ count+"-"+i+"d").data([element[1].edges[i].trg]).enter().append("tspan").text(d => d)
        .attr("class",count+"-"+i+"d")
        .attr("x",eNodePos)
        .attr("y",pathPos +24)
        .attr("font-size","10px")
        .attr("text-anchor","middle")
        .attr("font-weight", "200")
        .attr("dominant-baseline","middle")
        .attr("fill","black")
        .attr("font-family","Arial");
        if(i!= 0){
            var fromTo = [{x:eNodePos-140+15,y:pathPos},{x:eNodePos-15,y:pathPos}];
            drawLine(element[1].edges[i].srcColour,fromTo,false,[]);//change to true when arrows are resolved.
            zoomGroup.selectAll("text"+count+"-"+i+"d").data([element[1].edges[i].label]).enter().append("text")
                .text(d=> d)
                .attr("class",count+"-"+i+"d")
                .attr("x",(eNodePos-140 + eNodePos)/2+"")
                .attr("y",pathPos-5)
                .attr("font-family","Arial")
                .attr("font-size","10px")
                .attr("dominant-baseline", "middle")
                .attr("text-anchor","middle")
                .attr("fill", "black");
        }

        eNodePos = eNodePos + 140;
        
    }
    pathPos = pathPos +55;
    count++; //for creating unique ids for nodes.
    // console.log(element[1].edges);
});
var lemon = [];
console.log(lemon.length);
let pathPosUn = 145 + directedPaths.length*55;
undirectedPaths.forEach(element => {
    //iterate through all the directed paths (may be more than 1)
    var countun=0;
    var bNodePosUn = 30;
    var eNodePosUn = 170; // add 70 everytime.
    for(var i=0; i<element[1].edges.length;i++ ){
        //iterate through all EDGES of each path.
        // console.log(element[1].edges[i]);
        if(i==0){//if its begin node, draw start node too lul.
            //drawing begin nodes
            zoomGroup.selectAll("circle"+countun+"-"+i+"bun").data([element[1].edges[i]]).enter().append("circle")
                .attr("class",countun+"-"+i+"bun")
                .attr("cx",bNodePosUn)
                .attr("cy",pathPosUn)
                .attr("r","12")
                .attr("fill", function(d,i){return d.srcColour;})
            zoomGroup.selectAll("rect"+ countun+"-"+i+"bun")
                .data([element[1].edges[i]])
                .enter().append("rect")
                .attr("class",countun+"-"+i+"bun")
                .attr("height","16")
                .attr("width","60") //changes with length of the label.
                .attr("x",bNodePosUn-30)
                .attr("y",pathPosUn +15)
                .attr("stroke", function(d,i){return d.srcColour;})
                .attr("stroke-width", "2")
                .attr("fill", "#f2f0f0");
            zoomGroup.append("text").selectAll("text"+ countun+"-"+i+"bun").data([element[1].edges[i].src]).enter().append("tspan").text(d => d)
                .attr("class",countun+"-"+i+"bun")
                .attr("x",bNodePosUn)
                .attr("y",pathPosUn +24)
                .attr("font-size","10px")
                .attr("text-anchor","middle")
                .attr("font-weight", "200")
                .attr("dominant-baseline","middle")
                .attr("fill","black")
                .attr("font-family","Arial");
            var fromTo = [{x:bNodePosUn+15,y:pathPosUn},{x:eNodePosUn-15,y:pathPosUn}];
            drawLine(element[1].edges[i].srcColour,fromTo,false);//change to true when arrows are resolved.
            zoomGroup.selectAll("text"+countun+"-"+i+"bun").data([element[1].edges[i].label]).enter().append("text")
                .text(d=> d)
                .attr("class",countun+"-"+i+"bun")
                .attr("x",(bNodePosUn + eNodePosUn)/2+"")
                .attr("y",pathPosUn-5)
                .attr("font-family","Arial")
                .attr("font-size","10px")
                .attr("dominant-baseline", "middle")
                .attr("text-anchor","middle")
                .attr("fill", "black");
        }
        zoomGroup.selectAll("circle"+countun+"-"+i+"dun").data([element[1].edges[i]]).enter().append("circle")
        .attr("class",countun+"-"+i+"dun")
        .attr("cx",eNodePosUn)
        .attr("cy",pathPosUn)
        .attr("r","12")
        .attr("fill", function(d,i){return d.trgColour;})
        zoomGroup.selectAll("rect"+ countun+"-"+i+"bun").data([element[1].edges[i]])
        .enter().append("rect")
        .attr("class",countun+"-"+i+"bun")
        .attr("height","16")
        .attr("width","60") //changes with length of the label.
        .attr("x",eNodePosUn-30)
        .attr("y",pathPosUn +15)
        .attr("stroke", function(d,i){return d.trgColour;})
        .attr("stroke-width", "2")
        .attr("fill", "#f2f0f0");
        zoomGroup.append("text").selectAll("text"+ countun+"-"+i+"dun").data([element[1].edges[i].trg]).enter().append("tspan").text(d => d)
        .attr("class",countun+"-"+i+"dun")
        .attr("x",eNodePosUn)
        .attr("y",pathPosUn +24)
        .attr("font-size","10px")
        .attr("text-anchor","middle")
        .attr("font-weight", "200")
        .attr("dominant-baseline","middle")
        .attr("fill","black")
        .attr("font-family","Arial");
        if(i!= 0){
            var fromTo = [{x:eNodePosUn-140+15,y:pathPosUn},{x:eNodePosUn-15,y:pathPosUn}];
            drawLine(element[1].edges[i].srcColour,fromTo,false);//change to true when arrows are resolved.
            zoomGroup.selectAll("text"+countun+"-"+i+"dun").data([element[1].edges[i].label]).enter().append("text")
                .text(d=> d)
                .attr("class",countun+"-"+i+"dun")
                .attr("x",(eNodePosUn-140 + eNodePosUn)/2+"")
                .attr("y",pathPosUn-5)
                .attr("font-family","Arial")
                .attr("font-size","10px")
                .attr("dominant-baseline", "middle")
                .attr("text-anchor","middle")
                .attr("fill", "black");
        }
        eNodePosUn = eNodePosUn + 140;
    }
    pathPosUn = pathPosUn +55;
    countun++; //for creating unique ids for nodes.
    // console.log(element[1].edges);
});


}

// import {store} from './store';
var data ={
   "id": "20001001",
   "a_nodes": {
       "0": {
           "label": "proper_q",
           "anchors": [
               0
           ],
           "incoming": [],
           "outgoing": [
               1
           ]
       },
       "1": {
           "label": "named",
           "anchors": [
               0
           ],
           "incoming": [
               0,
               3
           ],
           "outgoing": []
       },
       "2": {
           "label": "named",
           "anchors": [
               1
           ],
           "incoming": [
               8,
               9,
               10,
               3
           ],
           "outgoing": []
       },
       "3": {
           "label": "compound",
           "anchors": [
               0,
               1
           ],
           "incoming": [],
           "outgoing": [
               1,
               2
           ]
       },
       "4": {
           "label": "card",
           "anchors": [
               2
           ],
           "incoming": [],
           "outgoing": [
               5
           ]
       },
       "6": {
           "label": "measure",
           "anchors": [
               2,
               3
           ],
           "incoming": [],
           "outgoing": [
               8,
               5
           ]
       },
       "7": {
           "label": "udef_q",
           "anchors": [
               2,
               3
           ],
           "incoming": [],
           "outgoing": [
               5
           ]
       },
       "9": {
           "label": "proper_q",
           "anchors": [
               0,
               1,
               2,
               3,
               4
           ],
           "incoming": [],
           "outgoing": [
               2
           ]
       },
       "17": {
           "label": "mofy",
           "anchors": [
               13
           ],
           "incoming": [
               19,
               20
           ],
           "outgoing": []
       },
       "18": {
           "label": "def_explicit_q",
           "anchors": [
               13
           ],
           "incoming": [],
           "outgoing": [
               21
           ]
       },
       "19": {
           "label": "of_p",
           "anchors": [
               13
           ],
           "incoming": [],
           "outgoing": [
               17,
               21
           ]
       },
       "20": {
           "label": "def_implicit_q",
           "anchors": [
               13
           ],
           "incoming": [],
           "outgoing": [
               17
           ]
       },
       "21": {
           "label": "dofm",
           "anchors": [
               14
           ],
           "incoming": [
               18,
               19,
               22
           ],
           "outgoing": []
       },
       "22": {
           "label": "loc_nonsp",
           "anchors": [
               13,
               14
           ],
           "incoming": [],
           "outgoing": [
               10,
               21
           ]
       }
   },
   "s_nodes": {
       "5": {
           "label": "_year_n_1",
           "anchors": [
               3
           ],
           "incoming": [
               4,
               6,
               7
           ],
           "outgoing": []
       },
       "8": {
           "label": "_old_a_1",
           "anchors": [
               4
           ],
           "incoming": [
               6
           ],
           "outgoing": [
               2
           ]
       },
       "10": {
           "label": "_join_v_1",
           "anchors": [
               6
           ],
           "incoming": [
               13,
               22
           ],
           "outgoing": [
               2,
               12
           ]
       },
       "11": {
           "label": "_the_q",
           "anchors": [
               7
           ],
           "incoming": [],
           "outgoing": [
               12
           ]
       },
       "12": {
           "label": "_board_n_of",
           "anchors": [
               8
           ],
           "incoming": [
               10,
               11
           ],
           "outgoing": []
       },
       "13": {
           "label": "_as_p",
           "anchors": [
               9
           ],
           "incoming": [],
           "outgoing": [
               16,
               10
           ]
       },
       "14": {
           "label": "_a_q",
           "anchors": [
               10
           ],
           "incoming": [],
           "outgoing": [
               16
           ]
       },
       "15": {
           "label": "_nonexecutive_u_unknown",
           "anchors": [
               11
           ],
           "incoming": [],
           "outgoing": [
               16
           ]
       },
       "16": {
           "label": "_director_n_of",
           "anchors": [
               12
           ],
           "incoming": [
               13,
               14,
               15
           ],
           "outgoing": []
       }
   },
   "edges": [
       {
           "src": 9,
           "trg": 2,
           "label": "RSTR/H"
       },
       {
           "src": 0,
           "trg": 1,
           "label": "RSTR/H"
       },
       {
           "src": 3,
           "trg": 2,
           "label": "ARG1/EQ"
       },
       {
           "src": 3,
           "trg": 1,
           "label": "ARG2/NEQ"
       },
       {
           "src": 6,
           "trg": 8,
           "label": "ARG1/EQ"
       },
       {
           "src": 6,
           "trg": 5,
           "label": "ARG2/NEQ"
       },
       {
           "src": 7,
           "trg": 5,
           "label": "RSTR/H"
       },
       {
           "src": 4,
           "trg": 5,
           "label": "ARG1/EQ"
       },
       {
           "src": 8,
           "trg": 2,
           "label": "ARG1/EQ"
       },
       {
           "src": 10,
           "trg": 2,
           "label": "ARG1/NEQ"
       },
       {
           "src": 10,
           "trg": 12,
           "label": "ARG2/NEQ"
       },
       {
           "src": 11,
           "trg": 12,
           "label": "RSTR/H"
       },
       {
           "src": 13,
           "trg": 10,
           "label": "ARG1/EQ"
       },
       {
           "src": 13,
           "trg": 16,
           "label": "ARG2/NEQ"
       },
       {
           "src": 14,
           "trg": 16,
           "label": "RSTR/H"
       },
       {
           "src": 15,
           "trg": 16,
           "label": "ARG1/EQ"
       },
       {
           "src": 22,
           "trg": 10,
           "label": "ARG1/EQ"
       },
       {
           "src": 22,
           "trg": 21,
           "label": "ARG2/NEQ"
       },
       {
           "src": 18,
           "trg": 21,
           "label": "RSTR/H"
       },
       {
           "src": 19,
           "trg": 21,
           "label": "ARG1/EQ"
       },
       {
           "src": 19,
           "trg": 17,
           "label": "ARG2/NEQ"
       },
       {
           "src": 20,
           "trg": 17,
           "label": "RSTR/H"
       }
   ],
   "tokens": {
       "0": {
           "form": "pierre",
           "lemma": "Pierre",
           "carg": "Pierre"
       },
       "1": {
           "form": "Vinken,",
           "lemma": "Vinken",
           "carg": "Vinken"
       },
       "2": {
           "form": "61",
           "lemma": "61",
           "carg": "61"
       },
       "3": {
           "form": "years",
           "lemma": "year"
       },
       "4": {
           "form": "old,",
           "lemma": "old"
       },
       "5": {
           "form": "will",
           "lemma": "will"
       },
       "6": {
           "form": "join",
           "lemma": "join"
       },
       "7": {
           "form": "the",
           "lemma": "the"
       },
       "8": {
           "form": "board",
           "lemma": "board"
       },
       "9": {
           "form": "as",
           "lemma": "as"
       },
       "10": {
           "form": "a",
           "lemma": "a"
       },
       "11": {
           "form": "nonexecutive",
           "lemma": "nonexecutive"
       },
       "12": {
           "form": "director",
           "lemma": "director"
       },
       "13": {
           "form": "nov.",
           "lemma": "Nov",
           "carg": "Nov"
       },
       "14": {
           "form": "29.",
           "lemma": "29",
           "carg": "29"
       }
   },
   "tops": {
       "10": {
           "label": "_join_v_1",
           "anchors": [
               6
           ],
           "incoming": [
               13,
               22
           ],
           "outgoing": [
               2,
               12
           ]
       }
   },
   "sentence": [
       "pierre",
       "Vinken,",
       "61",
       "years",
       "old,",
       "will",
       "join",
       "the",
       "board",
       "as",
       "a",
       "nonexecutive",
       "director",
       "nov.",
       "29."
   ]
}



makeGraph(data, true,"body")
    function makeGraph(data,showTokens,elementId){
        
//  export const makeGraph = function (data, showTokens, elementId) {
var start = performance.now();
    var layers = {bottom:0,token:0,surface:0,top:10};
    var sNodes =[];
    var aNodes =[];
    var tokenList =[];
    var id = data.id;
    var a_nodes = Object.entries(data.a_nodes);
    var s_nodes = Object.entries(data.s_nodes);
    var dataEdges = Object.entries(data.edges);
    var dataTokens = Object.entries(data.sentence);
    var top = Object.entries(data.tops);
    
    //TOP IS A SPECIFIC THING TAHT NEEDS TO BE READ IN FROM THE DATA AND IS NOT NECESSARILY LABELLED.
    dataTokens.forEach(element => {
        tokenList.push({token: element[1], pos: 0});
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
    for(var i=0; i<tokenList.length; i++){
      tokenList[i].pos = i*200;
    }
    
    var sNodeIndexes = sNodes.map(x => x.index);
    var aNodeIndexes = aNodes.map(x => x.index);
    var sNodeLabels = sNodes.map(x => x.label);
    var aNodeLabels = aNodes.map(x => x.label);
    var anchorArray =[{aLength:1, height:50}];
    
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

    // DEFINING A COLOUR SCALE TO THE NODES.
    var abstractColourScale = d3.scaleLinear().domain([0,aNodeIndexes.length]).range(["yellow", "red"]);
    var surfaceColourScale =  d3.scaleSequential().domain([0,sNodeIndexes.length]).interpolator(d3.interpolateCool);
    
    //DETERMINING THE COLOUR OF EACH NODE and determinging max anchor.
    for(var i=0; i<sNodes.length; i++){
        sNodes[i].colour = surfaceColourScale(i);
    }
    for(var i=0; i<aNodes.length; i++){
        if(!(anchorArray.map(x=>x.aLength).includes(aNodes[i].tokens.length))){
            anchorArray.push({aLength:aNodes[i].tokens.length, height:0});
        }
        aNodes[i].colour = abstractColourScale(i);
    }
    anchorArray = anchorArray.sort((a, b) => (a.aLength > b.aLength) ? 1 : -1)
    for(var i=0; i<anchorArray.length; i++){
        anchorArray[i].height = 85*(i+1);
    }
    let aMap = anchorArray.map(x=> x.aLength);
    // GRAPH SIZE DEFINITIONS.
    var width = tokenList.length*200;
    var offset = width/(tokenList.length*2);
    var maxSNodeHeight=0;
    var maxANodeHeight = 0;
    var minSNode = 0;
    var TopNodeHeight=0;
    var gapBetweenBottomNodeAndLayer = 100;
    var tokenGap = width/tokenList.length;
var layerText = ["Token layer", "Surface node layer", "Abstract node layer"];

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
        element.yPos = anchorArray[aMap.indexOf(element.tokens.length)].height;
        maxANodeHeight = Math.max(maxANodeHeight,element.yPos);
    }
});

layers.surface = TopNodeHeight + gapBetweenBottomNodeAndLayer + maxANodeHeight +25; //height determined for surface layer marker.
aNodes.forEach(element =>{
    if(element.label != "TOP"){
        element.yPos = layers.surface - element.yPos -25;
    }
})
//RESOLVING CLASHES
var previousT = "t";
var currentT;
for(var j=0;j<aNodes.length;j++){
      for(var i =j+1; i< aNodes.length; i++) {
         if(aNodes[j].xPos == aNodes[i].xPos && aNodes[j].yPos == aNodes[i].yPos && aNodes[j].index != aNodes[i].index){
            currentT = aNodes[j].label;
            console.log(aNodes[j].label);
            if(currentT != previousT){
               for(var an = i; an<aNodes.length; an++){
                  if(aNodes[an].xPos > aNodes[j].xPos){
                     aNodes[an].xPos = aNodes[an].xPos +200;
                  }
               }
               for(var sn =0; sn<sNodes.length; sn++){
                  if(sNodes[sn].xPos > aNodes[j].xPos){
                     sNodes[sn].xPos = sNodes[sn].xPos +200;
                  }
               }
               for(var t=0; t<tokenList.length;t++){
                  if(tokenList[t].pos > aNodes[j].xPos-100){
                     tokenList[t].pos = tokenList[t].pos + 200;
                  }
               }
            }
            previousT = aNodes[j].label;
            aNodes[i].xPos = aNodes[i].xPos +200;
         }
     }
}

var width = tokenList[tokenList.length-1].pos + 200;
sNodes.forEach(element => {
    element.yPos = layers.surface + 100 + maxSNodeHeight - element.yPos;
    minSNode = Math.max(minSNode,element.yPos);
});
layers.token = minSNode + 100;
layers.bottom = layers.token + 100;
if(showTokens){
    var height=layers.bottom +100;
}
else{
    var height = layers.bottom;
}

//  AT THIS POINT NODE HEIGHTS AND LAYER HEIGHTS HAVE BEEN DETERMINED.
var layerVals = Object.values(layers);

if ( elementId == "body" && document.getElementsByClassName("d3-graph").length === 5){
    d3.select("svg").remove();
} else if (elementId != "body") {
    elementId = `#${elementId}`
}
/// NEED TO CHECK IF elementId = displayModalOrWhatever, then remove element and reappend
var svg = d3.select(elementId).append("svg").attr("id", "viewSvg").attr("class", "d3-graph")
.attr("height", "400px").attr("width", 1000+"px")
.attr("viewBox","0,0,"+width +","+ height)

var group = svg.append("g").attr("id", "group");
var zoomGroup = group.append("g");
group.call(d3.zoom()
.scaleExtent([0.5, 6])
.translateExtent([[-width+500,-height-100],[width+100,height+100]])    
.on("zoom",function(){
    zoomGroup.attr("transform", d3.event.transform);
})); //allows for zooming

//ARROWHEAD DEFINITION
zoomGroup.append("defs").selectAll("marker.s").data(sNodes).enter().append("marker")
        .attr("class","s")
        .attr('id', function(d,i){return "arrow-"+id+d.index;})
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
        .attr('id', function(d,i){return "arrow-"+id+d.index;})
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
    .attr("marker-end", "url(#arrow-"+id+index+")")
    .attr("fill", "none");
};

//BACKGROUND RECTANGLE
zoomGroup.append("rect")
.attr("class","back")
.attr("height","100%")
    .attr("width","100%")
    .attr("x","0")
    .attr("y","0")
    .attr("fill","#f2f0f0")
    .lower();
    
    // DRAWING LAYER LINES
    if(!(showTokens)){
    layerVals[0] = layerVals[1];
    layerText.splice(0,1);
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
    zoomGroup.append("text").selectAll("text.tokens").data(tokenList.map(x=> x.token)).enter().append("tspan").text(d => d)
    .attr("class","tokens")
    .attr("x",function(d,i){return offset + tokenList[i].pos;})
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
//labelling layers
zoomGroup.append("text").selectAll("text.layerText").data(layerText).enter().append("tspan").text(d => d)
.attr("class","layerText")
    .attr("x",function(d,i){return 10;})
    .attr("y",function(d,i){if(showTokens){
        return layerVals[i]-5;
    }return layerVals[i+1]-5;})
    .attr("font-size","16")
    .attr("fill","gray")
    .attr("font-family","Arial");

//displaying graph label
zoomGroup.append("text").selectAll("text.graphlabel").data(["Graph ID: " + id]).enter().append("tspan").text(d => d)
.attr("class","graphlabel")
    .attr("x",width/2)
    .attr("y",height-40)
    .attr("font-size","32")
    .attr("stroke-width", "1400")
    .attr("fill","black")
    .attr("font-family","Arial");
    
    
    // DRAWING SURFACE NODES
    zoomGroup.selectAll("circle.nodes").data(sNodes).enter().append("circle")
    .attr("class","nodes")
    .attr("cx",function(d,i){return d.xPos})
    .attr("cy",function(d,i){return d.yPos;})
    .attr("r","12")
    .attr("fill", function(d,i){return d.colour;})
    .on("click", function(d,i){store.dispatch("setNewSubsetToDisplay", {graphId: id, nodeId: d.index});})
    .on("mouseover", function(d,i){mouseHover(d.colour,d.tokens,id,"s",d.index)})
    .on("mouseout", function(d,i){return mouseOut("s",d.index,id);});

// HIGHLIGHTING ANCHORS
if(showTokens){
    zoomGroup.selectAll("rect.highlights")
    .data(tokenList)
    .enter().append("rect")
    .attr("class",function(d,i){return "highlights rectangle"+id+i;}) //index of the token
    .attr("height","35")
    .attr("width",function(d,i){return 200;})
    .attr("x",function(d,i){return offset + d.pos -100;})
    .attr("y",function(d,i){return layers.bottom - 67;})
    .attr("fill", "none")
    .style("opacity","0.4");
}

//LABELLING NODES.
zoomGroup.selectAll("rect.slabels")
    .data(sNodes)
    .enter().append("rect")
    .attr("class", function(d,i){return "slabels"+id+d.index ;})
    .attr("height","20")
    .attr("width",function(d,i){return d.label.length*8 + "";}) //changes with length of the label.
    .attr("x",function(d,i){return d.xPos- d.label.length*4;})
    .attr("y",function(d,i){return d.yPos + 33;})
    .attr("stroke", function(d,i){return d.colour;})
    .attr("stroke-width", "2")
    .attr("fill", "#f2f0f0");
zoomGroup.append("text").selectAll("text.nodeLabels").data(sNodeLabels).enter().append("tspan").text(d => d)
    .attr("class","nodeLabels")
    .attr("x",function(d,i){return sNodes[i].xPos;})
    .attr("y",function(d,i){return sNodes[i].yPos + 43;})
    .attr("font-size","12px")
    .attr("text-anchor","middle")
    .attr("font-weight", "900")
    .attr("dominant-baseline","middle")
    .attr("fill","black")
    .attr("font-family","Arial");

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
                        var fromToS = [{x:element.xPos -14,y:element.yPos},{x:otherSNode.xPos +17,y:otherSNode.yPos}];
                    }
                    else{
                        var fromToS = [{x:element.xPos -14,y:element.yPos -14},
                            {x:element.xPos -abDiffX/11 ,y:element.yPos - abDiffX/11 },
                            {x:otherSNode.xPos +abDiffX/11,y:otherSNode.yPos -abDiffX/11},
                            {x:otherSNode.xPos +14,y:otherSNode.yPos -14}]; //needs worku
                    }
                }
                else{
                    if(abDiffX < 240){
                        var fromToS = [{x:element.xPos +14,y:element.yPos},{x:otherSNode.xPos -17,y:otherSNode.yPos}];
                    }
                    else{
                        var limitLine = 130;
                        var edgeLineYAxis = Math.min(limitLine, abDiffX/12);
                        var fromToS = [{x:element.xPos +14,y:element.yPos},
                            {x:element.xPos +edgeLineYAxis,y:element.yPos +edgeLineYAxis},
                            {x:otherSNode.xPos -edgeLineYAxis,y:otherSNode.yPos +edgeLineYAxis},
                            {x:otherSNode.xPos -17,y:otherSNode.yPos + 8}]; //needs worku
                    }
                }
            }
            else{
                if(element.xPos > otherANode.xPos){
                    var fromToS = [{x:element.xPos-10.5,y:element.yPos -10.5},
                        {x:element.xPos -83 ,y:element.yPos -80 },
                        {x:otherANode.xPos +89,y:otherANode.yPos -80},
                        {x:otherANode.xPos +12.5,y:otherANode.yPos -12.5}]; //needs worku
                }
                else if (element.xPos == otherANode.xPos){
                    var fromToS = [{x:element.xPos,y:element.yPos -14},
                        {x:element.xPos -83 ,y:element.yPos -80 },
                        {x:otherANode.xPos +89,y:otherANode.yPos -80},
                        {x:otherANode.xPos ,y:otherANode.yPos -16}]; //needs worku
                }
                else{
                    var fromToS = [{x:element.xPos + 10.4,y:element.yPos -10.5},
                        {x:element.xPos +87,y:element.yPos -60},
                        {x:otherANode.xPos -83,y:otherANode.yPos -17+80},
                        {x:otherANode.xPos -12.5,y:otherANode.yPos +12.5}]; //needs worku
                }
            }
            drawLine(element.colour,fromToS, element.index);
            // LABEL
               var labelX = (fromToS[0].x+fromToS[1].x)/2 + 10;
               var labelY = (fromToS[0].y+fromToS[1].y)/2 + 10;
               zoomGroup.selectAll("text.aLabels").data([element.edgelabels[i]]).enter().append("text")
                  .text(d=> d)
                  .attr("x",labelX.toString())
                  .attr("y",labelY.toString())
                  .attr("font-family","Arial")
                  .attr("font-size","14px")
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
            return sNodes[sNodeLabels.indexOf(d.relation.toString())].yPos -14;
        }
        else{
            return aNodes[aNodeLabels.indexOf(d.relation.toString())].yPos -14;
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
                var fromTo = [{x:element.xPos -10.5 ,y:element.yPos +10.5},{x:otherSNode.xPos +10.5,y:otherSNode.yPos-14.5}];
            }
            else if(element.xPos == otherSNode.xPos){
                var fromTo = [{x:element.xPos ,y:element.yPos +14},{x:otherSNode.xPos,y:otherSNode.yPos-17}];
            }
            else{
                var fromTo = [{x:element.xPos +10.5 ,y:element.yPos +10.5},{x:otherSNode.xPos -10.5,y:otherSNode.yPos-14.5}];
            }
        }
        else{
            if(element.xPos >= otherANode.xPos){
                if(element.yPos >= otherANode.yPos){
                    var fromTo = [{x:element.xPos -10.5,y:element.yPos +10.5},{x:otherANode.xPos+12.5,y:otherANode.yPos+12.5}];   
                }
                else if(element.yPos == otherANode.yPos){

                }
                else{
                    var fromTo = [{x:element.xPos -17,y:element.yPos},{x:otherANode.xPos+20,y:otherANode.yPos}];   
                }
            }else{
                if(element.yPos > otherANode.yPos){ //when Y is LOWER than other.y
                    var fromTo = [{x:element.xPos +10.5,y:element.yPos -10.5},{x:otherANode.xPos-12.5,y:otherANode.yPos+12.5}];   
                }
                else if(element.yPos == otherANode.yPos){
                    var fromTo = [{x:element.xPos +14,y:element.yPos},{x:otherANode.xPos-16.5,y:otherANode.yPos}];
                }
                else{
                    var fromTo = [{x:element.xPos +10.5,y:element.yPos +10.5},{x:otherANode.xPos-12.5,y:otherANode.yPos-12.5}];
                }
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
            .attr("font-size","14px")
            .attr("fill","#242424")
            .attr("text-anchor","middle");
    }

});
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
    .on("click", function(d,i){ store.dispatch("setNewSubsetToDisplay", {graphId: id, nodeId: d.index});})
    .on("mouseover", function(d,i){mouseHover(d.colour,d.tokens,id,"a",d.index)})
    .on("mouseout", function(d,i){return mouseOut("a",d.index,id);}); 
//ABSTRACT NODE LABELS - redo this so edges dont overwrite?
zoomGroup.selectAll("rect.alabels")
    .data(aNodes)
    .enter().append("rect")
    .attr("class",function(d,i){return "alabels"+id+d.index;})
    .attr("height","20")
    .attr("width",function(d,i){return d.label.length*8 + 4 + "" ;})
    .attr("x",function(d,i){return d.xPos - d.label.length*4 -2 + "";})
    .attr("y",function(d,i){return d.yPos + 20;})
    .attr("stroke", function(d,i){return d.colour;})
    .attr("stroke-width", "2")
    .attr("fill", "none");
zoomGroup.append("text").selectAll("text.anodeLabels").data(aNodeLabels).enter().append("tspan").text(d => d)
    .attr("class","anodeLabels")
    .attr("x",function(d,i){return aNodes[i].xPos;})
    .attr("y",function(d,i){return aNodes[i].yPos + 33;})
    .attr("font-size","12px")
    .attr("text-anchor","middle")
    .attr("font-weight", "900")
    .attr("dominant-baseline","middle")
    .attr("fill","black")
    .attr("font-family","Arial");

var end = performance.now();
console.log("Making the graph took " + (end - start) + " milliseconds.") 
}

function mouseHover(colour, anchors, id,type,index){
    // console.log(colour);
    for(var i=0; i<anchors.length; i++){
        d3.selectAll("rect.rectangle"+id+anchors[i])
        .attr("fill", colour);
    }
    d3.select("rect."+type+"labels"+id+index)
    // .raise()
    .attr("fill", colour)
    .style("opacity","0.7");
};
function mouseOut(type,index,id){
    d3.selectAll("rect.highlights")
    .attr("fill", "none");
    d3.select("rect."+type+"labels"+id+index)
    // .lower()
    .attr("fill", "none")
    .style("opacity","1");

};

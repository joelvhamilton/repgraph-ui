var data = {
"id": "20013013",
"connected": "False",
"acyclic": "True",
"longest_directed_path": {
    "[1, 0]": {
        "edges": [
            {
                "src": "_that_q_dem",
                "trg": "generic_entity",
                "label": "RSTR/H"
            }
        ]
    },
    "[2, 0]": {
        "edges": [
            {
                "src": "_attract_v_1",
                "trg": "generic_entity",
                "label": "ARG1/NEQ"
            }
        ]
    },
    "[3, 4]": {
        "edges": [
            {
                "src": "udef_q",
                "trg": "_attention_n_to",
                "label": "RSTR/H"
            }
        ]
    }
},
"longest_undirected_path": {
    "[0, 1]": {
        "edges": [
            {
                "src": "_that_q_dem",
                "trg": "generic_entity",
                "label": "RSTR/H"
            }
        ]
    },
    "[0, 2]": {
        "edges": [
            {
                "src": "_attract_v_1",
                "trg": "generic_entity",
                "label": "ARG1/NEQ"
            }
        ]
    },
    "[3, 4]": {
        "edges": [
            {
                "src": "udef_q",
                "trg": "_attention_n_to",
                "label": "RSTR/H"
            }
        ]
    }
}
}
longestPath(data);

function longestPath(data){
    // console.log(data);
    var connected = data.connected;
    var acyclic = data.acyclic;
    var graphId = data.id;
    var directedPaths = [];
    var undirectedPaths = [];
    //label =[0], edges =[1];

    var temp1 = Object.entries(data.longest_directed_path);
    for (x in temp1){
        directedPaths.push(temp1[x]);
    }
    var temp2 = Object.entries(data.longest_undirected_path);
    for (y in temp2){
        undirectedPaths.push(temp2[y]);
    }
    // console.log(undirectedPaths);

var width = Math.max(300,35 + undirectedPaths[0][1].edges.length*100 );
// height determined by the longest path in the data.
var height = undirectedPaths.length*55 + directedPaths.length*55 + 60;
var heightDP = 15;
var heightUDP = directedPaths.length*55 + 45;

// console.log(directedPaths);

for(var i=0; i<directedPaths.length;i++){
    // console.log(directedPaths[i][1].edges);
    var dColour =  d3.scaleSequential().domain([0,directedPaths[i][1].edges.length +1]).interpolator(d3.interpolateCool);
    for(var j=0;j<directedPaths[i][1].edges.length;j++){
        directedPaths[i][1].edges[j].srcColour = dColour(j);// TODO TEST AN MAYBE ADD I HERE
        directedPaths[i][1].edges[j].trgColour = dColour(j+1);
        console.log(directedPaths[i][1].edges);
    }
}
for(var i=0; i<undirectedPaths.length;i++){
    var udColour =  d3.scaleSequential().domain([0,undirectedPaths[i][1].edges.length +1]).interpolator(d3.interpolateCool);
    for(var j=0;j<undirectedPaths[i][1].edges.length;j++){
        undirectedPaths[i][1].edges[j].srcColour = dColour(j);
        undirectedPaths[i][1].edges[j].trgColour = dColour(j+1);
        console.log(undirectedPaths[i][1].edges);
    }

}

var svg = d3.select("body").append("svg").attr("id", "viewSvg").attr("class", "d3-comparison")
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



}
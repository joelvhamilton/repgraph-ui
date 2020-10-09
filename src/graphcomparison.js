//TEST DATA
var comparisonOutput ={
    "matching": {
       "edges": [
          {
             "src": 1,
             "trg": 2,
             "label": "RSTR/H"
          },
          {
             "src": 0,
             "trg": 3,
             "label": "ARG1/H"
          },
          {
             "src": 0,
             "trg": 4,
             "label": "MOD/EQ"
          }
       ],
       "nodes": [
          {"1": {
             "label": "_this_q_dem",
             "anchors": [
                1
             ]
          }},
          {"0": {
             "label": "neg",
             "anchors": [
                0
             ]
          }},
          {"2": {
             "label": "_year_n_1",
             "anchors": [
                2
             ]
          }},
          {"3": {
             "label": "loc_nonsp",
             "anchors": [
                1,
                2
             ]
          }},
          {"4": {
             "label": "unknown",
             "anchors": [
                0,
                1,
                2
             ]
          }}
         ]
    },
    "graph_1": {
       "20010002": {
          "edges": [
             {
                "src": 3,
                "trg": 4,
                "label": "ARG1/NEQ"
             },
             {
                "src": 3,
                "trg": 2,
                "label": "ARG2/NEQ"
             }
          ],
          "nodes": [
             {"3": {
                "label": "loc_nonsp",
                "anchors": [
                   1,
                   2
                ]
             }},
             {"4": {
                "label": "unknown",
                "anchors": [
                   0,
                   1,
                   2
                ]
             }},
             {"2": {
                "label": "_year_n_1",
                "anchors": [
                   2
                ]
             }}
         ]
       }
    },
    "graph_2": {
       "20010004": {
          "edges": [
             {
                "src": 3,
                "trg": 2,
                "label": "ARG2/EQ"
             },
             {
                "src": 3,
                "trg": 4,
                "label": "ARG1/EQ"
             }
          ],
          "nodes": [
             {"3": {
                "label": "loc_nonsp",
                "anchors": [
                   1,
                   2
                ]
             }},
             {"2": {
                "label": "_year_n_1",
                "anchors": [
                   2
                ]
             }},
             {"4": {
                "label": "unknown",
                "anchors": [
                   0,
                   1,
                   2
                ]
             }}
         ]
       }
    }
 };
 makeGraphComparison(comparisonOutput);

function makeGraphComparison(comparisonOutput){
    var matchingNodes = [];
    var matchingEdges = [];
    var g1id;
    var g1Nodes = [];
    var g1Edges = [];
    var g2id;
    var g2Nodes = [];
    var g2Edges = [];
    var data;

    for(var output in comparisonOutput){

        //READING IN THE DATA.
        if(output == "matching"){
            data = comparisonOutput[output];
            matchingNodes = Object.entries(data.nodes);
            matchingEdges = Object.entries(data.edges);
        }
        else{
            data = comparisonOutput[output];
            data = Object.entries(data);
            data.forEach(element => {
                if(output == "graph_1"){
                    g1id = element[0];
                    g1Nodes = element[1].nodes;
                    g1Edges = element[1].edges;
                }
                else{
                    g2id = element[0];
                    g2Nodes = element[1].nodes;
                    g2Edges = element[1].edges;
                }
            });
        }
    }


    //SVG STUFF:
    var height = 100;
    if(g2Nodes != undefined){
      height = height + g2Nodes.length*50;
    }
    if(g1Nodes != undefined){
      height = height + g1Nodes.length*50;
    }
    if(matchingNodes != undefined){
      height = height + matchingNodes.length*50;
    }
    var width = 600;
    var workingHeight = 10;
    var svg = d3.select("body").append("svg").attr("id", "viewSvg").attr("class", "d3-comparison")
    .attr("height", height).attr("width", width).attr("id", "comparison")
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
    .attr("width",width)
    .attr("x","0")
    .attr("y","0")
    .attr("fill","#f2f0f0");

    //height of text
    console.log(g1Nodes);
    var matchingTextPos =0;
    var g1TextPos=0;
    var g2TextPos=0;
if(matchingNodes.length > 0){
   matchingTextPos = workingHeight;
   workingHeight = workingHeight + 30 + matchingNodes.length*50;
   console.log("workingheight: " + workingHeight);
   console.log(matchingTextPos);
}
if(g1Nodes.length > 0){
   g1TextPos = workingHeight;
   workingHeight = workingHeight + 30 + g1Nodes.length*50;
   console.log("workingheight: " + workingHeight);   console.log();
   console.log(g1TextPos);
}
if(g2Nodes.length > 0){
   g2TextPos = workingHeight;
   workingHeight = workingHeight + 30 + g2Nodes.length+50;
   console.log("workingheight: " + workingHeight);   console.log();
   console.log(g2TextPos);
}
    
var text = [{t:"Matching nodes and edges:", pos:matchingTextPos},
            {t:"Exclusive to graph " + g1id + ":", pos:g1TextPos},
            {t:"Exclusive to graph " + g2id + ":", pos:g2TextPos}];



}

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
       "nodes": {
          "1": {
             "label": "_this_q_dem",
             "anchors": [
                1
             ]
          },
          "0": {
             "label": "neg",
             "anchors": [
                0
             ]
          },
          "2": {
             "label": "_year_n_1",
             "anchors": [
                2
             ]
          },
          "3": {
             "label": "loc_nonsp",
             "anchors": [
                1,
                2
             ]
          },
          "4": {
             "label": "unknown",
             "anchors": [
                0,
                1,
                2
             ]
          }
       }
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
          "nodes": {
             "3": {
                "label": "loc_nonsp",
                "anchors": [
                   1,
                   2
                ]
             },
             "4": {
                "label": "unknown",
                "anchors": [
                   0,
                   1,
                   2
                ]
             },
             "2": {
                "label": "_year_n_1",
                "anchors": [
                   2
                ]
             }
          }
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
          "nodes": {
             "3": {
                "label": "loc_nonsp",
                "anchors": [
                   1,
                   2
                ]
             },
             "2": {
                "label": "_year_n_1",
                "anchors": [
                   2
                ]
             },
             "4": {
                "label": "unknown",
                "anchors": [
                   0,
                   1,
                   2
                ]
             }
          }
       }
    }
 };
 makeGraphComparison(comparisonOutput);

function makeGraphComparison(comparisonOutput){
    var matchingNodes;
    var matchingEdges;
    var g1id;
    var g1Nodes;
    var g1Edges;
    var g2id;
    var g2Nodes;
    var g2Edges;
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
console.log(g2id);






}

import axios from "axios"
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
        graphsToDisplayOnPage: [], // core functionality of displaying graph
        subsetToDisplay: {}, // functionality to display a node and its neighbours
        currentGraphProperties: {}, // functionality to display the properties for which a graph holds
        resultsOfGraphComparison: {}, // functionality to compare two graphs
        graphSearchResults: [], // functionality to search for a node label or subgraph
        currentPageOfGraphs: 0,
        individualGraphToDisplay: {},
        displayTokens: true,
        nodeSearchResults: [],
        nodeLabelToSearchFor: "",
    },

    getters: {
        getGraphsToDisplayOnPage: state => state.graphsToDisplayOnPage,
        getSubsetToDisplay: state => state.subsetToDisplay,
        getCurrentGraphProperties: state => state.currentGraphProperties,
        getResultsOfGraphComparison: state => state.resultsOfGraphComparison,
        getGraphSearchResults: state => state.graphSearchResults,
        getCurrentPageOfGraphs: state => state.currentPageOfGraphs,
        getIndividualGraphToDisplay: state => state.individualGraphToDisplay,
        displayTokens: state => state.displayTokens,
        getNodeSearchResults: state => state.nodeSearchResults,
        getNodeLabelToSearchFor: state => state.nodeLabelToSearchFor
    },

    mutations: {
        changeCurrentPageOfGraphs(state, pageNo){
            state.currentPageOfGraphs = pageNo;
        },

        changeGraphsBeingDisplayed(state, graphs){
            state.graphsToDisplayOnPage = [];
            state.graphsToDisplayOnPage = graphs;
        },

        newGraphProperties(state, properties){
            state.currentGraphProperties = properties;
        },

        newGraphComparisonResults(state, comparisonResults){
            state.resultsOfGraphComparison = comparisonResults;
        },

        newSubsetToDisplay(state, subsetToDisplay){
            state.subsetToDisplay = subsetToDisplay;
        },

        newGraphSearchResults(state, searchResults){
            state.graphSearchResults = searchResults;
        },
        
        graphResponse(state, data){
            console.log(data)
        },

        setIndividualGraphToDisplay(state, graph){
            state.individualGraphToDisplay = graph;
        },

        changeNodeLabelToSearchFor(state, label){
            state.nodeLabelToSearchFor = label;
        },

        changeDisplayTokens(state, updated_status){
            state.displayTokens = updated_status;
        },
        
        updateNodeSearchResults(state, newResults){
            state.nodeSearchResults = newResults;
        }
    },

    actions: {

        uploadGraphs({commit}, graphsFormDataObject){
            return axios.post( 'http://localhost:8000/load_graphs', 
            graphsFormDataObject,
            {
            headers: {
                'Content-Type': 'multipart/form-data'
            }}).then((res) => {
                commit("changeCurrentPageOfGraphs", 0)
                commit("graphResponse", res.data)
                return res;
            })
        },

        updateCurrentPageOfGraphs({commit}, newPage){
            commit("changeCurrentPageOfGraphs", newPage);
        },

        updateGraphsBeingDisplayed({commit, state}){
            let newPageToGoTo = 1 + Number(state.currentPageOfGraphs)
            axios.get(`http://localhost:8000/get_graphs/${newPageToGoTo}`).then((res) =>{
                if (res.data.status != 404){
                    let newGraphs = res.data.graphs
                    commit("changeGraphsBeingDisplayed", newGraphs);
                    commit("changeCurrentPageOfGraphs", (Number(state.currentPageOfGraphs)+1))
                }
                else {
                    // TODO: MAKE A MODAL POP UP SAYING "SORRY THERE ARE NO MORE GRAPHS TO BE SEEN."" AND AUTOMATICALLY SHOW THEM THE LAST PAGE.
                    // IF BECAUSE OF TYPING IN THEN HAVE A MODAL SAYING "INVALID PAGE NUMBER SOZ"
                }
            });

        },
        
        updateDisplayTokens({commit}, new_status){
            commit("changeDisplayTokens", new_status)
        },

        updateIndividualGraphToDisplay({commit}, graphId){
            axios.get(`http://localhost:8000/graphs/${graphId}`).then((res) => {
                if (res.data.status != 404){
                    let newGraph = res.data.output;
                    commit("setIndividualGraphToDisplay", newGraph)
                }
            })
        },

        goToSpecificPage({commit}, newPageNumber){
            axios.get(`http://localhost:8000/get_graphs/${newPageNumber}`).then((res) => {
                if (res.data.status != 404){
                    let newGraphs = res.data.graphs
                    commit("changeGraphsBeingDisplayed", newGraphs);
                    commit("changeCurrentPageOfGraphs", (newPageNumber))
                }
                else {
                    // TODO: MAKE A MODAL POP UP SAYING "SORRY INVALID PAGE NUMBER" AND AUTOMATICALLY SHOW THEM THE LAST PAGE.
                    // IF BECAUSE OF TYPING IN THEN HAVE A MODAL SAYING "INVALID PAGE NUMBER SOZ"
                }
            });
        },

        setNewGraphProperties({commit}, graphId){
            axios.get(
                `http://localhost:8000/graph_properties/${graphId}`).then((res) => {
                    console.log(res.data)
                    let graphProperties = res.data.output
                    commit("newGraphProperties", graphProperties);  
                })
        },

        setNewGraphComparisonResults({commit}, newComparisonResults){
            commit("newGraphComparisonResults", newComparisonResults);
        },

        setNewSubsetToDisplay( {commit}, subsetDetails){
            let graphId = subsetDetails.graphId.toString();
            let nodeId = subsetDetails.nodeId;
            console.log(`node ID in store before request is made: ${nodeId}`);
            axios.get(`http://localhost:8000/display_node_neighbours/${graphId}_${nodeId}`).then((res)=> {
                let newSubset = res.data;
                commit("newSubsetToDisplay", newSubset);
            })

        },

        setNewGraphSearchResults({commit}, graphSearchResults){
            commit("newGraphSearchResults", graphSearchResults);
        },

        setNewNodeSearchResults({commit}, nodeLabel){
            let formData = new FormData();
            formData.append('node_labels', "[nodeLabel]");
            axios.get(`http://localhost:8000/node_search/${nodeLabel}`) 
            .then((response) => {
                let newResults = response.data.graph_ids;
                commit("updateNodeSearchResults", newResults);
                commit("changeNodeLabelToSearchFor", nodeLabel);
            })
        }

    }
})

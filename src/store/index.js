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
        subgraphSearchResults: [], // functionality to search for a node label or subgraph
        currentPageOfGraphs: 0,
        individualGraphToDisplay: {},
        displayTokens: true,
        nodeSearchResults: [],
        nodeLabelsToSearchFor: "",
        numberOfPages: 0,
        graphsToDisplayIndividually: [],
        stringSearchedFor: ""
    },

    getters: {
        getGraphsToDisplayOnPage: state => state.graphsToDisplayOnPage,
        getSubsetToDisplay: state => state.subsetToDisplay,
        getCurrentGraphProperties: state => state.currentGraphProperties,
        getResultsOfGraphComparison: state => state.resultsOfGraphComparison,
        getSubgraphSearchResults: state => state.subgraphSearchResults,
        getCurrentPageOfGraphs: state => state.currentPageOfGraphs,
        getIndividualGraphToDisplay: state => state.individualGraphToDisplay,
        displayTokens: state => state.displayTokens,
        getNodeSearchResults: state => state.nodeSearchResults,
        getNodeLabelsToSearchFor: state => state.nodeLabelsToSearchFor,
        getTotalNumberOfPages: state => state.numberOfPages,
        getGraphsToDisplayIndividually: state => state.graphsToDisplayIndividually,
        getStringSearchedFor: state => state.stringSearchedFor
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

        newSubgraphSearchResults(state, searchResults){
            state.subgraphSearchResults = searchResults;
        },
        
        graphResponse(state, data){
            console.log(data)
        },

        setIndividualGraphToDisplay(state, graph){
            state.individualGraphToDisplay = graph;
        },

        changeGraphsToDisplayIndividually(state, graphs){
            state.graphsToDisplayIndividually = graphs;
        },

        changeNodeLabelsToSearchFor(state, labels){
            state.nodeLabelsToSearchFor = labels;
        },

        changeDisplayTokens(state, updated_status){
            state.displayTokens = updated_status;
        },
        
        updateNodeSearchResults(state, newResults){
            state.nodeSearchResults = newResults;
        },
        
        updateStringSearchedFor(state, string){
            state.stringSearchedFor = string;
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
                    commit("changeCurrentPageOfGraphs", (Number(state.currentPageOfGraphs)+1));
                    state.numberOfPages = res.data.total_pages;
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
                let newGraph = res.data.output;
                commit("setIndividualGraphToDisplay", newGraph);
            }).catch((error) => {
                let newGraph = {status: "Failed", id: graphId}
                commit("setIndividualGraphToDisplay", newGraph);
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
            return axios.get(
                `http://localhost:8000/graph_properties/${graphId}`).then((res) => {
                    let graphProperties = res.data.output;
                    commit("newGraphProperties", graphProperties);  
                }).catch((error) => {
                    commit("newGraphProperties", {status: "Failed", id: graphId});
                })
        },

        makeNewGraphComparison({commit}, idsSeparatedByUnderscore){
            return axios.get(`http://localhost:8000/compare/${idsSeparatedByUnderscore}`).then((res) => {
                console.log(res.data);
                let newComparisonResults = res.data.output;
                commit("newGraphComparisonResults", newComparisonResults);
            }).catch( (error) => {
                commit("newGraphComparisonResults", {status: "Failed"});
            })
        },

        setNewSubsetToDisplay( {commit}, subsetDetails){
            let graphId = subsetDetails.graphId.toString();
            let nodeId = subsetDetails.nodeId;
            console.log(`node ID in store before request is made: ${nodeId}`);
            axios.get(`http://localhost:8000/display_node_neighbours/${graphId}_${nodeId}`).then((res)=> {
                let newSubset = res.data.output;
                commit("newSubsetToDisplay", newSubset);
            })

        },

        setNewSubgraphSearchResults({commit}, subgraphToSearchFor){
            console.log(subgraphToSearchFor);
            axios.post(`http://localhost:8000/search_subgraph`, subgraphToSearchFor).then((res) => {
                let graphSearchResults = res.data.output.sentences;
                commit("newSubgraphSearchResults", graphSearchResults);
            }).catch((error) => {
                commit("newSubgraphSearchResults", {status: "Failed"});
            })
        },

        setNewNodeSearchResults({commit}, nodeLabels){
            let payload = {"labels": nodeLabels};
            console.log(payload);
            axios.post(`http://localhost:8000/node_search`, payload) 
            .then((response) => {
                let newResults = response.data.output.sentences;
                commit("updateNodeSearchResults", newResults);
                commit("changeNodeLabelsToSearchFor", nodeLabels);
            }).catch((error) => {
                commit("updateNodeSearchResults", {status: "Failed"});
                commit("changeNodeLabelsToSearchFor", nodeLabels);
            })
        },

        getGraphsBySentence({commit}, sentence){
            let payload = {"sentence": sentence};
            axios.post(`http://localhost:8000/sentence`, payload).then((res) => {
                let graphsOutput = res.data.output.sentence;
                commit("changeGraphsToDisplayIndividually", graphsOutput);
                commit("updateStringSearchedFor", sentence);
            }).catch((error) => {
                commit("changeGraphsToDisplayIndividually", {status: "Failed"});
                commit("updateStringSearchedFor", sentence);
            })
        }

    }
})



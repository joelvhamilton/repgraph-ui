import axios from "axios"
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
        graphsToDisplayOnPage: [], // core functionality of displaying graph
        subGraphToDisplay: {}, // functionality to display a node and its neighbours
        currentGraphProperties: {}, // functionality to display the properties for which a graph holds
        resultsOfGraphComparison: {}, // functionality to compare two graphs
        graphSearchResults: [], // functionality to search for a node label or subgraph
        currentPageOfGraphs: 0,
        individualGraphToDisplay: {}
    },

    getters: {
        getGraphsToDisplayOnPage: state => state.graphsToDisplayOnPage,
        getSubGraphToDisplay: state => state.subGraphToDisplay,
        getCurrentGraphProperties: state => state.currentGraphProperties,
        getResultsOfGraphComparison: state => state.resultsOfGraphComparison,
        getGraphSearchResults: state => state.graphSearchResults,
        getCurrentPageOfGraphs: state => state.currentPageOfGraphs,
        getIndividualGraphToDisplay: state => state.individualGraphToDisplay
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

        newSubGraphBeingDisplayed(state, subgraph){
            state.subGraphToDisplay = subgraph;
        },

        newGraphSearchResults(state, searchResults){
            state.graphSearchResults = searchResults;
        },
        
        graphResponse(state, data){
            console.log(data)
        },

        setIndividualGraphToDisplay(state, graph){
            state.individualGraphToDisplay = graph;
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
                    let graphProperties = res.data
                    commit("newGraphProperties", graphProperties);  
                })
        },

        setNewGraphComparisonResults({commit}, newComparisonResults){
            commit("newGraphComparisonResults", newComparisonResults);
        },

        setNewSubGraphBeingDisplayed({commit}, newSubGraph){
            commit("newSubGraphBeingDisplayed", newSubGraph);
        },

        setNewGraphSearchResults({commit}, graphSearchResults){
            commit("newGraphSearchResults", graphSearchResults);
        }

    }
})
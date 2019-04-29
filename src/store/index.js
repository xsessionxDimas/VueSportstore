import Vue   from "vue";
import Vuex  from "vuex";
import Axios from "axios";
import CartModule from './cart';

Vue.use(Vuex);

const baseUrl       = "http://localhost:3500";
const productsUrl   = `${baseUrl}/products`;
const categoriesUrl = `${baseUrl}/categories`;

export default new Vuex.Store({
    strict: true,
    modules: { cart: CartModule },
    state: {
        productsData    : [],
        categoriesData  : [],
        totalProduct    : 0,
        currentPage     : 1,
        pageSize        : 4,
        currentCategory : "All"
    },
    getters : {
        /* encapsulate the state variable in get methods */
        processedProducts: state => {
            let index = (state.currentPage - 1) * state.pageSize;   
            var data  = state.currentCategory == "All" ?
            state.productsData.slice(index, index + state.pageSize) :
            state.productsData.filter(f => f.category == state.currentCategory).slice(index, index + state.pageSize);         
            return data;
        },
        pageCount: state => {
            if(state.currentCategory != "All") {
                var data = state.productsData.filter(f => f.category == state.currentCategory).length;
                return Math.ceil(data / state.pageSize)
            } else {
                return Math.ceil(state.totalProduct / state.pageSize)
            }  
        } ,
        categories: state => ["All", ...new Set(state.productsData.map(p => p.category).sort())]
    },
    mutations: {
        /* encapsulate the state variable in set methods */
        setCurrentPage(state, page) {
            state.currentPage = page;
        },
        setPageSize(state, pageSize) {
            state.pageSize = pageSize;
        },
        setCategories(state, category){
            state.currentCategory = category;
            state.currentPage     = 1
        },
        setData(state, data) {
            state.productsData   = data.pdata;
            state.totalProduct   = data.pdata.length;
            state.categoriesData = data.cdata.sort();
        }
    },
    actions: {
        async getData(context) {
            let pdata = (await Axios.get(productsUrl)).data;
            let cdata = (await Axios.get(categoriesUrl)).data;
            context.commit("setData", { pdata, cdata} );
        }
    }    
})
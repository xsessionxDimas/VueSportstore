import Vue          from "vue";
import Vuex         from "vuex";
import Axios        from "axios";
import CartModule   from './cart';
import OrderModule  from './order';
import AuthModule   from './auth';

Vue.use(Vuex);

const baseUrl       = "http://localhost:3500";
const productsUrl   = `${baseUrl}/products`;
const categoriesUrl = `${baseUrl}/categories`;

export default new Vuex.Store({
    strict: true,
    modules: { cart: CartModule, order: OrderModule, auth: AuthModule },
    state: {
        //productsData    : [],
        categoriesData  : [],
        //totalProduct    : 0,
        currentPage     : 1,
        pageSize        : 4,        
        currentCategory : "All",
        pages           : [],
        serverPageCount : 0,
        searchTerm      : "",
        showSearch      : false
    },
    getters : {
        /* encapsulate the state variable in get methods */
        processedProducts: state => {
            return state.pages[state.currentPage];
        },
        pageCount:  state => Math.ceil(state.serverPageCount/state.pageSize),
        categories: state => ["All", ...state.categoriesData]
    },
    mutations: {
        /* encapsulate the state variable in set methods */
        _setCurrentPage(state, page) {
            state.currentPage = page;
        },
        _setPageSize(state, pageSize) {
            state.pageSize    = pageSize; 
            state.currentPage = 1;                  
        },
        _setCurrentCategory(state, category){
            state.currentCategory = category;
            state.currentPage     = 1
        },
        addPage(state, page){
            for(let i = 0; i < page.pageCount; i++) {
                Vue.set(state.pages, page.number + i, page.data);
            } 
        },
        clearPages(state){
            state.pages.splice(0, state.pages.length);
        },
        setCategories(state, categories){
            state.categoriesData = categories;
        },
        setPageCount(state, pageCount) {
            state.serverPageCount = pageCount;
        },
        setSearchTerm(state, searchTerm) {
            state.searchTerm = searchTerm;
        },
        setShowSearch(state, show) {
            state.showSearch  = show;
            state.currentPage = 1;
        }
    },
    actions: {
        async getData(context) {
            await context.dispatch("getPage", 1);
            context.commit("setCategories", (await Axios.get(categoriesUrl)).data);
        },
        async getPage(context, getPageCount = 1){
            let url = `${productsUrl}?_page=${context.state.currentPage}&_limit=${context.state.pageSize * getPageCount}`;
            if(context.state.currentCategory != "All") {
                url += `&category=${context.state.currentCategory}`;
            }
            if(context.state.searchTerm != "") {
                url += `&q=${context.state.searchTerm}`;
            }
            let response = await Axios.get(url);
            context.commit("setPageCount", response.headers["x-total-count"]);
            context.commit("addPage", { number : context.state.currentPage, 
            data: response.data, pageCount: getPageCount});
        },
        setCurrentPage(context, page){
            context.commit("_setCurrentPage", page);
            if(!context.state.pages[page]){
                context.dispatch("getPage");
            }
        },
        setPageSize(context, pageSize){
            context.commit("clearPages");
            context.commit("_setPageSize", pageSize);
            context.dispatch("getPage", 2);
        },
        setCurrentCategory(context, category){
            context.commit("clearPages");
            context.commit("_setCurrentCategory", category);
            context.dispatch("getPage", 2);
        },
        search(context, searchTerm){
            context.commit("setSearchTerm", searchTerm);
            context.commit("setShowSearch", true);
            context.dispatch("getPage", 2);
        },
        clearSearch(context) {
            context.commit("setSearchTerm", "");
            context.commit("setShowSearch", false);
            context.dispatch("getPage", 2);
        }
    }   
})
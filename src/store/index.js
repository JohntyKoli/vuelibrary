import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    isUserLoggedIn:false,
    searchKey:''
  },
  getters: {
    isUserLoggedIn:(state)=>{
      return state.isUserLoggedIn
    },
    searchKey:(state)=>{
      return state.searchKey
    }
  },
  mutations: {
    isUserLoggedIn(state,val){
      state.isUserLoggedIn = val
    },
    searchKey(state,val){
      state.searchKey = val
    }
  },
  
  actions: {
    checkUserLoggedIn(context,val){
      context.commit('isUserLoggedIn',val);
    },
    async checkUser(context) {
      try {
        var token = localStorage.getItem('token');
        const response = await axios.get('/user',{
          headers:{
            'Authorization': `Bearer ${token}` 
          }
        })
        context.commit('isUserLoggedIn',response.data.success);
      } catch (error) {
        console.log("errr from store "+error)
      }
    },
    searchKey(context,searchKey){
      context.commit('searchKey',searchKey);
    },
  },
  modules: {
  }
})

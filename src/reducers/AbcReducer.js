const initialState = {
    abc :" "
}
  
  function abcReducer(state = initialState, action) {
    switch(action.type){
        case"a":
        return{
            abc:" shalini"
        }
        case"b":
        return{
            abc:" shalzz"
        }
        default:{
            return state;
        }
    }
  }
  export default abcReducer;


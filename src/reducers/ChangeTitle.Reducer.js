const initialState = {
    changeTitle: "Keep",
  };
  
  function ChangeTitleReducer(state = initialState, action) {
    console.log(action.type);
    switch (action.type) {
      case "Notes":
        return {
          changeTitle: "Notes",
        };
      case "Reminder":
        return {
          changeTitle: "Reminder",
        };
      case "Label":
        return {
          changeTitle: "Label",
        };
      case "Archive":
        return {
          changeTitle: "Archive",
        };
      case "Trash":
        return {
          changeTitle: "Trash",
        };
  
      default:
        return state;
    }
  }
  
  export default ChangeTitleReducer;
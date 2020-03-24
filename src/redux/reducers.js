import { combineReducers } from 'redux'

function updateObject(oldObject, newValues) {
  return Object.assign({}, oldObject, newValues)
}

function getCurrentDate(){
  let now = new Date();
  let day = now.getUTCDate();
    if (day < 10) day = "0" + day;
  let month = now.getUTCMonth();
      month++;
    if (month < 10) month = "0" + month;
  return(
    day + "." + month + "."+ now.getUTCFullYear()
    + " at " + now.getUTCHours() + ":" + now.getUTCMinutes()
  )
}

let initialState = {
  posts: [],
  postForm: {
    title: "no title",
    content: "no content"
  },
  colorTheme: "light"
};

function blogApp(state = initialState, action) {
  switch (action.type) {
    case "TITLE_CHANGE":
      return updateObject(state, {
        postForm: {
          ...state.postForm,
          title: action.value
        }
      })
    case "CONTENT_CHANGE":
      return updateObject(state, {
        postForm: {
          ...state.postForm,
          content: action.value
        }
      })
    case "SUBMIT":
      (document.getElementById("postForm")).reset();
      document.getElementById("success").setAttribute('style', 'display: inline-block');
      setTimeout(() => document.getElementById("success").setAttribute('style', 'display: none'), 3000);
      return updateObject(state, {
        posts: [
          ...state.posts,
          {
            id: "",
            title: state.postForm.title,
            content: state.postForm.content,
            date: getCurrentDate()
          }
        ],
        postForm: {
          title: "",
          content: ""
        }
      })
    case "DELETE_POST": {
      let filtered = Object.assign([], state.posts)
      filtered = filtered.filter(post => { return post.id !== action.id })
      return updateObject(state, {
          posts: filtered,
      }  
    )}
    case "SWITCH_THEME":
      if (state.colorTheme === "light"){
        document.documentElement.setAttribute('data-theme', 'dark');
        return updateObject(state, {
        colorTheme: "dark"
      })} else{
        document.documentElement.setAttribute('data-theme', 'light');
        return updateObject(state, {
          colorTheme: "light"
        })
      }
    case "MOUNT_POSTS":
      let sortedPosts = (action.value).sort((a, b) => (Number(a.id) < Number(b.id) ? 1 : -1))
      return updateObject(state, {
        posts: sortedPosts
      })
    default: return state
  }
}

const rootReducer = combineReducers({blogApp})

export default rootReducer;
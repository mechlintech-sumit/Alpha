import { Axios } from "../../Utils/axios";
import { toast } from "react-toastify";
import { HeaderToken } from "../../Utils/headerToken";

export const PROJECT = "PROJECT"
export const ADD_PROJECT = "ADD_PROJECT"
export const NEW_PROJECT = "NEW_PROJECT"
export const DELETE_PROJECT = "DELETE_PROJECT"
export const PROJECT_MILESTONE = "PROJECT_MILESTONE"
export const UPDATE_PROJECT = "UPDATE_PROJECT"
export const ADD_PROJECT_MILESTONE = "ADD_PROJECT_MILESTONE"
export const DELETE_PROJECT_MILESTONE = "DELETE_PROJECT_MILESTONE"
export const EDIT_PROJECT_MILESTONE = "EDIT_PROJECT_MILESTONE"

export const ADD_TASK = "ADD_TASK"
export const GET_TASK = "GET_TASK"

export const getProjects = () => {
    return async (dispatch) => {
        await Axios.get("/Projects/project",HeaderToken()).then(
          (res) => {
              console.log("ress", res.data)
            dispatch({ type: PROJECT, payload: res.data.response });
          }
        )
        .catch((err) => {
             toast.error("Network Error");
          });
      };
}

export const getProject = (id) => {
  return async (dispatch) => {
      await Axios.get(`/Projects/get_project/${id}`,HeaderToken()).then(
        (res) => {
            console.log("ress /Projects/get_project", res.data)
            dispatch({type:NEW_PROJECT, payload: res.data.response})
        }
      )
      .catch((err) => {
           toast.error("Network Error");
        });
    };
}

export const updateProject = (data,history) => {

  return async (dispatch) => {
    await Axios.put("/Projects/project",data,HeaderToken()).then(
      (res) => {
          console.log("ress /Projects/project put", res.data)
          dispatch({type:UPDATE_PROJECT, payload: res.data.response})
        if(res.data.response.project_type === "billable"){
          if(res.data.response.project_category === "retainer"){
            history.push("/Project")
          }else{
            history.push("/Milestone")
          }
        }else{
          history.push("/Task")
        }
      }
    )
    .catch((err) => {
         toast.error("Network Error");
      });
  };

}

export const addProject = (data, history)=>{
    return async (dispatch) => {
        await Axios.post("/Projects/project",data,HeaderToken()).then(
          (res) => {
              console.log("ress /Projects/project", res.data)
            dispatch({ type: ADD_PROJECT , payload: res.data.response });
            if(res.data.response.profile_type === "billable"){
              if(res.data.response.project_category === "retainer"){
                history.push("/Project")
              }else{
                history.push("/Milestone")
              }
            }else{
              history.push("/Task")
            }
          }
        )
        .catch((err) => {
             toast.error("Network Error");
          });
      };
}

export const deleteProject = (id) => {
  return async (dispatch) => {
      await Axios.delete(`/Projects/delete_project/${id}`,HeaderToken()).then(
        (res) => {
            console.log("ress /Projects/delete_project", res.data)
          dispatch({ type: DELETE_PROJECT, payload: id });
        }
      )
      .catch((err) => {
           toast.error("Network Error");
        });
    };
}

export const addProjectMilestone = (data, history)=>{
  return async (dispatch) => {
      await Axios.post("/Milestone/save/",data,HeaderToken()).then(
        (res) => {
            console.log("ress /Milestone/save/", res.data)
          dispatch({ type: ADD_PROJECT_MILESTONE , payload: res.data.data});
        }
      )
      .catch((err) => {
           toast.error("Network Error");
        });
    };
}

export const editProjectMilestone = (data, history)=>{
  return async (dispatch) => {
      await Axios.put("/Milestone/save/",data,HeaderToken()).then(
        (res) => {
            console.log("ress /Milestone/save/ edit", res.data)
          dispatch({ type: EDIT_PROJECT_MILESTONE , payload: res.data.data});
        }
      )
      .catch((err) => {
           toast.error("Network Error");
        });
    };
}

export const deleteMilestone = (id) => {
  return async (dispatch) => {
      await Axios.delete(`/Milestone/delete${id}`,HeaderToken()).then(
        (res) => {
            console.log("ress /Projects/delete_project", res.data)
            
          dispatch({ type: DELETE_PROJECT_MILESTONE, payload: id });
        }
      )
      .catch((err) => {
           toast.error("Network Error");
        });
    };
}

export const getProjectMilestone = (id)=>{
  return async (dispatch) => {
      await Axios.get(`/Milestone/get/${id}`,HeaderToken()).then(
        (res) => {
            console.log("ress /Milestone/save/", res.data)
            if(res.data.result === "false"){
              dispatch({ type: PROJECT_MILESTONE , payload: []});
            }else{
              dispatch({ type: PROJECT_MILESTONE , payload: res.data.response});
            }
         
        }
      )
      .catch((err) => {
           toast.error("Network Error");
        });
    };
}


// task related function

export const addTask = (data) => {
  return async (dispatch) => {
    await Axios.post("/Account/task",data,HeaderToken())
    .then((res) => {
      console.log("Addtask",res.data)
      dispatch({ type:ADD_TASK, payload:res.data})
    })
    .catch((err) => {
      toast.error("Network Error");
    });
  }
}

export const getTask = (id) => {
 
  return async (dispatch) => {
    await Axios.get(`/Projects/get_project_Tasks/${id}`, HeaderToken())
      .then((res) => {
        console.log("task res", res.data);
        if(res.data.response === "no data present" ){
          dispatch({ type: GET_TASK, payload: []});
        }else{
          dispatch({ type: GET_TASK, payload: res.data.response });
        }
       
      })
      .catch((err) => {
        toast.error("Network Error");
      });
  };
};
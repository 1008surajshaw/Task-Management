import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { apiConnector } from "../apiconnector"
import { setUser } from "../../slices/profileSlice"
const BASE_URL =process.env.REACT_APP_BASE_URL

export const fetchtask = async (token)=>{
    let result =[]
    console.log(token)
    //const toastId = toast.loading("Loading..")
    try{
      const response = await apiConnector(
        "GET",
        BASE_URL + "/task/gettaskforuser",
        null,
        {
            Authorization: `${token}`
        }
      )

      console.log(response,"respo")
      
     result = response
     return result
    }
    catch(error){
      console.log(error)
      
    }
}

export const SubmitionTask = async (data,token) => {
  
    console.log(data)
    console.log(token)
    try{
      // const res = await fetch(BASE_URL+"/task/taskprogress", {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `${token}`
      //   },
      //   body: JSON.stringify({
      //      name: data,
      //   }),
      // });
       const res = await apiConnector("POST",
                         BASE_URL +"/task/taskprogress",
                      data,
                      {
                        "Content-Type": "multipart/form-data",
                       Authorization: `${token}`,
                     })
                      console.log(
                        "MARK_TASK_AS_COMPLETE_API API RESPONSE............",
                        res
                      )
                      toast.success("Task Completed")
    }
    catch(error){
      console.log("MARK_TASK_AS_COMPLETE_API API ERROR............", error)
        toast.error(error.message)
    }
  
  
}

export const createTeam = async(data, token) => {
    console.log(token)
  try {
    const res = await fetch(BASE_URL+'/team/createteam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      },
      body: JSON.stringify({
         name: data,
      }),
    });

    return res;

    
   
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error);
    
  }
  
  
};


export const addMember = async (data,token) =>{
  try{
    console.log(data);
    console.log(token);
    const res = await apiConnector("POST",BASE_URL+'/team/addmember',
    data,
    {
      Authorization: `${token}`
    }

    )
   

    
       console.log("you added data",res)
    
  }
  catch(error){
    console.log("error",error)
  }
}

export const allUser = async () =>{
  try{
    const resp = await apiConnector("GET",BASE_URL+'/team/alluser',null);
    console.log("all user data",resp)
    return resp
  }
  catch(error){
    console.log(error)
  }
}

export const allTask = async () =>{
  try{
    const resp = await apiConnector("GET",BASE_URL+'/team/alltask',null);
    return resp;
  }
  catch(error){
   console.log(error)
  }
}

export const allTeam = async () =>{
  try{
    const resp = await apiConnector("GET",BASE_URL+'/team/allteam',null);
    return resp;
  }
  catch(error){
   console.log(error)
  }
}

export const createaAssign = async (data,token) =>{
  try{
    const response = await apiConnector(
      "POST",
      BASE_URL + "/task/createandassigntask",
      data,
      {
        Authorization: `${token}`
      }
      
    )

    console.log(response.data,"respo")
    return response
  
  }
  catch(error){
    console.log(error);
  }
}


// export const fetchtaskAdmin = async ()=>{
//   let result =[]
  
//   try{
//     const response = await apiConnector(
//       "GET",
//       BASE_URL + "/task/gettaskforuser",
//       null,
      
//     )

//     console.log(response.data,"respo")
    
//    result = response
//    return result
//   }
//   catch(error){
//     console.log(error)
    
//   }
// }


export const allprogress = async () =>{
  try{
    console.log("One")
    const resp = await apiConnector("GET",BASE_URL+'/task/allprogress',null);
    console.log("two")
    console.log(resp,"resp of task")
    return resp.data.result;

  }
  catch(error){
   console.log(error)
  }
}
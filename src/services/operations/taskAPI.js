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

      console.log(response.data,"respo")
      
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
  
       const res = await apiConnector("POST",
                         BASE_URL +"/task/taskprogress",
                      data,
                      {
                        "Content-Type": "multipart/form-data",
                       Authorization: `${token}`,
                     })
                      console.log(
                        "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
                        res
                      )
                      toast.success("Lecture Completed")
    }
    catch(error){
      console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
        toast.error(error.message)
    }
  
  
}

export const createTeam = async(data, token) => {
    
    console.log(data,"name is ");
    console.log(token);

  try {
    const res = await fetch('http://localhost:4000/api/v1/team/createteam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      },
      body: JSON.stringify({
         name: data,
      }),
    });

    console.log(
      "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
      res
    );

    // Show success message only when the API call is successful
   
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error);
    
  }
  
  
};

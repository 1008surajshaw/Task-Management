import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import IconBtn from "../../components/common/IconBtn"
import Upload from "./Upload"
import ChipInput from  "./ChipInput"
import { useForm } from 'react-hook-form'
import { MdNavigateNext } from "react-icons/md"
import { SubmitionTask } from '../../services/operations/taskAPI'
export default function TaskSubmition ()  {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors},
    }= useForm()
   
    
    const { token } =useSelector((state) =>state.auth)
    
    const [loading,setLoading ] =useState(false)

    const onSubmit = async (data) => {
      
      data.taskId =  "656abb55793ac9e25a7e7ece";
      // data.assignImage = data.assignImage.path
      const result = await SubmitionTask(data, token)
      
      setLoading(false)
    }
  
  
  return (
   <form
   onSubmit={handleSubmit(onSubmit)}
   className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'
   >  
     {/* course Short Decription */}
     <div className='flex flex-col space-y-2'>
       <label className='text-sm text-richblack-5' htmlFor='courseShortDesc'>
          Progress Description <sup className="text-pink-200">*</sup>
       </label>
       <textarea 
        id="progressDetails"
        placeholder="Enter Description"
        {...register("progressDetails", { required: true })}
        className="form-style resize-x-none min-h-[130px] w-full"
       />
       {
        errors.progressDetails && (
            <span className='ml-2 text-xs tracking-wide text-pink-200'>
              Course Description is required
            </span>
        )
       }
     </div>

      <ChipInput
        label="tag"
        name="tag"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {/* Upload file */}
      <Upload
        name="assignImage"
        label="assignImage"
        register={register}
        setValue={setValue}
        errors={errors}
        
      />
      
      {/* next Buttons */}
      <div className='flex justify-end gap-x-2'>
       
        <IconBtn 
          disabled={loading}
          text ={"Save Change"}
          >
           <MdNavigateNext />
          </IconBtn>
      </div>

 
   </form>
  )
}

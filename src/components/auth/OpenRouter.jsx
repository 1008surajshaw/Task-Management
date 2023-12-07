import React from 'react'
import Signup from '../../page/Signup'
import Login from '../../page/Login'

 function OpenRouter(){
   return(
    <div>
      <div className='mt-5 relative -translate-y-8 mx-auto flex flex-col w-11/12 items-center max-w-maxContent text-white justify-between'>
        <div>
            <Login/>
        </div>
        <div>
            <Signup/>
        </div>
      </div>
    </div>
   )
}
export default OpenRouter
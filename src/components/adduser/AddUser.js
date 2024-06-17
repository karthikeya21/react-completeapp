import React,{useState} from 'react'
import './AddUser.css'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AddUser() {
  let navigate=useNavigate();
  let {register,handleSubmit,formState:{errors}}=useForm();
  let [err,setErr]=useState("")
  let addNewUser=(newUser)=>{
    console.log(newUser)
    //http post using axios
    axios.post("http://localhost:4000/users",newUser)
    .then(response=>{
      console.log(response)
      if(response.status===201){
        setErr("")
        navigate("/users")
      }
    })
    .catch(err=>{console.log(err)
      setErr(err.message)
    })

  }
  return (
    
    <div>
      <p className='display-3 text-center'>Add new user</p>
      {err.length!==0 && <p className='display-3 fw-bold text-center text-danger'>{err}</p>}
      <div className='row'>
        <div className='col-11 col-sm-8 col-md-6 mx-auto'>
          <form onSubmit={handleSubmit(addNewUser)}>
            <div className='mb-3'>
              <label htmlFor='name'>Name</label>
              <input type='text' id='name' className='form-control' {...register("name",{required:true})}></input>
              {errors.name?.type=="required" && <p className='text-danger'>Name is required</p>}
            </div>
            <div className='mb-3'>
              <label htmlFor='email'>Email</label>
              <input type='email' id='email' className='form-control' {...register("email",{required:true})}></input>
            </div>
            <div className='mb-3'>
              <label htmlFor='dob'>Date of birth</label>
              <input type='date' id='dob' className='form-control' {...register("dob",{required:true})}></input>
            </div>
            <button  type="submit" className='btn btn-success ms-auto'>Add</button>
          </form>

        </div>

      </div>

    </div>
  )
}

export default AddUser
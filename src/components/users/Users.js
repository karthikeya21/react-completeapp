import React from 'react'
import './Users.css'
import { useState,useEffect } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';


function Users() {
  let [users,setUsers]=useState([]) // user state
  let [show,setShow]=useState(false) // modal state
  let [err,setErr]=useState("")
  let {register,handleSubmit,formState:{errors},setValue,getValues}=useForm();

  let showModal=()=>setShow(true)
  let closeModal=()=>setShow(false)

  //user to edit
  let [userToEdit,setUserToEdit]=useState({})

  //edit user function
  let editUser=(userObjToEdit)=>{
    showModal()

    setUserToEdit(userObjToEdit)
    //fill withh details
    setValue("name",userObjToEdit.name)
    setValue("email",userObjToEdit.email)
    setValue("dob",userObjToEdit.dob)


  }
  //save user
  let saveUser=()=>{
    closeModal()
    //get modified user
    let modifiedUser=getValues()
    //set id for modified user
    modifiedUser.id=userToEdit.id
    console.log(modifiedUser)
    //make http put to save modified user
    axios.put(`http://localhost:4000/users/${modifiedUser.id}`,modifiedUser)
    .then(response=>{
      if(response.status===200){
        getUsers()
      }
    })
    .catch(err=>{
      
    })
  }
  //delete user

  /*useEffect(()=>{
    //fetch users
    axios.get("http://localhost:4000/users")
      .then(response=>{
        if(response.status===200){
          setUsers(response.data)
        }
      })
      .catch(err=>{console.log(err)
        setErr(err.message)
      })
  },[])*/
  let getUsers=()=>{
    
      //fetch users
      axios.get("http://localhost:4000/users")
        .then(response=>{
          if(response.status===200){
            setUsers(response.data)
          }
        })
        .catch(err=>{console.log(err)
          setErr(err.message)
        })
  }
  useEffect(()=>{
    //fetch users
    getUsers()
  },[])
  return (
    <div className='users mx-auto'>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4'>
        {
          users.map((userObj)=>
            <div className='col text-center mx-auto' key={userObj.id}>
              <div className='card'>
               <image src={userObj.image} className='mx-auto p-3 profile-image' alt=""></image>
               <div className='card-body'>
                <p className='display-5 name'>{userObj.name}</p>
                <p className='lead fs-4'>{userObj.email}</p>
                <p className='lead'>DOB: {userObj.dob}</p>

                <button className='btn btn-warning float-start ' onClick={()=>editUser(userObj)}>edit</button>

                <button className='btn btn-danger float-end'>delete</button>
               </div>
              </div>

            </div>

          )
        }

      </div>
      <Modal 
        show={show}
        onHide={closeModal}
        backdrop="static"
        centered
        className='modal'

      >
        {/*header */}
        <Modal.Header> 
          <Modal.Title>Edit profile</Modal.Title>
        </Modal.Header>
        {/*body*/}
        <Modal.Body>
          {/*form*/}
          <form >
            <div className='mb-3'>
              <label htmlFor='name'>Name</label>
              <input type='text' id='name' className='form-control' {...register("name",{required:true})}></input>
            </div>
            <div className='mb-3'>
              <label htmlFor='email'>Email</label>
              <input type='email' id='email' className='form-control' {...register("email",{required:true})}></input>
            </div>
            <div className='mb-3'>
              <label htmlFor='dob'>Date of birth</label>
              <input type='date' id='dob' className='form-control' {...register("dob",{required:true})}></input>
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={saveUser}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Users
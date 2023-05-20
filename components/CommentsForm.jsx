import React from 'react'
import { useState, useEffect, useRef } from 'react'

import { submitComment } from '@/services';

const CommentsForm = ({ slug }) => {

  const [error, setError] = useState(false);
  // const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const commentEL = useRef();
  const nameEL = useRef();
  const emailEL = useRef();
  const storeDataEL = useRef();

  useEffect(() => {
    nameEL.current.value = localStorage.getItem('name');
    emailEL.current.value = localStorage.getItem('email');
  }, [])
  

  const handelCommentSubmission = () => {
    setError(false);

    const { value: comment } = commentEL.current;
    const { value: name } = nameEL.current;
    const { value: email } = emailEL.current;
    const { value: storeData } = storeDataEL.current;

    if(!comment || !name || !email){
      setError(true);
      return;
    }

    const commentObj =  { name , email , comment , slug };   //<--------------------

    if(storeData){
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
    }
    else if(!storeData){
      localStorage.removeItem('name', name);
      localStorage.removeItem('email', email);
    }


    submitComment(commentObj).then((res)=>{
      setShowSuccessMessage(true)

      setTimeout(() => {
        setShowSuccessMessage(false)
        // nameEL.current.value = " ";
        // emailEL.current.value = " ";
        commentEL.current.value = " ";
      }, 3000);
    })
  }

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>Comments</h3>

      <div className='grid grid-cols-1 gap-4 mb-4'>
        <textarea ref={commentEL} name="comment" id="" cols="30" rows="5"
          className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100' placeholder='Comment' />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>

        <input ref={nameEL} type="text" name="name" id=""
          className='p-2 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100'
          placeholder='Name' />

        <input ref={emailEL} type="email" name="email" id=""
          className='p-2 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100'
          placeholder='Email' />

      </div>

      <div className='grid grid-cols-1 gap-4 mb-4'>
        <div>
          <input type="checkbox" name="storeData" id="storeData" ref={storeDataEL} className='cursor-pointer'/>
          <label htmlFor="storeData" className='text-gray-500 cursor-pointer ml-2'>Save my e-mail and name for the next time I comment.</label>
        </div>
      </div>

      {error && <p className='text-xs text-red-500'>All fields are required!</p>}

      <div className='mt-8'>
        <button type='button' onClick={handelCommentSubmission}
          className='transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer'>Post Comment</button>
        {showSuccessMessage && <span className='text-xl float-right font-semibold mt-3 text-green-500'>Comment Submitted for review</span>}
      </div>

    </div>
  )
}

export default CommentsForm

import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react'

const index = () => {


  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      age: '',
    },
    onSubmit: values => {


      fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(values)
      })

      // JSON.stringify({
      //   firstName: 'Muhammad',
      //   lastName: 'Ovi',
      //   age: 250,
      //   /* other user data */
      // })
      .then(res => {
debugger
        router.push("/users")

      }


      )
      .then(console.log);

    },
  });


  return (
    <div >

      <form onSubmit={formik.handleSubmit} className='flex  flex-col gap-4'>
       <div className='flex flex-col'>
       <label htmlFor="firstName">First Name</label>
       <input
         id="firstName"
         name="firstName"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.firstName}
       />
       </div>
       <div className='flex flex-col'>
       <label htmlFor="lastName">Last Name</label>
       <input
         id="lastName"
         name="lastName"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.lastName}
       />
       </div>
       <div className='flex flex-col'>
       <label htmlFor="age">Age </label>
       <input
         id="age"
         name="age"
         type="number"
         onChange={formik.handleChange}
         value={formik.values.age}
       />
       </div>
       <button type="submit">Submit</button>
     </form>
    </div>
  )
}

export default index

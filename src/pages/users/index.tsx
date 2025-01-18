import React, { useEffect, useState } from 'react'
import Table from '../components/Table'
import { createColumnHelper } from '@tanstack/react-table'
import { useRouter } from 'next/router'


const index = () => {
  const [users, setUser] = useState([])
  const columnHelper = createColumnHelper<any>()
  const router = useRouter()

  const fetchUsers = () => {

    fetch('https://dummyjson.com/users')
      .then(async (res) => {

        const newUser = await res.json()

        setUser(newUser?.users)
      }


      )
      .then(console.log);



  }

  useEffect(() => {

    fetchUsers()


  }, [])


  const columns = [
    columnHelper.accessor('firstName', {
      cell: info => info.getValue(),
      footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.lastName, {
      id: 'lastName',
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Last Name</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('age', {
      header: () => 'Age',
      cell: info => info.renderValue(),
      footer: info => info.column.id,
    }),

  ]


  return (
    <div>

<button onClick={()=>router.push("/users/manage")}>AddUser</button>

      <Table columns={columns} defaultData={users} />

    </div>
  )
}

export default index

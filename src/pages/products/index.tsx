import React, { useEffect, useState } from 'react'
import Table from '../components/Table'
import { createColumnHelper } from '@tanstack/react-table'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { setCartProducts, setProducts, setUpdateDecressQuintiy, setUpdateIncressQuintiy } from '@/store/reducer/productSlice'


const index = () => {

  const { products, cartProduct } = useSelector((state: any) => state?.product)
  const columnHelper = createColumnHelper<any>()
  console.log("cartProduct", cartProduct)

  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const fetchProducts = () => {

    fetch('https://dummyjson.com/products')
      .then(async (res) => {

        const newproducts = await res.json()
        dispatch(setProducts(newproducts?.products))
      }


      )
      .then(console.log);



  }

  useEffect(() => {

    fetchProducts()


  }, [])


  const columns = [
    columnHelper.accessor('title', {
      cell: info => info.getValue(),
      footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.price, {
      id: 'price',
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Price</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('rating', {
      header: () => 'Rating',
      cell: info => info.renderValue(),
      footer: info => info.column.id,
    }),


    columnHelper.accessor('action', {
      header: () => 'Action',
      cell: ({ row }) => {
        const isInCart = cartProduct.find((item: any) => item.id == row.original.id)

        console.log("isInCart", isInCart)

        return (
          <div>

            {isInCart?.id ?

              <div className='flex gap-2'>
                <button onClick={() => dispatch(setUpdateDecressQuintiy(row.original))}>
                  -
                </button>

                <div> { isInCart?.minimumOrderQuantity}</div>
                <button onClick={() => dispatch(setUpdateIncressQuintiy(row.original))} >
                  +
                </button>
              </div>
              :


              <button onClick={() => {


                dispatch(setCartProducts(row.original))

              }}>AddToCart</button>



            }



          </div>
        )
      },
      footer: info => info.column.id,
    }),
  ]

  console.log("products", products)
  return (
    <div>

      <h1>Cart Item</h1>
      {cartProduct?.map((item: any) => (<div>
        {item.title}
        {item.minimumOrderQuantity}
      </div>

      ))}

      <Table columns={columns} defaultData={products} />

    </div>
  )
}

export default index

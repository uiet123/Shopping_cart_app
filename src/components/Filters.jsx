import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import "./Filters.css"
import { CartState } from '../context/Context';
function Filters() {

    const {productState: {byStock, byFastDelivery, sort}, productDispatch} = CartState();
    const handleclick = () =>{
        productDispatch({
            type:"CLEAR_FILTERS"
        })
    }
  return (
    <div className="filters">
        <span className='title'>Filter Products</span>
        <span>
            <Form.Check
            inline
            label="Ascending"
            name="group1"
            type="radio"
            id={`inline-1`}
            onChange={()=>{
                productDispatch({
                    type:"SORT_BY_PRICE",
                    payload:"lowToHigh",
                })
            }}
            checked={sort === "lowToHigh"? true:false}
            />
        </span>
        <span>
            <Form.Check
              inline
              label="Descending"
              name="group1"
              type="radio"
              id={`inline-2`}
              onChange={()=>{
                productDispatch({
                    type:"SORT_BY_PRICE",
                    payload:"HighToLow",
                })
            }}
            checked={sort === "HighToLow"? true:false}
            />
        </span>
        <span>
            <Form.Check
            inline
            label="Fast Delivery Only"
            name="group1"
            type="Checkbox"
            id={`inline-3`}
            onChange={()=>{
                productDispatch({
                    type:"FILTER_BY_DELIVERY"
                })
            }}
            checked={byFastDelivery}
            />
        </span>
        <span>
            <Form.Check
            inline
            label="Include Out of Stock"
            name="group1"
            type="Checkbox"
            id={`inline-4`}
            onChange={()=>{
                productDispatch({
                    type:"FILTER_BY_STOCK",
                })
            }}
            checked={byStock}
            />
        </span>
      
        <Button variant="light"
        onClick={()=>{
            handleclick();
        }}
        >Clear Filters</Button>
    </div>
  )
}

export default Filters
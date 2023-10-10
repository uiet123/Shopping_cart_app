import React, { useEffect, useState } from 'react'
import { CartState } from '../context/Context'
import {Image, Button, ListGroup, ListGroupItem,Col,Row ,margin, option, FormControl} from 'react-bootstrap'
import {MdDelete} from "react-icons/md"

function Cart() {
    const {state:{cart},dispatch} = CartState()

    const [total, setTotal] = useState();

    useEffect(() =>{
        setTotal(cart.reduce((acc, curr) => acc + Number(curr.price)*curr.qty, 0));
    },[cart])
  return (
    <div className='home'>
        <div className='productContainer'>
            <ListGroup>
            {cart.map( prod => (
                <ListGroupItem key={prod.id}>
                    <Row>
                        <Col md={2}>
                            <Image src={prod.image} alt={prod.name} fluid rounded></Image>
                        </Col>
                        <Col md={2}>
                        <span>{prod.name}</span>
                        </Col>
                        <Col md={2} style={{margin:" 0px 20px"}}>Rs {prod.price}</Col>
                        <Col md={2}>
                            <FormControl as="select" value={prod.qty}
                            onChange={(e) => 
                            dispatch({
                                type:"CHANGE_CART_QTY",
                                payload:{
                                    id:prod.id,
                                    qty:e.target.value,
                                }
                            })
                            }
                            >
                                {[...Array(prod.inStock).keys()].map((x) => (
                                    <option key={x+1}>{x+1}</option>
                                ))}
                            </FormControl>
                        </Col>
                        <Col md={2}>
                            <Button
                            type="button"
                            variant='light'
                            onClick={() => (
                                dispatch({
                                    type:"REMOVE_FROM_CART",
                                    payload:prod
                                })
                            )}
                            >
                            <MdDelete fontSize="20px"></MdDelete>
                            </Button>
                        </Col>
                    </Row>
                </ListGroupItem>
        ))}
            </ListGroup>    
    </div>
    <div className='filters summary'>
        <span className='title'>Subtotal({cart.length}) items</span>
        <span style={{fontWeight:700, fontSize:20}}>Total: Rs {total}</span>
        <Button type="button" disabled={cart.length === 0}>
            Proceed to Checkout
        </Button>
    </div>
    </div>
  )
}

export default Cart
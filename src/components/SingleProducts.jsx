import React from 'react'
import { Card,Button } from 'react-bootstrap'
import "./SingleProducts.css"
import { CartState } from '../context/Context'
function SingleProducts({prod}) {
    const{
        state:{cart},
        dispatch,
        } = CartState();
  return (
    <div className='products'>
        <Card>
            <Card.Img variant= "top" src={prod.image} alt={prod.name}></Card.Img>
            <Card.Body>
                <Card.Title>{prod.name}</Card.Title>
                <Card.Subtitle style={{paddingBottom:10}}>
                    <span>Rs {prod.price.split(".")[0]}</span>
                    {console.log(prod.fastDelivery)}
                    {prod.fastDelivery?(
                        <div>Fast Delivery</div>
                    ):(
                        <div>4 days delivery</div>
                    )}
                    </Card.Subtitle>
                    {
                        cart.some(p=>p.id===prod.id)?(
                            <Button onClick={()=>{
                                dispatch({
                                    type:"REMOVE_FROM_CART",
                                    payload:prod
                                })
                            }} variant="danger">
                        Remove from cart
                    </Button>
                        ):(
                            <Button onClick={()=>{
                                dispatch({
                                    type:'ADD_TO_CART',
                                    payload:prod
                                })
                            }} disabled={!prod.inStock}>
                        {prod.inStock?"Add to Cart": "Out of Stock"}
                    </Button>
                        )
                    }      
            </Card.Body>
        </Card>
    </div>
  )
}

export default SingleProducts
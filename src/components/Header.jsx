import React from 'react'
import {Container, FormControl, Navbar,Form,Badge, Dropdown, Button} from "react-bootstrap"
import { CiShoppingCart } from "react-icons/ci"
import {Link} from "react-router-dom"
import "./Header.css"
import { CartState } from '../context/Context'
import {MdDelete} from "react-icons/md"
function Header() {
    const{ state:{cart}, dispatch, productDispatch} = CartState();
  return (
    <Navbar bg='dark' variant='dark' style={{height:70}}>
        <Container>
            <Navbar.Brand>
                <Link className='logo' to='/'>Shopping Cart</Link>
            </Navbar.Brand>
            <Form className="search">
            <FormControl
            
                placeholder='Search a product'
                className='m-auto'
                onChange={(e) => {
                    productDispatch({
                        type:"FILTER_BY_SEARCH",
                        payload:e.target.value,
                    })
                }}
                >
            </FormControl>
            </Form>
            <Dropdown alignRight>
            <Dropdown.Toggle variant="success">
            <CiShoppingCart size="30px"></CiShoppingCart>
               <Badge bg="success">{cart.length}</Badge> 
            </Dropdown.Toggle>
            <Dropdown.Menu style = {{minWidth:250}}>
                {cart.length > 0? (
                    <>
                    {cart.map((prod) => (
                        <span className='cartItem' key={prod.id}>
                            <img
                            src={prod.image}
                            className='cartItemImg'
                            alt={prod.name}
                            />
                        <div className='cartItemDetail'>
                            <span>{prod.name}</span>
                            <span>Rs {prod.price.split(".")[0]}</span>
                        </div>
                        <MdDelete
                        fontSize="20px"
                        style={{cursor:"pointer"}}
                        onClick={()=>
                            dispatch({
                                type:"REMOVE_FROM_CART",
                                payload:prod,
                            })
                        }
                        >
                        </MdDelete>
                        </span>    
                    ))}
                    <Link to="/cart">
                        <Button style={{width:"95%", margin:"0 10px"}}>
                            Go To Cart
                        </Button>
                    </Link>
                    </>
                ):(
                    <span style={{padding:5}}>Cart is Empty</span>
                )}
                
            </Dropdown.Menu>
            </Dropdown>
        </Container>
    </Navbar>
  )
}

export default Header
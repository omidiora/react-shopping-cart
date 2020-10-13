import React, { Component } from 'react'
import formatCurrency from '../utils'
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal';

class Products extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             product:null
        }
    }
    openModal=(product)=>{
        this.setState({product})
    }
    
    closeModal=()=>{
        this.setState({product:null})
    }
    render() {
    const {product}=this.state;
        return (
            <div>
                <Fade bottom cascade>
            <ul className='products'>
        {
            this.props.products.map(product=>(
                <li key={product._id} >
                <div className='product'>
                <a href='#'> <img src={product.image} alt={product.title} onClick={()=>this.openModal(product)}/>
            <p>{product.title}</p>
                 </a>

        <div className='product-price'>
            <div>
                {formatCurrency(product.price)}
            </div>
            <button  onClick={()=>this.props.addToCart(product)} className='button primary'>
              Add To Cart
            </button>

        </div>
                </div>
                </li>
                
            ))
        }
            </ul>
            </Fade>
            {
                product  && 
                    
             (   <Modal isOpen={true}>
                    <Zoom>
                    <button className='close-modal' onClick={this.closeModal}>x</button>
                   <div className='product-details'>
                       <img src={product.image} alt={product.title} ></img>
                   </div>
                    <div className='product-details-description'>
                    <p>
                        <strong> {product.title} </strong>
                    </p>
                    
             <p>{product.description}</p>
             <p>Availabel Sizes: {" "}
             {
                 product.availableSizes.map((x)=>(
                    <span>
                        {""}
                 <button className='button'>{x}</button>
                 </span>
                 ))
                 
             } </p>
        <div className='product-price'>
            <div>{formatCurrency(product.price)}</div>
            <button className='button  primary' 
            
            onClick={()=>{this.closeModal();this.closeModal()}}> Add to Cart</button>
        </div>

                    </div>
                    </Zoom>
                </Modal>
)
                
            }
                 
            </div>
        )
    }
}

export default Products

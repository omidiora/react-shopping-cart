import React from 'react';
import './App.css';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products';
import  data  from "./data.json";


class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       products:data.products,
       cartItems:localStorage.getItem("cartitems") ? JSON.parse(localStorage.getItem("cartitems")):[],
       size:"",
       sort:""
    }
  }
  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems });
    localStorage.setItem("cartItems" , JSON.stringify(cartItems))
  };

  removeFromCart=(product)=>{
    const cartItems=this.state.cartItems.slice();
    this.setState({
      cartItems:cartItems.filter((x)=>x._id !==product._id),
    });
    localStorage.setItem("cartItems" , JSON.stringify(cartItems.filter((x)=>x._id !==product._id)))

  }


  sortProducts=(event)=>{
    const sort=event.target.value;
    console.log(event.target.value);
    this.setState((state)=>({
      products:this.state.products.slice().sort((a,b)=>(
        sort==='lowest'? a.price < b.price? 1:-1:sort==='highest'?a.price > b.price?1:-1:
    a._id > b._id?1:-1)
      ),
    }))

  }
  filterProducts=(event)=>{
    if(event.target.value ===""){
      this.setState({
size:event.target.value , product:data.products});
    }
else{
    this.setState({
      size : event.target.value,
      products : data.products.filter((product)=>product.availableSizes.indexOf(event.target.value)>=0 
      
      ),
    
    });
  }
  console.log(data.products.filter((product)=>product.availableSizes.indexOf(event.target.value)>=0))

  }
  
  createOrder=(order)=>{
    alert("Need to save order for  " +  order.name)
  }
  render() {
    return (
      <div className="grid-container">
    <header>
      <a href='/'>React Shopping Cart</a>
    </header>
  <main>
   <div className='content'>
     <div className='main'>
      <Filter count={this.state.products.length}
      size={this.state.size}
      sort={this.state.sort}
      filterProducts={this.filterProducts}
      sortProducts={this.sortProducts}
       
      />
    <Products products={this.state.products}  addToCart={this.addToCart}/>  
       
     </div>
     <div className='sidebar'>
       <Cart cartItems={this.state.cartItems} createOrder={this.createOrder} removeFromCart={this.removeFromCart} />

     </div>

   </div>



  </main>
  <footer>All right is reserved</footer>
    </div>
    )
  }
}

export default App

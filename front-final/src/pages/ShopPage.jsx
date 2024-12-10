import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import { fetchProducts } from "../services/fetchProducts"
import './ShopPage.css';

export default function HomePage() {
    const [products, setProducts] = useState([])
    useEffect(()=>{
         fetchProducts().then((productsResponse)=>{
            setProducts(productsResponse)
         })
        
    },[setProducts])


    return <>
        <h1>Shop</h1>
        <div className = "products">
            {products.map((product)=>{
                return <ProductCard key={product.id} coverImageUrl={product.image} title={product.title} price={product.price} />
            })}
        </div>
        
    </>
}
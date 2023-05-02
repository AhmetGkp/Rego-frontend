import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ProductCard from '../../Component/ProductCard/ProductCard.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import { instanceAxs } from '../../config/api.js';
import "./Menu.css";
import '../../main.css';
import { useSelector } from 'react-redux';

const Menu = () => {

    const user = useSelector(state => state.user.user);
    const [productArray, setProductArray] = useState([])

    const receiveProducts = () => {
        instanceAxs.get('/search').then(response => {
            const products = response.data.productArray;
            setProductArray(products)
        })
    }
    
    useEffect(() => {
        receiveProducts()
    }, [user])
    
        return(
            <Container fluid className='mainmenu-container page-container'>
                <div className='mainmenu-content'>
                    {productArray.length > 0 && productArray.map((product, index) => {
                        return(   
                            <div key={index} className='mainmenu-container__item'>
                                <ProductCard
                                    key={product.title}
                                    images={product.annonceImages}
                                    title={product.title}
                                    price={product.price}
                                    id={product._id}
                                    location={product.location}
                                    description={product.description}
                                    isFavorite={product.isFavorite}
                                ></ProductCard>
                            </div>                                    
                        )
                    })}
                </div>
            </Container>
        )
    }   


export default Menu;
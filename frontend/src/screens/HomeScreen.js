import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { listProduct } from '../actions/productActions';
const HomeScreen = () => {

    const productList = useSelector(state => state.productList);
    const { loading, products, error } = productList;

    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(listProduct());
    },[dispatch]);

    return (
        <>
            <h1>Latest Products</h1>
            {loading 
                ? (<Loader />) 
                : error 
                ? (<Message variant='danger'>{error}</Message>) 
                :(<Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product key={product._id} product={product} />
                        </Col>
                    ))}
                </Row>)
            }
        </>
    )
}
export default HomeScreen;
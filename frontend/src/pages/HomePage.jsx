import { Container, Row, Col, Stack } from "react-bootstrap";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = ({ darkMode }) => {
	const { fetchProducts, products } = useProductStore();

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	console.log("products", products);

	return (
		<Container className="py-5">
			<Stack gap={4}>
				<h1
					className="text-center fw-bold"
		
          style={{
            fontSize: 30,
            background: "linear-gradient(to right, black, grey)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
				>
					Current Products
				</h1>

        <Row xs={1} md={2} lg={3} className="gy-4">

					{products.map(product => (
						<Col key={product.id}>
							<ProductCard product={product} />
						</Col>
					))} 

				</Row>
         {products.length === 0 &&(
					<p className="text-center fw-bold text-secondary">
						No products found 😢{" "}
						<Link to="/create" className="text-primary text-decoration-underline">
							Create a product
						</Link>
					</p>
        )}
			</Stack>
      
		</Container>
	);
};

export default HomePage;

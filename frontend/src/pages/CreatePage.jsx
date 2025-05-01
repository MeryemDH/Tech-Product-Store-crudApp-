import { useProductStore } from "../store/product";
import { useState } from "react";
import { Container, Form, Button, Card, Toast } from "react-bootstrap";

const CreatePage = () => {
	const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });
	const { createProduct } = useProductStore();
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState("");
	const [toastVariant, setToastVariant] = useState("success"); 
	const handleAddProduct = async () => {
		const { success, message } = await createProduct(newProduct);

		setToastMessage(message);
		setToastVariant(success ? "success" : "danger");
		setShowToast(true);

		if (success) {
			setNewProduct({ name: "", price: "", image: "" });
		}

		console.log("success:", success);
		console.log("message:", message);
	};

	return (
		<Container className="d-flex flex-column align-items-center py-5" style={{ maxWidth: "600px" }}>
			<h1 className="mb-4 text-center">Create New Product</h1>

			<Card className="w-100 shadow-sm">
				<Card.Body>
					<Form>
						<Form.Group className="mb-3" controlId="productName">
							<Form.Label>Product Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter product name"
								value={newProduct.name}
								onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="productPrice">
							<Form.Label>Price</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter price"
								value={newProduct.price}
								onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
							/>
						</Form.Group>

						<Form.Group className="mb-4" controlId="productImage">
							<Form.Label>Image URL</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter image URL"
								value={newProduct.image}
								onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
							/>
						</Form.Group>

						<Button variant="dark" className="w-100" onClick={handleAddProduct}>
							Add Product
						</Button>
					</Form>
				</Card.Body>
			</Card>

			{/* Toast Notification */}
			<Toast
				onClose={() => setShowToast(false)}
				show={showToast}
				delay={3000}
				autohide
				style={{
					position: 'fixed',
					top: 20,
					right: 20,
					minWidth: '250px',
					zIndex: 9999,
					backgroundColor: toastVariant === 'success' ? '#d4edda' : '#f8d7da',
					border: toastVariant === 'success' ? '1px solid #c3e6cb' : '1px solid #f5c6cb',
				}}
			>
				<Toast.Header>
					<strong className="me-auto">{toastVariant === 'success' ? 'Success' : 'Error'}</strong>
				</Toast.Header>
				<Toast.Body>{toastMessage}</Toast.Body>
			</Toast>
		</Container>
	);
};

export default CreatePage;

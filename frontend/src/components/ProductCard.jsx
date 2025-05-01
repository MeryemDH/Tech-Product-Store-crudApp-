import React, { useState } from "react";
import { Card, Button, Stack, Toast, Modal, Form } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const { deleteProduct, updateProduct } = useProductStore();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  const [showModal, setShowModal] = useState(false);
  const [updateProd, setUpdateProd] = useState({ ...product });

  const handleDeleteProduct = async () => {
    const { success, message } = await deleteProduct(product._id);
    setToastMessage(message);
    setToastVariant(success ? "success" : "danger");
    setShowToast(true);
  };

  const handleUpdateProduct = async (pid, updateProd) => {
    try {
      const { success, message } = await updateProduct(pid, updateProd);
      console.log("Résultat de updateProduct:", { success, message });

      // Fermer le modal et afficher le toast
      setShowModal(false);
      // Configurer le message et le variant du toast
      setToastMessage(message || (success ? "Produit mis à jour." : "Échec de la mise à jour."));
      setToastVariant(success ? "success" : "danger");
      setShowToast(true); // Affichage du toast
    } catch (error) {
      setShowModal(false); // Fermeture du modal en cas d'erreur
      setToastMessage("Une erreur est survenue. Veuillez réessayer.");
      setToastVariant("danger");
      setShowToast(true); // Affichage du toast d'erreur
    }
  };
  

  return (
    <>
      <Card
        className="shadow rounded overflow-hidden h-100"
        style={{ transition: "transform 0.3s, box-shadow 0.3s" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 0.5rem 1rem rgba(0, 0, 0, 0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "";
        }}
      >
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
          style={{ height: "12rem", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title as="h3" className="mb-2">{product.name}</Card.Title>
          <Card.Text className="fw-bold text-muted mb-4">${product.price}</Card.Text>

          <Stack direction="horizontal" gap={2}>
            <Button variant="primary" className="d-flex align-items-center justify-content-center" onClick={() => setShowModal(true)}>
              <FaEdit />
            </Button>
            <Button variant="danger" className="d-flex align-items-center justify-content-center" onClick={handleDeleteProduct}>
              <FaTrash />
            </Button>
          </Stack>
        </Card.Body>
      </Card>

      {/* Modal pour modifier le produit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={updateProd.name}
                onChange={(e) => setUpdateProd({ ...updateProd, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={updateProd.price}
                onChange={(e) => setUpdateProd({ ...updateProd, price: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={updateProd.image}
                onChange={(e) => setUpdateProd({ ...updateProd, image: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleUpdateProduct(product._id, updateProd)} >
            Update
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast global */}
      {showToast && (
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            minWidth: "250px",
            zIndex: 9999,
            backgroundColor: toastVariant === "success" ? "#d4edda" : "#f8d7da",
            border: toastVariant === "success" ? "1px solid #c3e6cb" : "1px solid #f5c6cb",
          }}
        >
          <Toast.Header>
            <strong className="me-auto">{toastVariant === "success" ? "Success" : "Error"}</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      )}
    </>
  );
};

export default ProductCard;

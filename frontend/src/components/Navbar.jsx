import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'; // <-- ajouter Button
import { useState } from 'react'; // <-- pour gérer le mode Dark/Light
import { FaSun, FaMoon, FaPlus } from 'react-icons/fa';
import { Link } from "react-router-dom";

function CollapsibleExample() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('bg-dark'); // change le fond
    document.body.classList.toggle('text-white'); // change la couleur du texte
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home" style={{ fontWeight: 'bold' , fontSize: '24px'}}>
          <Link to="/"  style={{ textDecoration: "none", color: "inherit" }}>Tech Product store</Link>
        </Navbar.Brand>
      </Container>

      {/* Conteneur flex avec flex-nowrap pour empêcher le retour à la ligne */}
      <div className="d-flex flex-nowrap ms-auto">
        {/* Bouton Dark/Light Mode - 1er bouton */}
        <Button 
          variant={darkMode ? "light" : "dark"} 
          onClick={toggleDarkMode} 
          className="me-1 d-flex align-items-center justify-content-center"
          style={{ padding: '5px 8px', border: 'solid 1px black' }} // Ajustement du padding pour plus de compacité
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </Button>

        {/* Bouton Dark/Light Mode - 2e bouton */}
        <Link to={"/create"}>
        <Button 
          className="me-1 d-flex align-items-center justify-content-center"
          variant={darkMode ? "light" : "dark"} 
          style={{ padding: '5px 8px', border: 'solid 1px black' }} // Ajustement du padding pour plus de compacité
        >
           <FaPlus size={20} />
        </Button>
        </Link>
      </div>

    </Navbar>
  );
}

export default CollapsibleExample;

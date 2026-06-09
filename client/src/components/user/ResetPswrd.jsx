import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

const ResetPswrd = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { token } = useParams(); // Extrae el token de la URL

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de contraseñas
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Aquí puedes llamar a la API para cambiar la contraseña
    console.log("Contraseña cambiada");
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        backgroundImage: "url(https://example.com/background-image.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Row className="w-100">
        <Col md={4} className="mx-auto">
          <div className="text-center mb-4">
            <img src="https://example.com/logo.png" alt="Logo" width="100" />
          </div>
          <div className="p-4 shadow-lg bg-white rounded">
            <h2 className="text-center mb-4">Cambiar Contraseña</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Nueva Contraseña *</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Introduce la nueva contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Label>Confirmar Contraseña *</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirma la nueva contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>

              {error && <p className="text-danger">{error}</p>}

              <div className="d-grid">
                <Button variant="warning" type="submit">
                  CAMBIAR CONTRASEÑA
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPswrd;

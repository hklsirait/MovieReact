import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import FormCreate from "../form/FormCreate";



function Example(props) {
    const [show, setShow] = useState(false);

    const [inputName, setInputName] = useState('')

    const [inputEmail, setInputEmail] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        const newForm = {
            id: Math.floor(Math.random() * 100) + 1,
            Nama: inputName,
            Email: inputEmail
        }
        props.onCreateForm(newForm)
        setInputName('')
        setInputEmail('')

    }

    const handleInputForm = (event) => {
        switch (event.target.name) {
            case "name": 
                setInputName(event.target.value)
                break;
        
            case "email":
                setInputEmail(event.target.value)
                break;
            default:
                break;
        }
    }

  
    return (
      <>
        <Button variant="primary" onClick={() => setShow(true)}>
          Tambahkan Data
        </Button>
  
        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Form Pendaftaran
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="name" name="name" value={inputName} onChange={handleInputForm} placeholder="Enter Username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" value={inputEmail} onChange={handleInputForm} placeholder="Enter email" />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit" value="Submit">
                Submit
            </Button>
        </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
  
export default Example;
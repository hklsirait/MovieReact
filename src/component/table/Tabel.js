
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import Example from "../Modal/Modal";
import { useState } from "react";

const Tabel = () => {
    
    // const data = props.dataDatas;

    const [show, setShow] = useState(false);

    const [inputName, setInputName] = useState('')

    const [inputEmail, setInputEmail] = useState('')

    const [getDatas, setDatas] = useState([
        {id:1, Nama:'Haekal', Email:'dummy@gmail.com'}
    ])

   
    const handleSubmit = (event) => {
        event.preventDefault()
        
    }

    const evenCreateForm = (form) => {
        setDatas(getDatas.concat(form))
        console.log(getDatas)
    }


    const handleDeleteClick = (datasId) => {
        const newDatas = [...getDatas];

        const index = getDatas.findIndex((datass) => datass.id === datasId);

        newDatas.splice(index, 1);
        setDatas(newDatas);

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

    return(
        
        <Container> 
        <Example onCreateForm={evenCreateForm}/>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>Nama</th>
                <th>Email</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {getDatas.map(datas => {
                                return(
                                    <tr>
                                        <td>{datas.Nama}</td>
                                        <td>{datas.Email}</td>
                                        <td><Button as="input" type="reset" value="reset" onClick={() => setShow(true)}/>
                                        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Custom Modal Styling
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="name" name="name" value={inputName} onChange={handleInputForm}  placeholder="Enter Username" />
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
                                        <h3>&ensp;</h3><Button variant="dark" onClick={() => handleDeleteClick(datas.id)} >Delete</Button></td>
                                    </tr>
                                );
                            })
                            }
            </tbody>
        </Table>
    </Container>
    );
}
export default Tabel;
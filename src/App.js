import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const classes = [
  {id:1, name:"ISIS3710"},
  {id:2, name:"Programación con tecnologias web"}
]

function App() {
  const [formValues, setFormValues] = useState({email:"", password:"", favClass:"1"})
  const [validationStates, setValidationStates] = useState({emailState:true, passwordState:true})

  const handleFormChange = ((e) => {
    switch(e.target.name){
      case "password":
        setValidationStates({...validationStates, passwordState: validatePassword(e.target.value)});
        break;
      default:
        break;
    }
    setFormValues({...formValues, [e.target.name]: e.target.value});
  });

  const clickSubmit = (() => {
    const emailState = validateEmail(formValues.email);
    const passwordState = validatePassword(formValues.password);
    setValidationStates({
      emailState, passwordState
    });
    if (emailState && passwordState)
      alert(JSON.stringify(formValues));
  });

  const validateEmail = ((email) => {
    const re = /\S+@\S+\.\S+/;
    const isValid = re.test(email);
    console.log("validateEmail", isValid);
    return isValid;
  });

  const validatePassword = ((password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,}$/;
    const isValid = re.test(password);
    console.log("validatePassword", isValid);
    return isValid;
  });

  return (
    <div>
      <h1>Ejemplo de formularios!</h1>
     
      <Form>
      <Form.Group className="mb-6" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={handleFormChange} name="email" className={
          !validationStates.emailState && "invalid"}/>
        { !validationStates.emailState && <Form.Text className="text-muted">The email is not valid</Form.Text>}
      </Form.Group>
 
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={handleFormChange} name="password" className={
          !validationStates.passwordState && "invalid"}/>
        { !validationStates.passwordState && <Form.Text className="text-muted">Your password should be have numbers and letters and should be at least 9 char long</Form.Text>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Favorite Class</Form.Label>
        <Form.Select onChange={handleFormChange} name="favClass">
          {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </Form.Select>
      </Form.Group>
        <Button variant="primary" onClick={clickSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;
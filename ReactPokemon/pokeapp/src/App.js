import React, { Component ,useState,useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {
	Table,
	Button,
	Modal,
	ModalBody,
	ModalHeader,
	FormGroup,
	ModalFooter,
	Container,
} from "reactstrap";
;


function App(){
	const baseUrl = "http://localhost:5000/api/Pokemon";
	const [data, setData]=useState([]);
	const [gestorSeleccionado, setGestorSeleccionado]=useState([]);
	const handlechange=e=>{
		const{name,value}=e.target;
		setGestorSeleccionado({
		  ...gestorSeleccionado,
		  [name]:value
		});
		console.log(gestorSeleccionado);
	  }

	const peticionGet=async()=>{
		await axios.get(baseUrl)
		.then(response=>{
		  setData(response.data);
		}).catch(error=>{
		  console.log(error);
		})
	  }
	  useEffect(()=>{
		peticionGet();
	  },[])
	
    
	return (
		<div >
		<table className="table table-bordered">
          <thead>
            <tr>
              <th>name</th>
            </tr>
         </thead>
         <tbody>
        {data.map(gestor=>(
          <tr key={gestor.name}>
            <td>{gestor.name}</td>
          </tr>
		
		  ))}
		  </tbody>
		  </table>

	</div>
		);
}
export default App;
import React, { useState, useEffect,View} from 'react';
import api from '../../services/api';
import { Link } from "react-router-dom";
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table,  Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import ProfilePets from '../ProfilePets';

export default function User() {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        api.get('users').then(response => {
            setUsers(response.data);
        })

    }, [])
  

    const inituser = {
        nome: '',
        email: '',
        funcao: '',
        statusUsuario: ''
                
    }

    const [user, setUser] = useState([inituser]);
    
    function onChange(ev) {
        const { name, value } = ev.target;
        setUser({ ...user, [name]: value })
        console.log(user);

    }
  

    async function handleDelete(id) {
        try {
            await api.delete(`/users/${id}`)
            setUsers(users.filter(user => user.id != id))
        } catch (err) {
            alert('Erro ao deletar!')
        }

        }

        async function pesquisar(ev){
            ev.preventDefault();
            await api.post("/users/pesquisar", user).then((response) => {
                setUsers(response.data);
                    console.log(response.data);   
              
            })
        }

        <ProfilePets   
        curso="10"
     /> 
        
        
    return (
            

        <div id="user-container">

          

            <Link class="btn btn-outline-primary  btn-space" id="create-link" to={"/create"}>Novo<span class="icon text-blue">
             <i class="fas fa-user-plus"></i>
             </span></Link>           

             <Form >
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="nome">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder=""
                                type=""
                                onChange={onChange} value={user.email}
                                
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                    <Label for="nome">
                        Nome completo
                    </Label>
                    <Input
                        id="nome"
                        name="nome"
                        placeholder=""
                        onChange={onChange} value={user.nome}
                    />
                </FormGroup>


                    </Col>
                </Row>
                

                <Row form>
                    
                    <Col md={4}>
                        <FormGroup>
                            <Label for="funcao">
                                Função
                            </Label>
                            <select 
                            id="funcao" 
                            name="funcao"
                            class="form-control" 
                            onChange={onChange} value={user.funcao}
                            >                             
                             <option>Cliente</option>
                             <option>Gerente</option>
                             <option>Funcionário</option>                             
                             </select>
                        </FormGroup>
                    </Col>

                    <Col md={4}>
                        <FormGroup>
                            <Label for="statusUsuario">
                                Função
                            </Label>
                            <select 
                            id="statusUsuario" 
                            name="statusUsuario"
                            class="form-control" 
                            onChange={onChange} value={user.statusUsuario}
                            >         
                             <option value="Ativo">Ativo</option>
                             <option value="Inativado">Inativo</option>                                                                                     
                             </select>
                        </FormGroup>
                    </Col>            
                </Row>
                
                <button className="btn btn-outline-primary btn-space" type="submit" onClick={pesquisar} >
                    <span class="icon text-blue">
                        <i class=" fas fa-search"></i>
                    </span> Pesquisar </button>
                <Link className="btn btn-outline-primary btn-space" to="/">
                    <span class="icon text-blue">
                        <i class="fas fa-undo-alt"></i>
                    </span>Limpar</Link>
            </Form> 

           <br></br>   <br></br> 


            

            <Table bordered
             
             responsive
             size="sm"
            >
                <thead>
                    <tr>
                        <th></th>
                        <th>Foto<span class="icon">
                            <i class="fas fa-arrow-down"></i>
                        </span>
                        </th>
                        <th>Email<span class="icon">
                            <i class="fas fa-arrow-down"></i>
                        </span>
                        </th>
                        <th>Nome<span class="icon">
                            <i class="fas fa-arrow-down"></i>
                        </span>
                        </th>
                        <th>Função<span class="icon">
                            <i class="fas fa-arrow-down"></i>
                        </span>
                        </th>
                        <th>Status<span class="icon">
                            <i class="fas fa-arrow-down"></i>
                        </span>
                        </th>
                        <th>Criado em<span class="icon">
                            <i class="fas fa-arrow-down"></i>
                        </span></th>
                        <th>
                        </th>
                    </tr>
                </thead>
                
                
                <tbody>
                {users.map(user => (
                    <tr>
                        <td>
                            <input  class="margin-text" type="checkbox" id="checkboxNoLabel"  onChange={onChange}   aria-label="..." />
                        </td>
                        <td><p class="margin-text">{user.imagem}</p></td>
                        <td><p class="margin-text">{user.email}</p></td>
                        <td><p class="margin-text">{user.nome}</p></td>
                        <td><p class="margin-text">{user.funcao}</p></td>
                        <td><p class="margin-text">{user.statusUsuario}</p></td>
                        <td><p class="margin-text">{user.dataCriacao}</p></td>
                        <td><Link class="btn btn-link" to={`/update/${user.id}`} type="button">Editar</Link>
                        <button class="btn btn-link" onClick={()=>handleDelete(user.id)} type="button">Ver</button>
                            <button class="btn btn-link" onClick={()=>handleDelete(user.id)} type="button">Deletar</button>
                        </td>
                        
                    </tr>
                    ))}
                </tbody>               

            </Table>          

        </div>


    );
}
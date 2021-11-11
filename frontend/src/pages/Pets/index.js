import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link } from "react-router-dom";
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';




export default function Pets() {

    const [pets, setPets] = useState([]);
    useEffect(() => {
        api.get('pets').then(response => {
            setPets(response.data);
        })

    }, [])

    const initpet = {
        idUsuario: '',
        nome: '',
        raca: '',
        tamanho: ''
    }

    const [pet, setPet] = useState([initpet]);

    function onChange(ev) {
        const { name, value } = ev.target;
        setPet({ ...pet, [name]: value })
        console.log(pet);

    }

    async function handleDelete(id) {
        try {
            await api.delete(`/pets/${id}`)
            setPets(pets.filter(pets => pets.id != id))
        } catch (err) {
            alert('Erro ao deletar!')
        }

    }

    async function pesquisar(ev) {
        ev.preventDefault();
        await api.post("/pets/pesquisar", pet).then((response) => {
            setPets(response.data);
            console.log(response.data);

        })
    }



    return (

        <div id="user-container">

            <Link class="btn btn-outline-primary  btn-space" id="create-link" to={"/pets/create"}>Novo<span class="icon text-blue">
                <i class="fas fa-user-plus"></i>
            </span></Link>

            <Form >
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="idUsuario">
                                Id do Proprietário
                            </Label>
                            <Input
                                id="idUsuario"
                                name="idUsuario"
                                placeholder=""
                                type=""
                                onChange={onChange} value={pet.idUsuario}

                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="nome">
                                Nome do pet
                            </Label>
                            <Input
                                id="nome"
                                name="nome"
                                placeholder=""
                                onChange={onChange} value={pet.nome}
                            />
                        </FormGroup>

                    </Col>
                </Row>


                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="raca">
                                Raça do pet
                            </Label>
                            <Input
                                id="raca"
                                name="raca"
                                placeholder=""
                                onChange={onChange} value={pet.raca}
                            />
                        </FormGroup>
                    </Col>


                    <Col md={4}>
                        <FormGroup>
                            <Label for="tamanho">
                                Tamanho
                            </Label>
                            <select
                                id="tamanho"
                                name="tamanho"
                                class="form-control"
                                onChange={onChange} value={pet.tamanho}
                            >
                                <option value="Pequeno">Pequeno</option>
                                <option value="Medio">Medio</option>
                                <option value="Grande">Grande</option>

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

            <br></br><br></br>

            <Table bordered

                responsive
                size="sm">
                <thead>
                    <tr>
                        <th></th>
                        <th>Foto<span class="icon">
                            <i class="fas fa-arrow-down"></i>
                        </span>
                        </th>
                        <th>Nome<span class="icon">
                            <i class="fas fa-arrow-down"></i>
                        </span>
                        </th>
                        <th>Raça<span class="icon">
                            <i class="fas fa-arrow-down"></i>
                        </span>
                        </th>
                        <th>Tamanho<span class="icon">
                            <i class="fas fa-arrow-down"></i>
                        </span>
                        </th>


                        <th>
                        </th>
                    </tr>
                </thead>


                <tbody>
                    {pets.map(pets => (
                        <tr>
                            <td>
                                <input class="margin-text" type="checkbox" id="checkboxNoLabel" value={() => handleDelete(pets.id)} aria-label="..." />
                            </td>
                            <td><p class="margin-text">{pets.imagem}</p></td>
                            <td><p class="margin-text">{pets.nome}</p></td>
                            <td><p class="margin-text">{pets.raca}</p></td>
                            <td><p class="margin-text">{pets.tamanho}</p></td>

                            <td><Link class="btn btn-link" to={`/pets/update/${pets.id}`} type="button">Editar</Link>
                                <button class="btn btn-link" onClick={() => handleDelete(pets.id)} type="button">Ver</button>
                                <button class="btn btn-link" onClick={() => handleDelete(pets.id)} type="button">Deletar</button>

                            </td>

                        </tr>
                    ))}
                </tbody>


            </Table>




        </div>


    );
}
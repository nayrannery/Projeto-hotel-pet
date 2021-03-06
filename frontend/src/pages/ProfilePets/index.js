import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import '../../../src/interface/css/sb-admin-2.min.css';
import '../../../src/interface/css/style.css';
import "./style.css";


export default function ProfilePets() {
    const locale = 'pt-br'
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const { id } = useParams();
    const history = useHistory();
    const initPets = {
        idUsuario: '',
        nome: '',
        raca: '',
        tamanho: 'Pequeno',
        imagem: ''
    }

    const [pets, setPets] = useState(initPets);

    useEffect(() => {
        if (id) {
            api.get(`/pets/${id}`).then(response => {
                setPets(...response.data)
                //console.log(response.data)
            })
        }
    }, []);


    function onSubmit(ev) {
        ev.preventDefault();
        const method = id ? 'put' : 'post';
        const url = id
            ? `/pets/${id}`
            : '/pets'
        api[method](url, pets).then((response) => {
            history.push('/pets')
        })
    }

    function onChange(ev) {
        const { name, value } = ev.target;
        setPets({ ...pets, [name]: value })
        console.log(pets);

    }



    return (

        <div class="container">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Novo Pet</li>
                </ol>
            </nav>

            <div class="card shadow mb-12">
                <div class="card-header py-3">
                    <h2 class="m-0 font-weight-bold text-primary" >Novo Pet</h2>
                </div>

                <div class="card-body">
                    <div class="container">

                        <Form onSubmit={onSubmit}>
                            <Row form>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="nome">
                                            ID Propriet??rio
                                        </Label>
                                        <Input
                                            id="idUsuario"
                                            name="idUsuario"
                                            placeholder=""
                                            type=""
                                            onChange={onChange} value={pets.idUsuario}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="nome">
                                            Nome
                                        </Label>
                                        <Input
                                            id="nome"
                                            name="nome"
                                            placeholder=""
                                            type=""
                                            onChange={onChange} value={pets.nome}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            
                            <Row form>
                            <Col md={4}>
                            <FormGroup>
                                <Label for="raca">
                                    Ra??a
                                </Label>
                                <Input
                                    id="raca"
                                    name="raca"
                                    placeholder=""
                                    onChange={onChange} value={pets.raca}
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
                                            onChange={onChange} value={pets.tamanho}>
                                            <option>Pequeno</option>
                                            <option>M??dio</option>
                                            <option>Grande</option>
                                        </select>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <button className="btn btn-outline-primary btn-space" type="submit" >
                                <span class="icon text-blue">
                                    <i class=" fas fa-save"></i>
                                </span> Salvar </button>
                            <Link className="btn btn-outline-primary btn-space" to="/">
                                <span class="icon text-blue">
                                    <i class="fas fa-undo-alt"></i>
                                </span>Voltar</Link>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

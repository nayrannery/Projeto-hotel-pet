import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import '../../../src/interface/css/sb-admin-2.min.css';
import "./style.css";

export default function VerReserva() {
    const { id } = useParams();
    const history = useHistory();
    const initPets = {

        idUsuario: '',
        nome: '',
        raca: '',
        tamanho: '',
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



    return (
        <div class="container">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Visualizar</li>
                </ol>
            </nav>

            <div class="card shadow mb-12">
                <div class="card-header py-3">
                    <h2 class="m-0 font-weight-bold text-primary">Visualizar</h2>
                </div>

                <div class="card-body">
                    <div class="container">
                        <ul className="user-list">
                            <li key={pets.id}>
                                <strong>Id do Pet</strong>
                                <p>{pets.id}</p>
                                <strong>Id do Usuário</strong>
                                <p>{pets.idUsuario}</p>
                                <strong>Nome do Pet</strong>
                                <p>{pets.nome}</p>
                                <strong>Raça do pet</strong>
                                <p>{pets.raca}</p>
                                <strong>Tamanho</strong>
                                <p>{pets.tamanho}</p>
                                
                                <div className="actions">
                                    <Link className="btn btn-outline-primary btn-space" to="/pets">
                                        <span class="icon text-blue">
                                            <i class="fas fa-undo-alt"></i>
                                        </span>Voltar</Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

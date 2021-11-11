import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import '../../../src/interface/css/sb-admin-2.min.css';
import "./style.css";


export default function VerUser() {
    const { id } = useParams();
    const history = useHistory();
    const initUser = {

        nome: '',
        email: '',
        telefone: '',
        funcao: '',
        imagem: '',
        dataCriacao: '',
        statusUsuario: ''
    }

    const [user, setUser] = useState(initUser);

    useEffect(() => {
        if (id) {
            api.get(`/users/${id}`).then(response => {
                setUser(...response.data)
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
                            <li key={user.id}>
                                <strong>Nome</strong>
                                <p>{user.nome}</p>
                                <strong>email</strong>
                                <p>{user.email}</p>
                                <strong>Telefone</strong>
                                <p>{user.telefone}</p>
                                <strong>Função</strong>
                                <p>{user.funcao}</p>
                                <strong>Status do Usuário</strong>
                                <p>{user.statusUsuario}</p>
                                <strong>Data de Criação</strong>
                                <p>{user.dataCriacao}</p>

                                <div className="actions">
                                    <Link className="btn btn-outline-primary btn-space" to="/">
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

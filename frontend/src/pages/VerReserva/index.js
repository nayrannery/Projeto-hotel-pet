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
    const initReserva = {

        id: '',
        idUsuario: '',
        idPets: '',
        dataChegada: '',
        dataPartida: '',
        valorTotal: '',
        statusReserva: '',
        notas: '',
        notasFuncionario: '',
        recibo: '',
        criadoEm: '',
        atualizadoEm: '',
        imagem: ''
    }

    const [reserva, setReserva] = useState(initReserva);

    useEffect(() => {
        if (id) {
            api.get(`/reserva/${id}`).then(response => {
                setReserva(...response.data)
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
                            <li key={reserva.id}>
                                <strong>Id da Reserva</strong>
                                <p>{reserva.id}</p>
                                <strong>Id do Usuário</strong>
                                <p>{reserva.idUsuario}</p>
                                <strong>Id do Pet</strong>
                                <p>{reserva.idPets}</p>
                                <strong>Data de chegada</strong>
                                <p>{reserva.dataChegada}</p>
                                <strong>Data de Partida</strong>
                                <p>{reserva.dataPartida}</p>
                                <strong>Valor Total (R$)</strong>
                                <p>{reserva.valorTotal}</p>
                                <strong>Status da reserva</strong>
                                <p>{reserva.statusReserva}</p>
                                <strong>Notas</strong>
                                <p>{reserva.notas}</p>
                                <strong>Notas Funcionário</strong>
                                <p>{reserva.notasFuncionario}</p>
                                <strong>Criado em</strong>
                                <p>{reserva.criadoEm}</p>
                                <strong>Atualizado Em</strong>
                                <p>{reserva.atualizadoEm}</p>

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

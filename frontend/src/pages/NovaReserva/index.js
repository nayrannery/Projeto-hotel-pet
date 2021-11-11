import React, { useState, useEffect, Text } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import '../../../src/interface/css/sb-admin-2.min.css';
import '../../../src/interface/css/style.css';
import "./style.css";


export default function NovaReserva(props) {
    const locale = 'pt-br'
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const { id } = useParams();
    const history = useHistory();

    const initReservas = {

        idUsuario: '',
        idPets: '',
        dataChegada: '',
        dataPartida: '',
        valorTotal: '',
        statusReserva: '',
        notas: '',
        notasFuncionario: '',
        recibo: '',
        criadoEm: `${new Date().toLocaleString(locale, options).replace(/[/]/g, '-')}`,
        atualizadoEm: '',
        imagem: ''

    }

    const [reservas, setReservas] = useState(initReservas);

    useEffect(() => {
        if (id) {
            api.get(`/reserva/${id}`).then(response => {
                setReservas(...response.data)
                //console.log(response.data)
            })
        }
    }, []);


    function onSubmit(ev) {
        ev.preventDefault();
        const method = id ? 'put' : 'post';
        const url = id
            ? `/reserva/${id}`
            : '/reserva'
        api[method](url, reservas).then((response) => {
            history.push('/reservas')
        })
    }

    function onChange(ev) {
        const { name, value } = ev.target;
        setReservas({ ...reservas, [name]: value })
        console.log(reservas);

    }



    return (


        <div class="container">

            <Form onSubmit={onSubmit}>
                <Row form>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="nome">
                                ID Proprietário
                            </Label>
                            <Input
                                id="idUsuario"
                                name="idUsuario"
                                placeholder=""
                                type=""
                                onChange={onChange} value={reservas.idUsuario}
                            />
                        </FormGroup>
                    </Col>

                    <Col md={4}>
                        <FormGroup>
                            <Label for="idPets">
                                ID Pet
                            </Label>
                            <Input
                                id="idPets"
                                name="idPets"
                                placeholder=""
                                type=""
                                onChange={onChange} value={reservas.idPets}
                            />
                        </FormGroup>
                    </Col>
                    </Row>
                    <Row form>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="dataChegada">
                                Date
                            </Label>
                            <Input
                                id="dataChegada"
                                name="dataChegada"
                                placeholder="date placeholder"
                                type="date"
                                onChange={onChange} value={reservas.dataChegada}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="dataSaida">
                                Date
                            </Label>
                            <Input
                                id="dataSaida"
                                name="dataSaida"
                                placeholder="date placeholder"
                                type="date"
                                onChange={onChange} value={reservas.dataPartida}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="valorTotal">
                                Valor Total
                            </Label>
                            <Input
                                id="valorTotal"
                                name="valorTotal"
                                placeholder=""
                                type=""
                                onChange={onChange} value={reservas.valorTotal}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="statusReserva">
                                Status
                            </Label>
                            <select
                                id="statusReserva"
                                name="statusReserva"
                                class="form-control"
                                onChange={onChange} value={reservas.statusReserva}>
                                <option>Ativo</option>
                                <option>Cancelado</option>
                                <option>Finalizado</option>
                            </select>
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={8}>
                        <FormGroup>
                            <Label for="notas">
                            Notas
                            </Label>
                            <Input
                                id="notas"
                                name="notas"
                                type="textarea"
                                onChange={onChange} value={reservas.notas}>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={8}>
                        <FormGroup>
                            <Label for="notasFuncionario">
                            Notas
                            </Label>
                            <Input
                                id="notasFuncionario"
                                name="notasFuncionario"
                                type="textarea"
                                onChange={onChange} value={reservas.notasFuncionario}>
                            </Input>
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
    );
}

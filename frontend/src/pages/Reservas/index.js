import React, { useState, useEffect, View } from 'react';
import api from '../../services/api';
import { Link } from "react-router-dom";
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';


export default function Reserva() {

    const [reservas, setReservas] = useState([]);
    useEffect(() => {
        api.get('reserva').then(response => {
            setReservas(response.data);
        })

    }, [])


    const initreserva = {
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


    const [reserva, setReserva] = useState([initreserva]);

    function onChange(ev) {
        const { name, value } = ev.target;
        setReserva({ ...reservas, [name]: value })
        //console.log(reservas);

    }


    async function handleDelete(id) {
        try {
            await api.delete(`/reserva/${id}`)
            setReservas(reservas.filter(reserva => reserva.id != id))
        } catch (err) {
            alert('Erro ao deletar!')
        }

    }

    async function pesquisar(ev) {
        ev.preventDefault();
        await api.post("/reserva/pesquisar", reserva).then((response) => {
            setReservas(response.data);
            console.log(response.data);

        })
    }

    return (
        <div id="user-container">

            <Link class="btn btn-outline-primary  btn-space" id="create-link" to={"/reservas/create"}>Novo<span class="icon text-blue">
                <i class="fas fa-user-plus"></i>
            </span></Link>


            <Form >
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="id">
                                Id da Reserva
                            </Label>
                            <Input
                                id="id"
                                name="id"
                                placeholder=""
                                type=""
                                onChange={onChange} value={reserva.id}

                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="idUsuario">
                                Id do dono
                            </Label>
                            <Input
                                id="idUsuario"
                                name="idUsuario"
                                placeholder=""
                                onChange={onChange} value={reserva.idUsuario}
                            />
                        </FormGroup>

                    </Col>
                </Row>


                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="idPets">
                                Id do Pet
                            </Label>
                            <Input
                                id="idPets"
                                name="idPets"
                                placeholder=""
                                onChange={onChange} value={reserva.idPets}
                            />
                        </FormGroup>
                    </Col>


                    <Col md={4}>
                        <FormGroup>
                            <Label for="statusReserva">
                                Tamanho
                            </Label>
                            <select
                                id="statusReserva"
                                name="statusReserva"
                                class="form-control"
                                onChange={onChange} value={reserva.statusReserva}
                            >
                                <option value="Ativo">Ativo</option>
                                <option value="Finalizado">Finalizado</option>
                                <option value="Cancelado">Cancelado</option>

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
                size="sm"
            >
                <thead>
                    <tr>
                        <th></th>
                        <th>id<span class="icon">
                            <i class="fas fa-arrow-down"></i>
                        </span>
                        </th>
                        <th>Id do Pet<span class="icon">
                            <i class="fas fa-arrow-down"></i>
                        </span>
                        </th>
                        <th>Chegada<span class="icon">
                            <i class="fas fa-arrow-down"></i>
                        </span>
                        </th>
                        <th>Partida<span class="icon">
                            <i class="fas fa-arrow-down"></i>
                        </span>
                        </th>
                        <th>Status<span class="icon">
                            <i class="fas fa-arrow-down"></i>
                        </span>
                        </th>
                        <th>Total<span class="icon">
                            <i class="fas fa-arrow-down"></i>
                        </span></th>
                        <th>
                        </th>
                    </tr>
                </thead>


                <tbody>
                    {reservas.map(reserva => (
                        <tr>
                            <td>
                                <input class="margin-text" type="checkbox" id="checkboxNoLabel" onChange={onChange} aria-label="..." />
                            </td>
                            <td><p class="margin-text">{reserva.id}</p></td>
                            <td><p class="margin-text">{reserva.idPets}</p></td>
                            <td><p class="margin-text">{reserva.dataChegada}</p></td>
                            <td><p class="margin-text">{reserva.dataPartida}</p></td>
                            <td><p class="margin-text">{reserva.statusReserva}</p></td>
                            <td><p class="margin-text">{reserva.valorTotal}</p></td>
                            <td><Link class="btn btn-link" to={`/reservas/update/${reserva.id}`} type="button">Editar</Link>
                                <button class="btn btn-link" onClick={() => handleDelete(reserva.id)} type="button">Ver</button>
                                <button class="btn btn-link" onClick={() => handleDelete(reserva.id)} type="button">Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
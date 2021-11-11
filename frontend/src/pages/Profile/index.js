import React, { useState, useEffect } from 'react';

import { Link, useHistory, useParams } from "react-router-dom";
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import '../../../src/interface/css/sb-admin-2.min.css';
import "./style.css";


export default function Profile() {
    const locale = 'pt-br'
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const { id } = useParams();
    const history = useHistory();
    const initUser = {

        nome: '',
        senha: '',
        email: '',
        telefone: '',
        funcao: '',
        imagem: '',
        dataCriacao: `${new Date().toLocaleString(locale, options).replace(/[/]/g, '-')}`,
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


    function onSubmit(ev) {
        ev.preventDefault();
        const method = id ? 'put' : 'post';
        const url = id
            ? `/users/${id}`
            : '/users'
        api[method](url, user).then((response) => {
            history.push('/')
        })
    }

    function onChange(ev) {
        const { name, value } = ev.target;
        setUser({ ...user, [name]: value })
        console.log(user);

    }


    return (
        <div class="container">
            <Form onSubmit={onSubmit}>
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
                                type="email"
                                onChange={onChange} value={user.email}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="senha">
                                Senha
                            </Label>
                            <Input
                                id="senha"
                                name="senha"
                                placeholder=""
                                type="password"
                                onChange={onChange} value={user.senha}
                            />
                        </FormGroup>
                    </Col>
                </Row>
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

                <Row form>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="telefone">
                                Telefone
                            </Label>
                            <Input
                                id="telefone"
                                name="telefone"
                                onChange={onChange} value={user.telefone}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="funcao">
                                Função
                            </Label>
                            <select
                                id="funcao"
                                name="funcao"
                                class="form-control"
                                onChange={onChange} value={user.funcao}>
                                <option>Cliente</option>
                                <option>Gerente</option>
                                <option>Funcionário</option>
                            </select>
                        </FormGroup>
                    </Col>

                    <Col md={3}>
                        <FormGroup>
                            <Label for="statusUsuario">
                                Status
                            </Label>
                            <select
                                id="statusUsuario"
                                name="statusUsuario"
                                class="form-control"
                                onChange={onChange} value={user.statusUsuario}>
                                <option>Ativo</option>
                                <option value="Inativado">Inativo</option>
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
    );
}

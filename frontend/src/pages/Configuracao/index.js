import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Table, Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import '../../../src/interface/css/sb-admin-2.min.css';
import '../../../src/interface/css/style.css';
import "./style.css";


export default function Configuracao() { 
    const { id } = useParams();
    const history = useHistory();
    const initConfiguracoes = {
    valorDiaria: '',
    vagasDisponiveis: ''         
    }

    const [configuracoes, setConfiguracoes] = useState(initConfiguracoes);

    useEffect(() => {
        if (id) {
            api.get(`/configuracao/${id}`).then(response => {
                setConfiguracoes(...response.data)
                //console.log(response.data)
            })
        }
    }, []);


    function onSubmit(ev) {
        ev.preventDefault();
        const method = id ? 'put' : 'post';
        const url = id
            ? `/configuracao/${id}`
            : '/configuracao'
        api[method](url, configuracoes).then((response) => {
            history.push('/configuracao')
        })
    }

    function onChange(ev) {
        const { name, value } = ev.target;
        setConfiguracoes({ ...configuracoes, [name]: value })
        console.log(configuracoes);

    }

     

    return (
                   
        <div class="container">
            <Form onSubmit={onSubmit}>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="valorDiaria">
                                Valor da Diaria
                            </Label>
                            <Input
                                id="valorDiaria"
                                name="valorDiaria"
                                placeholder=""
                                type=""
                                onChange={onChange} value={configuracoes.valorDiaria}
                            />
                        </FormGroup>
                    </Col>
                    </Row>
                    <Row form> 
                    <Col md={6}>
                        <FormGroup>
                            <Label for="vagasDisponiveis">
                               Vagas Disponiveis
                            </Label>
                            <Input
                                id="vagasDisponiveis"
                                name="vagasDisponiveis"
                                placeholder=""
                                type=""
                                onChange={onChange} value={configuracoes.vagasDisponiveis}
                            />
                        </FormGroup>
                    </Col>
                    </Row>
                    <br></br>
                
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

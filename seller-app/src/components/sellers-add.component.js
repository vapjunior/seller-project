import React, { Component } from "react";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import SellerDataService from "../services/seller.service";

const required = value => {
    if(!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Este campo é obrigatório!
            </div>
        )
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                Este não é um email válido.
            </div>
        );
    }
};

export default class SellersAdd extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.saveSeller = this.saveSeller.bind(this);

        this.state = {
            name: "",
            email: "",
        };
    }
    
    onChangeName(e) {
        this.setState({
            name: e.target.value,
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
        });
    }

    saveSeller(e) {
        e.preventDefault();

        console.log(this.state);

        this.setState({
            message: "",
            loading: true,
        });

        this.form.validateAll();

        var data = {
            name: this.state.name,
            email: this.state.email,
        };

        SellerDataService.create(data)
            .then(response => {
                this.props.history.push("/sellers");
                window.location.reload();
            })
            .catch(e => {
                const resMessage = 
                    (e.response &&
                        e.response.data &&
                        e.response.data.message) ||
                    e.message ||
                    e.toString();

                this.setState({
                    message: resMessage,
                    loading: false,
                });

                console.log(e);
            });
    }

    render() {

        return (
            <div className="col-md-10 offset-md-1 col-sm-12 col-xs-12">
                <div className="card card-container">
                <h2>Cadastro de Vendedor</h2>

                <Form
                        onSubmit={this.saveSeller}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        <div className="form-group">
                            <label htmlFor="name">Nome</label>
                            <Input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChangeName}
                                validations={[required]}
                            >
                            </Input>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                validations={[required, email]}
                            />
                        </div>
                        
                        <div className="col-xs-12 col-sm-12 col-md-12 text-center">
                            
                            <div className="form-group">
                                <a className="btn btn-danger" href="/sellers">Voltar</a>
                                <button
                                    className="btn btn-primary"
                                    disabled={this.state.loading}
                                >
                                    <span>Cadastrar</span>
                                    {this.state.loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                </button>
                            </div>
                        </div>

                        {this.state.message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>          
                </div>
            </div>
        );
    }
    
}
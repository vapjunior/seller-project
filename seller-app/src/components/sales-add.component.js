import React, { Component } from "react";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import SaleDataService from "../services/sale.service";
import SellersDataService from "../services/seller.service";

const required = value => {
    if(!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Este campo é obrigatório!
            </div>
        )
    }
};

export default class SellersAdd extends Component {
    constructor(props) {
        super(props);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.saveSale = this.saveSale.bind(this);

        this.state = {
            seller: [],
            value: "",
        };
    }
    
    componentDidMount() {
        SellersDataService.get(this.props.match.params.id)
            .then(response => {
                this.setState({
                    seller: response.data.data,
                })
            })
            .catch(e => {

                console.log(e);
            });
    }

    onChangeValue(e) {
        this.setState({
            value: e.target.value,
        });
    }

    saveSale(e) {
        e.preventDefault();

        console.log(this.state);

        this.setState({
            message: "",
            loading: true,
        });

        this.form.validateAll();

        var data = {
            seller_id: this.state.seller.id,
            value: this.state.value,
        };

        console.log(data);

        SaleDataService.create(data)
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
                <h2>Lançamento de Venda</h2>

                <Form
                        onSubmit={this.saveSale}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        <div className="form-row">
                            <div className="col-2">
                                <label htmlFor="id">#</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="id"
                                    name="id"
                                    readOnly
                                    value={this.state.seller.id}
                                    onChange={this.onChangeName}
                                    validations={[required]}
                                >
                                </Input>
                            </div>

                            <div className="col-4">
                                <label htmlFor="seller">Vendedor</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="seller"
                                    name="seller"
                                    readOnly
                                    value={this.state.seller.name}
                                    onChange={this.onChangeName}
                                    validations={[required]}
                                >
                                </Input>
                            </div>

                            <div className="col-6">
                                <label htmlFor="name">Email</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    readOnly
                                    value={this.state.seller.email}
                                    onChange={this.onChangeName}
                                    validations={[required]}
                                >
                                </Input>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="email">Valor</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">R$</div>
                                </div>
                                <Input
                                    type="decimal"
                                    className="form-control"
                                    name="value"
                                    value={this.state.value}
                                    onChange={this.onChangeValue}
                                    validations={[required]}
                                />
                            </div>
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
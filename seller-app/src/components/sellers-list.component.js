import React, { Component } from "react";
import SellerDataService from "../services/seller.service";
import { Link } from "react-router-dom";

export default class SellersList extends Component {
    constructor(props) {
        super(props);
        this.getSellers = this.getSellers.bind(this);
        this.deleteSeller = this.deleteSeller.bind(this);

        this.state = {
            sellers: [],
        };
    }

    componentDidMount() {
        this.getSellers();
    }

    getSellers() {
        SellerDataService.getAll()
        .then(response => {
            this.setState({
                sellers: response.data.data
            });
        })
        .catch(e => {

            console.log(e);
        })
    }

    deleteSeller(id) {
        this.setState({
            message: "",
        });

        SellerDataService.delete(id).then(
            response => {
                this.getSellers();
            },
            error => {
                const resMessage = 
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    message: resMessage,
                });
            }
        )
    }

    render() {
        const { sellers } = this.state;

        return (
            <div className="col-md-10 offset-md-1 col-sm-12 col-xs-12">
                <div className="card card-container">
                <h2>Vendedores</h2>
                
                <div className="col-xs-12 col-sm-12 col-md-12 text-center">
                    <a className="btn btn-success" href="/sellers/add">Novo Vendedor</a>
                </div>

                <table className="table table-hover text-center">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Comissão</th>
                                <th>Vendas</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sellers &&
                                sellers.map((seller, index) => (
                                <tr key={index}>
                                    <th>{seller.id}</th>
                                    <td>{seller.name}</td>
                                    <td>{seller.email}</td>
                                    <td>R$ {seller.commission}</td>
                                    <td>
                                        <Link 
                                            to={'/sales/'+seller.id+'/add'}
                                            className="btn btn-success btn-sm"
                                        >
                                            Lançar</Link>
                                        <Link
                                            to={'/sales/'+seller.id}
                                            className="btn btn-info btn-sm"
                                        >
                                            Relatório</Link>
                                    </td>
                                    <td>
                                       <button className="btn btn-danger btn-sm"
                                            onClick={() => this.deleteSeller(seller.id)}
                                        >
                                            Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>            
                </div>
            </div>
        );
    }
    
}
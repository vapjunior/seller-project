import React, { Component } from "react";
import SaleDataService from "../services/sale.service";
import SallersDataService from "../services/seller.service";
import { Link } from "react-router-dom";
import Moment from 'moment';

export default class SalesList extends Component {
    constructor(props) {
        super(props);
        this.getSales = this.getSales.bind(this);
        this.deleteSale = this.deleteSale.bind(this);

        this.state = {
            sales: [],
            seller: [],
        };
    }

    componentDidMount() {
        this.getSales()
    }

    getSales() {
        SallersDataService.get(this.props.match.params.id)
            .then(response => {
                this.setState({
                    seller: response.data.data,
                })
            })
            .catch(e => {

                console.log(e);
            });

        SaleDataService.get(this.props.match.params.id)
            .then(response => {
                this.setState({
                    sales: response.data.data
                });
            })
            .catch(e => {

                console.log(e);
            })
    }

    deleteSale(id) {

        this.setState({
            message: "",
        });

        SaleDataService.delete(id).then(
            response => {
                this.getSales();
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
        const { sales, seller } = this.state;

        return (
            <div className="col-md-10 offset-md-1 col-sm-12 col-xs-12">
                <div className="card card-container">
                <h2>Vendas</h2>
                
                <div className="col-xs-12 col-sm-12 col-md-12 text-center">
                    <a className="btn btn-danger" href="/sellers">Voltar</a>
                    <Link 
                        to={'/sales/'+seller.id+'/add'}
                        className="btn btn-success"
                    >
                        Nova Venda</Link>
                </div>

                <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Data</th>
                                <th>Valor</th>
                                <th>Comissão</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales &&
                                sales.map((sale, index) => (
                                <tr key={index}>
                                    <th>{sale.id}</th>
                                    <td>{sale.name}</td>
                                    <td>{sale.email}</td>
                                    <td>{Moment(sale.date).format('DD/MM/YYYY')}</td>
                                    <td>R$ {sale.value}</td>
                                    <td>R$ {sale.commission}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm"
                                            onClick={() => this.deleteSale(sale.id)}
                                        >
                                            Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table> 
                    {this.state.message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {this.state.message}
                            </div>
                        </div>
                    )}            
                </div>
            </div>
        );
    }
    
}
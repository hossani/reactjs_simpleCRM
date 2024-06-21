import React, { Component } from 'react';
import '../styles/ajouterDetailsFactureStyle.css'; // Importer le fichier CSS
import dateNow from '../helpers/dateFonction';
import validerEmptyArticle from '../helpers/emptyArticle';
import { v4 as uuidv4 } from 'uuid';
class AjouterDetailsFacture extends Component {
  state = {
    idFacture: 1,
    nomClient: '',
    dateFacture: ''
  };

  componentDidMount() {
    const formattedDate = dateNow();
    const idFacture = JSON.parse(localStorage.getItem('idFactures')) || [1];
    const getId = idFacture.length!=1 ? Math.max(...idFacture) + 1 : 1;
    this.setState({ dateFacture:formattedDate, idFacture: getId });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.dateFacture !== dateNow()) {
      this.setState({ dateFacture: dateNow() });
    }
  }
  
  handleAjouterNewArticle = () => {
    const article = {
      id:uuidv4(),
      name: "select",
      quantity: "",
      price: "",
      discount: "",
      amount: ""
    };
    this.props.onArticleAdd(article);
  }

  handleNomClientChange = (e) => {
    if (e.target.value === "add client") {
      this.setState({ nomClient: '' });
    } else {
      this.setState({ nomClient: e.target.value });
    }
  };

  creerFacture = (e) => {
    e.preventDefault();
    const valider=validerEmptyArticle(this.props.articles,this.state.nomClient);
    if(valider){
      this.props.onCreateFacture(this.state.idFacture, this.state.nomClient);
      const idFactures = JSON.parse(localStorage.getItem('idFactures')) || [1];
      const getId = idFactures.length!=1 ? Math.max(...idFactures) + 1 : 1;
      idFactures.push(getId);
      localStorage.setItem('idFactures', JSON.stringify(idFactures));
  
      // Réinitialiser les champs après la création de la facture
      this.setState({
        idFacture: getId,
        nomClient: '',
        ajouterFactureDisabled: true
      });
    }
  };

  render() {
    return (
      <div className="container">
        <form >
          <div className="form-header">
            <div className='div-input'>
              <label htmlFor="idFacture">ID Facture:</label>
              <input type="text" id="idFacture" name="idFacture" value={this.state.idFacture} readOnly />
            </div>
            <div className='div-input'>
              <label htmlFor="dateFacture">Date Facture:</label>
              <input type="text" id="dateFacture" name='dataFacture' value={this.state.dateFacture} readOnly />
            </div>
            <div className='div-input'>
              <label htmlFor="client">Facture à:</label>
              
              <select value={this.state.nomClient} onChange={this.handleNomClientChange}>
               <option value="">Sélectionner un client</option>
               {this.props.customers && this.props.customers.map((client, index) => (
                 <option key={index} value={client.nom}>{client.nom}</option>
               ))}
               <option value="add client" onClick={this.props.onShowClient} className='add-delete-client'>+ Ajouter client</option>
             </select>
          
            </div>
            <div className='div-input'>
              <button type="submit" disabled={this.props.disableBtn} onClick={this.creerFacture} className='btn-facture'>Ajouter Facture</button>
            </div>
          </div>
          <div className="decoration-line"></div>

          <div className="div-add-sub">
            <div className='div-btn-sp'>
              <button type="button" className='btn-article' onClick={this.handleAjouterNewArticle}>Ajouter Article</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AjouterDetailsFacture;

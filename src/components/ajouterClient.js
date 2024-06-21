import React, { Component } from 'react';
import '../styles/ajouterClientStyle.css';
import validationForm from '../helpers/formValidation';

class AjouterClient extends Component {
   state = {
            nom: '',
            adresse: '',
            telephone: '',
            email: ''
          };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const clients = JSON.parse(localStorage.getItem('clients')) || [];
    const validator=validationForm(this.state);
    if(validator){
      clients.push(this.state);
      localStorage.setItem('clients',JSON.stringify(clients));
      const newClient=this.state;
      this.props.onAddListClient(newClient);
      this.props.onHiddenClient();
    }
  };

  handleCancel = () => {
    this.props.onHiddenClient();
  };

  render() {
    return (
      <div className="wrapper">
      <div className="ajouter-client">
        <div className="header">
          <img src="profile.png" alt="Icon" height="27px"  width="27px" />
          <h2>Ajouter un client</h2>
        </div>
        <div className='form-container'>
        <form className='form'>
          <div className='container-form-group'>
          <div className="form-group">
            <label>Nom Client:</label>
            <input
              type="text"
              name="nom"
              value={this.state.nom}
              onChange={this.handleChange}
            />
          </div>
          </div>
          <div className='container-form-group'>
          <div className="form-group">
            <label>Adresse:</label>
            <input
              type="text"
              name="adresse"
              value={this.state.adresse}
              onChange={this.handleChange}
            />
          </div>
          </div>
          <div className='container-form-group'>
          <div className="form-group">
            <label>Téléphone:</label>
            <input
              type="tel"
              name="telephone"
              value={this.state.telephone}
               onChange={this.handleChange}
            />
          </div>
          </div>
         
          <div className='container-form-group'>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}      
                />
          </div>
          </div>
          <div className='container-form-group'>
          <div className="button-group">
            <button type="button" className="cancel-btn" onClick={this.handleCancel}>Annuler</button>
            <button type="submit" className="submit-btn" onClick={this.handleSubmit}>Ajouter Client</button>
          </div>
          </div>
        </form>
        </div>
      </div>
      </div>
    );
  }
}

export default AjouterClient;

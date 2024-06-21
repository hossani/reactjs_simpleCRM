import React, { Component } from 'react';
import FactureDetailsModal from './factureDetailsModal'; // Import du nouveau composant
import '../styles/factureListStyle.css'; // Import du CSS pour FactureList

class FactureList extends Component {
  state = {
      factures: JSON.parse(localStorage.getItem('factures')) || [],
      selectedFacture: null,
      modalVisible: false
    };
  

  showDetails = (facture) => {
    this.setState({ selectedFacture: facture, modalVisible: true});
  }

  closeModal = () => {
    this.setState({ selectedFacture: null, modalVisible: false});
  }

  render() {

    return (
      <>
     {this.state.modalVisible && <FactureDetailsModal onCloseModal={this.closeModal} factureSelected={this.state.selectedFacture}/>}  

              <div className="modalX"> 
                 <div className='div-btn'>
    <button onClick={this.props.onCancel}>Exit</button>
  </div>
  <div>
    <table className="table">
      <thead>
        <tr>
          <th className="th">ID Facture</th>
          <th className="th">Nom du Client</th>
          <th className="th">Montant HT</th>
          <th className="th">Montant TVA</th>
          <th className="th">Montant TTC</th>
          <th className="th">Détails</th>
        </tr>
      </thead>
      <tbody>
        {this.state.factures.map((facture,index) => (
          <tr key={index}>
            <td >{facture.idFacture}</td>
            <td >{facture.nomClient}</td>
            <td >{facture.totalHT} Dh</td>
            <td >{facture.totalTVA} Dh</td>
            <td >{facture.totalTTC} Dh</td>
            <td >
              <button onClick={() => this.showDetails(facture)} >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
          
            </>
    );
  }
}

export default FactureList;

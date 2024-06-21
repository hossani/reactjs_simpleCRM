
import React, { Component } from 'react';
import '../styles/factureDetailsModal.css';

class FactureDetailsModal extends Component {

  render() {
    const total= this.props.factureSelected.articles.reduce((sum,article)=> sum+parseFloat(article.quantity) * parseFloat(article.price) * (1 - parseFloat(article.discount) / 100),0);
    return (
      <div className='wrapper'>
        <div className="modal">
        <div className='div-btn'>
          <button onClick={this.props.onCloseModal} >Exit</button>
        </div>
        <table>
          <thead>
            <tr>
              <th className='thh'>Description</th>
              <th className='thh'>Quantité</th>
              <th className='thh'>Prix</th>
              <th className='thh'>Remise</th>
              <th className='thh'>Montant</th>
            </tr>
          </thead>
          <tbody>
       
            {  this.props.factureSelected.articles.map((article,index) => (
              <tr key={index}>
                <td>{article.name}</td>
                <td>{article.quantity}</td>
                <td>{article.price} Dh</td>
                <td>{article.discount} %</td>
                <td>{parseFloat(article.quantity) * parseFloat(article.price) * (1 - parseFloat(article.discount) / 100)} Dh</td>
              </tr>
            )) }
          </tbody>
        </table>
        <div className='div-total-HT'>
           <h3 className='h3'>Montant total HT : <span id='total'>{total} Dh</span></h3>
        </div>
      </div>
      </div>
      
    );
  }
}

export default FactureDetailsModal;

  

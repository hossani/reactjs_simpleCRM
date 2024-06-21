// src/components/CreerFacture.js
import React from 'react';
import AjouterDetailsFacture from './ajouterDetailsFacture';
import ArticleList from './articleList';
import AjouterClient from './ajouterClient';

class CreerFacture extends React.Component {
 state = {
      articles: [],
      client: [],
      date: '',
      isAjouterClientVisible:false,
      ajouterFactureDisabled: true
    };

    componentDidUpdate=(prevProps,prevState)=>{
      if(this.state.articles.length==0 && this.state.ajouterFactureDisabled==false ){
        this.setState({ajouterFactureDisabled:true});
      }
    };
  handleDeleteArticle=(id)=>{
    const newArticles=this.state.articles.filter((item)=>item.id != id);
    this.setState({articles:newArticles});
  }
  handleListeClient=(newClient)=>{
    this.setState(prevState=>({client:[...prevState.client,newClient]}));
  }
  handleShowAjouterClient = () => {
    this.setState({ isAjouterClientVisible: true });
  };
  handleHiddenAjouterClient=()=>{
    this.setState({ isAjouterClientVisible:false});
    };
    componentDidMount(){
      const clients=JSON.parse(localStorage.getItem('clients'))||this.state.client;
      this.setState({client:clients});
    }

    // handle article Add
    handleArticleAdd = (article) => {
        this.setState((prevState) => ({
          articles: [...prevState.articles, article],
          ajouterFactureDisabled:false  // Pour activer le button ajouter facture 
        }));
      };

      // changement
//       handleChangeArticle=(id,myarticle)=>{
// let article=this.state.articles.find((article)=>article.id==id);
// article.name=myarticle.name;
// article.quantity=myarticle.quantity;
// article.price=myarticle.price;
// article.discount=myarticle.discount;
// article.amount=myarticle.amount;
// }
handleChangeArticle = (id, myarticle) => {
  const updatedArticles = this.state.articles.map((article) => {
    if (article.id === id) {
      return {
        ...article, // Décomposition pour copier les propriétés existantes
        name: myarticle.name,
        quantity: myarticle.quantity,
        price: myarticle.price,
        discount: myarticle.discount,
        amount: myarticle.amount
      };
    }
    return article;
  });
  this.setState( { articles: updatedArticles } );
}
  handleCreateInvoice = (idFacture,nomClient) => {
    const { articles } = this.state;
    const totalHT = articles.reduce((sum, article) => sum + parseFloat(article.amount), 0).toFixed(2);
    const totalTVA = (totalHT * 0.2).toFixed(2); // Assuming 20% VAT rate
    const totalTTC = (parseFloat(totalHT) + parseFloat(totalTVA)).toFixed(2);

    const newInvoice = {
      idFacture,
      nomClient,
      articles,
      totalHT,
      totalTVA,
      totalTTC,
    };

    const invoices = JSON.parse(localStorage.getItem('factures')) || [];
    invoices.push(newInvoice);
    localStorage.setItem('factures', JSON.stringify(invoices));
    this.setState({ articles: []});
    this.props.onFactureListeVisible();
  };

  render() {
    return (
      <>
        <AjouterDetailsFacture customers={this.state.client}  
          onArticleAdd={this.handleArticleAdd}
          onShowClient={this.handleShowAjouterClient}
          disableBtn={this.state.ajouterFactureDisabled}
          onCreateFacture={this.handleCreateInvoice}
          articles={this.state.articles}
        />
        <ArticleList articles={this.state.articles} onDelete={this.handleDeleteArticle} onChangeArticle={this.handleChangeArticle} />

        {this.state.isAjouterClientVisible && <AjouterClient onAddListClient={this.handleListeClient} onHiddenClient={this.handleHiddenAjouterClient}/>}
      </>
    );
  };
}

export default CreerFacture;

import React,{Component} from "react";
import CreerFacture from './creerFacture';
import FactureList from "./factureList";

class App extends React.Component{
   state={
        factureListVisible:false,
        creerFactureVisible:true
   }
   handleFactureListeVisible=()=>{
    this.setState({factureListVisible:true,creerFactureVisible:false});
   }
   handleCancel=()=>{
    this.setState({factureListVisible:false,creerFactureVisible:true});
   }
 
    render(){
        return (
        <>
        {this.state.creerFactureVisible && <CreerFacture onFactureListeVisible={this.handleFactureListeVisible}/> } 
        {this.state.factureListVisible &&  <FactureList onCancel={this.handleCancel}  />}     
        </>
        )
    }
}
export default App;
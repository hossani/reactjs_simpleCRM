import React from 'react';

class Article extends React.Component {
  state = {
    name: 'select',
    quantity: '',
    price: '',
    discount: '',
    amount: ''
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      if(value=='delete'){
        console.log('this:',this.props.article.id)
            this.props.onDelete(this.props.article.id);
      }else{
        const article = this.props.articleData.find((article) => article.name === value);
        if (article) {
          this.setState({ name: article.name, price: article.price }, () => {
            this.calculateAmount();
          });
        }
      }
      
    } else if(name==='quantity'){
  const numericValue = Number(value);
  // Check if the numericValue is NaN (Not-a-Number)
  if (isNaN(numericValue)) {
    this.setState({ quantity: '' });
  } else {
    this.setState({ quantity: value }, () => {
      this.calculateAmount();
    });
  }
  };
  }
  calculateAmount = () => {
    const { quantity, price } = this.state;
    const discount = this.calculateDiscount();
    const amount = quantity* price*(1 - discount/100);
    this.setState({ discount, amount },()=>{
      this.props.onChangeArticle(this.props.article.id, this.state); //  En JavaScript, les mises à jour d'état sont asynchrones, ce qui signifie que lorsque vous appelez this.setState, les changements ne sont pas immédiatement reflétés dans this.state
    });
  };

  calculateDiscount = () => {
    const { quantity } = this.state;
    const article = this.props.articleData.find((article) => article.name === this.state.name);
    if (!article || !quantity || quantity==0) return 0;
    const intervalle = article.remiseParIntervalle;
    const size=intervalle.length;
    const applicableDiscount= intervalle.find((item)=>item.minQty>=quantity);

    return applicableDiscount ? applicableDiscount.discount : intervalle[size-1].discount;
  };

  render() {
    const amountValue = this.state.amount ? `${this.state.amount} Dh` : '';
    const priceValue = this.state.price ? `${this.state.price} Dh` : '';
    const discountValue = this.state.discount ? `${this.state.discount} %` : '';
    return (
      <tr>
        <td>
          <select name="name" value={this.state.name} onChange={this.handleChange} className='normal-input'>
            <option value="select">Select</option>
            {this.props.articleData.map((item,index) => (
              <option key={index} value={item.name}>{item.name}</option>
            ))}
            <option value="delete" className='add-delete-client'>Delete article</option>
          </select>
        </td>
        <td>
          <input
            type="text"
            name="quantity"
            value={this.state.quantity}
            onChange={this.handleChange}
            className='normal-input'
          />
        </td>
        <td>
          <input
            type="text"
            name="price"
            value={priceValue}
            className='readonly-input'
            readOnly
          />
        </td>
        <td>
          <input
            type="text"
            name="discount"
            value={discountValue}
            className='readonly-input'
            readOnly
          />
        </td>
        <td>
         
          <input
            type="text"
            name="amount"
            value={amountValue}
            className='normal-input'
            readOnly
          />
        </td>
      </tr>
    );
  }
}

export default Article;

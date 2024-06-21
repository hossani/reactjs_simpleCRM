// src/components/ArticleList.js
import React from 'react';
import Article from './article';
import '../styles/articleListStyle.css';
import '../styles/articleStyle.css';
import articleData from '../data/articleData';

class ArticleList extends React.Component {
  render() {
    return (
      <div className='div-container'>
        <table>
            <thead>
            <tr>
              <th>Article</th>
              <th>Quantité</th>
              <th>Prix</th>
              <th>Remise</th>
              <th>Montant</th>
            </tr>
          </thead>
           <div className='espace'></div>
          <tbody >
  
          {this.props.articles.map((article) => (
              <Article key={article.id}  article={article} onDelete={this.props.onDelete} articleData={articleData} onChangeArticle={this.props.onChangeArticle} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ArticleList;

const validerEmptyArticle = (articles,client) => {
    if(!client) {
        alert('Vous devez selectionner un client');
        return false;
    }
    // Utilisation de Array.prototype.some() pour vérifier si au moins un article est invalide
    const isEmpty = articles.some(item => item.name === 'select' || item.quantity === '');

    if (isEmpty) {
        alert('Il y a des articles vides.');
        return false;
    }

    return true;
};

export default validerEmptyArticle;

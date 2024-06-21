const validationForm = (data) => {
    // Vérification si les champs obligatoires sont vides
    if (data.nom === '' || data.adresse === '' || data.telephone === '' || data.email === '') {
        alert('Les champs ne doivent pas être vides.');
        return false;
    }

    // Validation du numéro de téléphone
    const telephonePattern = /^\d{10}$/;
    if (!telephonePattern.test(data.telephone)) {
        alert('Le numéro de téléphone doit être composé de 10 chiffres.');
        return false;
    }

    // Validation de l'email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
        alert("L'email n'est pas au format valide.");
        return false;
    }

    // Si toutes les validations sont passées, le formulaire est valide
    return true;
};

export default validationForm;


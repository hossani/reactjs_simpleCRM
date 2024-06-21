const dateNow=()=>{
    const currentDate = new Date();
    const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Les mois sont indexés de 0 à 11
const day = String(currentDate.getDate()).padStart(2, '0');
const formattedDate = `${day}/${month}/${year}`;
return formattedDate;
}

export default dateNow;
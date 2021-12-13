export default function getNumber (array, indexFromGet, amountItemsGet) {
    let num = array.splice(indexFromGet, amountItemsGet).slice(',');
    let numberr = num.map((no, index) => (((no=="0")&&(index == 0)) ? no = "" : no)).join('');
    return numberr;
}

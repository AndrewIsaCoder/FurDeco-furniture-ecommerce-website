// 1. Definirea constantelor și variabilelor
const PRODUCT1_NAME = "Amber Lounge Sofa"; // Tip: string
const PRODUCT1_PRICE = 399;               // Tip: number (RON)
let PRODUCT1_QTY = 1;                     // Tip: number (întreg)

const PRODUCT2_NAME = "Linen Curve Chair"; // Tip: string
const PRODUCT2_PRICE = 149;                // Tip: number (RON)
let PRODUCT2_QTY = 1;                      // Tip: number (întreg)

const VAT_RATE = 0.2;                      // Cota TVA
const CURRENCY = "USD";                    // Valuta string
const USD_PER_EUR = 1.16;                  // Rata de schimb
const RAW_COUPON = "SAVE10";               // Valoarea brută a cuponului
const VALID_COUPONS = ["SAVE10" , "SAVE15" , "FREESHIP"]

console.log(typeof PRODUCT1_NAME); 
console.log(typeof PRODUCT1_PRICE); 
console.log(typeof VAT_RATE);       

function normalizeCoupon(code){
   let normalized = code.trim().toUpperCase();
   return normalized;
}


function login(){
    let valoareInputEmail = document.getElementById("email").value.trim();
    let valoareInputPassword = document.getElementById("password").value.trim();
    const VALID_EMAIL = "admin@admin.com"
    const VALID_PASS = "admin"
    if (valoareInputEmail === VALID_EMAIL && valoareInputPassword === VALID_PASS) {
        console.log("Utilizatorul s-a autentificat!")
        return true;
    } else {
        console.log("Utilizatorul nu s-a autentificat cu succes!")
        return false;
    }
}

let suma = 0;

function adaugaLaSuma(pret){
    suma += pret;
    
    console.log("Suma totala curenta a utilizaztorului logat este : " + suma +"$");
}

adaugaLaSuma(45.90)
adaugaLaSuma(199.00)
adaugaLaSuma(129.56)

function openCart(){
    alert("Suma totala a comenzii este: " + suma + "$" )
}

function isValidCoupon(code){
    if (VALID_COUPONS.includes(code)) {
        return true;
    } else {
        return false;
    }
}

function validateAndNotify(){
    console.log("Funcția a fost pornită!"); 
    let valoareIntrodusa = document.getElementById("promocode-form").value;
    let codNormalizat = normalizeCoupon(valoareIntrodusa)
    if (isValidCoupon(codNormalizat)) {
        switch (codNormalizat) {
            case "SAVE10":
                alert("Cuponul dvs. ofera 10% reducere.");
                console.log("Codul de reducere a fost aplicat cu succes!")
                break;
            case "SAVE15":
                alert("Cuponul dvs. ofera 15% reducere.");
                console.log("Codul de reducere a fost aplicat cu succes!")
                break;
            case "FREESHIP":
                alert("Cuponul dvs. ofera livrare gratuita.");
                console.log("Codul de reducere a fost aplicat cu succes!")
                break;
    }
} else{
    alert("Codul Introdus nu este valid!")
    console.log("Codul de reducere nu a putut fi aplicat!")
}
}


const allProducts = [
  { name: "Amber Lounge Sofa", price: 399, qty: 5 },
  { name: "Linen Curve Chair", price: 149, qty: 12 },
  { name: "Oak Frame Table", price: 229, qty: 8 },
  { name: "Cloud Armchair", price: 219, qty: 3 },
  { name: "Terra Sofa", price: 499, qty: 15 },
  { name: "Walnut Studio Table", price: 179, qty: 20 }
];

function productsValue() {
    let totalValue = 0;

    for (let product of allProducts) {
        totalValue += product.price * product.qty
    }
    console.log("Valoarea totala a stocului: " + totalValue + " $");
}

productsValue();

const lowstock = allProducts.filter(product => product.qty < 10);
console.log("Produse cu stoc scazut ( sub 10 unitati ) : " , lowstock);

function findProductByName(list , searchName) {
    let searchLower = searchName.toLowerCase();
    let foundProduct = list.find(product => product.name.toLowerCase().includes(searchLower));
    return foundProduct ? foundProduct : "Produsul nu a fost gasit.";
}

console.log(findProductByName(allProducts , "sofa"))
console.log(findProductByName(allProducts , "chair"))
console.log(findProductByName(allProducts , "table"))
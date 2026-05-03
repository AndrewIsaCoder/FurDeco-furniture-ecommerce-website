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

console.log(typeof PRODUCT1_NAME); 
console.log(typeof PRODUCT1_PRICE); 
console.log(typeof VAT_RATE);       

function normalizeCoupon(code){
   let normalized = code.trim().toUppercase();
   return normalized;
}

function validateAndNotify(){
    let valoareIntrodusa = document.getElementById("promocode-form").value;
    if (normalizeCoupon(valoareIntrodusa) === RAW_COUPON){
        alert("Cuponul a fost aplicat cu succes!")
    } else {
        alert("Cuponul nu este valid!")
    }
}
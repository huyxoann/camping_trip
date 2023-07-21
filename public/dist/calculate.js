/*
    Bảng giá dịch vụ cắm trại:
    - Từ 1-2 người: 270k/người
    - Từ 3-5 người: 220k/người
    - Từ 6-16 người: 200k/người
    - Trên 17 người: 170k/ người
    - Trẻ em: 100k
*/
var typeOnePrice = 270
var typeTwoPrice = 220
var typeThreePrice = 200
var typeFourPrice = 170
var childPrice = 100

function calculatePeople(adultAmounts = 0, childAmounts = 0) {
    console.log(adultAmounts + " " + childAmounts)
    if (adultAmounts >= 17) {
        return (adultAmounts * typeFourPrice + childAmounts * childPrice)
    } else if (adultAmounts >= 6) {
        return (adultAmounts * typeThreePrice + childAmounts * childPrice)
    } else if (adultAmounts >= 3) {
        return (adultAmounts * typeTwoPrice + childAmounts * childPrice)
    } else {
        return (adultAmounts * typeOnePrice + childAmounts * childPrice)
    }
}

function updatePriceOnWeb(price) {
    priceElement.innerHTML = price + 'k'
}

function onInputChange() {
    var adultAmounts = Number(adultElement.value);
    var childAmounts = Number(childElement.value);
    var price = calculatePeople(adultAmounts, childAmounts);
    updatePriceOnWeb(price)
}

var adultElement = document.querySelector('#adultAmounts');
var childElement = document.querySelector('#childAmounts');
var priceElement = document.querySelector('#price');

adultElement.addEventListener('input', onInputChange);
childElement.addEventListener('input', onInputChange);







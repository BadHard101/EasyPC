var min_range = document.querySelector('#Min_cost');
var max_range = document.querySelector('#Max_cost');
var manufacture = document.querySelector('#Manufacturer_form');

for (let i=1; i<8; i++) {

}

min_range.addEventListener('change', function () {
    let cards = document.querySelectorAll('.product_card');
    cards.forEach(element => {
        let elementPrice = element.querySelector('.cost_label').innerHTML.replace(/[^0-9]/g, "");
        if (+elementPrice > max_range.value || +elementPrice < min_range.value) {
            element.classList.add('hidden');
        }
        if (+elementPrice < max_range.value && +elementPrice > min_range.value) {
            element.classList.remove('hidden');
        }
    });
})

max_range.addEventListener('change', function () {
    let cards = document.querySelectorAll('.product_card');
    cards.forEach(element => {
        let elementPrice = element.querySelector('.cost_label').innerHTML.replace(/[^0-9]/g, "");
        if (+elementPrice > max_range.value || +elementPrice < min_range.value) {
            element.classList.add('hidden');
        }
        if (+elementPrice < max_range.value && +elementPrice > min_range.value) {
            element.classList.remove('hidden');
        }
    });
})

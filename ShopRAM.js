var min_range = document.querySelector('#Min_cost');
var max_range = document.querySelector('#Max_cost');
var manufacture = document.querySelector('#Manufacturer_form');

//фильтр-проверка по стоимости
function filter_by_cost(element) {
    let elementPrice = element.querySelector('.cost_label').innerHTML.replace(/[^0-9]/g, "");
    if (+elementPrice > max_range.value || +elementPrice < min_range.value) {
        return false;
    }
    if (+elementPrice < max_range.value && +elementPrice > min_range.value) {
        return true;
    }
}

//реакция на изменение фильтра минимальной стоимости
min_range.addEventListener('change', function () {
    let cards = document.querySelectorAll('.product_card');
    cards.forEach(element => {
        if (filter_by_cost(element) && filter_by_manufacture(element)) { /////////
            element.classList.remove('hidden');
        }
        else {
            element.classList.add('hidden');
        }
    });
})

//реакция на изменение фильтра максимальной стоимости
max_range.addEventListener('change', function () {
    let cards = document.querySelectorAll('.product_card');
    cards.forEach(element => {
        if (filter_by_cost(element) && filter_by_manufacture(element)) { /////////
            element.classList.remove('hidden');
        }
        else {
            element.classList.add('hidden');
        }
    });
})

const services = [
    {
        id: "1",
        Manufacture: "HyperX",
        Type: "DDR4"
    },
    {
        id: "2",
        Manufacture: "Kingston",
        Type: "DDR4"
    },
    {
        id: "3",
        Manufacture: "HyperX",
        Type: "DDR3"
    },
    {
        id: "4",
        Manufacture: "Samsung",
        Type: "DDR4"
    },
    {
        id: "5",
        Manufacture: "AMD",
        Type: "DDR4"
    },
    {
        id: "6",
        Manufacture: "Corsair",
        Type: "DDR4"
    },
    {
        id: "7",
        Manufacture: "Corsair",
        Type: "DDR5"
    },
    {
        id: "8",
        Manufacture: "Transcend",
        Type: "DDR4"
    },
    {
        id: "9",
        Manufacture: "Transcend",
        Type: "DDR4"
    },
    {
        id: "10",
        Manufacture: "Patriot Memory",
        Type: "DDR3"
    }
]

const findServices = (filters) => {
    let answer = [...services];

    for (const filter in filters) {
        const filterSet = filters[filter];

        answer = answer.filter(
            item => filterSet.size === 0 ||  filterSet.has(item[filter])
        );
    }
    return answer;
}

const Manufacture_checkboxes = document.querySelectorAll('.Manufacturer_filter [type="checkbox"]');

const filters = {
    Manufacture: new Set(),
    Type: new Set()
};

let answer_ids;
let answer;
function generate_ids() {
    answer = findServices(filters);
    answer_ids = []
    for (let i = 0; i < answer.length; i++) {
        answer_ids.push(answer.at(i).id);
        console.log(answer_ids.at(i));
    }
}
//ГЕНЕРИРУЕМ НАЧАЛЬНЫЕ ID ФИЛЬТРОВ НА СТАРТЕ
generate_ids();

document.onload = findServices(filters);

Manufacture_checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        console.clear();

        const target = e.target;
        const [prop, value] = target.name.split('-');

        filters[prop][target.checked ? 'add' : 'delete']('' + value);

        //ПЕРЕГЕНЕРАЦИЯ ПРИ ИЗМЕНЕНИИ ФИЛЬТРОВ
        generate_ids();

        let cards = document.querySelectorAll('.product_card');
        cards.forEach(element => {
            if (filter_by_manufacture(element)
                && filter_by_cost(element)) {
                element.classList.remove('hidden');
            } else {
                element.classList.add('hidden');
            }
        });
    })
});

//фильтр-проверка на производителя
function filter_by_manufacture(element) {
    if (answer_ids.indexOf(element.id)>-1) {
        return true;
    } else {
        return false;
    }
}





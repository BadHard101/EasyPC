/* страт ПАРАМЕТРЫ СОЗДАННЫХ ТОВАРОВ */
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
/* конец ПАРАМЕТРЫ СОЗДАННЫХ ТОВАРОВ */






/* старт ЛОВИМ ПОЛЯ ФИЛЬТРОВ СТРАНИЦЫ */

// для фильтра стоимости
var min_range = document.querySelector('#Min_cost');
var max_range = document.querySelector('#Max_cost');

// для фильтра по производителю
var manufacture = document.querySelector('#Manufacturer_form');
const Manufacture_checkboxes = document.querySelectorAll('.Manufacturer_filter [type="checkbox"]');
const Type_checkboxes = document.querySelectorAll('.Type_filter [type="checkbox"]');

/* старт ЛОВИМ ПОЛЯ ФИЛЬТРОВ СТРАНИЦЫ */

let answer; // массив элементов, подходящих по условиям фильтров из массива всех элементов (services)
let answer_ids; // массив с id-шниками элементов массива answer

const filters = {
    Manufacture: new Set(),
    Type: new Set()
};

/* конец ЛОВИМ ПОЛЯ ФИЛЬТРОВ СТРАНИЦЫ */





//образование массива answer (массива всех товаров страницы с их параметрами (как объекты класса))
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

//при загрузке страницы образуем массив answer
document.onload = findServices(filters);

//перезапись массива id-шников (answer_ids) из массива answer
function generate_ids() {
    answer = findServices(filters);
    answer_ids = []
    for (let i = 0; i < answer.length; i++) {
        answer_ids.push(answer.at(i).id);
        console.log(answer_ids.at(i));
    }
}

//ГЕНЕРИРУЕМ НАЧАЛЬНЫЕ ID ФИЛЬТРОВ НА СТАРТЕ
// (чтобы отображались все товары по стартовым фильтрам при открытии страницы)
generate_ids();







/* старт ПРОВЕРКА НА ОСТАЛЬНЫЕ НЕИЗМЕНЕННЫЕ ФИЛЬТРЫ */

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
//фильтр-проверка на производителя
function filter_by_id(element) {
    if (answer_ids.indexOf(element.id)>-1) {
        return true;
    } else {
        return false;
    }
}

/* конец ПРОВЕРКА НА ОСТАЛЬНЫЕ НЕИЗМЕНЕННЫЕ ФИЛЬТРЫ */







/* страт РЕАКЦИИ НА ИЗМЕНЕНИЕ ФИЛЬТРОВ */

//реакция на изменение фильтра минимальной стоимости
min_range.addEventListener('change', function () {
    let cards = document.querySelectorAll('.product_card');
    cards.forEach(element => {
        if (filter_by_cost(element) && filter_by_id(element)) { /////////
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
        if (filter_by_cost(element) && filter_by_id(element)) { /////////
            element.classList.remove('hidden');
        }
        else {
            element.classList.add('hidden');
        }
    });
})

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
            if (filter_by_id(element)
                && filter_by_cost(element)) {
                element.classList.remove('hidden');
            } else {
                element.classList.add('hidden');
            }
        });
    })
});

Type_checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        console.clear();

        const target = e.target;
        const [prop, value] = target.name.split('-');

        filters[prop][target.checked ? 'add' : 'delete']('' + value);

        //ПЕРЕГЕНЕРАЦИЯ ПРИ ИЗМЕНЕНИИ ФИЛЬТРОВ
        generate_ids();

        let cards = document.querySelectorAll('.product_card');
        cards.forEach(element => {
            if (filter_by_id(element)
                && filter_by_cost(element)) {
                element.classList.remove('hidden');
            } else {
                element.classList.add('hidden');
            }
        });
    })
});

/* конец РЕАКЦИИ НА ИЗМЕНЕНИЕ ФИЛЬТРОВ */
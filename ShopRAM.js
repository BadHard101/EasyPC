/*alert("Работа является проектной.\n" +
    "Страница является лишь примером реализации страницы комплектующих 😊")*/

/* старт ПАРАМЕТРЫ СОЗДАННЫХ ТОВАРОВ */
const services = [
    {
        id: "1",
        Manufacture: "HyperX",
        Type: "DDR4",
        Moduls: "1",
        Value: "8",
        Speed: "3600"
    },
    {
        id: "2",
        Manufacture: "Kingston",
        Type: "DDR4",
        Moduls: "2",
        Value: "16",
        Speed: "3600"
    },
    {
        id: "3",
        Manufacture: "HyperX",
        Type: "DDR3",
        Moduls: "1",
        Value: "8",
        Speed: "1600"
    },
    {
        id: "4",
        Manufacture: "Samsung",
        Type: "DDR4",
        Moduls: "1",
        Value: "8",
        Speed: "3200"
    },
    {
        id: "5",
        Manufacture: "AMD",
        Type: "DDR4",
        Moduls: "2",
        Value: "16",
        Speed: "3600"
    },
    {
        id: "6",
        Manufacture: "Corsair",
        Type: "DDR4",
        Moduls: "2",
        Value: "16",
        Speed: "3200"
    },
    {
        id: "7",
        Manufacture: "Corsair",
        Type: "DDR5",
        Moduls: "2",
        Value: "16",
        Speed: "6200"
    },
    {
        id: "8",
        Manufacture: "Transcend",
        Type: "DDR4",
        Moduls: "1",
        Value: "8",
        Speed: "3200"
    },
    {
        id: "9",
        Manufacture: "Transcend",
        Type: "DDR4",
        Moduls: "1",
        Value: "8",
        Speed: "2666"
    },
    {
        id: "10",
        Manufacture: "Patriot Memory",
        Type: "DDR3",
        Moduls: "2",
        Value: "8",
        Speed: "1600"
    }
]
/* конец ПАРАМЕТРЫ СОЗДАННЫХ ТОВАРОВ */






/* старт ЛОВИМ ПОЛЯ ФИЛЬТРОВ СТРАНИЦЫ */

// для фильтра стоимости
let min_range = document.querySelector('#Min_cost');
let max_range = document.querySelector('#Max_cost');
// для фильтра скорости (тактовой частоты)
let min_speed = document.querySelector('#Min_speed');
let max_speed = document.querySelector('#Max_speed');
//////////////добавление нового ЧИСЛЕННОГО фильтра//////////////

// для фильтра по производителю
const Manufacture_checkboxes = document.querySelectorAll('.Manufacturer_filter [type="checkbox"]');
// по типу
const Type_checkboxes = document.querySelectorAll('.Type_filter [type="checkbox"]');
// по количеству модулей в комплекте
const Moduls_checkboxes = document.querySelectorAll('.Moduls_filter [type="checkbox"]');
// по объему модуля
const Value_checkboxes = document.querySelectorAll('.Value_filter [type="checkbox"]');
/////////////////////////////////////////////////////////////////////ДОБАВЛЕНИЕ НОВОГО ФИЛЬТРА

// сообщение пользователю, о том что нет таких товаров в наличии
var No_prods = document.querySelector('#no_prods');

/* старт ЛОВИМ ПОЛЯ ФИЛЬТРОВ СТРАНИЦЫ */

let answer; // массив элементов, подходящих по условиям фильтров из массива всех элементов (services)
let answer_ids; // массив с id-шниками элементов массива answer

const filters = {
    Manufacture: new Set(),
    Type: new Set(),
    Moduls: new Set(),
    Value: new Set(),
    Speed: new Set()

/////////////////////////////////////////////////////////////////////ДОБАВЛЕНИЕ НОВОГО ФИЛЬТРА
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

/* старт УБИРАЕМ ФИЛЬТРЫ ТОВАРОВ, КОТОРЫХ НЕТ В НАЛИЧИИ НА СТАРТЕ */
function check_disabled_types() {
    Type_checkboxes.forEach(checkbox => {
        let checkbox_type = checkbox.id.split("-").at(1); //тип фильтра текущего товара
        let checkbox_type_flag = false; //флаг на наличие товаров с фильтром
        answer.forEach(element => {
            if (checkbox_type_flag === true) //если уже существует хотя бы один товар с таким фильтром, то скипаем перебор всех остальных товаров
                return;
            if (element.Type === checkbox_type) { //если есть товар в списке с таким фильтром, то помечаем это
                checkbox_type_flag = true;
                console.log(element.Type);
                console.log(element.Type === checkbox_type);
            }
        });
        checkbox.disabled = checkbox_type_flag === false;
    });
}

function check_disabled_manufactures() {
    Manufacture_checkboxes.forEach(checkbox => {
        let checkbox_type = checkbox.id.split("-").at(1); //тип фильтра текущего товара
        let checkbox_type_flag = false; //флаг на наличие товаров с фильтром
        answer.forEach(element => {
            if (checkbox_type_flag === true) //если уже существует хотя бы один товар с таким фильтром, то скипаем перебор всех остальных товаров
                return;
            if (element.Manufacture === checkbox_type) { //если есть товар в списке с таким фильтром, то помечаем это
                checkbox_type_flag = true;
                console.log(element.Manufacture);
                console.log(element.Manufacture === checkbox_type);
            }
        });
        checkbox.disabled = checkbox_type_flag === false;
    });
}

function check_disabled_moduls() {
    Moduls_checkboxes.forEach(checkbox => {
        let checkbox_type = checkbox.id.split("-").at(1); //тип фильтра текущего товара
        let checkbox_type_flag = false; //флаг на наличие товаров с фильтром
        answer.forEach(element => {
            if (checkbox_type_flag === true) //если уже существует хотя бы один товар с таким фильтром, то скипаем перебор всех остальных товаров
                return;
            if (element.Moduls === checkbox_type) { //если есть товар в списке с таким фильтром, то помечаем это
                checkbox_type_flag = true;
                console.log(element.Moduls);
                console.log(element.Moduls === checkbox_type);
            }
        });
        checkbox.disabled = checkbox_type_flag === false;
    });
}

function check_disabled_value() { //////ЗАМЕНИТЬ для нового фильтра
    Value_checkboxes.forEach(checkbox => { //////ЗАМЕНИТЬ для нового фильтра
        let checkbox_type = checkbox.id.split("-").at(1); //тип фильтра текущего товара
        let checkbox_type_flag = false; //флаг на наличие товаров с фильтром
        answer.forEach(element => {
            if (checkbox_type_flag === true) //если уже существует хотя бы один товар с таким фильтром, то скипаем перебор всех остальных товаров
                return;
            //если есть товар в списке с таким фильтром, то помечаем это
            if (element.Value === checkbox_type) { //////ЗАМЕНИТЬ для нового фильтра
                checkbox_type_flag = true;
                console.log(element.Value); //////ЗАМЕНИТЬ для нового фильтра
                console.log(element.Value === checkbox_type); //////ЗАМЕНИТЬ для нового фильтра
            }
        });
        checkbox.disabled = checkbox_type_flag === false;
    });
}
/////////////////////////////////////////////////////////////////////ДОБАВЛЕНИЕ НОВОГО ФИЛЬТРА

check_disabled_types();
check_disabled_manufactures();
check_disabled_moduls();
check_disabled_value();
/////////////////////////////////////////////////////////////////////ДОБАВЛЕНИЕ НОВОГО ФИЛЬТРА

/* конец УБИРАЕМ ФИЛЬТРЫ ТОВАРОВ, КОТОРЫХ НЕТ В НАЛИЧИИ НА СТАРТЕ */





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
function filter_by_speed(element) {
    let flag = false
    answer.forEach(ans => {
        if (ans.id === element.id && ans.Speed >= min_speed.value && ans.Speed <= max_speed.value)
            flag = true;
    });
    return flag;
}
//////////////добавление нового ЧИСЛЕННОГО фильтра//////////////

//фильтр-проверка обычных фильтров
function filter_by_id(element) {
    if (answer_ids.indexOf(element.id)>-1) return true;
    else return false;
}

/* конец ПРОВЕРКА НА ОСТАЛЬНЫЕ НЕИЗМЕНЕННЫЕ ФИЛЬТРЫ */

//проверка на наличие товаров, соответствующих текущим фильтрам
let amount_of_elems = services.length + 1; // один является примерочным без информации
console.log(amount_of_elems);
function no_prods_check() {
    const hidden_elements = document.querySelectorAll('.hidden');
    console.log(hidden_elements.length);
    if (hidden_elements.length === amount_of_elems) No_prods.style.display = "flex";
    else No_prods.style.display = "none";
}





/* старт РЕАКЦИИ НА ИЗМЕНЕНИЕ ФИЛЬТРОВ */

function filter_calculate() {
    let cards = document.querySelectorAll('.product_card');
    cards.forEach(element => {
        if (filter_by_cost(element) &&
            filter_by_id(element) &&
            filter_by_speed(element)) { //////////////добавление нового ЧИСЛЕННОГО фильтра//////////////
            element.classList.remove('hidden');
        }
        else {
            element.classList.add('hidden');
        }
    });
    //если нет таких товаров, то выводим сообщение об этом
    no_prods_check();
}

//реакция на изменение фильтра минимальной стоимости
min_range.addEventListener('change', function () {
    filter_calculate();
})
//реакция на изменение фильтра максимальной стоимости
max_range.addEventListener('change', function () {
    filter_calculate();
})

//реакция на изменение минимальной скорости (тактовой частоты)
min_speed.addEventListener('change', function () {
    filter_calculate();
})
//реакция на изменение минимальной скорости (тактовой частоты)
max_speed.addEventListener('change', function () {
    filter_calculate();
})
//////////////добавление нового ЧИСЛЕННОГО фильтра//////////////

function setFilterListener(e) {
    console.clear();

    const target = e.target;
    const [prop, value] = target.name.split('-');

    filters[prop][target.checked ? 'add' : 'delete']('' + value);

    //ПЕРЕГЕНЕРАЦИЯ ПРИ ИЗМЕНЕНИИ ФИЛЬТРОВ
    generate_ids();

    filter_calculate();

    //если нет таких товаров, то выводим сообщение об этом
    no_prods_check();
}

Manufacture_checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        setFilterListener(e);
    })
});

Type_checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        setFilterListener(e);
    })
});

Moduls_checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        setFilterListener(e);
    })
});
Value_checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        setFilterListener(e);
    })
});
/////////////////////////////////////////////////////////////////////ДОБАВЛЕНИЕ НОВОГО ФИЛЬТРА

/* конец РЕАКЦИИ НА ИЗМЕНЕНИЕ ФИЛЬТРОВ */
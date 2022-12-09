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
]

let visible_obs = [];
for (let i = 1; i < 12; i++) {
    visible_obs.push(i);
}
//console.log()


const findServices = (filters) => {
    let answer = [...services];

    for (const filter in filters) {
        const filterSet = filters[filter];

        answer = answer.filter(
            item => filterSet.size === 0 ||  filterSet.has(item[filter])
        );
    }

    /*document.querySelector('#selected').innerHTML = answer.map(item => `<p>${item.id}</p>`).join('');*/




    let cards = document.querySelectorAll('.product_card');
    cards.forEach(element => {


        for (let i = 0; i < answer.length; i++) {
            //console.log(answer.at(i));

            let cur_index = answer.at(i).id;


            console.log("Elm: " + element.id);
            console.log("Index: " + cur_index);


            if (++element.id >= ++cur_index && element.id === cur_index) {
                element.classList.remove('hidden');

            } else {
                element.classList.add('hidden');
            }

            /*if (answer.find(element.id)) {
                element.classList.remove('hidden');
            }
            else {
                element.classList.add('hidden');
            }

            for (let i = 0; i < answer.length; i++) {
                console.log(answer.at(i).id);

                /!*if (element.id != answer.at(i).id) {
                    console.log("YES");
                    element.classList.add('hidden');
                } else {
                    element.classList.remove('hidden');
                }*!/
            }*/
        }
    });

    /*obs.push(answer.map(item => `${item.id}`).join(''));
    for (let i = 0; i < obs.length; i++) {
        console.log(obs.at(i));

        let cards = document.querySelectorAll('.product_card');
        cards.forEach(element => {
            console.log("1: " + element.id);
            console.log("2: " + obs.at(i));
            console.log("3: " + element.id == obs.at(i));
            console.log("4: " + element.id === obs.at(i));
            if (element.id == obs.at(i)) {
                element.classList.add('hidden');
            } else {
                element.classList.remove('hidden');
            }
        });
    }*/

    return answer;
}

const checkboxes = document.querySelectorAll('.Manufacturer_filter [type="checkbox"]');

const filters = {
    Manufacture: new Set(),
    Type: new Set()
};

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        console.clear();

        const target = e.target;
        const [prop, value] = target.name.split('-');

        filters[prop][target.checked ? 'add' : 'delete']('' + value);

        findServices(filters);
    })
});

document.onload = findServices(filters);

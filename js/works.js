const dropdownItems = document.querySelectorAll('.works-dropdown__clickable');
const dropdownList = document.querySelector('.works-dropdown__list');
const selector = document.getElementById('currentFilter');
const selectorParent = document.querySelector('.works-dropdown__selector');
const items = document.querySelectorAll('.works-showcase__tile');
const itemsContainer = document.querySelector('.works-showcase__tiles');

const rearrageTiles = function () {
    var subsProds = new Array();
    var count = 0;

    Array.from(items).forEach(function (item) {
        if (item.className.includes('hide')) {
            subsProds[count] = item;
            itemsContainer.removeChild(item);
            count++;
        }
    });

    subsProds.map(function (item, idx) {
        itemsContainer.appendChild(item);
    });
};

const dropdownSelection = function (e) {
    e.stopPropagation();
    const filter = e.target.dataset.filter;
    selector.innerText = filter;

    Array.from(items).forEach(function (item) {
        item.classList.remove('hide');
        const categories = item.dataset.category;
        if (!categories.includes(filter)) {
            item.classList.add('hide');
        }
    });
    rearrageTiles();
    dropdownList.classList.remove('active')
}

Array.from(dropdownItems).forEach(function (dropdownItem) {
    dropdownItem.addEventListener('click', dropdownSelection);
});

// Dropdown

selectorParent.addEventListener('click', function (e) {
    dropdownList.classList.toggle('active')
    e.stopPropagation();
});

$('body').on('click', function (e) {
    dropdownList.classList.remove('active')
    e.stopPropagation();
});


// Industries page
const queryString = window.location.search.substring(1);
if (queryString.toLowerCase() === 'industries') {
    selector.innerText = 'By Industries'
}
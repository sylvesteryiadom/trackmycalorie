// Storage Controller

// Item Controller
const itemCtrl = (function () {
    // item constructor
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // Data Structure/ State
    const data = {
        items: [{
                id: 0,
                name: "Steak Dinner",
                calories: 1200
            },
            {
                id: 1,
                name: "Cookie",
                calories: 100
            },
            {
                id: 2,
                name: "Eggs",
                calories: 400
            }
        ],

        currentItem: null,
        totalCalories: 0
    }

    // Public Methods
    return {
        getItems: function () {
            return data.items;
        },
    }
})();

// UI Controller
const UICtrl = (function () {
    // DOM Selectors
    const uiSelectors = {
        collection: document.querySelector('.collection'),
    }

    // Public Methods
    return {
        populateItemList: function (items) {
            let html = '';
            items.forEach((item) => {
                html += `<li class="collection-item" id="item-${item.id}">
                            <strong>${item.name} :</strong> <em>${item.calories} Calories</em>
                            <a href="" class="secondary-content">
                                <i class="edit-item fa fa-pencil"></i>
                            </a>
                        </li>`;
            });
            // Insert List items into UI.
            uiSelectors.collection.innerHTML = html;
        }
    }
})();

// Main App Controller
const App = (function (itemCtrl, UICtrl) {

    // Public Methods
    return {
        init: function () {
            // Fetch items from items data structure
            const items = itemCtrl.getItems();

            // Populate UI with items
            UICtrl.populateItemList(items);
        }
    }

})(itemCtrl, UICtrl);

App.init();
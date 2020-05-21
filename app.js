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

        logData: function () {
            return data;
        }
    }
})();

// UI Controller
const UICtrl = (function () {

    // Public Methods
    return {

    }
})();

// Main App Controller
const App = (function (itemCtrl, UICtrl) {


    // Public Methods
    return {
        init: function () {
            console.log('Initializing App .....');
        }
    }

})(itemCtrl, UICtrl);

App.init();
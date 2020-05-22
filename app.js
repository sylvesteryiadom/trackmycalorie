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
        items: [
            // {
            //     id: 0,
            //     name: "Steak Dinner",
            //     calories: 1200
            // },
            // {
            //     id: 1,
            //     name: "Cookie",
            //     calories: 100
            // },
            // {
            //     id: 2,
            //     name: "Eggs",
            //     calories: 400
            // }
        ],

        currentItem: null,
        totalCalories: 0
    }

    // Public Methods
    return {
        getItems: function () {
            return data.items;
        },
        addItem: function (name, calories) {
            // Create an ID;
            let ID;
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }
            // Parse Calories to integer
            calories = parseInt(calories);
            // Create new Item from the constructor;
            const newItem = new Item(ID, name, calories);
            data.items.push(newItem);

            // return the new item so it can be used in the UI controller
            return newItem;
        },
        getTotalCalories: function () {
            let total = 0;
            // loop through items and get total calories
            data.items.forEach((item) => {
                total += item.calories;
            });

            // Set total cal in data structure
            data.totalCalories = total;
            // return total calories
            return data.totalCalories;
        },
    }
})();

// UI Controller
const UICtrl = (function () {
    // DOM Selectors object
    const uiSelectors = {
        collection: document.querySelector('.collection'),
        addBtn: document.querySelector('.add-btn'),
        itemName: document.querySelector('#item-name'),
        itemCalorie: document.querySelector('#item-calories'),
        totalCalories: document.querySelector('.total-calories'),
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
        },
        getInputValues: function () {
            return {
                name: uiSelectors.itemName.value,
                calories: uiSelectors.itemCalorie.value,
            }
        },
        addListItem: function (item) {
            // list collection
            uiSelectors.collection.style.display = 'block';
            // create li
            const li = document.createElement('li');
            // add class
            li.className = `collection-item`;
            // add ID;
            li.id = `item-${item.ID}`;
            // add inner HTML
            li.innerHTML = `<strong>${item.name} :</strong> <em>${item.calories} Calories</em>
                        <a href="" class="secondary-content">
                            <i class="edit-item fa fa-pencil"></i>
                        </a>`;

            uiSelectors.collection.insertAdjacentElement('beforeend', li);
        },
        clearFields: function () {
            uiSelectors.itemName.value = '';
            uiSelectors.itemCalorie.value = '';
        },
        hideList: function () {
            uiSelectors.collection.style.display = 'none';
        },
        showTotalCalories: function (totalCalories) {
            uiSelectors.totalCalories.textContent = totalCalories;
        },
        // exposing the ui selectors to the app controller
        getDomSelectors: function () {
            return uiSelectors;
        },
    }
})();

// Main App Controller
const App = (function (itemCtrl, UICtrl) {
    // load event listeners
    const loadEventListeners = function () {
        // getting DOM selectors from UICtrl
        const UISelectors = UICtrl.getDomSelectors();

        // add item event **CLICK**
        UISelectors.addBtn.addEventListener('click', itemAddSubmit);
    }

    const itemAddSubmit = function (e) {
        // get UI input values
        const itemInput = UICtrl.getInputValues();

        // check for name and input
        if (itemInput.name !== '' && itemInput.calories !== '') {
            // add item to the data structure;
            const newItem = itemCtrl.addItem(itemInput.name, itemInput.calories);

            // Add item to UI List
            UICtrl.addListItem(newItem);

            // Get total calories
            const totalCalories = itemCtrl.getTotalCalories();

            // display total calories
            UICtrl.showTotalCalories(totalCalories);

            //clear fields;
            UICtrl.clearFields();

        } else {
            alert(`Please input meals and calories`);
        };

        e.preventDefault();
    }

    // Public Methods
    return {
        init: function () {
            console.log('App is working...');
            // Fetch items from items data structure
            const items = itemCtrl.getItems();
            if (items.length === 0) {
                UICtrl.hideList();
            } else {
                // Populate UI with items
                UICtrl.populateItemList(items);
            }
            // Get total calories
            const totalCalories = itemCtrl.getTotalCalories();
            // display total calories
            UICtrl.showTotalCalories(totalCalories);
            // event listeners
            loadEventListeners();
        }
    }

})(itemCtrl, UICtrl);

App.init();
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
        getItembyID: function (id) {
            let found = null;
            data.items.forEach(item => {
                if (item.id === id) {
                    found = item;
                }
            });
            return found;
        },
        setCurrentItem: function (item) {
            data.currentItem = item;
        },
        getCurrentItem: function () {
            return {
                name: data.currentItem.name,
                calories: data.currentItem.calories
            }
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
        logData: function () {
            return data;
        }
    }
})();

// UI Controller
const UICtrl = (function () {
    // DOM Selectors object
    const uiSelectors = {
        addBtn: document.querySelector('.add-btn'),
        backBtn: document.querySelector('.back-btn'),
        itemName: document.querySelector('#item-name'),
        updateBtn: document.querySelector('.update-btn'),
        deleteBtn: document.querySelector('.delete-btn'),
        collection: document.querySelector('.collection'),
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
            li.id = `item-${item.id}`;
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
        clearEditState: function () {
            UICtrl.clearFields();
            uiSelectors.updateBtn.style.display = 'none';
            uiSelectors.deleteBtn.style.display = 'none';
            uiSelectors.backBtn.style.display = 'none';
            uiSelectors.addBtn.style.display = 'inline';
        },
        showEditState: function () {
            uiSelectors.updateBtn.style.display = 'inline';
            uiSelectors.deleteBtn.style.display = 'inline';
            uiSelectors.backBtn.style.display = 'inline';
            uiSelectors.addBtn.style.display = 'none';
        },
        addItemtoForm: function () {
            uiSelectors.itemName.value = itemCtrl.getCurrentItem().name;
            uiSelectors.itemCalorie.value = itemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
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

        // Edit Icon click event
        UISelectors.collection.addEventListener('click', itemEditClick);

        //Item Update Submit
        UISelectors.updateBtn.addEventListener('click', itemUpdateSubmit);
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

    // Item edit click event
    const itemEditClick = function (e) {
        if (e.target.classList.contains('edit-item')) {
            // Get list item id(Eg: item-0)
            const listID = e.target.parentNode.parentNode.id;
            const split = listID.split('-');
            const id = parseInt(split[1]);

            // get item
            const itemtoEdit = itemCtrl.getItembyID(id);
            // console.log(itemtoEdit);

            // set current Item;
            itemCtrl.setCurrentItem(itemtoEdit);

            // add Item to form
            UICtrl.addItemtoForm();


        }
        e.preventDefault();
    }

    const itemUpdateSubmit = function (e) {

        e.preventDefault();
    }
    // Public Methods
    return {
        init: function () {
            console.log('App is working...');
            // set initial state
            UICtrl.clearEditState();
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
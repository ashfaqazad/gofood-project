import React, { createContext, useContext, useReducer } from "react";
// React components, createContext for creating context, useContext for consuming context, and useReducer for state management are imported from React.

const CartStateContext = createContext();
// Creating a context for the cart's state (CartStateContext), which will hold the current state of the cart.

const CartDispatchContext = createContext();
// Creating a context for the cart's dispatch function (CartDispatchContext), which will handle state changes in the cart.

const reducer = (state, action) => {
    console.log("Action:", action);
    console.log("State Before:", state);
  
// Defining the reducer function, which takes the current state and an action, and returns the new state based on the action type.

    switch (action.type) {
// Switch statement to determine which action type is being dispatched.

        case "ADD":
// If the action type is "ADD", the code will add a new item to the cart.

            return [
                ...state,
// Returning a new array with the existing state (current cart items).

                {
                    id: action.id,
                    name: action.name,
                    qty: action.qty,
                    size: action.size,
                    price: action.price,
                    img: action.img
// Creating a new item object with the properties provided by the action (id, name, qty, size, price, img) and adding it to the cart.
                }
            ];

        case "REMOVE":
// If the action type is "REMOVE", the code will remove an item from the cart.

            return state.filter((_, index) => index !== action.index);
// Filtering out the item at the specified index from the cart state.

        case "UPDATE":
// If the action type is "UPDATE", the code will update an existing item in the cart.

            return state.map(food =>
// Mapping through the cart items to find the item that needs to be updated.

                food.id === action.id
// Checking if the current item in the cart matches the ID provided in the action.

                    ? {
                        ...food,
                        qty: food.qty + parseInt(action.qty),
// Updating the quantity of the matched item by adding the new quantity.

                        price: action.price * (food.qty + parseInt(action.qty))
// Updating the price based on the new quantity.
                    }
                    : food
// If the item ID doesn't match, the item remains unchanged.
            );

        case "DROP":
// If the action type is "DROP", the code will empty the cart.

            let empArray = [];
// Creating an empty array to represent an empty cart.

            return empArray;
// Returning the empty array as the new state of the cart.

        default:
// If the action type doesn't match any case, the default case is executed.

            console.log("Error in Reducer");
// Logging an error message if an unknown action type is encountered.

            return state;
// Returning the current state unchanged if the action type is not recognized.
    }
};

export const CartProvider = ({ children }) => {
// Defining the CartProvider component which will provide the cart state and dispatch to its children.

    const [state, dispatch] = useReducer(reducer, []);
// Using the useReducer hook to initialize the cart state as an empty array and get the dispatch function.

    return (
        <CartDispatchContext.Provider value={dispatch}>
{/* Providing the dispatch function through CartDispatchContext to its children. */}

            <CartStateContext.Provider value={state}>
{/* Providing the cart state through CartStateContext to its children. */}

                {children}
{/* Rendering the children components inside the provider. */}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

export const useCart = () => useContext(CartStateContext);
// Exporting a custom hook `useCart` to allow components to access the cart state easily.

export const useDispatchCart = () => useContext(CartDispatchContext);
// Exporting a custom hook `useDispatchCart` to allow components to access the dispatch function easily.

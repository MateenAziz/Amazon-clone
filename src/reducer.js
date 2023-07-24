export const initialState = {
  basket: [],
  user: null,
  searchText: "",
};

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price * item.quantity + amount, 0);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      const existingItemIndex = state.basket.findIndex(
        (item) => item.id === action.item.id
      );
      if (existingItemIndex !== -1) {
        const updatedBasket = [...state.basket];
        updatedBasket[existingItemIndex].quantity++;
        // return {
        //   ...state,
        //   basket: updatedBasket,
        // };
      }
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "UPDATE_BASKET":
      const existingItemIndex2 = state.basket.findIndex(
        (item) => item.id === action.item.id
      );
      if (existingItemIndex2 !== -1) {
        const updatedBasket = [...state.basket];
        updatedBasket[existingItemIndex2].quantity = action.item.quantity;
        return {
          ...state,
          basket: updatedBasket,
        };
      }
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };
    case "CHANGE_QUANTITY":
      return {
        ...state,
        basket: [],
      };
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          "Can't remove product (id: ${action.id}) as it is not in basket!"
        );
      }

      return { ...state, basket: newBasket };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "UPDATE_SEARCH":
      return {
        ...state,
        searchText: action.searchText,
      };

    default:
      return state;
  }
};

export default reducer;

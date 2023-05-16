import { userConstants } from "../constants/userConstants";

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case userConstants.GETALL_SUCCESS:
      return { items: action.users.results };

    case userConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map((user) =>
          user.id === action.id ? { ...user, deleting: true } : user
        ),
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter((user) => user.id !== action.id),
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map((user) => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        }),
      };
    default:
      return state;
  }
}

export function userById(state = {}, action) {
  switch (action.type) {
    case userConstants.GETBYID_REQUEST:
      return {
        loading: true,
      };
    case userConstants.GETBYID_SUCCESS:
      return action.userById;

    case userConstants.GETBYID_FAILURE:
      return {
        error: action.error,
      };

    default:
      return state;
  }
}

export function newUser(state = {}, action) {
  switch (action.type) {
    case userConstants.NEWUSER_REQUEST:
      return {
        loading: true,
      };
    case userConstants.NEWUSER_SUCCESS:
      return action.newUser;

    case userConstants.NEWUSER_FAILURE:
      return {
        error: action.error,
      };

    default:
      return state;
  }
}

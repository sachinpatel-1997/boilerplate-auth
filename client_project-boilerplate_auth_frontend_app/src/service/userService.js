import api from "../utils/interceptor";
import { tokenService } from "./tokenService";

export const userService = {
  googleSignin,
  login,
  forgotpassword,
  resetpassword,
  logout,
  register,
  getAll,
  getById,
  update,
  updateAdmin,
  addUser,
  delete: _delete,
};

async function googleSignin(tokenId) {
  try {
    const response = await api.post(`/auth/google-signin`, tokenId);
    console.log("response", response.data);
    tokenService.setUser(response.data);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return Promise.reject(error);
  }
}

async function login(loginData) {
  try {
    const response = await api.post(`/auth/login`, loginData);
    console.log("response", response.data);
    tokenService.setUser(response.data);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return Promise.reject(error);
  }
}

async function forgotpassword(userEmail) {
  try {
    await api.post(`/auth/forgot-password`, userEmail);
  } catch (error) {
    console.log("error", error);
    return Promise.reject(error);
  }
}

async function resetpassword(userToken, newPassword) {
  try {
    await api.post(`/auth/reset-password?token=${userToken}`, newPassword);
  } catch (error) {
    console.log("error", error);
    return Promise.reject(error);
  }
}

async function register(user) {
  try {
    const response = await api.post(`/auth/register`, user);
    console.log(response)
    tokenService.setUser(response.data);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return Promise.reject(error);
  }
}

async function logout() {
  // tokenService.removeUser();
  try {
    const refreshToken = { refreshToken: tokenService.getLocalRefreshToken() };
    await api.post(`/auth/logout`, refreshToken);
    tokenService.removeUser();
  } catch (error) {
    console.log("error", error);
    return Promise.reject(error);
  }
}

async function getAll() {
  try {
    const response = await api.get(`/users`);
    return response.data;
  } catch (error) {
    console.log("error", error.response);
    return Promise.reject(error);
  }
}

async function getById(id) {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return Promise.reject(error);
  }
}

async function update(id, userData) {
  try {
    const response = await api.patch(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return Promise.reject(error);
  }
}

async function updateAdmin(id, userData) {
  let user = tokenService.getUser();

  try {
    const response = await api.patch(`/users/${id}`, userData);

    if (user.user.id === id) {
      user.user = response.data;
      tokenService.setUser(user);
    }

    return response.data;
  } catch (error) {
    console.log("error", error);
    return Promise.reject(error);
  }
}

async function addUser(userData) {
  try {
    const response = await api.post(`/users`, userData);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return Promise.reject(error);
  }
}

async function _delete(id) {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return Promise.reject(error);
  }
}

"use client";

const LOGIN_URL = process.env.NEXT_PUBLIC_BASE_URL + "/api/users/login";
const REGISTER_URL = process.env.NEXT_PUBLIC_BASE_URL + "/api/users/register";

const ADD_PRODUCT_URL =
  process.env.NEXT_PUBLIC_BASE_URL + "/api/products/create-product";
const GET_PRODUCTS_URL =
  process.env.NEXT_PUBLIC_BASE_URL + "/api/products/get-products";
const GET_PRODUCT_URL =
  process.env.NEXT_PUBLIC_BASE_URL + "/api/products/get-product/";
const DELETE_PRODUCT_URL =
  process.env.NEXT_PUBLIC_BASE_URL + "/api/products/remove-product/";
const UPDATE_PRODUCT_URL =
  process.env.NEXT_PUBLIC_BASE_URL + "/api/products/update-product/";

const ADD_STAFF_URL = process.env.NEXT_PUBLIC_BASE_URL + "/api/users/add-staff";
const GET_STAFF_URL = process.env.NEXT_PUBLIC_BASE_URL + "/api/users/get-staff";
const DELETE_STAFF_URL =
  process.env.NEXT_PUBLIC_BASE_URL + "/api/users/remove-staff/";
const GET_STAFF_BY_ID_URL =
  process.env.NEXT_PUBLIC_BASE_URL + "/api/users/get-staff/";
const UPDATE_STAFF_URL =
  process.env.NEXT_PUBLIC_BASE_URL + "/api/users/update-staff/";

const GENERATE_ORDER_URL =
  process.env.NEXT_PUBLIC_BASE_URL + "/api/bills/create-bill";
const GET_ORDERS_URL =
  process.env.NEXT_PUBLIC_BASE_URL + "/api/bills/get-bills";
const GET_ORDER_URL = process.env.NEXT_PUBLIC_BASE_URL + "/api/bills/get-bill/";

//********************************AUTH******************************************** *///
export const login = async (email: string, password: string, role: string) => {
  try {
    const response = await fetch(LOGIN_URL, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, role }),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error: any) {
    console.log("Login error:", error);
    return { error: error.message };
  }
};
export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    const response = await fetch(REGISTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error: any) {
    console.error("Registration error:", error);
    return { error: error.message };
  }
};
//***********************************PRODUCT***************************************** *///

export const addProduct = async (
  name: string,
  price: number,
  description: string,
  image: string,
  token: string
) => {
  try {
    const response = await fetch(ADD_PRODUCT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, price, description, image }),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error: any) {
    console.error("Add product error:", error);
    return { error: error.message };
  }
};
export const getProducts = async (token: string) => {
  try {
    const response = await fetch(GET_PRODUCTS_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error: any) {
    console.log("Get products error:", error);
    return { error: error.message };
  }
};
export const getProduct = async (id: string, token: string) => {
  try {
    const response = await fetch(GET_PRODUCT_URL + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error: any) {
    console.error("Get product error:", error);
    return { error: error.message };
  }
};
export const deleteProduct = async (id: string, token: string) => {
  try {
    const response = await fetch(DELETE_PRODUCT_URL + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error: any) {
    console.error("Delete product error:", error);
    return { error: error.message };
  }
};
export const updateProduct = async (
  id: string,
  name: string,
  price: number,
  description: string,
  image: string,
  token: string
) => {
  try {
    const response = await fetch(UPDATE_PRODUCT_URL + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, price, description, image }),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error: any) {
    console.error("Update product error:", error);
    return { error: error.message };
  }
};

//**********************************STAFF***************************************** *///

export const addStaff = async (
  firstName: string,
  lastName: string,
  email: string,
  role: string,
  password: string,
  token: string
) => {
  try {
    const response = await fetch(ADD_STAFF_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ firstName, lastName, email, role, password }),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error: any) {
    console.error("Add staff error:", error);
    return { error: error.message };
  }
};

export const getStaff = async (token: string) => {
  try {
    const response = await fetch(GET_STAFF_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error: any) {
    console.log("Get staff error:", error);
    return { error: error.message };
  }
};

export const getStaffById = async (id: string, token: string) => {
  try {
    const response = await fetch(GET_STAFF_BY_ID_URL + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error: any) {
    console.error("Get staff error:", error);
    return { error: error.message };
  }
};

export const deleteStaff = async (id: string, token: string) => {
  try {
    const response = await fetch(DELETE_STAFF_URL + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error: any) {
    console.error("Delete staff error:", error);
    return { error: error.message };
  }
};

export const updateStaff = async (
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  role: string,
  token: string
) => {
  try {
    const response = await fetch(UPDATE_STAFF_URL + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ firstName, lastName, email, role }),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error: any) {
    console.error("Update staff error:", error);
    return { error: error.message };
  }
};

//***********************************BILL**************************************** *///

export const generateOrder = async (
  customerName: string,
  customerPhone: string,
  paymentMethod: string,
  status: string,
  products: { id: number; quantity: number }[],
  token: string
) => {
  try {
    const response = await fetch(GENERATE_ORDER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        customerName,
        customerPhone,
        products,
        paymentMethod,
        status,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error: any) {
    console.error("Generate order error:", error);
    return { error: error.message };
  }
};

export const getOrders = async (token: string) => {
  try {
    const response = await fetch(GET_ORDERS_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error: any) {
    console.log("Get orders error:", error);
    return { error: error.message };
  }
};

const BASE_URL = "http://localhost:7070/api/";

async function handleHttpErrors(res) {
  if (!res.ok) {
    let errorData;
    try {
      errorData = await res.json();
    } catch {
      errorData = { msg: `HTTP ${res.status} Error` };
    }
    return Promise.reject({ status: res.status, message: errorData.msg || errorData.message || `HTTP ${res.status} Error`, fullError: errorData });
  }
  if (res.status === 204) {
    return Promise.resolve();
  }
  return res.json();
}

function makeOptions(method, addToken, body) {
  const opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
    },
  };
  if (addToken) {
    const token = localStorage.getItem("token");
    if (token) {
      opts.headers["x-access-token"] = token;
    }
  }
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
}

function buildUrl(endpoint, pathParams = {}, queryParams = {}) {
  let url = BASE_URL + endpoint;
  
  Object.keys(pathParams).forEach((key) => {
    url = url.replace(`{${key}}`, pathParams[key]);
  });
  
  const queryString = Object.keys(queryParams)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
    .join("&");
  
  if (queryString) {
    url += `?${queryString}`;
  }
  
  return url;
}

function apiCall(method, endpoint, pathParams = {}, queryParams = {}, body = null, addToken = true) {
  const url = buildUrl(endpoint, pathParams, queryParams);
  const options = makeOptions(method, addToken, body);
  
  console.log(`API Call: ${method} ${url}`, options);
  
  return fetch(url, options)
    .catch((error) => {
      console.error("Fetch error:", error);
      if (error.name === "TypeError" && error.message === "Failed to fetch") {
        const errorMsg = `Unable to connect to server at ${url}. This is usually caused by:
1. CORS issues - make sure your API server allows requests from http://localhost:5173
2. Server not running - verify the API server is running on http://localhost:7070
3. Network/firewall blocking the connection`;
        return Promise.reject({
          status: 0,
          message: errorMsg,
          url: url,
          error: error,
        });
      }
      return Promise.reject(error);
    })
    .then(handleHttpErrors);
}

const recipeFacade = {
  getAll: (category = null) => {
    const queryParams = category ? { category } : {};
    return apiCall("GET", "recipes", {}, queryParams);
  },

  getById: (id) => {
    return apiCall("GET", "recipes/{id}", { id });
  },

  create: (recipe) => {
    return apiCall("POST", "recipes", {}, {}, recipe);
  },

  update: (id, recipe) => {
    return apiCall("PUT", "recipes/{id}", { id }, {}, recipe);
  },

  delete: (id) => {
    return apiCall("DELETE", "recipes/{id}", { id });
  },

  addIngredient: (recipeId, ingredientRequest) => {
    return apiCall("POST", "recipes/{recipeId}/ingredients", { recipeId }, {}, ingredientRequest);
  },

  removeIngredient: (recipeId, ingredientId) => {
    return apiCall("DELETE", "recipes/{recipeId}/ingredients/{ingredientId}", { recipeId, ingredientId });
  },
};

export default recipeFacade;


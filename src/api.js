import axios from 'axios';

const resolveBaseURL = () => {
  const envBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
  if (envBaseUrl) return envBaseUrl;

  if (typeof window !== 'undefined') {
    const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
    if (isLocalhost) return 'http://localhost:3000';
  }

  return '';
};

const baseURL = resolveBaseURL();
const isStaticFallbackMode = !baseURL;
const DB_CACHE_KEY = 'esales-db-cache-v2';

const httpClient = axios.create({
  baseURL: baseURL || undefined,
  headers: {
    'Content-Type': 'application/json'
  },
});

let inMemoryDb = null;

const cloneData = (value) => JSON.parse(JSON.stringify(value));

const parsePathAndParams = (url) => {
  const parsedUrl = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
  return {
    path: parsedUrl.pathname.replace(/\/+$/, '') || '/',
    params: parsedUrl.searchParams
  };
};

const buildResponse = (data, status = 200) => ({
  data,
  status,
  statusText: status >= 200 && status < 300 ? 'OK' : 'ERROR',
  headers: {},
  config: {}
});

const getCollectionName = (path) => {
  const segments = path.split('/').filter(Boolean);
  return segments[0] || '';
};

const getResourceId = (path) => {
  const segments = path.split('/').filter(Boolean);
  return segments.length > 1 ? segments[1] : null;
};

const readDbFromStorage = () => {
  if (typeof window === 'undefined') return null;

  const raw = localStorage.getItem(DB_CACHE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const writeDbToStorage = (db) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(DB_CACHE_KEY, JSON.stringify(db));
};

const normalizeMediaPaths = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeMediaPaths(item));
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [key, normalizeMediaPaths(val)])
    );
  }

  if (typeof value === 'string') {
    if (value.startsWith('/src/assets/')) {
      const fileName = value.split('/').pop();
      return `/uploads/${fileName}`;
    }

    if (value.includes('http://localhost:3000/uploads/')) {
      return value.replace('http://localhost:3000/uploads/', '/uploads/');
    }
  }

  return value;
};

const loadDb = async () => {
  if (inMemoryDb) {
    return inMemoryDb;
  }

  const cachedDb = readDbFromStorage();
  if (cachedDb) {
    inMemoryDb = normalizeMediaPaths(cachedDb);
    writeDbToStorage(inMemoryDb);
    return inMemoryDb;
  }

  const response = await fetch('/db.json', { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Impossible de charger les données de fallback');
  }

  const db = await response.json();
  inMemoryDb = normalizeMediaPaths(db);
  writeDbToStorage(inMemoryDb);
  return inMemoryDb;
};

const persistDb = (db) => {
  inMemoryDb = db;
  writeDbToStorage(db);
};

const normalizeId = (value) => String(value);

const fallbackGet = async (url) => {
  const db = await loadDb();
  const { path, params } = parsePathAndParams(url);

  if (path === '/produits') {
    const allProducts = Array.isArray(db.produits) ? db.produits : [];
    const query = params.get('q');

    if (!query) {
      return buildResponse(cloneData(allProducts));
    }

    const lowered = query.toLowerCase();
    const filtered = allProducts.filter((product) =>
      (product.name || '').toLowerCase().includes(lowered)
    );
    return buildResponse(cloneData(filtered));
  }

  if (path.startsWith('/produits/')) {
    const productId = normalizeId(getResourceId(path));
    const allProducts = Array.isArray(db.produits) ? db.produits : [];
    const found = allProducts.find((item) => normalizeId(item.id) === productId);
    if (!found) return buildResponse(null, 404);
    return buildResponse(cloneData(found));
  }

  const collectionName = getCollectionName(path);
  const resourceId = getResourceId(path);
  const collection = Array.isArray(db[collectionName]) ? db[collectionName] : db[collectionName];

  if (!resourceId) {
    if (collectionName === 'users') {
      const email = params.get('email');
      const password = params.get('password');

      if (email && password) {
        const users = Array.isArray(collection) ? collection : [];
        const matched = users.filter(
          (user) =>
            (user.email || '').toLowerCase() === email.toLowerCase() && user.password === password
        );
        return buildResponse(cloneData(matched));
      }
    }

    return buildResponse(cloneData(collection ?? []));
  }

  const list = Array.isArray(collection) ? collection : [];
  const found = list.find((item) => normalizeId(item.id) === normalizeId(resourceId));
  if (!found) return buildResponse(null, 404);
  return buildResponse(cloneData(found));
};

const fallbackPost = async (url, payload = {}) => {
  const db = await loadDb();
  const { path } = parsePathAndParams(url);

  if (path === '/upload') {
    const filePath = typeof window !== 'undefined'
      ? `${window.location.origin}/uploads/1719579105590-vuejs_original_wordmark_logo_icon_146305.png`
      : '/uploads/1719579105590-vuejs_original_wordmark_logo_icon_146305.png';
    return buildResponse({ filePath }, 201);
  }

  const collectionName = getCollectionName(path);
  if (!Array.isArray(db[collectionName])) {
    db[collectionName] = [];
  }

  const newItem = {
    ...payload,
    id: payload.id || `${collectionName}-${Date.now()}`
  };

  db[collectionName].push(newItem);
  persistDb(db);
  return buildResponse(cloneData(newItem), 201);
};

const fallbackPut = async (url, payload = {}) => {
  const db = await loadDb();
  const { path } = parsePathAndParams(url);
  const collectionName = getCollectionName(path);
  const resourceId = getResourceId(path);

  if (!Array.isArray(db[collectionName])) {
    return buildResponse(null, 404);
  }

  const index = db[collectionName].findIndex(
    (item) => normalizeId(item.id) === normalizeId(resourceId)
  );

  if (index === -1) {
    return buildResponse(null, 404);
  }

  db[collectionName][index] = {
    ...db[collectionName][index],
    ...payload,
    id: db[collectionName][index].id
  };

  persistDb(db);
  return buildResponse(cloneData(db[collectionName][index]));
};

const fallbackDelete = async (url) => {
  const db = await loadDb();
  const { path } = parsePathAndParams(url);
  const collectionName = getCollectionName(path);
  const resourceId = getResourceId(path);

  if (!Array.isArray(db[collectionName])) {
    return buildResponse({}, 200);
  }

  if (!resourceId) {
    db[collectionName] = [];
    persistDb(db);
    return buildResponse({}, 200);
  }

  db[collectionName] = db[collectionName].filter(
    (item) => normalizeId(item.id) !== normalizeId(resourceId)
  );
  persistDb(db);
  return buildResponse({}, 200);
};

const apiClient = {
  get(url, config) {
    if (!isStaticFallbackMode) return httpClient.get(url, config);
    return fallbackGet(url);
  },
  post(url, data, config) {
    if (!isStaticFallbackMode) return httpClient.post(url, data, config);
    return fallbackPost(url, data);
  },
  put(url, data, config) {
    if (!isStaticFallbackMode) return httpClient.put(url, data, config);
    return fallbackPut(url, data);
  },
  patch(url, data, config) {
    if (!isStaticFallbackMode) return httpClient.patch(url, data, config);
    return fallbackPut(url, data);
  },
  delete(url, config) {
    if (!isStaticFallbackMode) return httpClient.delete(url, config);
    return fallbackDelete(url);
  }
};




// Nous ajoutons un interceptor pour inclure le token dans les headers si disponible
/*apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);*/

export default apiClient;
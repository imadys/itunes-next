interface FetchOptions extends Omit<RequestInit, 'body'> {
  body?: any
  params?: Record<string, string | number | boolean | undefined | null>
}

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: Response
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL

if (!BACKEND_URL) {
  console.warn('BACKEND_URL environment variable is not set. API calls will fail.')
}

function buildUrl(endpoint: string, params?: Record<string, string | number | boolean | undefined | null>): string {
  if (!BACKEND_URL) {
    throw new ApiError('Backend URL is not configured. Please set NEXT_PUBLIC_BACKEND_URL or BACKEND_URL environment variable.', 0)
  }
  
  const baseUrl = endpoint.startsWith('http') 
    ? endpoint 
    : `${BACKEND_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
  
  if (!params) return baseUrl
  
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value))
    }
  })
  
  const queryString = searchParams.toString()
  return queryString ? `${baseUrl}?${queryString}` : baseUrl
}

export async function apiFetch<T = any>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { body, headers = {}, params, ...restOptions } = options

  const url = buildUrl(endpoint, params)

  const config: RequestInit = {
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  }

  if (body) {
    config.body = typeof body === 'string' ? body : JSON.stringify(body)
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      throw new ApiError(
        `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        response
      )
    }

    const contentType = response.headers.get('content-type')
    
    if (contentType?.includes('application/json')) {
      return await response.json()
    }
    
    return response.text() as T
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error',
      0
    )
  }
}

export const api = {
  get: <T = any>(endpoint: string, options?: Omit<FetchOptions, 'method' | 'body'>) =>
    apiFetch<T>(endpoint, { ...options, method: 'GET' }),
    
  post: <T = any>(endpoint: string, body?: any, options?: Omit<FetchOptions, 'method' | 'body'>) =>
    apiFetch<T>(endpoint, { ...options, method: 'POST', body }),
    
  put: <T = any>(endpoint: string, body?: any, options?: Omit<FetchOptions, 'method' | 'body'>) =>
    apiFetch<T>(endpoint, { ...options, method: 'PUT', body }),
    
  patch: <T = any>(endpoint: string, body?: any, options?: Omit<FetchOptions, 'method' | 'body'>) =>
    apiFetch<T>(endpoint, { ...options, method: 'PATCH', body }),
    
  delete: <T = any>(endpoint: string, options?: Omit<FetchOptions, 'method' | 'body'>) =>
    apiFetch<T>(endpoint, { ...options, method: 'DELETE' }),
}

export { ApiError }

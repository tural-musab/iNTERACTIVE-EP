// Error Handling Utilities
// Centralized error handling with proper logging and user feedback

export class AppError extends Error {
  public readonly statusCode: number
  public readonly isOperational: boolean
  public readonly context?: Record<string, unknown>

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    context?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'AppError'
    this.statusCode = statusCode
    this.isOperational = isOperational
    this.context = context

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, this.constructor)
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(`Database Error: ${message}`, 500, true, context)
    this.name = 'DatabaseError'
  }
}

export class ValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(`Validation Error: ${message}`, 400, true, context)
    this.name = 'ValidationError'
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Kullanıcı bulunamadı', context?: Record<string, unknown>) {
    super(`Authentication Error: ${message}`, 401, true, context)
    this.name = 'AuthenticationError'
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Bu işlem için yetkiniz yok', context?: Record<string, unknown>) {
    super(`Authorization Error: ${message}`, 403, true, context)
    this.name = 'AuthorizationError'
  }
}

export class NetworkError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(`Network Error: ${message}`, 500, true, context)
    this.name = 'NetworkError'
  }
}

// Error logging function
export const logError = (error: Error | AppError, context?: Record<string, unknown>) => {
  const timestamp = new Date().toISOString()
  const errorInfo = {
    timestamp,
    name: error.name,
    message: error.message,
    stack: error.stack,
    context: {
      ...context,
      ...(error instanceof AppError ? error.context : {})
    }
  }

  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.error('🚨 Error occurred:', errorInfo)
  }

  // In production, you would send to logging service
  // Example: Sentry, LogRocket, or custom logging endpoint
  if (process.env.NODE_ENV === 'production') {
    // Send to external logging service
    // logToExternalService(errorInfo)
  }
}

// Async error handler wrapper
export const handleAsync = <T extends unknown[], R>(
  fn: (...args: T) => Promise<R>
) => {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args)
    } catch (error) {
      logError(error as Error, { function: fn.name, arguments: args })
      throw error
    }
  }
}

// Safe async function with error handling
export const safeAsync = <T extends unknown[], R>(
  fn: (...args: T) => Promise<R>,
  fallbackValue: R
) => {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args)
    } catch (error) {
      logError(error as Error, { 
        function: fn.name, 
        arguments: args,
        fallback: true 
      })
      return fallbackValue
    }
  }
}

// Error message translator for user-friendly messages
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AppError) {
    return error.message.split(': ')[1] || error.message
  }

  if (error instanceof Error) {
    // Common Supabase/PostgreSQL errors
    if (error.message.includes('duplicate key')) {
      return 'Bu kayıt zaten mevcut'
    }
    if (error.message.includes('foreign key')) {
      return 'İlişkili kayıt bulunamadı'
    }
    if (error.message.includes('not null')) {
      return 'Gerekli alanlar boş bırakılamaz'
    }
    if (error.message.includes('invalid input')) {
      return 'Geçersiz veri formatı'
    }
    if (error.message.includes('connection')) {
      return 'Bağlantı hatası - lütfen internet bağlantınızı kontrol edin'
    }
    if (error.message.includes('timeout')) {
      return 'İşlem zaman aşımına uğradı - lütfen tekrar deneyin'
    }
    
    return error.message
  }

  return 'Bilinmeyen bir hata oluştu'
}

// Retry mechanism for failed operations
export const retryAsync = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      logError(lastError, { attempt: i + 1, maxRetries })
      
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)))
      }
    }
  }

  throw lastError!
}

// Error boundary factory (to be used in individual components)
export const createErrorBoundary = () => {
  return {
    handleError: (error: Error, errorInfo?: string) => {
      logError(error, { errorInfo })
    },
    
    getFallbackComponent: (error: Error) => ({
      error,
      message: getErrorMessage(error),
      retry: () => window.location.reload()
    })
  }
}

// Validation helpers
export const validateRequired = (value: unknown, fieldName: string) => {
  if (value === null || value === undefined || value === '') {
    throw new ValidationError(`${fieldName} alanı gereklidir`)
  }
}

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new ValidationError('Geçerli bir e-posta adresi girin')
  }
}

export const validateRange = (value: number, min: number, max: number, fieldName: string) => {
  if (value < min || value > max) {
    throw new ValidationError(`${fieldName} ${min} ile ${max} arasında olmalıdır`)
  }
}
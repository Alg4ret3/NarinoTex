import { medusa } from '@/lib/medusa';

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface CustomerData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  has_account: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Register a new customer using Medusa's two-step registration flow
 * 1. Get registration token
 * 2. Create customer account
 */
export async function registerCustomer(data: RegisterData): Promise<CustomerData> {
  try {
    console.log('🔵 Intentando registrar usuario:', data.email);
    console.log('🔵 Backend URL:', process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL);
    
    // Step 1: Get registration token
    console.log('🔵 Paso 1: Obteniendo token de registro...');
    const registerResponse = await medusa.auth.register("customer", "emailpass", {
      email: data.email,
      password: data.password,
    });

    // Handle token response (SDK returns string token or object with token)
    const token = typeof registerResponse === 'string' ? registerResponse : (registerResponse as any)?.token;

    console.log('✅ Token de registro obtenido');

    if (!token) {
      throw new Error('No se pudo obtener el token de registro');
    }

    // Step 2: Create customer account using the registration token
    console.log('🔵 Paso 2: Creando cuenta de cliente...');
    const customerResponse = await medusa.store.customer.create(
      {
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
      },
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      } as any
    );

    console.log('✅ Cliente creado exitosamente');
    return customerResponse.customer as CustomerData;
  } catch (error: any) {
    console.error('❌ Error en registro:', error);
    console.error('❌ Detalles del error:', {
      message: error.message,
      status: error.status,
      response: error.response,
    });
    
    // Handle specific error cases
    if (error.message?.includes('fetch failed') || error.message?.includes('ECONNREFUSED')) {
      throw new Error('No se puede conectar con el servidor. Asegúrate de que el backend esté corriendo en http://localhost:9000');
    }
    
    if (error.message?.includes('already exists')) {
      throw new Error('Este email ya está registrado');
    }
    
    if (error.status === 500) {
      throw new Error('Error del servidor. Verifica que la base de datos esté corriendo.');
    }
    
    throw new Error(error.message || 'Error al registrar usuario. Verifica la consola para más detalles.');
  }
}

/**
 * Login customer and store session automatically
 */
export async function loginCustomer(data: LoginData): Promise<CustomerData> {
  try {
    console.log('🔵 Intentando login:', data.email);
    console.log('🔵 Backend URL:', process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL);
    
    // Login - the SDK will automatically store the session cookie
    console.log('🔵 Autenticando...');
    await medusa.auth.login("customer", "emailpass", {
      email: data.email,
      password: data.password,
    });

    console.log('✅ Autenticación exitosa');

    // Get customer data after successful login
    console.log('🔵 Obteniendo datos del cliente...');
    const customer = await getCurrentCustomer();
    
    if (!customer) {
      throw new Error('No se pudieron obtener los datos del cliente después del login');
    }

    console.log('✅ Login completado exitosamente');
    return customer;
  } catch (error: any) {
    console.error('❌ Error en login:', error);
    console.error('❌ Detalles del error:', {
      message: error.message,
      status: error.status,
      response: error.response,
    });
    
    // Handle specific error cases
    if (error.message?.includes('fetch failed') || error.message?.includes('ECONNREFUSED')) {
      throw new Error('No se puede conectar con el servidor. Asegúrate de que el backend esté corriendo en http://localhost:9000');
    }
    
    if (error.status === 401 || error.message?.includes('Invalid') || error.message?.includes('Unauthorized')) {
      throw new Error('Email o contraseña incorrectos');
    }
    
    if (error.status === 500) {
      throw new Error('Error del servidor. Verifica que la base de datos esté corriendo.');
    }
    
    throw new Error(error.message || 'Error al iniciar sesión. Verifica la consola para más detalles.');
  }
}

/**
 * Logout current customer
 */
export async function logoutCustomer(): Promise<void> {
  try {
    await medusa.auth.logout();
  } catch (error: any) {
    console.error('Logout error:', error);
    throw new Error(error.message || 'Error al cerrar sesión');
  }
}

/**
 * Get current authenticated customer
 */
export async function getCurrentCustomer(): Promise<CustomerData | null> {
  try {
    const response = await medusa.store.customer.retrieve();
    return response.customer as CustomerData;
  } catch (error: any) {
    // If not authenticated, return null instead of throwing
    if (error.status === 401) {
      return null;
    }
    
    console.error('Get customer error:', error);
    throw new Error(error.message || 'Error al obtener datos del usuario');
  }
}

/**
 * Update customer profile
 */
export async function updateCustomer(data: Partial<{
  first_name: string;
  last_name: string;
  phone: string;
}>): Promise<CustomerData> {
  try {
    const response = await medusa.store.customer.update(data);
    return response.customer as CustomerData;
  } catch (error: any) {
    console.error('Update customer error:', error);
    throw new Error(error.message || 'Error al actualizar perfil');
  }
}

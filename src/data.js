// Clean demo dataset: business records start empty so each demo workspace is fresh.
export const initialProducts = [];
export const initialCustomers = [];
export const initialSuppliers = [];
export const initialOrders = [];
export const initialWorkspaces = [{ id: 'ws-niss', name: 'Niss Technology', slug: 'niss-technology', businessType: 'Retail ERP Demo', createdAt: new Date().toISOString() }];
export const initialEmployees = [];
export const initialAttendance = [];
export const SUPER_ADMIN = { id: 'super-admin', name: 'Super Admin', email: 'admin@retailpro.demo', password: 'admin123', role: 'superadmin', workspaceId: null, shopName: 'Platform Control Center' };

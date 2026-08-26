export const MAINTENANCE_MODE = false;

export const isMaintenanceActive = MAINTENANCE_MODE && import.meta.env.PROD;

// Solo en local: http://localhost:5173/mantenimiento
export const MAINTENANCE_PREVIEW_PATH = '/mantenimiento';

export const isMaintenancePreviewPath = (pathname: string): boolean => {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return import.meta.env.DEV && path === MAINTENANCE_PREVIEW_PATH;
};

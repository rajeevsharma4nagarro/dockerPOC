import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const authToken = localStorage.getItem('token');
    if (authToken) {
        const clonedRequest = req.clone({
            setHeaders: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return next(clonedRequest);
    }
    return next(req);
};
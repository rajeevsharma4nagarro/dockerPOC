import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {

    const route = inject(Router);
    
    const authToken = localStorage.getItem('token');

    if(!authToken) {
        //If token not found rediret to login page.
        route.navigate(['/']);

        //Optionally cancel the request.
        //return next(req.clone({url:'about:blank'}));
    } else {
        //Add token to header
        const clonedRequest = req.clone({
            setHeaders: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return next(clonedRequest);
    }
    return next(req);
};
// app.routes.ts
import { Routes } from  '@angular/router';
import { Home } from  './home/home';
import { Products } from  './products/products';
import { Contact } from  './contact/contact';
import { ProductDetail } from './product-detail/product-detail';

// import auth guard and login component
import { authGuard } from './auth-guard';
import { Login } from  './login/login';

// Also create a login route and secure with [authGuard]!
export  const  routes:  Routes  = [
    {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
    },
    {
    path: 'home',
    component: Home
    },
    {
    path: 'products',
    component: Products
    },
    {
        path: 'product-detail/:id',
        component: ProductDetail
    },
    {
    path: 'contact',
    canActivate: [authGuard],
    component: Contact
    },
    {
    path: 'login',
    component: Login
    }
];
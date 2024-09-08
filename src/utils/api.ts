/**
 * Entities
 */
interface Product {
    id: string;
    name: string;
    description: string;
    categories: string[];
    assets: string[];
    variants: string[];
}

/**
 * Routes
 *
 * This file contains the types for the routes in the API.
 */

// Base request
interface BaseRequest {
    route: string;
    requestRoute: string;
    data: unknown;
    params: Record<string, unknown>;
}

interface CategoriesProductsFilter extends BaseRequest {
    route: `/categories/:slug/products/filter`;
    requestRoute: `/categories/${string}/products/filter`;
    data: Product[];
    params: {
        page: number;
        perPage: number;
    };
}

interface ProductsIndex {
    route: `/products`;
    requestRoute: '/products';
    data: Product[];
    params: {
        page: number;
        perPage: number;
    };
}

interface ProductsShow extends BaseRequest {
    route: '/products/:slug';
    requestRoute: `/products/${string}`;
    data: Product;
    params: Record<string, never>;
}

type Routes = CategoriesProductsFilter | ProductsIndex | ProductsShow;

/**
 * Utils
 *
 * These types are used to extract data from the routes.
 */
type DataOf<Route extends Routes['route']> = Extract<Routes, { route: Route }>['data'];
type ViaRequestRoute<Route extends Routes['requestRoute']> = Extract<
    Routes,
    { requestRoute: Route }
>;
type DataPropertyOf<
    Route extends Routes['route'],
    Property extends keyof DataOf<Route>,
> = DataOf<Route>[Property];

type ItemOf<Route extends Routes['route']> = DataOf<Route> extends (infer Item)[] ? Item : never;

export type { DataOf, DataPropertyOf, ItemOf, Routes };

const request = async <Route extends Routes['requestRoute']>(
    route: Route,
    options?: RequestInit & { params: Extract<Routes, { route: Route }>['params'] },
) => {
    // @ts-expect-error Incorrect type
    const fullRoute = route + new URLSearchParams(options?.params).toString();
    const response = await fetch(fullRoute);
    return response.json() as Promise<ViaRequestRoute<Route>['data']>;
};

export default request;

interface User {
    name: string;
}
interface Product {
    name: string;
}

type RoutesType = readonly [string, unknown][];

type Route<T extends RoutesType> = T[number][0];

type ExtractType<_EndPoints extends RoutesType, _UserRoute extends Route<_EndPoints>> = {
    [K in keyof _EndPoints]: _EndPoints[K] extends [infer _Route, infer _Type]
        ? _UserRoute extends _Route
            ? _Type
            : never
        : never;
}[number];

type ConvertRouteToTemplateRoute<
    T extends string,
    DoesUseName extends boolean,
> = T extends `${infer Before}/${infer After}`
    ? `${RouteSegmentInsersion<Before, DoesUseName>}/${ConvertRouteToTemplateRoute<
          After,
          DoesUseName
      >}`
    : RouteSegmentInsersion<T, DoesUseName>;
type RouteSegmentInsersion<
    Segment extends string,
    DoesUseName extends boolean,
> = Segment extends `${infer Name}:${infer Type}`
    ? DoesUseName extends true
        ? `:${Name}`
        : Type
    : Segment;

type GetTemplateRoute<T extends string> =
    | ConvertRouteToTemplateRoute<T, false>
    | ConvertRouteToTemplateRoute<T, true>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const request = async <T extends Route<Routes>>(route: T) => {
    const baseUrl = 'https://jsonplaceholder.typicode.com';
    const response = await fetch(baseUrl + route);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const data = (await response.json()) as ExtractType<Routes, typeof route>;
    return data;
};

type Routes = [
    [GetTemplateRoute<`/user/userId:${number}`>, User],
    [GetTemplateRoute<`/users/`>, User[]],
    [GetTemplateRoute<`/`>, boolean],
    // [GetTemplateRoute<`/user/?userId=${number}`>, User],
    [GetTemplateRoute<`/products/productId:${number}/`>, Product],
];

// let users = request('/products/4/');
// let user = request('/user/2');
// let user2 = request('/user/3');
// let root = request('/');
// let products = request('/products/2/');

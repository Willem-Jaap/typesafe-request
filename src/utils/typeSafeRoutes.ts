interface User {
    name: string;
}

type RoutesType = readonly [string, any][];

type Route<T extends RoutesType> = T[number][0];

type ExtractType<_EndPoints extends RoutesType, _UserRoute extends Route<_EndPoints>> = {
    [K in keyof _EndPoints]: _EndPoints[K] extends [infer _Route, infer _Type]
        ? _UserRoute extends _Route
            ? _Type
            : never
        : never;
}[number];

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
    [`/user/${string}/`, User],
    [`/users`, User[]],
    [`/`, boolean],
    [`/user/?userId=${number}`, User],
];

const response = request(`/users`);

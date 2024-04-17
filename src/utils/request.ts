// Entities
interface User {
    id: number;
    name: string;
    email: string;
    address: Address;
}

interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

interface Geo {
    lat: string;
    lng: string;
}
interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

interface UserResource {
    endpoint: '/users';
    data: User[];
    params?: {
        userId: string;
    };
    searchParams?: {
        name: string;
    };
}

interface PostResource {
    endpoint: '/posts';
    data: Post[];
    params?: {
        id: number;
    };
    searchParams?: {
        title: string;
    };
}
type GetAvailableRoutes<Resource> = Resource extends { endpoint: infer Endpoint }
    ? Endpoint extends string
        ? Resource extends { endpoint: Endpoint; params: infer Params }
            ? `${Endpoint}${Params extends Record<string, string> ? `/${keyof Params}` : '/test'}`
            : Resource extends { endpoint: Endpoint }
              ? Endpoint
              : never
        : never
    : never;

type AllRoutes = GetAvailableRoutes<UserResource | PostResource>;

const request = async (
    // Endpoint prop of Request type
    input: AllRoutes,
    init?: RequestInit | undefined,
): Promise<Request> => {
    const baseUrl = 'https://jsonplaceholder.typicode.com';
    const response = await fetch(baseUrl + input, init);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const data = (await response.json()) as Request;
    return data;
};

export default request;

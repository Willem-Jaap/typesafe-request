// Entities
interface User {
    _endpoint: '/users';
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
    _endpoint: '/posts';
    id: number;
    userId: number;
    title: string;
    body: string;
}

type Request = User | Post;

const request = async (
    // Endpoint prop of Request type
    input: Request['_endpoint'],
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

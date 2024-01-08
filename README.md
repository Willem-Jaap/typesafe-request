# **Typesafe Request**

Have you ever requested data from an external API and always had to typecast the data to the type you want? Me too. Over the last few years I've encountered this problem over and over again. I've tried to solve it in different ways, but I've never been satisfied with the solutions. This project aims to create a simple and easy to use solution to this problem.

Help is always welcome, so if you have any ideas or want to contribute, please do so.

## Philosophy

Maybe you are used to this:

```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

const response = await fetch('https://example.com/api/user/1');
const user = (await user.json()) as User;
```

Or if you are a little more advanced, you maybe have used a custom request wrapper:

```typescript
const request = async <T>(url: string): Promise<T> => {
    const baseUrl = 'https://example.com/api/';
    const response = await fetch(baseUrl + url);
    return (await response.json()) as T;
};

const user = await request<User>('user/1');
```

This is better, but we want great. We want to be able to do this:

```typescript
const user = await request('/user/1');
```

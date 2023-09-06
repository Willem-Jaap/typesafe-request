import fs from 'fs';
import { json2ts } from 'json-ts';

const request = async (
    input: RequestInfo | URL,
    init?: RequestInit | undefined,
): Promise<Response> => {
    const response = await fetch(input, init);

    const responseData = await response.text();

    const types = json2ts(responseData);

    fs.writeFileSync('./.fetch-types.d.ts', types);

    console.log('TypeScript definition saved to ./.fetch-types.d.ts');
    return response;
};

export default request;

import request from '~utils/api';

// interface Props {
//     data: {
//         name: string;
//         description: string;
//         categories: string[];
//         assets: string[];
//         variants: string[];
//     };
// }

const Page = async () => {
    const response = await request(`/products`, {
        params: { page: 3, perPage: 10 },
    });
    console.log(response);

    return (
        <div className="m-8">
            <h1 className="text-4xl font-bold">Typesafe request</h1>
        </div>
    );
};

export default Page;

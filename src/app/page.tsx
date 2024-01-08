import request from '~utils/request';

const Page = async () => {
    const response = await request('/users');
    console.log(response);

    return (
        <div className="m-8">
            <h1 className="text-4xl font-bold">Typesafe request</h1>
        </div>
    );
};

export default Page;

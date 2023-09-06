import { Albert_Sans } from 'next/font/google';

import '~styles/global.css';
import request from '~utils/request';

interface Props {
    children: React.ReactNode;
}

const AlbertSansFont = Albert_Sans({
    subsets: ['latin'],
});

const RootLayout = async ({ children }: Props) => {
    await request('https://jsonplaceholder.typicode.com/posts');

    return (
        <html className={AlbertSansFont.className}>
            <body>{children}</body>
        </html>
    );
};

export default RootLayout;

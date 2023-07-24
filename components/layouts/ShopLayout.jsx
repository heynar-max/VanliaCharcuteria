import Head from 'next/head';
import { Navbar, SideMenu } from '../ui';



export const ShopLayout = ({ children, title, pageDescription, imageFullUrl }) => {
    return (
        <>
            <Head>
                <title>{title}</title>

                <meta name='description' content={ pageDescription }/>

                {/* para mostrar en las redes sociales cuando se comparte */}
                <meta name='og:title' content={ title }/>
                <meta name='og.description' content={ pageDescription }/>
                {
                    // && si tenemos muestre esta etiqueta
                    imageFullUrl && (
                        <meta name='og.image' content={ imageFullUrl }/>
                    )
                }

            </Head>

            <nav>
                {/* TODO: Navbar */}
                <Navbar/>
            </nav>

                {/* TODO: sidebar */}
                <SideMenu/>
            <main style={{
                margin: '100px auto',
                maxWidth: '1440px',
                padding: '0px 30px'
            }}>
                {children}
            </main>

            {/* Footer */}
            <footer>
                {/* Todo: footer */}
            </footer>
        </>
    )
}




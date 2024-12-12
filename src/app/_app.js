// src/app/_app.js
import '../globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Custom App component to initialize pages.
 * 
 * @param {Object} props - The properties object.
 * @param {React.ComponentType} props.Component - The active page component.
 * @param {Object} props.pageProps - The initial props for the page component.
 * @returns {JSX.Element} The layout with the active page component.
 */
function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
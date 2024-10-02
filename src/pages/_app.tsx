import "../styles/app.css";

export default function App<P extends {}>({
    Component,
    pageProps,
}: {
    Component: React.ComponentType<P>;
    pageProps: P;
}) {
    return <Component {...pageProps} />;
}

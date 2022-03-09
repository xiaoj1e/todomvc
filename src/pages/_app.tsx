import "../styles/app.css";

export default function App<P>({
    Component,
    pageProps,
}: {
    Component: React.ComponentType<P>;
    pageProps: P;
}) {
    return <Component {...pageProps} />;
}

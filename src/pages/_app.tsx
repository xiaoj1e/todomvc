import "../styles/app.css";

export type AppProps = {
    editing: boolean,
    id: number
};

export default function App({
    Component,
    pageProps,
}: {
    Component: React.ComponentType<AppProps>;
    pageProps: AppProps;
}) {
    return <Component {...pageProps} />;
}

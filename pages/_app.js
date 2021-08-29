import "../styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import CookieConsent from "react-cookie-consent";

function App({ Component, pageProps }) {
	const router = useRouter();

	useEffect(() => {
		const handleRouteChange = (url) => {
			window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
				page_path: url,
			});
		};
		router.events.on("routeChangeComplete", handleRouteChange);
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router.events]);

	return (
		<>
			<Component {...pageProps} />
			<CookieConsent
				location="bottom"
				buttonText="Sí, utilizar cookies."
				onAccept={() => location.reload()}
				cookieName="CookieConsent"
				expires={150}
				enableDeclineButton="true"
				declineButtonText="No, no utilizar cookies">
				Poner aquí el mensaje sobre el uso de cookies
				<a href="#enlace_hacia_politica_de_cookies">Política de Cookies</a>.
			</CookieConsent>
		</>
	);
}

export default App;

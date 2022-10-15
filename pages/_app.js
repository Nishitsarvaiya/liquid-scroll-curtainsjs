import '../styles/app.scss';
import { useEffect, useRef } from 'react';
import 'locomotive-scroll/src/locomotive-scroll.scss';
import { Curtains } from 'react-curtains';
import { SmoothScrollContextProvider } from '../context/SmoothScrollContextProvider';

function MyApp({ Component, pageProps }) {
	const pixelRatio = useRef(1.5);

	useEffect(() => {
		if (typeof window !== undefined) {
			pixelRatio.current = Math.min(1.5, window.devicePixelRatio);
		}
	}, []);

	return (
		<Curtains pixelRatio={pixelRatio.current} watchScroll={false} renderingScale={0.68}>
			<SmoothScrollContextProvider options={{ smooth: true, lerp: 0.16 }}>
				<div className='site-wrapper' data-scroll-container>
					<Component {...pageProps} />
				</div>
			</SmoothScrollContextProvider>
		</Curtains>
	);
}

export default MyApp;

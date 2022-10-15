import React, { createContext, useEffect, useState } from 'react';
import { useCurtains } from 'react-curtains';

export const SmoothScrollContext = createContext({
	scroll: null,
	useNativeScroll: false,
});

export const SmoothScrollContextProvider = ({ children, options }) => {
	const [scroll, setScroll] = useState(null);
	const [useNativeScroll, setUseNativeScroll] = useState(false);

	useEffect(() => {
		if (!scroll) {
			(async () => {
				try {
					const LocomotiveScroll = (await import('locomotive-scroll')).default;

					const smoothScroll = new LocomotiveScroll({
						el: document.querySelector('[data-scroll-container]') ?? undefined,
						...options,
					});

					setScroll(smoothScroll);
					setUseNativeScroll(smoothScroll.scroll.isMobile);
				} catch (error) {
					throw Error(`[SmoothScrollContextProvider]: ${error}`);
				}
			})();
		}

		return () => {
			scroll && scroll.destroy();
		};
	}, [scroll]); // eslint-disable-line react-hooks/exhaustive-deps

	useCurtains(
		(curtains) => {
			if (!useNativeScroll && scroll) {
				// we'll render only while lerping the scroll
				// curtains.disableDrawing();
				scroll.on('scroll', (obj) => {
					curtains.updateScrollValues(obj.scroll.x, obj.scroll.y);
					// render scene
					curtains.needRender();
				});
			}
		},
		[scroll]
	);

	return <SmoothScrollContext.Provider value={{ scroll, useNativeScroll }}>{children}</SmoothScrollContext.Provider>;
};

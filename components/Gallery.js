import { useRef, useState } from 'react';
import { FXAAPass, useCurtainsEvent } from 'react-curtains';
import SinglePlane from './Plane';
import unsplashUrls from '../lib/imageData';

const Gallery = () => {
	const [nbPlanes, setNbPlanes] = useState(4);
	const [planes, setPlanes] = useState([]);
	const planeDirection = useRef(0);

	useCurtainsEvent('onContextLost', (curtains) => {
		curtains.restoreContext();
	});

	useCurtainsEvent(
		'onRender',
		(curtains) => {
			// update our planes deformation
			// increase/decrease the effect
			planeDirection.current = curtains.lerp(planeDirection.current, 0, 0.075);

			// update planes deformations
			planes.forEach((plane) => {
				plane.uniforms.direction.value = planeDirection.current / 200;
			});
		},
		[planes]
	);

	useCurtainsEvent('onScroll', (curtains) => {
		// get scroll deltas to apply the effect on scroll
		const delta = curtains.getScrollDeltas();

		// invert value for the effect
		delta.y = -delta.y;

		// threshold
		if (delta.y > 60) {
			delta.y = 60;
		} else if (delta.y < -60) {
			delta.y = -60;
		}

		if (Math.abs(delta.y) > Math.abs(planeDirection.current)) {
			planeDirection.current = curtains.lerp(planeDirection.current, delta.y, 0.5);
		}
	});

	const onPlaneReady = (plane) => {
		plane.uniforms.time.value++;
		setPlanes((planes) => [...planes, plane]);
	};

	return (
		<>
			<div className='banner top'></div>
			<div id='page-content'>
				{unsplashUrls.map(({ url, title, description }, index) => (
					<SinglePlane
						key={index}
						index={index}
						title={title}
						url={url}
						decription={description}
						onPlaneReady={onPlaneReady}
					/>
				))}
			</div>
			{/* <FXAAPass /> */}
		</>
	);
};

export default Gallery;

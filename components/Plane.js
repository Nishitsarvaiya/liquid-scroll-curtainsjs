import { Plane } from 'react-curtains';
import { vs, fs } from '../shaders/shaders';

const SinglePlane = ({ url, title, description, index = 1, onPlaneReady = () => {} }) => {
	const planeParams = {
		uniforms: {
			direction: {
				name: 'uDirection',
				type: '1f',
				value: 0,
			},
			time: {
				name: 'uTime',
				type: '1f',
				value: 0,
			},
		},
		vertexShader: vs,
		fragmentShader: fs,
		widthSegments: 30,
		heightSegments: 30,
	};

	const direction = index % 2 === 0 ? 'direct' : 'reverse';

	return (
		<div className={`plane-container ${direction}`}>
			<div className='plane-details'>
				<h6>/{title}</h6>
				<div className='vertical-line' />
				<p>{description}</p>
			</div>
			<Plane {...planeParams} onRender={onPlaneReady} className='plane-image'>
				<img src={url} alt='' crossOrigin='anonymous' data-sampler='planeTexture' />
			</Plane>
		</div>
	);
};

export default SinglePlane;

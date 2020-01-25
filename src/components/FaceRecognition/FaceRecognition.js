import React from 'react';

const FaceRecognition = ({imageURL}) => { 
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
			<img alt = 'faceReg' src={imageURL} width='500px' heigh='auto'/>
			</div>
		</div>
	);
}

export default FaceRecognition;
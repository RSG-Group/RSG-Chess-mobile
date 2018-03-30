const getSizes = () => {
	const width = window.innerWidth,
				height = window.innerHeight;
				
	const sizes = {};

	if (width > height) {
		sizes.height = height / 1.05;
		sizes.width = sizes.height;
	} else {
		sizes.width = width / 1.05;
		sizes.height = sizes.width;
	}
	sizes.fontSize = sizes.width / 11.8;

	return sizes;
}

export default getSizes;

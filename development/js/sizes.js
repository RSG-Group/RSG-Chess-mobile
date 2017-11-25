const getSizes = () => {
	const width = window.innerWidth,
				height = window.innerHeight;
				
	const sizes = {};

	if (width > height) {
		sizes.height = height / 1.08;
		sizes.width = sizes.height;
	} else {
		sizes.width = width / 1.08;
		sizes.height = sizes.width;
	}
	sizes.fontSize = sizes.width / 15;

	return sizes;
}

export default getSizes;

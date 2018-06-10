const getSizes = (width, height) => {
  const sizes = {};

  if (width > height) {
    sizes.height = Math.floor(height / 8 / 4) * 4;
    sizes.width = sizes.height;
  } else {
    sizes.width = Math.floor(width / 8 / 4) * 4;
    sizes.height = sizes.width;
  }
  sizes.fontSize = Math.floor(sizes.width / 1.185);

  return sizes;
};

export default getSizes;

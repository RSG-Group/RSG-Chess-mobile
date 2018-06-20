const getSizes = (width, height) => {
  const sizes = {};

  if (width > height) {
    sizes.height = height / 8;
    sizes.width = sizes.height;
  } else {
    sizes.width = width / 8;
    sizes.height = sizes.width;
  }
  sizes.fontSize = Math.floor(sizes.width / 1.185);
  sizes.width = Math.floor(sizes.width / 4) * 4;
  sizes.height = Math.floor(sizes.height / 4) * 4;

  return sizes;
};

export default getSizes;

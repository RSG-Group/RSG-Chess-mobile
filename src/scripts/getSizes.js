const getSizes = (width, height) => {
  const sizes = {};

  if (width > height) {
    sizes.height = height / 7.9;
    sizes.width = sizes.height;
  } else {
    sizes.width = width / 7.9;
    sizes.height = sizes.width;
  }
  sizes.fontSize = Math.floor(sizes.width / 1.185);
  sizes.width = Math.floor(sizes.width / 4) * 4;
  sizes.height = Math.floor(sizes.height / 4) * 4;

  return sizes;
};

export default getSizes;

export const adsHeight = height => {
  if (height < 400) {
    return 30;
  } else if (height < 720) {
    return 52;
  } else {
    return 90;
  }
};

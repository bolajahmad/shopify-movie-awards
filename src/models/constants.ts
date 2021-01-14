export const size = {
  mobileM: 375,
  mobileL: 800,
  tablet: 900,
  laptop: 1024,
  laptopL: 1440,
};

export const device = {
  mobileM: `(min-width: ${size.mobileM}px)`,
  mobileL: `(max-width: ${size.mobileL}px)`,
  tablet: `(max-width: ${size.tablet}px)`,
  laptop: `(min-width: ${size.laptop}px)`,
  laptopL: `(min-width: ${size.laptopL}px)`,
};

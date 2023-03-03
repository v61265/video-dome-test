const sizes = {
  mobile: '720px',
  tablet: '920px',
  laptop: '1280px',
  laptopL: '1440px',
  desktop: '1920px',
}

const devices = {
  mobile: `(min-width: ${sizes.mobile})`,
  tablet: `(min-width: ${sizes.tablet})`,
  laptop: `(min-width: ${sizes.laptop})`,
  laptopL: `(min-width: ${sizes.laptopL})`,
  desktop: `(min-width: ${sizes.desktop})`,
}

export default { sizes, devices }

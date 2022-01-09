export const makeUriImage = (path: string, width: string = "w500") =>
  `https://image.tmdb.org/t/p/${width}${path}`;

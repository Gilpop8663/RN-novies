export const makeUriImage = (path: string, width: string = "w500") =>
  `https://image.tmdb.org/t/p/${width}${path}`;

export const isNextPage = (currentPage) => {
  const nextPage = currentPage.page + 1;
  return nextPage > currentPage.total_pages ? null : nextPage;
};

export const loadMore = (hasNextPage: boolean, fetchNextPage) =>
  hasNextPage ? fetchNextPage() : null;

export const keyExtractor = (item) => item.id + Math.random(1).toFixed(2);

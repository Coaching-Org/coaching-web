import queryString from "query-string";

export const DummyExample = {};

// export const usePaginationQuery = () => {
//   const parsed = queryString.parse(location.search);

//   const getPage = () => (parsed.page ? Number(parsed.page) : 1);
//   const getPerPage = () => (parsed.perPage ? Number(parsed.perPage) : 10);

//   const setPagination = (page: number, perPage: number) => {
//     parsed.page = page.toString();
//     parsed.perPage = perPage.toString();
//     location.search = queryString.stringify(parsed);
//   };

//   return { getPage, getPerPage, setPagination };
// };

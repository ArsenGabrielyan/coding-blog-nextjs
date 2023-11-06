import { useState } from "react";

export default function usePagination(data,dataPerPage){
     const [pageNumber, setPageNumber] = useState(0);
     const visited = pageNumber*dataPerPage;
     const pageCount = Math.ceil(data?.length/dataPerPage);
     const changePage = ({selected}) => setPageNumber(selected)
     return {
          data: data?.slice(visited,visited+dataPerPage),
          pageCount, changePage
     }
}
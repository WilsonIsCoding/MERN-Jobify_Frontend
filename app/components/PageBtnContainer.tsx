import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../styles/PageBtnContainer";
import { useAllJobsContext } from "@/app/context/AllJobsContext";
export default function PageBtnContainer() {
  const { numOfPages, currentPage }: any = useAllJobsContext();
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });
  const handlePageChange = ({ page }: { page: number }) => {
    console.log(page);
  };
  const renderPageButtons = () => {
    return pages.map((pageNumber) => {
      return (
        <>
          <button
            className={`btn page-btn ${pageNumber === currentPage && "active"}`}
            key={pageNumber}
            onClick={() => handlePageChange({ page: pageNumber })}
          >
            {pageNumber}
          </button>
        </>
      );
    });
  };
  return (
    <>
      {" "}
      <Wrapper>
        <button
          className="btn prev-btn"
          onClick={() => {
            let prevPage = currentPage - 1;
            if (prevPage < 1) prevPage = numOfPages;
            handlePageChange({ page: prevPage });
          }}
        >
          <HiChevronDoubleLeft />
          prev
        </button>
        {/* <div className="btn-container">{page}</div> */}
        <div className="btn-container">{renderPageButtons()}</div>
        <button
          className="btn next-btn"
          onClick={() => {
            let nextPage = currentPage + 1;
            if (nextPage > numOfPages) nextPage = 1;
            handlePageChange(nextPage);
          }}
        >
          next
          <HiChevronDoubleRight />
        </button>
      </Wrapper>
    </>
  );
}

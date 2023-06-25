export interface PaginationProps {
  itemsPerPage?: number;
  count: number;
  currentPage?: number;
  handlePageChange: (index: number) => void;
}
export default function Pagination({
  itemsPerPage = 6,
  count,
  currentPage = 1,
  handlePageChange,
}: PaginationProps) {
  return (
    <div>
      {count > itemsPerPage && (
        <div>
          {Array.from({ length: Math.ceil(count / itemsPerPage) }).map(
            (_, index) => (
              <button
                key={index}
                className={`mx-1 ${
                  currentPage === index + 1
                    ? " bg-orange text-white"
                    : " bg-slate-400  text-slate-700"
                } px-2 py-1 rounded`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

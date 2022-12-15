import useStyles from "../../../component/paginate/Styles";
function createArr(n) {
  return new Array(n).fill(0);
}
const CatePagination = ({ page, setPage, count }) => {
  const classes = useStyles();
  return (
    <>
      <div class="pt-3">
        <ul style={{ gap: "3px" }} class="pagination justify-content-end">
          <li
            className={page <= 1 ? "page-item disabled" : "page-item"}
            style={page <= 1 ? { "pointer-events": "none" } : {}}
            onClick={() => setPage(page - 1)}
          >
            <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
              <i class="fas fa-less-than"></i>
            </a>
          </li>
          {createArr(count).map((item, i) => {
            return (
              <li
                key={i}
                disabled={page === i + 1}
                onClick={() => setPage(i + 1)}
                className={"page-item"}
              >
                <a class="page-link" href="#">
                  {i + 1}
                </a>
              </li>
            );
          })}
          <li
            className={page >= count ? "page-item disabled" : "page-item"}
            style={page >= count ? { "pointer-events": "none" } : {}}
            onClick={() => setPage(page + 1)}
          >
            <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
              <i class="fas fa-greater-than"></i>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default CatePagination;

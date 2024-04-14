import ReactPaginate from 'react-paginate';

const Pagination = ({ currentPage, onChangePage, pageCount }) => {
	return (
		<ReactPaginate
			containerClassName="flex justify-center gap-1 sm:gap-4 select-none text-msh-light"
			breakLabel="..."
			nextLabel=">"
			onPageChange={(index) => onChangePage(index.selected + 1)}
			forcePage={currentPage - 1}
			marginPagesDisplayed={1}
			pageCount={pageCount}
			previousLabel="<"
			//
			pageLinkClassName="p-1 sm:p-4 block leading-none font-semibold"
			pageClassName="border bg-msh-dark rounded-sm border-msh-light hover:text-msh-dark hover:bg-msh-light transition-colors"
			activeLinkClassName="p-1 sm:p-4 block leading-none text-msh-dark font-semibold"
			activeClassName="border bg-msh-light rounded-sm border-msh-light"
			nextLinkClassName="p-1 sm:p-4 block leading-none font-semibold"
			nextClassName="border bg-msh-dark rounded-sm border-msh-light hover:text-msh-dark hover:bg-msh-light transition-colors"
			previousLinkClassName="p-1 sm:p-4 block leading-none font-semibold"
			previousClassName="border bg-msh-dark rounded-sm border-msh-light hover:text-msh-dark hover:bg-msh-light transition-colors"
		/>
	);
};

export default Pagination;

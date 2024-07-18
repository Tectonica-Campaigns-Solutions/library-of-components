import React from 'react';
import { usePagination, DOTS } from './hooks/UsePagination';

import './pagination-styles.scss';

interface PaginationProps {
  onPageChange: (pageNumber: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}

export const PAGE_SIZE = 12;

const Pagination: React.FC<PaginationProps> = (props) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  return (
    <ul className={'pagination-block'}>
      {paginationRange && paginationRange.map((pageNumber: string | number, index: number, array: (string | number)[]) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (typeof pageNumber === 'string' && pageNumber === String(DOTS)) {
          return (
            <li key={`${pageNumber}-dots`} className="pagination-item dots">
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <li
            key={pageNumber}
            className={`${pageNumber === currentPage ? 'pagination-item' : ''} ${
              pageNumber === currentPage ? 'active' : ''
            }`}
            onClick={() => onPageChange(Number(pageNumber))}
          >
            {pageNumber}
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;

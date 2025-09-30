'use client'

import { useToursContext } from '@/lib/stores/tours'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui'

const ToursPagination = () => {
  const { setPagination, pagination, fetchTours } = useToursContext()

  const handlePageChange = (newPage: number) => {
    setPagination({ ...pagination, page: newPage })
    fetchTours()
  }

  const totalPages = Math.ceil(pagination.total / pagination.limit)

  if (totalPages <= 1) return null

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => handlePageChange(pagination.page - 1)} className={!pagination.hasPrevPage ? 'opacity-50' : ''} />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink onClick={() => handlePageChange(1)} isActive={pagination.page === 1}>
            1
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink onClick={() => handlePageChange(2)} isActive={pagination.page === 2}>
            2
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink onClick={() => handlePageChange(totalPages)} isActive={pagination.page === totalPages}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext onClick={() => handlePageChange(pagination.page + 1)} className={!pagination.hasNextPage ? 'opacity-50' : ''} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default ToursPagination

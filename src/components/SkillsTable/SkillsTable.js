import React from 'react';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableContainer,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  DataTableSkeleton,
} from 'carbon-components-react';

const SkillsTable = ({ title, description, rows, headers, loading }) => {
  return (
    <div>
      {loading ? (
        <DataTableSkeleton columnCount={4} rowCount={25} />
      ) : (
        <DataTable rows={rows} headers={headers} isSortable>
          {({
            rows,
            headers,
            getHeaderProps,
            getRowProps,
            getTableProps,
            onInputChange,
          }) => (
            <TableContainer title={title} description={description}>
              <TableToolbar>
                <TableToolbarContent>
                  {/* pass in `onInputChange` change here to make filtering work */}
                  <TableToolbarSearch onChange={onInputChange} />
                </TableToolbarContent>
              </TableToolbar>
              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableHeader
                        key={header.key}
                        {...getHeaderProps({ header })}
                      >
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id} {...getRowProps({ row })}>
                      {row.cells.map((cell) => {
                        return (
                          <TableCell key={`${cell.id}_${cell.value}`}>
                            {cell.value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DataTable>
      )}
    </div>
  );
};

export default SkillsTable;

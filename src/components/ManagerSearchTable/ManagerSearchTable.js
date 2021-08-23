import React, { useState } from 'react';
import {
  DataTable,
  TableContainer,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
  TableToolbarAction,
  Button,
  Table,
  TableHead,
  TableRow,
  TableSelectAll,
  TableHeader,
  TableBody,
  TableCell,
  TableSelectRow,
  Tag,
} from 'carbon-components-react';

import ManagerView from '../ManagerView/ManagerView';

const ManagerSearchTable = ({
  rows,
  headers,
  title,
  managerView,
  setManagerView,
}) => {
  const [employeeId, setEmployeeId] = useState('');
  const handleLinkClick = (e, id) => {
    setEmployeeId(id);
    setManagerView(true);
  };
  return (
    <div>
      {!managerView && (
        <DataTable rows={rows} headers={headers} isSortable>
          {({
            rows,
            headers,
            getHeaderProps,
            getRowProps,
            getSelectionProps,
            getToolbarProps,
            getBatchActionProps,
            onInputChange,
            getTableProps,
            getTableContainerProps,
          }) => (
            <TableContainer
              title={title}
              description="Add User to Cart"
              {...getTableContainerProps()}
            >
              <TableToolbar {...getToolbarProps()}>
                <TableToolbarContent>
                  <TableToolbarSearch
                    persistent={true}
                    tabIndex={
                      getBatchActionProps().shouldShowBatchActions ? -1 : 0
                    }
                    onChange={onInputChange}
                  />
                  <TableToolbarMenu
                    tabIndex={
                      getBatchActionProps().shouldShowBatchActions ? -1 : 0
                    }
                  >
                    <TableToolbarAction onClick={() => alert('Alert 1')}>
                      Action 1
                    </TableToolbarAction>
                    <TableToolbarAction onClick={() => alert('Alert 2')}>
                      Action 2
                    </TableToolbarAction>
                    <TableToolbarAction onClick={() => alert('Alert 3')}>
                      Action 3
                    </TableToolbarAction>
                  </TableToolbarMenu>
                  <Button
                    tabIndex={
                      getBatchActionProps().shouldShowBatchActions ? -1 : 0
                    }
                    onClick={() => console.log('button clicked')}
                    size="small"
                    kind="primary"
                  >
                    Add to Cart
                  </Button>
                </TableToolbarContent>
              </TableToolbar>
              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    <TableSelectAll {...getSelectionProps()} />
                    {headers.map((header, i) => (
                      <TableHeader key={i} {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, i) => (
                    <TableRow key={i} {...getRowProps({ row })}>
                      <TableSelectRow {...getSelectionProps({ row })} />
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>
                          {!Array.isArray(cell.value)
                            ? cell.value
                            : cell.value.map((item, index) => {
                                return (
                                  <span key={index} className="user_result">
                                    <Tag
                                      style={{ borderRadius: '5px' }}
                                      onClick={(e) =>
                                        handleLinkClick(e, item.id)
                                      }
                                    >
                                      {item.name}
                                    </Tag>
                                  </span>
                                );
                              })}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DataTable>
      )}
      {managerView && <ManagerView employeeId={employeeId} />}
    </div>
  );
};

export default ManagerSearchTable;

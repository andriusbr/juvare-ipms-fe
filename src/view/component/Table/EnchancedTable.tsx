import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TableSortLabel, TextField } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';

import { PagedResponse } from '../../../store/paging/pagedResponse';
import { DEFAULT_TABLE_SIZE } from '../../../constant/TableConfig';

export interface Header {
    id: string;
    label: string;
}

interface EnhancedTableHeadProps {
    header: Header[];
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750,
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
        labelBold: {
            fontWeight: 'bold',
        },
    }),
);

type Order = 'asc' | 'desc';

interface EnhancedTableProps {
    Actions?: JSX.Element;
    data: PagedResponse<any> | undefined;
    defSortCol: string;
    defSortDir: Order;
    header: Header[];
    isLoading?: boolean;
    onPageChange: (newPage: number, keyword: string, sortCol: string, sortDir: string) => void;
}

const EnhancedTable: React.FC<EnhancedTableProps> = ({
    Actions,
    data,
    defSortCol,
    defSortDir,
    header,
    onPageChange,
    isLoading,
}: EnhancedTableProps) => {
    const classes = useStyles();
    const [keyword, setKeyword] = useState('');
    const [sortCol, setSortCol] = useState(defSortCol);
    const [sortDir, setSortDir] = useState<Order>(defSortDir);
    const [page, setPage] = useState(0);

    const EnhancedTableHead = ({ header }: EnhancedTableHeadProps) => {
        return (
            <TableHead>
                <TableRow>
                    {header.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            padding={'default'}
                            sortDirection={sortCol === headCell.id ? sortDir : false}
                        >
                            <TableSortLabel
                                active={sortCol === headCell.id}
                                className={classes.labelBold}
                                direction={sortCol === headCell.id ? sortDir : 'asc'}
                                onClick={() => handleSort(headCell.id)}
                            >
                                {headCell.label}
                                {sortCol === headCell.id ? (
                                    <span className={classes.visuallyHidden}>
                                        {sortDir === 'desc'
                                            ? 'sorted descending'
                                            : 'sorted ascending'}
                                    </span>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    };

    const handleSort = (sortColumn: string) => {
        const isAsc = sortCol === sortColumn && sortDir === 'asc';
        const sortDirection = isAsc ? 'desc' : 'asc';
        setSortCol(sortColumn);
        setSortDir(sortDirection);
        setPage(0);
        onPageChange(0, keyword, sortColumn, sortDirection);
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
        onPageChange(newPage, keyword, sortCol, sortDir);
    };

    const onKeywordChange = (newKeyword: string) => {
        setKeyword(newKeyword);
        onPageChange(0, newKeyword, sortCol, sortDir);
        setPage(0);
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <div style={{ height: 8 }}>{isLoading && <LinearProgress />}</div>
                <div
                    style={{
                        padding: 16,
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 16,
                    }}
                >
                    {Actions && Actions}
                    <TextField
                        id="filled-search"
                        label="Search"
                        type="search"
                        value={keyword}
                        onChange={(event) => {
                            onKeywordChange(event.target.value);
                        }}
                    />
                </div>
                <TableContainer>
                    <Table className={classes.table} size={'medium'}>
                        <EnhancedTableHead header={header} />
                        <TableBody>
                            {data?.content.map((row) => {
                                return (
                                    <TableRow key={row.id} hover>
                                        {header.map((value, index) => (
                                            <TableCell key={`id@${row[value.id]}@index:${index}`}>
                                                {row[value.id]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={data === undefined ? 0 : data.totalElements}
                    page={page}
                    rowsPerPage={DEFAULT_TABLE_SIZE}
                    rowsPerPageOptions={[DEFAULT_TABLE_SIZE]}
                    onChangePage={handleChangePage}
                />
            </Paper>
        </div>
    );
};

export default EnhancedTable;

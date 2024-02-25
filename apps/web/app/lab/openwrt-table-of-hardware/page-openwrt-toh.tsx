/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-array-index-key */
'use client';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { utcToLocal } from '@utils/parse-date';
import { FilterMatchMode } from 'primereact/api';
import type { ColumnFilterElementTemplateOptions } from 'primereact/column';
import type { DataTableStateEvent } from 'primereact/datatable';
import type { SelectItemOptionsType } from 'primereact/selectitem';
import getOpenwrtTohLazy from '@utils/request/client-side/get-openwrt-toh-lazy';
import { columns } from './columns';
import type { ColumnData } from './columns';

const MultiSelectFilterTemplate: React.FC<{
  filterOptions: ColumnFilterElementTemplateOptions;
  selectOptions: SelectItemOptionsType;
}> = ({ filterOptions, selectOptions }) => {
  return (
    <MultiSelect
      filter
      onChange={(e) => filterOptions.filterApplyCallback(e.value)}
      options={selectOptions}
      placeholder='Any'
      value={filterOptions.value}
    />
  );
};

const Time: React.FC<{ timestamp: string }> = ({ timestamp }) => <time dateTime={timestamp}>{utcToLocal(timestamp, 'MMM DD, YYYY')}</time>;

interface PageOpenwrtTohProps {
  data: any;
  availableValues: any;
}

const PageOpenwrtToh: React.FunctionComponent<PageOpenwrtTohProps> = ({ data, availableValues }) => {
  const [visibleColumns, setVisibleColumns] = useState<ColumnData[]>([
    {
      name: 'deviceName',
      label: 'Device Name',
      filterMode: 'standard',
    },
    {
      name: 'cpu',
      label: 'CPU',
      filterMode: 'multiSelect',
    },
    {
      name: 'supportedcurrentrel',
      label: 'Supported Current Release',
      filterMode: 'multiSelect',
    },
    {
      name: 'cpucores',
      label: 'CPU Cores',
      filterMode: 'multiSelect',
    },
    {
      name: 'cpumhz',
      label: 'CPU MHz',
      filterMode: 'multiSelect',
    },
    {
      name: 'flashmb',
      label: 'Flash (MB)',
      filterMode: 'standard',
    },
    {
      name: 'rammb',
      label: 'RAM (MB)',
      filterMode: 'multiSelect',
    },
  ]);

  const onColumnToggle = ({ value }: { value: ColumnData[] }): void => {
    const orderedSelectedColumns = columns.filter((col) => value.some((selectedColumn) => selectedColumn.name === col.name));
    setVisibleColumns(orderedSelectedColumns);
  };

  // Filter
  const defaultFilters = columns.reduce((acc: Record<string, { value: any[] | string; matchMode: FilterMatchMode }>, col) => {
    if (col.filterMode === 'multiSelect') {
      acc[col.name] = { value: [], matchMode: FilterMatchMode.IN };
      return acc;
    }
    acc[col.name] = { value: '', matchMode: FilterMatchMode.STARTS_WITH };
    return acc;
  }, {});

  // Pagination
  const [content, setContent] = useState(data);
  const [lazyDataTableState, setLazyDataTableState] = useState<DataTableStateEvent>({
    // Pagination
    first: 0,
    rows: 10,
    page: 0,
    pageCount: content.totalPages,

    // Filtering
    filters: defaultFilters,

    // Sorting
    sortField: '',
    sortOrder: -1,
    multiSortMeta: [
      { field: 'supportedcurrentrel', order: -1 },
      { field: 'cpucores', order: -1 },
      { field: 'cpumhz', order: -1 },
      { field: 'flashmb', order: -1 },
      { field: 'rammb', order: -1 },
    ],
  });

  const onFilter = (event: DataTableStateEvent): void => {
    // Reset pagination to first page when filtering
    event.first = 0;
    event.page = 0;
    setLazyDataTableState(event);
  };

  const onPage = (event: DataTableStateEvent): void => {
    setLazyDataTableState(event);
  };

  const onSort = (event: DataTableStateEvent): void => {
    setLazyDataTableState(event);
  };

  const fetchData = async (): Promise<void> => {
    const newPageData = await getOpenwrtTohLazy(lazyDataTableState);
    setContent(newPageData);
  };
  useEffect(() => {
    void fetchData();
  }, [lazyDataTableState]);

  return (
    <section className='w-[260px] sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1536px]'>
      <DataTable
        // Use database id instead of pid from ToH, because id is guaranteed to be unique
        currentPageReportTemplate='Jump to page (1 - {totalPages}):'
        dataKey='id'
        filterDisplay='row'
        filters={lazyDataTableState.filters}
        first={lazyDataTableState.first}
        header={() => (
          <MultiSelect filter onChange={onColumnToggle} optionLabel='label' options={columns} placeholder='Select Columns' value={visibleColumns} />
        )}
        lazy // lazy is required to trigger custom totalRecords: https://github.com/orgs/primefaces/discussions/242
        multiSortMeta={lazyDataTableState.multiSortMeta}
        onFilter={onFilter}
        onPage={onPage}
        onSort={onSort}
        paginator
        paginatorTemplate='RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport JumpToPageInput'
        pt={{
          root: {
            className: 'w-full',
          },
        }}
        removableSort
        rows={lazyDataTableState.rows}
        rowsPerPageOptions={[10, 50, 100, 10000]}
        scrollHeight='700px'
        scrollable
        sortField={lazyDataTableState.sortField}
        sortMode='multiple'
        sortOrder={lazyDataTableState.sortOrder}
        totalRecords={content.totalDocs}
        value={content.docs}
        virtualScrollerOptions={{
          itemSize: 64,
        }}
      >
        {/* Create all columns with name as field, label as header */}
        {visibleColumns.map((col, i) => {
          if (col.name === 'createdAt' || col.name === 'updatedAt') {
            return (
              <Column
                body={(rowData) => <Time timestamp={col.name === 'createdAt' ? (rowData.createdAt as string) : (rowData.updatedAt as string)} />}
                field={col.name}
                header={col.label}
                key={i}
                pt={{
                  // Min width must be at bodyCellm not root
                  // Although both yield the same result, using root causes a side effect
                  // The sortBadge counter will stretch of the entire column, if using root
                  bodyCell: {
                    className: 'min-w-60',
                  },
                }}
                sortable
              />
            );
          }
          if (col.filterMode === 'multiSelect') {
            return (
              <Column
                field={col.name}
                filter
                filterElement={(filterOptions) => (
                  <MultiSelectFilterTemplate filterOptions={filterOptions} selectOptions={availableValues.docs[col.name]} />
                )}
                filterMatchMode={FilterMatchMode.IN}
                header={col.label}
                key={i}
                showFilterMatchModes={false}
                sortable
              />
            );
          }
          return (
            <Column field={col.name} filter filterField={col.name} filterPlaceholder={`Search by ${col.label}`} header={col.label} key={i} sortable />
          );
        })}
      </DataTable>
    </section>
  );
};

export default PageOpenwrtToh;

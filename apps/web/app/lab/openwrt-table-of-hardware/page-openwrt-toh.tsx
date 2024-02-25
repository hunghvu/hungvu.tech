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
import { Button } from 'primereact/button';
import { RichText } from 'app/_components/richtext';
import { Divider } from 'primereact/divider';
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
  availableValues: any;
  contentData: any;
  tohData: any;
}

const PageOpenwrtToh: React.FunctionComponent<PageOpenwrtTohProps> = ({ availableValues, contentData, tohData }) => {
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
    acc[col.name] = { value: '', matchMode: FilterMatchMode.CONTAINS };
    return acc;
  }, {});

  // Pagination
  const [newTohData, setNewTohData] = useState(tohData);
  const [lazyDataTableState, setLazyDataTableState] = useState<DataTableStateEvent>({
    // Pagination
    first: 0,
    rows: 10,
    page: 0,
    pageCount: newTohData.totalPages,

    // Filtering
    filters: defaultFilters,

    // Sorting
    // Sort field and order are unused, but is required to be present based on DataTableStateEvent type
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
    const newData = await getOpenwrtTohLazy(lazyDataTableState);
    setNewTohData(newData);
  };
  useEffect(() => {
    void fetchData();
  }, [lazyDataTableState]);

  return (
    <section className='flex flex-col gap-4 p-4 break-words bg-[#00002f]/80 border border-1 border-zinc-500 rounded-md w-full sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1536px]'>
      <hgroup className='flex flex-col gap-6 w-full'>
        <h1 className='text-3xl md:text-4xl font-extrabold'>{contentData.title}</h1>
        <p className='text-xl md:text-2xl font-light text-zinc-200 italic'>{contentData.subTitle}</p>
      </hgroup>
      <Divider />
      <RichText nodes={contentData.body.root.children} />
      <div className='mt-16'>
        <DataTable
          // Use database id instead of pid from ToH, because id is guaranteed to be unique
          currentPageReportTemplate='Jump to page (1 - {totalPages}):'
          dataKey='id'
          filterDisplay='row'
          filters={lazyDataTableState.filters}
          first={lazyDataTableState.first}
          header={() => (
            <div className='flex flex-col md:flex-row justify-start items-center gap-4 md:gap-8'>
              <Button
                label='Clear Filters'
                onClick={() => setLazyDataTableState({ ...lazyDataTableState, filters: defaultFilters })}
                pt={{ root: { className: 'w-full md:w-[128px]' } }}
              />
              <Button
                label='Clear Sorts'
                onClick={() => setLazyDataTableState({ ...lazyDataTableState, multiSortMeta: [] })}
                pt={{ root: { className: 'w-full md:w-[120px]' } }}
              />
              <p className='text-xl w-full md:w-[150px]'>Show Columns</p>
              <MultiSelect
                filter
                onChange={onColumnToggle}
                optionLabel='label'
                options={columns}
                placeholder='Select Columns'
                value={visibleColumns}
              />
            </div>
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
          totalRecords={newTohData.totalDocs}
          value={newTohData.docs}
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
              <Column
                field={col.name}
                filter
                filterField={col.name}
                filterMatchModeOptions={[
                  { label: 'Contains', value: FilterMatchMode.CONTAINS },
                  { label: 'Equals', value: FilterMatchMode.EQUALS },
                  { label: 'Not Equals', value: FilterMatchMode.NOT_EQUALS },
                ]}
                filterPlaceholder={`Search by ${col.label}`}
                header={col.label}
                key={i}
                sortable
              />
            );
          })}
        </DataTable>
      </div>
    </section>
  );
};

export default PageOpenwrtToh;

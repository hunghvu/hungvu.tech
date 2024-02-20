/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react/no-array-index-key */
'use client';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from 'react';
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

const addDeviceName = (data: any): ColumnData[] =>
  data.docs.map((row: any) => ({ ...row, deviceName: `${row.brand} / ${row.model} / ${row.version}` }));

const PageOpenwrtToh: React.FunctionComponent<{ data: any }> = ({ data }) => {
  //////////////////////////
  // Column toggle
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
      filterMode: 'multiSelect',
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
  const header = (
    <MultiSelect filter onChange={onColumnToggle} optionLabel='label' options={columns} placeholder='Select Columns' value={visibleColumns} />
  );
  //////////////////////////

  // Add a deviceName column to the content
  const [contentWithDeviceName, setContentWithDeviceName] = useState(addDeviceName(data));

  //////////////////////////
  // Filter
  // Create a dictionary of select options for each column
  // From multiple documents, reduce to a single dictionary, with value as a set
  // That set contain all values from the respective key in original document
  // E.g. [{key: value1}, {key: value2}] => { key: Set([value1, value2, ...]) }
  const selectOptionsDictionary = contentWithDeviceName.reduce((acc: any, item: any) => {
    for (const [key, value] of Object.entries(item)) {
      if (acc[key] === undefined || acc[key].length === 0) {
        acc[key] = new Set();
      }
      acc[key].add(value);
    }
    return acc;
  }, {});

  // Sort the array alphabetically from Z to A, case-insensitive, and descending numerical order if applicable
  for (const key in selectOptionsDictionary) {
    selectOptionsDictionary[key] = Array.from(selectOptionsDictionary[key]).sort((a: any, b: any) => {
      if (isNaN(a) && isNaN(b)) {
        return b.toLowerCase().localeCompare(a.toLowerCase());
      } else if (!isNaN(a) && !isNaN(b)) {
        return b - a; // Reverse descending numerical order
      }
      return isNaN(a) ? -1 : 1; // Numbers before letters
    });
  }
  //////////////////////////

  //////////////////////////
  // Paginated client-side query for lazy loading
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const onPageChange = async (e: DataTableStateEvent): Promise<void> => {
    setFirst(e.first);
    setRows(e.rows);
    const newPageData = await getOpenwrtTohLazy(e.rows, e.page! + 1);
    setContentWithDeviceName(addDeviceName(newPageData));
  };

  return (
    <section className='w-[260px] sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1536px]'>
      <DataTable
        // Use database id instead of pid from ToH, because id is guaranteed to be unique
        currentPageReportTemplate='Page {currentPage} of {totalPages}'
        dataKey='id'
        filterDisplay='row'
        first={first}
        header={header}
        lazy // lazy is required to trigger custom totalRecords: https://github.com/orgs/primefaces/discussions/242
        multiSortMeta={[
          { field: 'supportedcurrentrel', order: -1 },
          { field: 'cpucores', order: -1 },
          { field: 'cpumhz', order: -1 },
          { field: 'flashmb', order: -1 },
          { field: 'rammb', order: -1 },
        ]}
        onPage={onPageChange as any}
        paginator
        paginatorTemplate='CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
        pt={{
          root: {
            className: 'w-full',
          },
        }}
        removableSort
        rows={rows}
        rowsPerPageOptions={[10, 50, 100, 10000]}
        scrollHeight='700px'
        scrollable
        sortMode='multiple'
        sortOrder={-1}
        totalRecords={data.totalDocs}
        value={contentWithDeviceName}
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
                  <MultiSelectFilterTemplate filterOptions={filterOptions} selectOptions={selectOptionsDictionary[col.name]} />
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

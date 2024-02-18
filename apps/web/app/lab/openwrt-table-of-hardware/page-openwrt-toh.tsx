/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react/no-array-index-key */
'use client';
import { DataTable } from 'primereact/datatable';
import type { ColumnFilterElementTemplateOptions } from 'primereact/column';
import { Column } from 'primereact/column';
import { useState } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { utcToLocal } from '@utils/parse-date';
import type { SelectItemOptionsType } from 'primereact/selectitem';

interface ColumnData {
  name: string;
  label: string;
  filterMode: 'none' | 'standard' | 'multiSelect';
}

// Mapping of the schema from the OpenWRT Table of Hardware in the CMS
// Aside from a search box, there are 2 filter modes:
// - Standard: The default implementation of PrimeReact
// - MultiSelect: A dropdown with checkboxes for each column
// Although there should be a thrid option: "Comparison", considering a free-text nature
// of the data, it is not implemented
const columns: ColumnData[] = [
  {
    name: 'pid',
    label: 'Product ID',
    filterMode: 'standard',
  },
  {
    name: 'devicetype',
    label: 'Device Type',
    filterMode: 'multiSelect',
  },
  // This is the only column that is not in the CMS schema
  // It is the combination of brand, model, and version
  {
    name: 'deviceName',
    label: 'Device Name',
    filterMode: 'standard',
  },
  {
    name: 'fccid',
    label: 'FCC ID',
    filterMode: 'standard',
  },
  {
    name: 'availability',
    label: 'Availability',
    filterMode: 'multiSelect',
  },
  {
    name: 'whereavailable',
    label: 'Where Available',
    filterMode: 'multiSelect',
  },
  {
    name: 'supportedsincecommit',
    label: 'Supported Since Commit',
    filterMode: 'standard',
  },
  {
    name: 'supportedsincerel',
    label: 'Supported Since Release',
    filterMode: 'multiSelect',
  },
  {
    name: 'supportedcurrentrel',
    label: 'Supported Current Release',
    filterMode: 'multiSelect',
  },
  {
    name: 'unsupported_functions',
    label: 'Unsupported Functions',
    filterMode: 'multiSelect',
  },
  {
    name: 'target',
    label: 'Target',
    filterMode: 'multiSelect',
  },
  {
    name: 'subtarget',
    label: 'Subtarget',
    filterMode: 'multiSelect',
  },
  {
    name: 'packagearchitecture',
    label: 'Package Architecture',
    filterMode: 'multiSelect',
  },
  {
    name: 'bootloader',
    label: 'Bootloader',
    filterMode: 'multiSelect',
  },
  {
    name: 'cpu',
    label: 'CPU',
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
  {
    name: 'ethernet100mports',
    label: 'Ethernet 100M Ports',
    filterMode: 'multiSelect',
  },
  {
    name: 'ethernetgbitports',
    label: 'Ethernet Gbit Ports',
    filterMode: 'multiSelect',
  },
  {
    name: 'ethernet1gports',
    label: 'Ethernet 1G Ports',
    filterMode: 'multiSelect',
  },
  {
    name: 'ethernet2_5gports',
    label: 'Ethernet 2.5G Ports',
    filterMode: 'multiSelect',
  },
  {
    name: 'ethernet5gports',
    label: 'Ethernet 5G Ports',
    filterMode: 'multiSelect',
  },
  {
    name: 'ethernet10gports',
    label: 'Ethernet 10G Ports',
    filterMode: 'multiSelect',
  },
  {
    name: 'sfp_ports',
    label: 'SFP Ports',
    filterMode: 'multiSelect',
  },
  {
    name: 'sfp_plus_ports',
    label: 'SFP+ Ports',
    filterMode: 'multiSelect',
  },
  {
    name: 'switch',
    label: 'Switch',
    filterMode: 'multiSelect',
  },
  {
    name: 'vlan',
    label: 'VLAN',
    filterMode: 'multiSelect',
  },
  {
    name: 'modem',
    label: 'Modem',
    filterMode: 'multiSelect',
  },
  {
    name: 'commentsnetworkports',
    label: 'Comments Network Ports',
    filterMode: 'standard',
  },
  {
    name: 'wlanhardware',
    label: 'WLAN Hardware',
    filterMode: 'multiSelect',
  },
  {
    name: 'wlan24ghz',
    label: 'WLAN 2.4GHz',
    filterMode: 'multiSelect',
  },
  {
    name: 'wlan50ghz',
    label: 'WLAN 5GHz',
    filterMode: 'multiSelect',
  },
  {
    name: 'wlancomments',
    label: 'WLAN Comments',
    filterMode: 'standard',
  },
  {
    name: 'wlandriver',
    label: 'WLAN Driver',
    filterMode: 'multiSelect',
  },
  {
    name: 'detachableantennas',
    label: 'Detachable Antennas',
    filterMode: 'multiSelect',
  },
  {
    name: 'bluetooth',
    label: 'Bluetooth',
    filterMode: 'multiSelect',
  },
  {
    name: 'usbports',
    label: 'USB Ports',
    filterMode: 'multiSelect',
  },
  {
    name: 'sataports',
    label: 'SATA Ports',
    filterMode: 'multiSelect',
  },
  {
    name: 'commentsusbsataports',
    label: 'Comments USB/SATA Ports',
    filterMode: 'standard',
  },
  {
    name: 'videoports',
    label: 'Video Ports',
    filterMode: 'multiSelect',
  },
  {
    name: 'audioports',
    label: 'Audio Ports',
    filterMode: 'multiSelect',
  },
  {
    name: 'phoneports',
    label: 'Phone Ports',
    filterMode: 'multiSelect',
  },
  {
    name: 'commentsavports',
    label: 'Comments AV Ports',
    filterMode: 'standard',
  },
  {
    name: 'serial',
    label: 'Serial',
    filterMode: 'multiSelect',
  },
  {
    name: 'serialconnectionparameters',
    label: 'Serial Connection Parameters',
    filterMode: 'multiSelect',
  },
  {
    name: 'jtag',
    label: 'JTAG',
    filterMode: 'multiSelect',
  },
  {
    name: 'ledcount',
    label: 'LED Count',
    filterMode: 'multiSelect',
  },
  {
    name: 'buttoncount',
    label: 'Button Count',
    filterMode: 'multiSelect',
  },
  {
    name: 'gpios',
    label: 'GPIOs',
    filterMode: 'multiSelect',
  },
  {
    name: 'powersupply',
    label: 'Power Supply',
    filterMode: 'multiSelect',
  },
  {
    name: 'devicepage',
    label: 'Device Page',
    filterMode: 'standard',
  },
  {
    name: 'owrt_forum_topic_url',
    label: 'OpenWRT Forum Topic URL',
    filterMode: 'standard',
  },
  {
    name: 'lede_forum_topic_url',
    label: 'LEDE Forum Topic URL',
    filterMode: 'standard',
  },
  {
    name: 'forumsearch',
    label: 'Forum Search',
    filterMode: 'standard',
  },
  {
    name: 'gitsearch',
    label: 'Git Search',
    filterMode: 'standard',
  },
  {
    name: 'wikideviurl',
    label: 'WikiDevi URL',
    filterMode: 'standard',
  },
  {
    name: 'oemdevicehomepageurl',
    label: 'OEM Device Homepage URL',
    filterMode: 'standard',
  },
  {
    name: 'firmwareoemstockurl',
    label: 'Firmware OEM Stock URL',
    filterMode: 'standard',
  },
  {
    name: 'firmwareopenwrtinstallurl',
    label: 'Firmware OpenWRT Install URL',
    filterMode: 'standard',
  },
  {
    name: 'firmwareopenwrtupgradeurl',
    label: 'Firmware OpenWRT Upgrade URL',
    filterMode: 'standard',
  },
  {
    name: 'firmwareopenwrtsnapshotinstallurl',
    label: 'Firmware OpenWRT Snapshot Install URL',
    filterMode: 'standard',
  },
  {
    name: 'firmwareopenwrtsnapshotupgradeurl',
    label: 'Firmware OpenWRT Snapshot Upgrade URL',
    filterMode: 'standard',
  },
  {
    name: 'installationmethods',
    label: 'Installation Methods',
    filterMode: 'multiSelect',
  },
  {
    name: 'commentinstallation',
    label: 'Comment Installation',
    filterMode: 'standard',
  },
  {
    name: 'recoverymethods',
    label: 'Recovery Methods',
    filterMode: 'multiSelect',
  },
  {
    name: 'commentrecovery',
    label: 'Comment Recovery',
    filterMode: 'standard',
  },
  {
    name: 'comments',
    label: 'Comments',
    filterMode: 'standard',
  },
  {
    name: 'page',
    label: 'Page',
    filterMode: 'standard',
  },
  {
    name: 'createdAt',
    label: 'Created At',
    filterMode: 'none',
  },
  {
    name: 'updatedAt',
    label: 'Updated At',
    filterMode: 'none',
  },
];

const MultiSelectFilterTemplate: React.FC<{
  filterOptions: ColumnFilterElementTemplateOptions;
  selectOptions: SelectItemOptionsType;
}> = ({ filterOptions, selectOptions }) => {
  return (
    <MultiSelect
      className='p-column-filter'
      onChange={(e) => {
        filterOptions.filterCallback(e.value);
      }}
      optionLabel='name'
      options={selectOptions}
      placeholder='Any'
      value={filterOptions.value}
    />
  );
};

const PageOpenwrtToh: React.FunctionComponent<{ content: any }> = ({ content }) => {
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
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const time = (timestamp: string) => <time dateTime={timestamp}>{utcToLocal(timestamp, 'MMM DD, YYYY')}</time>;

  // Add a deviceName column to the content
  const contentWithDeviceName = content.map((row: any) => ({ ...row, deviceName: `${row.brand} / ${row.model} / ${row.version}` }));

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

  // Turn set into an array of object with shape: {name: value, label: value}
  // Sort the array alphabetically from Z to A, case-insensitive, and descending numerical order if applicable
  for (const key in selectOptionsDictionary) {
    selectOptionsDictionary[key] = Array.from(selectOptionsDictionary[key])
      .sort((a: any, b: any) => {
        if (isNaN(a) && isNaN(b)) {
          return b.toLowerCase().localeCompare(a.toLowerCase());
        } else if (!isNaN(a) && !isNaN(b)) {
          return b - a; // Reverse descending numerical order
        }
        return isNaN(a) ? -1 : 1; // Numbers before letters
      })
      .map((item: any) => ({ name: item, label: item }));
  }

  return (
    <section className='max-w-[1536px]'>
      <DataTable
        // Use database id instead of pid from ToH, because id is guaranteed to be unique
        dataKey='id'
        filterDisplay='row'
        header={header}
        multiSortMeta={[
          { field: 'supportedcurrentrel', order: -1 },
          { field: 'cpucores', order: -1 },
          { field: 'cpumhz', order: -1 },
          { field: 'flashmb', order: -1 },
          { field: 'rammb', order: -1 },
        ]}
        paginator
        removableSort
        rows={10}
        rowsPerPageOptions={[10, 25, 50, 100]}
        scrollHeight='700px'
        scrollable
        sortMode='multiple'
        sortOrder={-1}
        tableStyle={{ minWidth: '1536px' }}
        value={contentWithDeviceName}
      >
        {/* Create all columns with name as field, label as header */}
        {visibleColumns.map((col, i) => {
          if (col.name === 'createdAt' || col.name === 'updatedAt') {
            return (
              <Column
                body={(rowData) => time(col.name === 'createdAt' ? (rowData.createdAt as string) : (rowData.updatedAt as string))}
                field={col.name}
                header={col.label}
                key={i}
                sortable
              />
            );
          }
          if (col.filterMode === 'multiSelect') {
            return (
              <Column
                field={col.name}
                filter
                // eslint-disable-next-line react/no-unstable-nested-components
                filterElement={(filterOptions) => (
                  <MultiSelectFilterTemplate filterOptions={filterOptions} selectOptions={selectOptionsDictionary[col.name]} />
                )}
                filterField={col.name}
                filterPlaceholder={`Search by ${col.label}`}
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

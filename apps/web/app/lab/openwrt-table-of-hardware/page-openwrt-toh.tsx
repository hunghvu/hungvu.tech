import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

// 1 to 1 mapping of the schema from the OpenWRT Table of Hardware in the CMS
const openWrtTohSchema = [
  {
    name: 'pid',
    label: 'Product ID',
  },
  {
    name: 'devicetype',
    label: 'Device Type',
  },
  {
    name: 'brand',
    label: 'Brand',
  },
  {
    name: 'model',
    label: 'Model',
  },
  {
    name: 'version',
    label: 'Version',
  },
  {
    name: 'fccid',
    label: 'FCC ID',
  },
  {
    name: 'availability',
    label: 'Availability',
  },
  {
    name: 'whereavailable',
    label: 'Where Available',
  },
  {
    name: 'supportedsincecommit',
    label: 'Supported Since Commit',
  },
  {
    name: 'supportedsincerel',
    label: 'Supported Since Release',
  },
  {
    name: 'supportedcurrentrel',
    label: 'Supported Current Release',
  },
  {
    name: 'unsupported_functions',
    label: 'Unsupported Functions',
  },
  {
    name: 'target',
    label: 'Target',
  },
  {
    name: 'subtarget',
    label: 'Subtarget',
  },
  {
    name: 'packagearchitecture',
    label: 'Package Architecture',
  },
  {
    name: 'bootloader',
    label: 'Bootloader',
  },
  {
    name: 'cpu',
    label: 'CPU',
  },
  {
    name: 'cpucores',
    label: 'CPU Cores',
  },
  {
    name: 'cpumhz',
    label: 'CPU MHz',
  },
  {
    name: 'flashmb',
    label: 'Flash (MB)',
  },
  {
    name: 'rammb',
    label: 'RAM (MB)',
  },
  {
    name: 'ethernet100mports',
    label: 'Ethernet 100M Ports',
  },
  {
    name: 'ethernetgbitports',
    label: 'Ethernet Gbit Ports',
  },
  {
    name: 'ethernet1gports',
    label: 'Ethernet 1G Ports',
  },
  {
    name: 'ethernet2_5gports',
    label: 'Ethernet 2.5G Ports',
  },
  {
    name: 'ethernet5gports',
    label: 'Ethernet 5G Ports',
  },
  {
    name: 'ethernet10gports',
    label: 'Ethernet 10G Ports',
  },
  {
    name: 'sfp_ports',
    label: 'SFP Ports',
  },
  {
    name: 'sfp_plus_ports',
    label: 'SFP+ Ports',
  },
  {
    name: 'switch',
    label: 'Switch',
  },
  {
    name: 'vlan',
    label: 'VLAN',
  },
  {
    name: 'modem',
    label: 'Modem',
  },
  {
    name: 'commentsnetworkports',
    label: 'Comments Network Ports',
  },
  {
    name: 'wlanhardware',
    label: 'WLAN Hardware',
  },
  {
    name: 'wlan24ghz',
    label: 'WLAN 2.4GHz',
  },
  {
    name: 'wlan50ghz',
    label: 'WLAN 5GHz',
  },
  {
    name: 'wlancomments',
    label: 'WLAN Comments',
  },
  {
    name: 'wlandriver',
    label: 'WLAN Driver',
  },
  {
    name: 'detachableantennas',
    label: 'Detachable Antennas',
  },
  {
    name: 'bluetooth',
    label: 'Bluetooth',
  },
  {
    name: 'usbports',
    label: 'USB Ports',
  },
  {
    name: 'sataports',
    label: 'SATA Ports',
  },
  {
    name: 'commentsusbsataports',
    label: 'Comments USB/SATA Ports',
  },
  {
    name: 'videoports',
    label: 'Video Ports',
  },
  {
    name: 'audioports',
    label: 'Audio Ports',
  },
  {
    name: 'phoneports',
    label: 'Phone Ports',
  },
  {
    name: 'commentsavports',
    label: 'Comments AV Ports',
  },
  {
    name: 'serial',
    label: 'Serial',
  },
  {
    name: 'serialconnectionparameters',
    label: 'Serial Connection Parameters',
  },
  {
    name: 'jtag',
    label: 'JTAG',
  },
  {
    name: 'ledcount',
    label: 'LED Count',
  },
  {
    name: 'buttoncount',
    label: 'Button Count',
  },
  {
    name: 'gpios',
    label: 'GPIOs',
  },
  {
    name: 'powersupply',
    label: 'Power Supply',
  },
  {
    name: 'devicepage',
    label: 'Device Page',
  },
  {
    name: 'owrt_forum_topic_url',
    label: 'OpenWRT Forum Topic URL',
  },
  {
    name: 'lede_forum_topic_url',
    label: 'LEDE Forum Topic URL',
  },
  {
    name: 'forumsearch',
    label: 'Forum Search',
  },
  {
    name: 'gitsearch',
    label: 'Git Search',
  },
  {
    name: 'wikideviurl',
    label: 'WikiDevi URL',
  },
  {
    name: 'oemdevicehomepageurl',
    label: 'OEM Device Homepage URL',
  },
  {
    name: 'firmwareoemstockurl',
    label: 'Firmware OEM Stock URL',
  },
  {
    name: 'firmwareopenwrtinstallurl',
    label: 'Firmware OpenWRT Install URL',
  },
  {
    name: 'firmwareopenwrtupgradeurl',
    label: 'Firmware OpenWRT Upgrade URL',
  },
  {
    name: 'firmwareopenwrtsnapshotinstallurl',
    label: 'Firmware OpenWRT Snapshot Install URL',
  },
  {
    name: 'firmwareopenwrtsnapshotupgradeurl',
    label: 'Firmware OpenWRT Snapshot Upgrade URL',
  },
  {
    name: 'installationmethods',
    label: 'Installation Methods',
  },
  {
    name: 'commentinstallation',
    label: 'Comment Installation',
  },
  {
    name: 'recoverymethods',
    label: 'Recovery Methods',
  },
  {
    name: 'commentrecovery',
    label: 'Comment Recovery',
  },
  {
    name: 'comments',
    label: 'Comments',
  },
  {
    name: 'page',
    label: 'Page',
  },
  {
    name: 'createdAt',
    label: 'Created At',
  },
  {
    name: 'updatedAt',
    label: 'Updated At',
  },
];

const PageOpenwrtToh: React.FunctionComponent<{ content: any }> = ({ content }) => {
  return (
    <section className='max-w-[1536px]'>
      <DataTable
        multiSortMeta={[
          { field: 'cpucores', order: -1 },
          { field: 'cpumhz', order: -1 },
          { field: 'flashmb', order: -1 },
          { field: 'rammb', order: -1 },
        ]}
        removableSort
        scrollHeight='800px'
        scrollable
        showGridlines
        sortMode='multiple'
        sortOrder={-1}
        stripedRows
        tableStyle={{ minWidth: '50rem' }}
        value={content}
      >
        {/* Create all columns with name as field, label as header */}
        {openWrtTohSchema.map((col, i) => (
          <Column
            field={col.name}
            filter
            filterField={col.name}
            filterPlaceholder={`Search by ${col.label}`}
            header={col.label}
            key={i}
            showFilterMenu={false}
            sortable
          />
        ))}
      </DataTable>
    </section>
  );
};

export default PageOpenwrtToh;

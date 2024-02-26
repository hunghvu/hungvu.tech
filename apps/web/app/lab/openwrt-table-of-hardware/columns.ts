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
    filterMode: 'standard',
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
    filterMode: 'standard',
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
    filterMode: 'standard',
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
    filterMode: 'standard',
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
    filterMode: 'standard',
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
    filterMode: 'standard',
  },
  {
    name: 'commentinstallation',
    label: 'Comment Installation',
    filterMode: 'standard',
  },
  {
    name: 'recoverymethods',
    label: 'Recovery Methods',
    filterMode: 'standard',
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

export { columns, type ColumnData }
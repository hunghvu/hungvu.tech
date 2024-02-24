/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-misused-promises */
/**
 * Author: Hung Vu
 *
 * This collection represents an OpenWRT Table of Hardware.
 */

import type { Endpoint } from "payload/config";
import type { CollectionConfig } from 'payload/types';

// This indicates fields on the front end that are multi-select
// NOT the fields in the CMS
const multiSelectFields = [
  "devicetype",
  "availability",
  "supportedsincerel",
  "supportedcurrentrel",
  "target",
  "subtarget",
  "packagearchitecture",
  "bootloader",
  "cpu",
  "cpucores",
  "cpumhz",
  "rammb",
  "ethernet100mports",
  "ethernetgbitports",
  "ethernet1gports",
  "ethernet2_5gports",
  "ethernet5gports",
  "ethernet10gports",
  "sfp_ports",
  "sfp_plus_ports",
  "switch",
  "vlan",
  "modem",
  "wlan24ghz",
  "wlan50ghz",
  "wlandriver",
  "detachableantennas",
  "bluetooth",
  "usbports",
  "sataports",
  "videoports",
  "audioports",
  "phoneports",
  "serial",
  "serialconnectionparameters",
  "jtag",
  "ledcount",
  "buttoncount",
  "gpios",
];

const sortRule = (a: string, b: string): number => new Intl.Collator("en", { caseFirst: 'lower', numeric: true, sensitivity: "base" }).compare(a, b);

const getAvailableValues = (): Omit<Endpoint, 'root'> => {
  return {
    path: '/available-values-of-each-field',
    method: 'get',
    handler: async (req, res) => {
      try {
        const slug = 'openwrt-toh';
        const mongoose = req.payload.db.collections[slug];
        const resAvailableValues = {};
        for (const field of multiSelectFields) {
          await mongoose.distinct(field, (err, data) => {
            // In-place sort
            // By default, distinct() sort (0-9 then A-Z then a-z), but we want (0-9 then a/A - z/Z)
            data.sort(sortRule)
            if (err) {
              res.status(500).json({ error: err.message });
            } else {
              resAvailableValues[field] = data;
            }
          }).clone();
          // https://stackoverflow.com/questions/68945315/mongooseerror-query-was-already-executed
        }
        res.status(200).json({ availableValues: resAvailableValues });
      }
      catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
}

const OpenwrtToh: CollectionConfig = {
  slug: 'openwrt-toh',
  labels: {
    singular: 'OpenWRT Table of Hardware',
    plural: 'OpenWRT Table of Hardware',
  },
  admin: {
    group: 'Lab',
    useAsTitle: 'model',
    defaultColumns: ['brand', 'model', 'version', 'createdAt', 'updatedAt', '_status'],
  },
  access: {
    read: () => true,
  },
  // All fields are text because we cannot control the output from OpenWRT database dump.
  // It is safer to store everything as text, the downside is that searching will be less optimal
  // for certain types like numbers.
  // This is not an optimal collection, but it is good enough and safe to use considering the data is third party.
  fields: [
    {
      name: 'pid',
      label: 'Product ID',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'devicetype',
      label: 'Device Type',
      type: 'text',
    },
    {
      name: 'brand',
      label: 'Brand',
      type: 'text',
    },
    {
      name: 'model',
      label: 'Model',
      type: 'text',
    },
    {
      name: 'version',
      label: 'Version',
      type: 'text',
    },
    {
      name: 'fccid',
      label: 'FCC ID',
      type: 'text',
    },
    {
      name: 'availability',
      label: 'Availability',
      type: 'text',
    },
    {
      name: 'whereavailable',
      label: 'Where Available',
      type: 'text',
    },
    {
      name: 'supportedsincecommit',
      label: 'Supported Since Commit',
      type: 'text',
    },
    {
      name: 'supportedsincerel',
      label: 'Supported Since Release',
      type: 'text',
    },
    {
      name: 'supportedcurrentrel',
      label: 'Supported Current Release',
      type: 'text',
    },
    {
      name: 'unsupported_functions',
      label: 'Unsupported Functions',
      type: 'text',
    },
    {
      name: 'target',
      label: 'Target',
      type: 'text',
    },
    {
      name: 'subtarget',
      label: 'Subtarget',
      type: 'text',
    },
    {
      name: 'packagearchitecture',
      label: 'Package Architecture',
      type: 'text',
    },
    {
      name: 'bootloader',
      label: 'Bootloader',
      type: 'text',
    },
    {
      name: 'cpu',
      label: 'CPU',
      type: 'text',
    },
    {
      name: 'cpucores',
      label: 'CPU Cores',
      type: 'text',
    },
    {
      name: 'cpumhz',
      label: 'CPU MHz',
      type: 'text',
    },
    {
      name: 'flashmb',
      label: 'Flash (MB)',
      type: 'text',
    },
    {
      name: 'rammb',
      label: 'RAM (MB)',
      type: 'text',
    },
    {
      name: 'ethernet100mports',
      label: 'Ethernet 100M Ports',
      type: 'text',
    },
    {
      name: 'ethernetgbitports',
      label: 'Ethernet Gbit Ports',
      type: 'text',
    },
    {
      name: 'ethernet1gports',
      label: 'Ethernet 1G Ports',
      type: 'text',
    },
    {
      name: 'ethernet2_5gports',
      label: 'Ethernet 2.5G Ports',
      type: 'text',
    },
    {
      name: 'ethernet5gports',
      label: 'Ethernet 5G Ports',
      type: 'text',
    },
    {
      name: 'ethernet10gports',
      label: 'Ethernet 10G Ports',
      type: 'text',
    },
    {
      name: 'sfp_ports',
      label: 'SFP Ports',
      type: 'text',
    },
    {
      name: 'sfp_plus_ports',
      label: 'SFP+ Ports',
      type: 'text',
    },
    {
      name: 'switch',
      label: 'Switch',
      type: 'text',
    },
    {
      name: 'vlan',
      label: 'VLAN',
      type: 'text',
    },
    {
      name: 'modem',
      label: 'Modem',
      type: 'text',
    },
    {
      name: 'commentsnetworkports',
      label: 'Comments Network Ports',
      type: 'text',
    },
    {
      name: 'wlanhardware',
      label: 'WLAN Hardware',
      type: 'text',
    },
    {
      name: 'wlan24ghz',
      label: 'WLAN 2.4GHz',
      type: 'text',
    },
    {
      name: 'wlan50ghz',
      label: 'WLAN 5GHz',
      type: 'text',
    },
    {
      name: 'wlancomments',
      label: 'WLAN Comments',
      type: 'text',
    },
    {
      name: 'wlandriver',
      label: 'WLAN Driver',
      type: 'text',
    },
    {
      name: 'detachableantennas',
      label: 'Detachable Antennas',
      type: 'text',
    },
    {
      name: 'bluetooth',
      label: 'Bluetooth',
      type: 'text',
    },
    {
      name: 'usbports',
      label: 'USB Ports',
      type: 'text',
    },
    {
      name: 'sataports',
      label: 'SATA Ports',
      type: 'text',
    },
    {
      name: 'commentsusbsataports',
      label: 'Comments USB/SATA Ports',
      type: 'text',
    },
    {
      name: 'videoports',
      label: 'Video Ports',
      type: 'text',
    },
    {
      name: 'audioports',
      label: 'Audio Ports',
      type: 'text',
    },
    {
      name: 'phoneports',
      label: 'Phone Ports',
      type: 'text',
    },
    {
      name: 'commentsavports',
      label: 'Comments AV Ports',
      type: 'text',
    },
    {
      name: 'serial',
      label: 'Serial',
      type: 'text',
    },
    {
      name: 'serialconnectionparameters',
      label: 'Serial Connection Parameters',
      type: 'text',
    },
    {
      name: 'jtag',
      label: 'JTAG',
      type: 'text',
    },
    {
      name: 'ledcount',
      label: 'LED Count',
      type: 'text',
    },
    {
      name: 'buttoncount',
      label: 'Button Count',
      type: 'text',
    },
    {
      name: 'gpios',
      label: 'GPIOs',
      type: 'text',
    },
    {
      name: 'powersupply',
      label: 'Power Supply',
      type: 'text',
    },
    {
      name: 'devicepage',
      label: 'Device Page',
      type: 'text',
    },
    {
      name: 'owrt_forum_topic_url',
      label: 'OpenWRT Forum Topic URL',
      type: 'text',
    },
    {
      name: 'lede_forum_topic_url',
      label: 'LEDE Forum Topic URL',
      type: 'text',
    },
    {
      name: 'forumsearch',
      label: 'Forum Search',
      type: 'text',
    },
    {
      name: 'gitsearch',
      label: 'Git Search',
      type: 'text',
    },
    {
      name: 'wikideviurl',
      label: 'WikiDevi URL',
      type: 'text',
    },
    {
      name: 'oemdevicehomepageurl',
      label: 'OEM Device Homepage URL',
      type: 'text',
    },
    {
      name: 'firmwareoemstockurl',
      label: 'Firmware OEM Stock URL',
      type: 'text',
    },
    {
      name: 'firmwareopenwrtinstallurl',
      label: 'Firmware OpenWRT Install URL',
      type: 'text',
    },
    {
      name: 'firmwareopenwrtupgradeurl',
      label: 'Firmware OpenWRT Upgrade URL',
      type: 'text',
    },
    {
      name: 'firmwareopenwrtsnapshotinstallurl',
      label: 'Firmware OpenWRT Snapshot Install URL',
      type: 'text',
    },
    {
      name: 'firmwareopenwrtsnapshotupgradeurl',
      label: 'Firmware OpenWRT Snapshot Upgrade URL',
      type: 'text',
    },
    {
      name: 'installationmethods',
      label: 'Installation Methods',
      type: 'text',
    },
    {
      name: 'commentinstallation',
      label: 'Comment Installation',
      type: 'text',
    },
    {
      name: 'recoverymethods',
      label: 'Recovery Methods',
      type: 'text',
    },
    {
      name: 'commentrecovery',
      label: 'Comment Recovery',
      type: 'text',
    },
    {
      name: 'comments',
      label: 'Comments',
      type: 'text',
    },
    {
      name: 'page',
      label: 'Page',
      type: 'text',
    },

  ],
  endpoints: [getAvailableValues()],
  timestamps: true,
  // No need for versionings and drafts because this collection is "read-only"
  // All updates are done via cron jobs
};

export default OpenwrtToh;

import getOpenwrtToh from '@utils/request/server-side/lab/openwrt-table-of-harware/get-openwrt-toh';
import getOpenwrtTohAvailableValuesOfEachField from '@utils/request/server-side/lab/openwrt-table-of-harware/get-openwrt-toh-available-values-of-each-field';
import PageOpenwrtToh from './page-openwrt-toh';

const Page = async (): Promise<any> => {
  const data = await getOpenwrtToh(10, 1);
  const availableValues = await getOpenwrtTohAvailableValuesOfEachField();
  return <PageOpenwrtToh availableValues={availableValues} data={data} />;
};

export default Page;

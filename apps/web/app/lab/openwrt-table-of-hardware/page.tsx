import getOpenwrtToh from '@utils/request/server-side/lab/openwrt-table-of-harware/get-openwrt-toh';
import getOpenwrtTohAvailableValuesOfEachField from '@utils/request/server-side/lab/openwrt-table-of-harware/get-openwrt-toh-available-values-of-each-field';
import getLabBySlug from '@utils/request/server-side/lab/get-lab-by-slug';
import PageOpenwrtToh from './page-openwrt-toh';

const Page = async (): Promise<any> => {
  const data = await getOpenwrtToh(10, 1);
  const availableValues = await getOpenwrtTohAvailableValuesOfEachField();
  const contentData = await getLabBySlug('openwrt-table-of-hardware');
  return <PageOpenwrtToh availableValues={availableValues} contentData={contentData} tohData={data} />;
};

export default Page;

import getOpenwrtToh from '@utils/request/server-side/lab/openwrt-table-of-harware/get-openwrt-toh';
import PageOpenwrtToh from './page-openwrt-toh';

const Page = async (): Promise<any> => {
  const data = await getOpenwrtToh(10, 1);
  return <PageOpenwrtToh data={data} />;
};

export default Page;

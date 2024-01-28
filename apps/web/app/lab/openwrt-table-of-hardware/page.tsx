import getOpenwrtToh from '@utils/request/server-side/lab/openwrt-table-of-harware/get-openwrt-toh';
import PageOpenwrtToh from './page-openwrt-toh';

const Page = async (): Promise<any> => {
  const content = await getOpenwrtToh(10);
  return <PageOpenwrtToh content={content} />;
};

export default Page;

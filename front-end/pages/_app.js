import 'antd/dist/antd.css';
import '../styles/globals.css'
import Layout from '../components/Layout'

const { Footer, Sider, Content } = Layout;

function MyApp({ Component, pageProps }) {
  return (
    <Layout className="layout">
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp

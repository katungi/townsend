import React from 'react'
import 'antd/dist/antd.css';
import { Tree } from 'antd';
import { Layout, Menu } from 'antd';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  FolderOpenOutlined,
  FileOutlined
} from '@ant-design/icons';
import Editor from './editor'

const { Header, Content, Footer, Sider } = Layout;
const { DirectoryTree } = Tree;
const treeData = [
  {
    title: 'parent 0',
    icon: <FolderOpenOutlined />,
    key: '0-0',
    children: [
      { title: 'leaf 0-0', key: '0-0-0', isLeaf: true, icon: <FileOutlined /> },
      { title: 'leaf 0-1', key: '0-0-1', isLeaf: true, icon: <FileOutlined /> },
    ],
  },
  {
    title: 'parent 1',
    icon: <FolderOpenOutlined />,
    key: '0-1',
    children: [
      { title: 'leaf 1-0', key: '0-1-0', isLeaf: true, icon: <FileOutlined /> },
      { title: 'leaf 1-1', key: '0-1-1', isLeaf: true, icon: <FileOutlined /> },
    ],
  },
];

function Home() {
  const onSelect = (keys: any, event: any) => {
    console.log('Trigger Select', keys, event);
  };

  const onExpand = () => {
    console.log('Trigger Expand');
  };
  return (
    <div>
      <Layout>
        <Sider
          theme="light"
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <div className="logo" />
          <Menu theme="light" mode="inline" defaultSelectedKeys={['4']}>
            <DirectoryTree
              multiple
              defaultExpandAll
              onSelect={onSelect}
              onExpand={onExpand}
              treeData={treeData}
            />
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Content style={{ margin: '0px 0px 0'}}>       
              <Editor/>
          </Content>
        </Layout>
      </Layout>
        </div>
  )
}

export default Home

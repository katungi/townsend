import React from 'react'
import { Tree, Layout, Menu } from 'antd';

const { DirectoryTree } = Tree;
const { Content, Sider } = Layout;

const treeData = [
    {
        title: 'parent 0',
        key: '0-0',
        children: [
            { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
            { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
        ],
    },
    {
        title: 'parent 1',
        key: '0-1',
        children: [
            { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
            { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
        ],
    },
];

const EditorLayout: React.FC<{}> = ({ children }) => {
    const onSelect = (keys: any, event: any) => {
        console.log('Trigger Select', keys, event);
    };

    const onExpand = () => {
        console.log('Trigger Expand');
    };

    return (
        <Layout>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <DirectoryTree
                            multiple
                            defaultExpandAll
                            onSelect={onSelect}
                            onExpand={onExpand}
                            treeData={treeData}
                        />
                    </Menu>
                </Sider>
                <Layout>
                    <Content
                        style={{
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default EditorLayout

import React from 'react';
import { Layout as antd_layout, Menu, Breadcrumb } from 'antd';
import Navbar from '../components/Navbar'

const { Header, Content, Footer } = antd_layout;

export default function Layout({ children }) {
    return (
        <antd_layout className="layout">
            <Header>
                <Navbar />
            </Header>
            <Content style={{ padding: '0 50px' }}>
                {children}
            </Content>
            <Footer style={{ textAlign: 'center' }}></Footer>
        </antd_layout>
    );
}
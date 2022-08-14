import React from "react";
import { Layout as antd_layout } from "antd";
import Navbar from "../components/Navbar"

const { Header, Content, Footer } = antd_layout;

export default function Layout({ children }) {
    return (
        <antd_layout className="layout">
            <Header>
                <Navbar />
            </Header>
            <Content style={{ margin: "1% 5%" }}>
                {children}
            </Content>
            <Footer style={{ textAlign: "center" }}></Footer>
        </antd_layout>
    );
}
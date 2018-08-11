import * as React from 'react';
import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;

export interface IMainProps {
  isLogined: boolean
}

export default class Main extends React.Component<IMainProps, any> {
  public render() {
    return (
      <div>
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </div>
    );
  }
}

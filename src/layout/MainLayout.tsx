import { FC } from 'react'
import {
  SwapOutlined,
  UserOutlined,
  QuestionOutlined,
  PictureOutlined,
} from '@ant-design/icons'
import { Layout, Menu, theme } from 'antd'
import { Link, Outlet } from 'react-router-dom'
import styles from './MainLayout.module.scss'

const { Header, Content, Footer, Sider } = Layout

export const MainLayout: FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint='lg'
        theme='light'
        collapsedWidth='0'
        onBreakpoint={(broken) => {
          console.log(broken)
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type)
        }}
      >
        <div className={styles.logo}>A few works</div>
        <Menu
          theme='light'
          mode='inline'
          defaultSelectedKeys={['1']}
          items={[
            {
              key: 1,
              icon: (
                <Link to='/'>
                  <QuestionOutlined />
                </Link>
              ),
              label: 'Quiz',
            },
            {
              key: 2,
              icon: (
                <Link to='/popup'>
                  <UserOutlined />
                </Link>
              ),
              label: 'Invite peoples',
            },
            {
              key: 3,
              icon: (
                <Link to='/convector'>
                  <SwapOutlined />
                </Link>
              ),
              label: 'Currency convector',
            },
            {
              key: 4,
              icon: (
                <Link to='/galery'>
                  <PictureOutlined />
                </Link>
              ),
              label: 'Galery',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: '80vh',
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          A few works ©2023 Created by Sivakov Igor
        </Footer>
      </Layout>
    </Layout>
  )
}

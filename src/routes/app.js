import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Layout } from '../components'
import { classnames, config } from '../utils'
import { Card } from 'antd'
import { Helmet } from 'react-helmet'
import '../themes/index.less'  

const { Header, Bread, Footer, Sider, styles } = Layout

const AdminApp = ({ children, location, dispatch, app,messager }) => {
  const { user, siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys } = app
  
  const headerProps = {
    user,
    messager,
    siderFold,
    location,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    switchMenuPopover () {
      dispatch({ type: 'app/switchMenuPopver' })
    },
    logout () {
      dispatch({ type: 'app/logout' })
    },
    switchSider () {
      dispatch({ type: 'app/switchSider' })
    },
    changeOpenKeys (openKeys) {
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  }

  const siderProps = {
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeTheme () {
      dispatch({ type: 'app/changeTheme' })
    },
    changeOpenKeys (openKeys) {
      localStorage.setItem('navOpenKeys', JSON.stringify(openKeys))
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  }

  if (config.openPages && config.openPages.indexOf(location.pathname) > -1) {
    return <div>{children}</div>
  }

  
  return (
    <div>
      <Helmet>
        <title>{config.name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={config.logoSrc} type="image/x-icon" />
        {config.iconFontUrl ? <script src={config.iconFontUrl}></script> : ''}
      </Helmet>
      
      <div className={classnames(styles.layout, { [styles.fold]: isNavbar ? false : siderFold }, { [styles.withnavbar]: isNavbar })}>
        {!isNavbar ? <aside className={classnames(styles.sider, { [styles.light]: !darkTheme })}>
          <Sider {...siderProps} />
        </aside> : ''}
        <div className={styles.main}>
          <Header {...headerProps} />
          <Bread location={location} />
          <div className={styles.container}>
            <Card bordered={false}>
              <div className={styles.content}>
                {children}
              </div>
            </Card>
          </div>
          <Footer />

         
        </div>
      </div>
    </div>
  )
}

AdminApp.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  messager:PropTypes.object,
}

export default connect(({ app,messager }) => ({ app,messager }))(AdminApp)
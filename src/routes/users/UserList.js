import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Avatar } from 'antd' 
import queryString from 'query-string'
import styles from './UserList.less' 
import classnames from 'classnames' 
import { DropOption } from '../../components' 
import { config } from '../../utils' 


const confirm = Modal.confirm 

function list ({ loading, dataSource, pagination, onPageChange, onDeleteItem, onResetPasswordItem,onEditItem, isMotion, location }) {
  const {search, pathname } = location
  var { field, keyword } = queryString.parse(search)
  const query = { field, keyword }


  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record) 
    }else if (e.key === '2') {
      confirm({
        title: '此操作将重置用户密码为123456?',
        onOk () {
          onResetPasswordItem(record.id) 
        },
      })
    } else if (e.key === '3') {
      confirm({
        title: '您确定要删除这条记录吗?',
        onOk () {
          onDeleteItem(record.id) 
        },
      })
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 64,
      className: styles.avatar,
      render: (id) => <a href="#" > {id}  </a>,
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 64,
      className: styles.avatar,
      render: (text) => <Avatar size="large" icon="user" src={config.server + text} /> ,
    }, {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      render: (text) => <span>{text}岁</span>,
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: (text) => <span>{text}</span>,
    }, {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '创建时间',
      dataIndex: 'createtime',
      key: 'createtime',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '编辑' },{ key: '2', name: '重置密码' }, { key: '3', name: '删除' }]} />
      },
    },
  ] 

  const getBodyWrapperProps = {
    page: query.page,
    current: pagination.current,
  } 

  return (
    <div>
      <Table
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={onPageChange}
        pagination={pagination}
        simple
        rowKey={record => record.id}
      />
    </div>
  )
}

list.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default list 

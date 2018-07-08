// IMPORT PACKAGE REFERENCES

import React, { Component } from 'react';
import { Table, Modal, Input } from 'antd';
const { TextArea } = Input;

// COMPONENT

class MembersPage extends Component {
  state = { visible: false };

  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="javascript:;">{text}</a>
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <a onClick={this.showModal} href="javascript:;">
          Contact
        </a>
      )
    }
  ];

  data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  render() {
    return (
      <div>
        <div
          className="jumbotron jumbotron-fluid light-blue-top animated bottom-dark-border"
          style={{ marginBottom: 0, backgroundColor: '#c6cce3' }}
        >
          <div className="text-center">
            <h1 className="title-text text-shadow-simple">Members page</h1>
          </div>
        </div>
        <div style={{ padding: 30 }}>
          <Table columns={this.columns} dataSource={this.data} />
          <Modal
            title="Send your message"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Input placeholder="Type your title here" style={{ marginBottom: 10 }} />
            <TextArea rows={4} placeholder="Type your content here" />
          </Modal>
        </div>
      </div>
    );
  }
}

export { MembersPage };

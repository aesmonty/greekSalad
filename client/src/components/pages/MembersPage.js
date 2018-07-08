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
      title: 'Location',
      dataIndex: 'location',
      key: 'location'
    },
    {
      title: 'Primary Skill',
      dataIndex: 'primarySkill',
      key: 'primarySkill'
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
      name: 'Gaona Tlahsana',
      location: 'Rakops, Botswana',
      primarySkill: 'cattle'
    },
    {
      key: '2',
      name: 'Kaone Kario',
      location: 'Zeerust, South Africa',
      primarySkill: 'wheat'
    },
    {
      key: '3',
      name: 'Mudmai Areepatra',
      location: 'Phitsanulok, Thailand',
      primarySkill: 'wheat'
    },
    {
      key: '4',
      name: 'Linh Nguyen',
      location: 'Ayun Pa, Vietnam',
      primarySkill: 'beekeeping'
    },
    {
      key: '5',
      name: 'Itseng Kgomotso',
      location: 'Tsootsha, Botswana',
      primarySkill: 'cattle'
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

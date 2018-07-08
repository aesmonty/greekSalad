import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row, Divider, List, Icon } from 'antd';
import axios from 'axios';
import { EthereumIcon } from '../Web3/EthereumIcon';
import { HomeMiddleBanner } from './HomeMiddleBanner';

class Home extends Component {
  state = {
    proposals: []
  };
  componentDidUpdate(prevProps) {
    let self = this;
    if (this.props.id !== prevProps.id) {
      console.log(`make a GET to the API sending id: ${this.props.id}`);
      axios
        .get('http://35.206.132.245:8020/proposals')
        .then(function(response) {
          self.setState({ proposals: response.data });
        })
        .catch(function(error) {
          console.log(error);
        })
        .then(function() {
          // always executed
        });
    }
  }
  handleVoteClick(id) {
    console.log(`use web3 with the id of ${id} and setState accordingly`);
  }
  render() {
    return (
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <div>
          <p className="text-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
        </div>
        <HomeMiddleBanner />
        <div>
          <Row gutter={16}>
            <Col span={12}>
              <Card title="Current proposals" bordered={false}>
                <List
                  itemLayout="horizontal"
                  dataSource={this.state.proposals}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        title={<a>{item.title}</a>}
                        description={
                          <div>
                            <span style={{ marginRight: 10, float: 'left' }}>
                              {item.voted === true ? (
                                <Icon style={{ color: 'green' }} type="up-circle" />
                              ) : (
                                <Icon
                                  data-id={item.id}
                                  onClick={this.handleVoteClick.bind(null, item.id)}
                                  type="up-circle"
                                />
                              )}
                            </span>
                            <span style={{ width: '500px', float: 'left' }}>{item.description}</span>
                            <span style={{ float: 'right' }}>{item.amount} Qi</span>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Invitations" bordered={false}>
                Card content
              </Card>
            </Col>
          </Row>
          <Divider />
          <Row gutter={16}>
            <Col span={12}>
              <Card title="Your loans" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Your certificates" bordered={false}>
                Card content
              </Card>
            </Col>
          </Row>
        </div>
        <EthereumIcon />
      </div>
    );
  }
}

Home.propTypes = {
  id: PropTypes.string
};

// EXPORT COMPONENT

export { Home };

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row, Divider, List, Icon, Progress, Tooltip } from 'antd';
import axios from 'axios';
import { EthereumIcon } from '../Web3/EthereumIcon';
import { HomeMiddleBanner } from './HomeMiddleBanner';
// import { Vote } from '../../services/VoteService';
const appContractAbi = require('../../../contracts/app.json');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proposals: [],
      invitations: [
        { name: 'learn AGR-101 and start a wheat farm', checked: false, id: 0 },
        { name: 'Expand our fishing business with the advanced fishing course', checked: false, id: 1 }
      ],
      teaching: [{ title: 'Trade in your local village 101', name: 'Ekua G', checked: false, id: 0 }],
      certificates: ['AGR-100', 'PHI-203'],
      courseCompleted: false,
      loansText: 'Proof of education to be submitted',
      percentage: 50
    };
    this.handleVoteClick = this.handleVoteClick.bind(this);
    this.handleInvitationsClick = this.handleInvitationsClick.bind(this);
  }

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
  componentDidMount() {
    let self = this;
    function intervalFunc() {
      axios
        .get('http://35.206.132.245:8020/course_completed')
        .then(function(response) {
          if (response.data == true) {
            let newCertificates = self.state.certificates;
            newCertificates.push('PHI-301');
            self.setState({ certificates: newCertificates, loansText: 'Completed', percentage: 100 });
          }
        })
        .catch(function(error) {
          console.log(error);
        })
        .then(function() {
          // always executed
        });
    }
    setInterval(intervalFunc, 1500);
  }

  handleVoteClick(id) {
    let self = this;
    return new Promise((resolve, reject) => {
      const web3 = window.web3;
      if (!web3 || !web3.isConnected() || !web3.currentProvider.isMetaMask) {
        reject('No web3!');
      }

      const appContract = web3.eth.contract(appContractAbi).at('0x6bbE90c1b32857590Df28E5645fe7B5A9c31c050');
      const account = web3.eth.accounts[0];
      if (!account) {
        reject('No account!');
      }
      appContract.vote.sendTransaction(id, true, 'reason', { from: account, gasLimit: 400000 }, function(err, res) {
        if (err) {
          console.error(err);
        } else {
          let newProposal = self.state.proposals;
          newProposal[id].voted = true;
          console.log('We gucci');
          self.setState({ proposals: newProposal });
        }
      });
    });
  }
  handleInvitationsClick(id) {
    let newInvitations = this.state.invitations;
    newInvitations[id].checked = true;
    this.setState({ invitations: newInvitations });
  }
  handleTeachingClick(id) {
    let newTeaching = this.state.teaching;
    newTeaching[id].checked = true;
    this.setState({ teaching: newTeaching });
  }
  render() {
    return (
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <div>
          <p className="text-center" style={{ fontSize: 20 }}>
            Link with other women to share knowledge and advice. Petition for loans to grow your business.
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
                <List
                  itemLayout="horizontal"
                  dataSource={this.state.invitations}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        description={
                          <div>
                            <span style={{ width: '500px', float: 'left' }}>{item.name}</span>
                            <span style={{ marginRight: 10, float: 'right' }}>
                              {item.checked === true ? (
                                <Icon style={{ color: 'white', backgroundColor: 'green' }} type="check-square-o" />
                              ) : (
                                <Icon
                                  data-id={item.id}
                                  onClick={this.handleInvitationsClick.bind(null, item.id)}
                                  type="check-square-o"
                                />
                              )}
                            </span>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
              <Card title="Teaching requests" bordered={false}>
                <List
                  itemLayout="horizontal"
                  dataSource={this.state.teaching}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        title={<a>{item.title}</a>}
                        description={
                          <div>
                            <span style={{ width: '500px', float: 'left' }}>{item.name}</span>
                            <span style={{ marginRight: 10, float: 'right' }}>
                              <Icon style={{ color: '#586aad' }} type="message" />
                              <Icon style={{ color: '#586aad', marginLeft: 10 }} type="phone" />
                            </span>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
          <Divider />
          <Row gutter={16}>
            <Col span={12}>
              <Card title="Your loans" bordered={false}>
                <Tooltip title="Proposal under evaluation">
                  <h5>Bee keeping - Botswana</h5>
                  <span>
                    Status: <span style={{ fontStyle: 'italic' }}>Proposal under evaluation</span>
                  </span>
                  <Progress percent={0} />
                </Tooltip>
                <Divider />
                <Tooltip title={this.state.loansText}>
                  <h5>Phishing</h5>
                  <span>
                    Status: <span style={{ fontStyle: 'italic' }}>{this.state.loansText}</span>
                  </span>
                  <Progress percent={this.state.percentage} />
                </Tooltip>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Your certificates" bordered={false}>
                <List
                  itemLayout="horizontal"
                  dataSource={this.state.certificates}
                  renderItem={item => (
                    <List.Item>
                      <Icon style={{ float: 'left', marginRight: 10 }} type="book" />
                      <List.Item.Meta title={<a>{item}</a>} />
                    </List.Item>
                  )}
                />
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

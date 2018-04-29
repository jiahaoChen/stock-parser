import React, { Component } from "react";
import { Button } from "antd";
import { $ } from "../components/fn";
import { ipcRenderer } from 'electron'
import { DatePicker } from "antd";
import { Row, Col , Select, Modal } from 'antd'
import axios from 'axios';
import storage from 'electron-json-storage';
import json2csv from 'json2csv';
import fs from 'fs'

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const fields = [
  'Date', 
  'OpenInterest', 
  'OpenInterestDifference'
]

const dataKind = [
  'ForeignInvestors',
  'Dealer', 
  'InvestmentTrust'
]

export default class LoggedIn extends Component {
  constructor(props) {
    super(props);
    console.log(this.props, this.props.location.state, global.a);
    console.log($);
    $.test(this);

    this.state = {
      savePath: '',
      type: dataKind[0],
      modalInfo: {
        message: '',
        description: '',
        type: ''
      },
      modalVisible: false
    }
    this.init();
  }

  init() {
    ipcRenderer.on('open-file', (event, path) => {
      document.getElementById('select-path-button').innerHTML = `PATH: ${path}`
      this.setState({savePath: path})
      console.log(`open file path: ${path}`)
    })
  }

  render() {
    return (
      <div className="logged-body">
        {/* <h2>Logged in as {this.props.location.state.username}</h2> */}
        {/* <Button
          onClick={() => {
            this.props.router.goBack();
          }}
        >
          返回
        </Button> */}
        <Row type="flex" justify="center" align="top">
          <Col span={5}>
            <RangePicker 
              className="date-picker"
            />
          </Col>
        </Row>
        <Row type="flex" justify="center" align="top">
          <Col span={1}>
            <Button className="export-button" id="select-path-button" type="primary" onClick={() => {
              ipcRenderer.send('open-file-dialog')
            }}> 
              Select Path
            </Button>  
            <Button className="export-button" type="primary" onClick={() => {
              var request = require("request");

              var options = { method: 'POST',
                url: 'http://www.cmoney.tw/finance/ashx/mainpage.ashx',
                headers: 
                 { 'postman-token': '0da6dfd4-9875-e7f3-50d9-a5ad4f13e524',
                   'cache-control': 'no-cache',
                   cookie: 'AspSession=x4qmcttddetg3bjzmm2xzvuu; __auc=2b204b7d1630b1076218f952ebe; _ga=GA1.2.1958369966.1524899018; _gid=GA1.2.740556572.1524899018; __asc=c1e3ebc11630b3efa483c4bbf51; _gat_UA-30929682-1=1; _gat_UA-30929682-32=1; _gat_UA-30929682-4=1; AspSession=x4qmcttddetg3bjzmm2xzvuu; __auc=2b204b7d1630b1076218f952ebe; _ga=GA1.2.1958369966.1524899018; _gid=GA1.2.740556572.1524899018; __asc=c1e3ebc11630b3efa483c4bbf51',
                   'accept-language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
                   'accept-encoding': 'gzip, deflate',
                   referer: 'http://www.cmoney.tw/finance/f00060.aspx?o=1',
                   'content-type': 'application/x-www-form-urlencoded',
                   'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
                   'x-requested-with': 'XMLHttpRequest',
                   'x-devtools-emulate-network-conditions-client-id': 'BC475E73E3A6D3F7BD37C2C980FD418',
                   origin: 'http://www.cmoney.tw',
                   accept: 'application/json, text/javascript, */*; q=0.01' },
                form: { 
                  action: 'GetInstitutionalInvestorsTmxOpenInterest', 
                  cmkey: '4W5do7FYe6v5p46asPMkug==', 
                  commKey: 'TX' } };
              
              request(options, function (error, response, body) {
                if (error) alert('Update data fail');
                let allInfo = JSON.parse(body);
                storage.set('Dealer', allInfo.Dealer, (err) => {
                  if (err) {
                    console.log('storage Dealer info error !', err)
                  }
                })

                storage.set('InvestmentTrust', allInfo.InvestmentTrust, (err) => {
                  if (err) {
                    console.log('storage InvestmentTrust info error !', err)
                  }
                })

                storage.set('ForeignInvestors', allInfo.ForeignInvestors, (err) => {
                  if (err) {
                    console.log('storage ForeignInvestors info error !', err)
                  }
                })
              });
              
            }}> 
              Update Data
            </Button>
            <Select defaultValue={dataKind[0]} style={{ width: 200 }} onChange={(value) => {
              this.setState({type: value})
            }}>
              {
                dataKind.map((value, key) => {
                  return <Select.Option key={key} value={value}> {value} </Select.Option>
                })
              }
            </Select>
            <Button className="export-button" type="primary" onClick={() => {
              storage.get(this.state.type, (error, data) => {
                if (error) throw error;
                if (!this.state.path) {
                  this.setState({
                    modalVisible: true,
                    modalInfo: {
                      title: 'Warning',
                      message: 'Please select a path to save file!',
                      type: 'error'
                    }
                  })
                  throw Error;
                }
                // console.log(JSON.stringify(data))
                let json2csvParser = new json2csv.Parser({ fields });
                const csv = json2csvParser.parse(data);
                // console.log(csv);
                fs.writeFile(this.state.savePath, csv, (err) => {
                  if (err) {
                    console.log('err: ', err)
                    alert('Save file fail!')
                  } else {
                    alert('Save file success!')
                  }
                })
              })
            }}>
              Save CSV
            </Button>
          </Col>
        </Row>
        <Modal
          title={this.state.modalInfo.title}
          visible={this.state.modalVisible}
          onOk={()=>{
            this.setState({modalVisible: false})
            ipcRenderer.send('open-file-dialog')
          }}
          onCancel={()=>{this.setState({modalVisible: false})}}
        >
          {this.state.modalInfo.message}
        </Modal>
      </div>
    );
  }
}

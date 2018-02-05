<template>
  <div class="sales-board">
      <div class="sales-board-intro">
        <h2>流量分析</h2>
        <p>是指在获得网站访问量基本数据的情况下对有关数据进行统计、分析，从中发现用户访问网站的规律，并将这些规律与网络营销策略等相结合，从而发现目前网络营销活动中可能存在的问题，并为进一步修正或重新制定网络营销策略提供依据。当然这样的定义是站在网络营销管理的角度来考虑的</p>
      </div>
      <div class="sales-board-form">
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  购买数量：
              </div>
              <div class="sales-board-line-right">
                  <counter :min="minNum" :max="maxNum" @on-change="onParamChange('number',$event)" ></counter>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  产品类型：
              </div>
              <div class="sales-board-line-right">
                  <selection :selections="versionList" @on-change="onParamChange('versionVal',$event)"></selection> 
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  有效时间：
              </div>
              <div class="sales-board-line-right">
                  <chooser :selections="periodList" @on-change="onParamChange('periodVal',$event)"></chooser> 
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  产品版本：
              </div>
              <div class="sales-board-line-right">
                <mutiply-chooser :selections="buyTypes" @on-change="onParamChange('buyTypesVal',$event)"></mutiply-chooser>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  总价：
              </div>
              <div class="sales-board-line-right">
                共 {{amount}} 元
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">&nbsp;</div>
              <div class="sales-board-line-right">
                  <div class="button" @click="ShowPayDialog">
                    立即购买
                  </div>
              </div>
          </div>
      </div>
      <my-dialog :is-show="isShowPayDialog" @close="closePayDialog">
        <table class="buy-dialog-table">
          <tr>
            <th>购买数量</th>
            <th>产品类型</th>
            <th>有效时间</th>
            <th>产品版本</th>
            <th>总价</th>
          </tr>
          <tr>
            <td>{{number}}</td>
            <td>{{test}}</td>
            <td>{{periodVal.label}}</td>
            <td>{{versionVal.label}}</td>
            <td>{{amount}}</td>
          </tr>
        </table>
        <h3 class="buy-dialog-title">请选择银行</h3>
        <bank-chooser @on-bank-change="changeBank"></bank-chooser>
        <div class="button buy-dialog-btn" @click="confirmBuy">
          确认购买
        </div>
      </my-dialog>
      <check-order :is-show-check-dialog="isShowCheckDialog" :is-show-success-dialog="isShowSuccessDialog"  :is-show-fail-dialog="isShowFailDialog" @pay-success="paySuccess" @pay-fail="payFail"></check-order>
      <div class="sales-board-des">
        <h2>产品说明</h2>
        <p>网站访问统计分析报告的基础数据源于网站流量统计信息，但其价值远高于原始数据资料。专业的网站访问统计分析报告对网络营销的价值，正如专业的财务分析报告对企业经营策略的价值。</p>

        <h3>用户行为指标</h3>
        <ul>
          <li>用户行为指标主要反映用户是如何来到网站的、在网站上停留了多长时间、访问了哪些页面等，主要的统计指标包括：</li>
          <li>用户在网站的停留时间；</li>
          <li>用户来源网站（也叫“引导网站”）；</li>
          <li>用户所使用的搜索引擎及其关键词；</li>
          <li>在不同时段的用户访问量情况等。</li>
        </ul>

        <h3>浏览网站方式</h3>
        <ul>
          <li>用户上网设备类型</li>
          <li>用户浏览器的名称和版本</li>
          <li>访问者电脑分辨率显示模式</li>
          <li>用户所使用的操作系统名称和版本</li>
          <li>用户所在地理区域分布状况等</li>
        </ul>
      </div>
  </div>
</template>

<script>
import Selection from "@/components/base/selection";
import Counter from "@/components/base/counter";
import Chooser from "@/components/base/chooser";
import MutiplyChooser from "@/components/base/mutiplyChooser";
import MyDialog from "@/components/base/dialog";
import BankChooser from "@/components/base/bankChooser";
import checkOrder from "@/components/base/checkOrder";
export default {
  data() {
    return {
      isShowCheckDialog: false,
      isShowSuccessDialog: false,
      isShowFailDialog: false,
      orderId: "",
      isShowPayDialog: false,
      amount: 0,
      number: 0,
      minNum: 25,
      maxNum: 35,
      numLevel: 5,
      buyTypesArr: [],
      buyTypesVal: [],
      versionVal: {},
      periodVal: {},
      versionList: [
        {
          label: "客户版",
          value: 0
        },
        {
          label: "代理商版",
          value: 1
        },
        {
          label: "专家版",
          value: 2
        }
      ],
      periodList: [
        {
          label: "半年",
          value: 0
        },
        {
          label: "一年",
          value: 1
        },
        {
          label: "三年",
          value: 2
        }
      ],
      buyTypes: [
        {
          label: "入门版",
          value: 0
        },
        {
          label: "中级版",
          value: 1
        },
        {
          label: "高级版",
          value: 2
        }
      ]
    };
  },
  components: {
    BankChooser,
    MyDialog,
    Selection,
    Counter,
    Chooser,
    MutiplyChooser,
    checkOrder
  },
  mounted() {
    this.initPostParam();
    this.getPrice();
  },
  computed: {
    test() {
      return this.buyTypesArr.join();
    }
  },
  methods: {
    onParamChange(attr, val) {
      this[attr] = val;
      this.getPrice();
      console.log(`${attr}:${this[attr]}`);
    },
    initPostParam() {
      this.number = this.minNum;
      this.versionVal = this.versionList[0];
      this.periodVal = this.periodList[0];
      this.buyTypesVal = [this.buyTypes[0]];
    },
    formatPostParam() {
      this.buyTypesArr = this.buyTypesVal.map(obj => obj.value);
      return {
        number: this.number,
        versionType: this.versionVal.value,
        periodType: this.periodVal.value,
        buyType: this.buyTypesArr.join()
      };
    },
    getPrice() {
      this.postParam = this.formatPostParam();
      this.$http.post("/api/price", this.postParam).then(
        res => {
          this.amount = res.data.data.amount;
        },
        err => {
          console.log(err);
        }
      );
    },
    ShowPayDialog() {
      this.isShowPayDialog = true;
    },
    closePayDialog() {
      this.isShowPayDialog = false;
    },
    changeBank(bankObj) {
      this.bankObj = bankObj;
      console.log(this.bankObj.id);
    },
    confirmBuy() {
      this.isShowPayDialog = false;
      this.allPostParam = Object.assign(this.postParam, {
        bankId: this.bankObj.id
      });
      // console.log(this.allPostParam);
      this.$http.post("/api/checkOrder", this.allPostParam).then(
        res => {
          // console.log(res.data.data.id);
          let agentData = res.data.data;
          this.orderId = agentData.id;
          this.isShowCheckDialog = true;
        },
        err => {
          console.log(err);
        }
      );
    },
    paySuccess() {
      this.isShowCheckDialog = false;
      this.isShowSuccessDialog = true;
    },
    payFail() {
      this.isShowCheckDialog = false;
      this.isShowFailDialog = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.buy-dialog-title {
  font-size: 16px;
  font-weight: bold;
}
.buy-dialog-btn {
  margin-top: 20px;
}
.buy-dialog-table {
  width: 100%;
  margin-bottom: 20px;
}
.buy-dialog-table td,
.buy-dialog-table th {
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 5px 0;
}
.buy-dialog-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
}
</style>

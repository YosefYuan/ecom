<template>
    <div class="order-wrap">
        <h3>您的产品</h3>
        <div class="order-list-choose">
            <div class="order-list-option">
                选择产品：
                <my-selection :selections="products" @on-change="productChange"></my-selection>
            </div>

            <div class="order-list-option">
                开始日期：
                <input type="text" v-model.lazy="startDate" @focus="showStartDate" />
                <!-- <date-picker @close="startDateShow=false" v-if="startDateShow" v-model="startDate"></date-picker> -->
                <date-picker @close="computeDate('startDateShow','startDate')" v-if="startDateShow" v-model="startDate"></date-picker>
            </div>

            <div class="order-list-option">
                结束日期：
                <input type="text" v-model.lazy="endDate" @focus="showEndDate" />
                <date-picker @close="computeDate('endDateShow','endDate')" v-if="endDateShow" v-model="endDate"></date-picker>
            </div>

            <div class="order-list-option">
                关键词：
                <input type="text" v-model="queryText" />
            </div>
        </div>
        <div class="order-list-table">
            <table>
                <tr>
                    <th v-for="item in tableHeads" :key="item.period">{{item.label}}</th>
                </tr>
                <tr v-for="item in tableData" :key="item.orderId">
                    <td>{{item.orderId}}</td>
                    <td>{{item.product}}</td>
                    <td>{{item.version}}</td>
                    <td>{{item.period}}</td>
                    <td>{{item.date}}</td>
                    <td>{{item.buyNum}}</td>
                    <td>{{item.amount}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import mySelection from '@/components/base/selection'
import DatePicker from 'vue-md-date-picker'
export default {
    components: {
        mySelection,
        DatePicker
    },
    data() {
        return {
            queryText: '',
            startDateShow: false,
            endDateShow: false,
            startDate: '',
            endDate: '',
            productLabel: "",
            allTableData: [],
            tableData: [],
            products: [
                {
                    label: '全部',
                    value: ''
                },
                {
                    label: '数据统计',
                    value: 0
                },
                {
                    label: '数据预测',
                    value: 1
                },
                {
                    label: '流量分析',
                    value: 2
                },
                {
                    label: '广告发布',
                    value: 3
                }
            ],
            tableHeads: [
                {
                    label: '订单号',
                    key: 'orderId'
                },
                {
                    label: '购买产品',
                    key: 'product'
                },
                {
                    label: '版本类型',
                    key: 'version'
                },
                {
                    label: '有效时间',
                    key: 'period'
                },
                {
                    label: '购买日期',
                    key: 'date'
                },
                {
                    label: '数量',
                    key: 'buyNum'
                },
                {
                    label: '总价',
                    key: 'amount'
                }
            ],
        }
    },
    created() {
        this.getOrderList();
    },
    watch: {
        queryText(newVal) {
            console.log(newVal)
        }
    },
    methods: {
        formatDate(date) {
            return new Date(date);
        },
        productChange(obj) {
            if (obj.value === "") {
                this.tableData = this.allTableData;
                return;
            }

            this.productLabel = obj.label;
            let cacheArr = [];
            this.allTableData.forEach(element => {
                // console.log(element.product);
                if (element.product === this.productLabel) {
                    cacheArr.push(element);
                };
            });
            this.tableData = cacheArr;
        },
        getOrderList() {
            this.$http.post('/api/getOrderList').then((res) => {
                this.allTableData = this.tableData = res.data.data.list;
            }, (err) => {
                console.log(err);
            })
        },
        showStartDate() {
            this.startDateShow = true;
        },
        showEndDate() {
            this.endDateShow = true;
        },
        filtByDate(sDate, eDate) {
            let cacheArr = [];

            this.tableData.forEach(element => {
                // console.log(element.product);
                // console.log(this.formatDate(sDate));
                // console.log(this.formatDate(eDate));
                if (this.formatDate(element.date) >= this.formatDate(sDate) && this.formatDate(element.date) <= this.formatDate(eDate)) {
                    cacheArr.push(element);
                };
            });
            this.tableData = cacheArr;
        },
        computeDate(rule1, rule2) {
            this[rule1] = false;
            if (this.formatDate(this.startDate) - this.formatDate(this.endDate) > 0) {
                this.$nextTick(() => {
                    this[rule1] = true;
                    this[rule2] = "";
                    alert('开始日期不能晚于结束日期');
                    return;
                })
            };
            this.filtByDate(this.startDate, this.endDate);
        }
    }
}
</script>

<style scoped>
.order-wrap {
    width: 1200px;
    min-height: 800px;
    margin: 20px auto;
    overflow: hidden;
}

.order-wrap h3 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
}

.order-query {
    height: 25px;
    line-height: 25px;
    border: 1px solid #e3e3e3;
    outline: none;
    text-indent: 10px;
}

.order-list-option {
    display: inline-block;
    padding-left: 15px;
}

.order-list-option:first-child {
    padding-left: 0;
}

.order-list-table {
    margin-top: 20px;
}

.order-list-table table {
    width: 100%;
    background: #fff;
}

.order-list-table td,
.order-list-table th {
    border: 1px solid #e3e3e3;
    text-align: center;
    padding: 10px 0;
}

.order-list-table th {
    background: #4fc08d;
    color: #fff;
    border: 1px solid #4fc08d;
    cursor: pointer;
}

.order-list-table th.active {
    background: #35495e;
}
</style>

<template>
  <div>
    <my-dialog :is-show="isShowCheckDialog" @close="checkEmit">
      请检查你的支付状态！
      <div class="button" @click="paySuccess">
        支付成功
      </div>
      <div class="button" @click="payFail">
        支付失败
      </div>
    </my-dialog>
    <my-dialog :is-show="isShowSuccessDialog">
      购买成功！
    </my-dialog>
    <my-dialog :is-show="isShowFailDialog">
      购买失败！
    </my-dialog>
  </div>
</template>

<script>
import myDialog from "@/components/base/dialog";
export default {
  props: {
    isShowCheckDialog: {
      type: Boolean,
      default: false
    },
    isShowSuccessDialog: {
      type: Boolean,
      default: false
    },
    isShowFailDialog: {
      type: Boolean,
      default: false
    }
  },
  components: {
    myDialog
  },
  data() {
    return {};
  },
  methods: {
    paySuccess() {
      this.$emit("pay-success");
    },
    payFail() {
      this.$emit("pay-fail");
    },
    checkEmit() {
      this.$emit("check-status");
    }
  }
};
</script>

<style>

</style>


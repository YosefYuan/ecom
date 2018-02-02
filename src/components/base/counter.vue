<template>
    <div class="counter-component">
      <div class="counter-btn" @click="minus"> - </div>
      <div class="counter-show">
        <input type="text" v-model="number" @blur="fixNumber">
      </div>
      <div class="counter-btn" @click="plus"> + </div>
    </div>
</template>

<script>
export default {
  props: {
    min: {
      type: Number,
      default: 20
    },
    max: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      number: this.min,
      FixedNum: 0
    };
  },
  watch: {
    FixedNum() {
      if (this.number >= this.min && this.number <= this.max) {
        this.$emit("on-change", this.number);
      }
    }
  },
  methods: {
    fixNumber() {
      let fix;
      if (typeof this.number === "string") {
        fix = Number(this.number.replace(/\D/g, ""));
      } else {
        fix = this.number;
      }
      if (fix > this.max || fix < this.min) {
        fix = this.min;
      }
      this.FixedNum = this.number = fix;
    },
    minus() {
      if (this.number <= this.min) return;
      this.FixedNum = --this.number;
    },
    plus() {
      if (this.number >= this.max) return;
      this.FixedNum = ++this.number;
    }
  }
};
</script>

<style scoped>
.counter-component {
  position: relative;
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
}
.counter-show {
  float: left;
}
.counter-show input {
  border: none;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  height: 23px;
  line-height: 23px;
  width: 30px;
  outline: none;
  text-indent: 4px;
}
.counter-btn {
  border: 1px solid #e3e3e3;
  float: left;
  height: 25px;
  line-height: 25px;
  width: 25px;
  text-align: center;
  cursor: pointer;
}
.counter-btn:hover {
  border-color: #4fc08d;
  background: #4fc08d;
  color: #fff;
}
</style>

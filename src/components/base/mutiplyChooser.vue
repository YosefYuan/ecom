<template>
    <div class="chooser-component">
        <ul class="chooser-list">
          <li
          :key="index"
          v-for="(item, index) in selections"
          @click="toggleChoose(index)"
          :class="{'active':itemIndexes.indexOf(index)!==-1}"
          >{{ item.label }}</li>
        </ul>
      </div>
</template>

<script>
export default {
  props: {
    selections: {
      type: Array,
      default: {
        label: "test",
        value: 0
      }
    }
  },
  data() {
    return {
      itemIndexes: [0]
    };
  },
  methods: {
    toggleChoose(index) {
      if (this.itemIndexes.indexOf(index) < 0) {
        this.itemIndexes.push(index);
      } else {
        this.itemIndexes.splice(this.itemIndexes.indexOf(index), 1);
      }
      let items = this.itemIndexes.map((index) => this.selections[index])
      this.$emit("on-change", items);
    }
  }
};
</script>

<style scoped>
.chooser-component {
  position: relative;
  display: inline-block;
}
.chooser-list li {
  display: inline-block;
  border: 1px solid #e3e3e3;
  height: 25px;
  line-height: 25px;
  padding: 0 8px;
  margin-right: 5px;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
}
.chooser-list li.active {
  border-color: #4fc08d;
  background: #4fc08d;
  color: #fff;
}
</style>
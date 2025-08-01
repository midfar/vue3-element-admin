<template>
  <div class="app-container">
    <div class="filter-container">
      <el-checkbox-group v-model="formThead">
        <el-checkbox value="apple">
          apple
        </el-checkbox>
        <el-checkbox value="banana">
          banana
        </el-checkbox>
        <el-checkbox value="orange">
          orange
        </el-checkbox>
      </el-checkbox-group>
    </div>

    <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="name" label="fruitName" width="180" />
      <el-table-column v-for="fruit in formThead" :key="fruit" :label="fruit">
        <template v-slot="scope">
          {{ scope.row[fruit] }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      tableData: [
        {
          name: 'fruit-1',
          apple: 'apple-10',
          banana: 'banana-10',
          orange: 'orange-10'
        },
        {
          name: 'fruit-2',
          apple: 'apple-20',
          banana: 'banana-20',
          orange: 'orange-20'
        }
      ],
      formThead: ['apple', 'banana']
    };
  }
});
</script>

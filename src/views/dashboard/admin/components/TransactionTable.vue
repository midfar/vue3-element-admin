<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="Order_No" min-width="200">
      <template v-slot="scope">
        {{ displayOrderNo(scope) }}
      </template>
    </el-table-column>
    <el-table-column label="Price" width="195" align="center">
      <template v-slot="scope">
        ¥{{ displayPrice(scope) }}
      </template>
    </el-table-column>
    <el-table-column label="Status" width="100" align="center">
      <template v-slot="{ row }">
        <el-tag :type="displayType(row)">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { defineComponent } from 'vue';
import { transactionList } from '@/api/remote-search';
import { toThousandFilter } from '@/utils/filters';

export default defineComponent({
  data() {
    return {
      list: null
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      };
      return statusMap[status];
    },
    displayOrderNo(scope) {
      const s = scope.row.order_no;
      if (s) {
        return s.substring(0, 30);
      }
      return '';
    },
    displayPrice(scope) {
      return toThousandFilter(scope.row.price);
    },
    displayType(row) {
      return this.statusFilter(row.status);
    },
    fetchData() {
      transactionList().then(response => {
        this.list = response.data.items.slice(0, 8);
      });
    }
  }
});
</script>

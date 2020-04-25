<template>
  <div class="props-wrap border-top">
    <div class="props">规格参数</div>
    <table>
      <tbody>
        <tr class="van-hairline--top" v-for="(item, index) in specifications" :key="index">
          <th>{{item[0]}}</th>
          <td>{{item[1]}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    specifications: Array
  }
}
</script>

<style lang="scss" scoped>
.props-wrap {
  padding: 0.22rem;
  .props {
    padding-bottom: 0.4rem;
    font-weight: bold;
    font-size: 0.3rem;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    tr {
      th {
        width: 1.8rem;
        padding: 0.2rem 0.2rem 0.2rem 0;
        text-align: left;
        font-weight: normal;
        color: #666;
      }
      td {
        padding: 0.2rem 0 0.2rem 0.2rem;
      }
    }
  }
}
</style>

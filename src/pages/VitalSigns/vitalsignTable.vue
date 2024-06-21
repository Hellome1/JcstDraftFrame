<template>
  <el-table ref="table" :data="tableData" class="table-row-version" style="width: 100%">
    <el-table-column prop="date" label="日期" width="150"> </el-table-column>
    <el-table-column prop="hours" label="小时" width="150">
      <template slot-scope="scope">
        <span :style="style" v-for="(hour, index) in scope.row.hours" :key="index">
          {{hour.hour}}
        </span>
      </template>
    </el-table-column>
    <el-table-column v-for="(desc, index) in descs" :key="desc" :prop="`desc${index}`" :label="desc" width="150">
      <template slot-scope="scope">
        <span :style="style" v-for="(hour, index) in scope.row.hours" :key="index">
          {{hour[desc] && hour[desc][0] || '-'}}
        </span>
      </template>
    </el-table-column>
    <!-- <el-table-column prop="val" label="脉搏（次/分）" width="200">
      <template slot-scope="scope">
        <span style="display: inline-block; width: 80px;" v-for="(hour, index) in scope.row.hours" :key="index">
          {{hour.val}}
        </span>
      </template>
    </el-table-column> -->
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      res: JCSTTESTDATA.MES0014_1,
      descs: [],
      style: {
        display: 'inline-block',
        width: '60px'
      }
    };
  },
  computed: {
    tableData() {
      let data = this.res && this.res.data;
      let dataObj = data[0];
      let handledData = [];
      let descs = [];

      let dateKey = 'vitalSignMeasDate';
      let hourKey = 'vitalSignMeasTime';
      let valKey = 'vitalSignMeasValue';
      let descKey = 'vitalSignMeasItemDesc';
      for (let code in dataObj) {
        let val = dataObj[code];
        let desc = val && val[0] && val[0][descKey] || '';
        if (desc && !descs.includes(desc)) descs.push(desc);
      }
      this.descs = descs;
      for (let code in dataObj) {
        let val = dataObj[code];
        val.reverse().forEach(itm => {
          let { [dateKey]:date, [hourKey]:hourRaw, [valKey]:val, [descKey]:desc } = itm;
          let hour = getHour(hourRaw);
          let t_date = arrHas(handledData, 'date', date);
          if (t_date) {
            let hours = t_date['hours'];
            let t_hour = arrHas(hours, 'hour', hour);
            if (t_hour) {
              if (desc in t_hour) {
                let vals = t_hour[desc];
                vals.push(val);
              } else {
                t_hour[desc] = [val];
              }
            } else {
              hours.push({
                hour,
                [desc]: [val]
              });
            }
          } else {
            handledData.push({
              date,
              hours: [
                {
                  hour,
                  [desc]: [val]
                }
              ]
            })
          }
        });
      }
      return handledData;

      function arrHas(arr, k, v) {
        return arr.filter(itm => itm[k] === v)[0];
      }
      function getHour(hour) {
        return hour.split(':')[0];
      }
    }
  },
  mounted() {
    let tableEl = this.$refs.table.$el;
    let tar = tableEl.getElementsByClassName('el-table__body')[0];
    // console.log(tar);
    this.$nextTick(() => {
      tar.style.width = '';
    });
  }
};
</script>

<style lang="scss">
.table-row-version {
  position: relative;
  .el-table__header-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: 149px;
    border-right: 1px solid black;
    .has-gutter {
      tr {
        display: flex;
        flex-direction: column;
      }
    }
  }
  .el-table__body-wrapper {
    margin-left: 150px;
    .el-table__body {
      width: calc(100% - 150px);
      overflow: auto;
      display: block;
      tbody {
        white-space: nowrap;
        display: flex;
        .el-table__row {
          display: flex;
          flex-direction: column;
          border-right: 1px solid rgba(0, 0, 0, 0.308);
          td {
            height: 50px;
            .cell {
              display: flex;
              justify-content: center;
              text-align: center;
              min-width: 100px;

              span {
                // border-right: 1px solid black;
              }
            }
          }
        }
      }
    }
  }
}
</style>
<script>
import { mapState } from 'vuex';
export default {
  props: {
  },
  data() {
    return {}
  },
  created() {
  },
  mounted() {
  },
  computed: {
    ...mapState(['modalTwo']),
    path() {
      return this.modalTwo.path;
    }
  },
  render: function(h) {
    return this.modalTwo.main.call(this, h)
  }
}
</script>
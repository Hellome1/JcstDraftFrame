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
    ...mapState(['modal']),
    path() {
      return this.modal.path;
    }
  },
  render: function(h) {
    return this.modal.main.call(this, h)
  }
}
</script>
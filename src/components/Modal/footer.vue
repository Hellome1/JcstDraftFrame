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
    ...mapState(['modal'])
  },
  render: function(h) {
    return this.modal.footer.call(this, h)
  }
}
</script>
<template>
  <div v-if="isInitialized">
    <slot :state="state"></slot>
  </div>
</template>

<script lang="ts">
    type State = Record<string, any>
import { Prop, Watch, Vue } from "vue-property-decorator";
import { createDecorator } from "vue-class-component";

const Component = createDecorator(()=>{})
interface SvgSize {
  width: number;
  height: number;
}

@Component
export default class StateStore extends Vue {
  @Prop({
    type: Object,
    default: () => ({}),
  })
  config!: {
    initState?: State
  }

  private isInitialized = false
  private state: State = this.config.initState || {}

  created() {
    this.isInitialized = true
  }

  commitState(newState: State) {
    this.state = newState
  }

  readState() {
    return this.state
  }

  @Watch('state')
  onStateUpdated(newValue: State) {
    this.$emit('state-updated', newValue)
  }
}
</script>

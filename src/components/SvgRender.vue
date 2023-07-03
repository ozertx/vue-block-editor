<template>
  <div>
    <svg
      v-if="templateId"
      xmlns="http://www.w3.org/2000/svg"
      :width="svgSize.width"
      :height="svgSize.height"
      viewBox="0 0 100 100"
    >
      <g v-if="templateId === 'circle'">
        <circle
          :cx="params.cx"
          :cy="params.cy"
          :r="params.radius"
          :fill="params.color"
        />
      </g>
      <g v-else-if="templateId === 'line'">
        <line
          :x1="params.fromXY.x"
          :y1="params.fromXY.y"
          :x2="params.toXY.x"
          :y2="params.toXY.y"
          stroke="black"
        />
      </g>
      <g v-else-if="templateId === 'arrow'">
        <path
          :d="getArrowPath(params.fromXY, params.toXY, params.arrowType)"
          fill="none"
          stroke="black"
        />
      </g>
      <g v-else-if="templateId === 'curvedline'">
        <path
          :d="getCurvedLinePath(params.fromXY, params.toXY)"
          fill="none"
          stroke="black"
        />
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import { Prop,  Vue } from "vue-property-decorator";
import { createDecorator } from "vue-class-component";

const Component = createDecorator(()=>{})
interface SvgSize {
  width: number;
  height: number;
}

@Component
export default class SvgRender extends Vue {
  @Prop({ required: true, type: String }) template!: string;
  @Prop({ required: true, type: Object }) params!: any;
  
  get templateId(): string {
    return this.template
  }

  get svgSize(): SvgSize {
    return this.params.size || { width: 100, height: 100 };
  }
}
</script>

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
          :cx="templateParams.cx"
          :cy="templateParams.cy"
          :r="templateParams.radius"
          :fill="templateParams.color"
        />
      </g>
      <g v-else-if="templateId === 'line'">
        <line
          :x1="templateParams.fromXY.x"
          :y1="templateParams.fromXY.y"
          :x2="templateParams.toXY.x"
          :y2="templateParams.toXY.y"
          stroke="black"
        />
      </g>
      <g v-else-if="templateId === 'arrow'">
        <path
          :d="getArrowPath(templateParams.fromXY, templateParams.toXY, templateParams.arrowType)"
          fill="none"
          stroke="black"
        />
      </g>
      <g v-else-if="templateId === 'curvedline'">
        <path
          :d="getCurvedLinePath(templateParams.fromXY, templateParams.toXY)"
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
  @Prop({ required: true, type: String }) templateName!: string;
  @Prop({ required: true, type: Object }) templateParams!: any;

  get templateId(): string | null {
    return this.templateName in this.$data ? this.templateName : null;
  }

  get svgSize(): SvgSize {
    return this.templateParams.size || { width: 100, height: 100 };
  }
}
</script>

<script lang="ts">
  import { getDotIndex, type DotPos } from "./dots";
  interface MojiProps {
    data: number[][];
    width: number;
    height: number;
  }
  let { data, width, height } = $props<MojiProps>();

  let canvas: HTMLCanvasElement;

  const setPixel = (image: ImageData, x: number, y: number, on: boolean) => {
    const v = on ? 0 : 0xff;
    const index = 4 * (x + y * width);
    image.data[index] = v;
    image.data[index + 1] = v;
    image.data[index + 2] = v;
    image.data[index + 3] = 0xff;
  };

  const drawDot = (image: ImageData, x: number, y: number) => {
    const dot = data[y][x];
    for (let dy = 0; dy < 4; dy++) {
      for (let dx = 0; dx < 2; dx++) {
        const index = getDotIndex(dx, dy);
        const on = ((dot >> index) & 1) === 1;
        setPixel(image, x * 2 + dx, y * 4 + dy, on);
      }
    }
  };

  const render = () => {
    const context = canvas.getContext("2d")!;
    const imageData = context.createImageData(width, height);

    for (let y = 0; y < height / 4; y++) {
      for (let x = 0; x < width / 2; x++) {
        drawDot(imageData, x, y);
      }
    }

    context.putImageData(imageData, 0, 0);
  };

  let isDown = false;
  let isOn = false;

  const getDotPos = (
    target: HTMLCanvasElement,
    offsetX: number,
    offsetY: number,
  ): DotPos => {
    const rect = target.getBoundingClientRect();

    const localX = ((offsetX / rect.width) * width) | 0;
    const localY = ((offsetY / rect.height) * height) | 0;

    const x = (localX / 2) | 0;
    const y = (localY / 4) | 0;

    const dx = localX % 2;
    const dy = localY % 4;

    return {
      x,
      y,
      dx,
      dy,
      index: getDotIndex(dx, dy),
    };
  };
  const getDot = ({ x, y, index }: DotPos) => {
    return ((data[y][x] >> index) & 1) === 1;
  };

  const setDot = ({ x, y, index }: DotPos, on: boolean) => {
    if (on) {
      data[y][x] |= 1 << index;
    } else {
      data[y][x] &= ~(1 << index);
    }
  };

  const onmousemove = (
    e: MouseEvent & { currentTarget: HTMLCanvasElement },
  ) => {
    if (!isDown) return;
    const target = e.currentTarget;

    const pos = getDotPos(target, e.offsetX, e.offsetY);
    setDot(pos, isOn);
  };
  const onmousedown = (
    e: MouseEvent & { currentTarget: HTMLCanvasElement },
  ) => {
    isDown = true;
    const pos = getDotPos(e.currentTarget, e.offsetX, e.offsetY);
    isOn = !getDot(pos);
  };
  const onmouseup = () => {
    isDown = false;
  };

  $effect(() => {
    render();
  });
</script>

<canvas
  bind:this={canvas}
  {width}
  {height}
  {onmousemove}
  {onmousedown}
  {onmouseup}
></canvas>
<svelte:window onblur={onmouseup} {onmouseup} />

<style>
  canvas {
    width: 100%;
    height: 100%;
    image-rendering: pixelated;
  }
</style>

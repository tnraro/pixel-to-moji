<script lang="ts">
  import { tick } from "svelte";
  import { dataToMoji, mojiToData } from "./moji";

  interface MojiProps {
    data: number[][];
    cols: number;
    rows: number;
  }
  let { data, cols, rows } = $props<MojiProps>();

  const s = $derived(dataToMoji(data));

  const oninput = (e: { currentTarget: HTMLTextAreaElement }) => {
    const target = e.currentTarget;
    const value = target.value;

    const _data = value.split(/\n/).map((x) => [...x].map(mojiToData));
    const maxCols = Math.max(..._data.map((row) => row.length));

    _data.forEach((row) => {
      for (let i = row.length; i < maxCols; i++) {
        row.push(0);
      }
    });

    const ss = Math.min(target.selectionStart, target.selectionEnd);
    const se = Math.max(target.selectionStart, target.selectionEnd);
    data = _data;
    tick().then(() => {
      target.setSelectionRange(ss, se);
    });
  };
</script>

<textarea {rows} {cols} {oninput}>{s}</textarea>

<style>
  textarea {
    width: 100%;
    height: 100%;
    font-family: monospace;
  }
</style>

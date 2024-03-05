<script lang="ts">
  import Moji from "./lib/moji.svelte";
  import Dots from "./lib/dots.svelte";

  let data: number[][] = $state([
    [
      0, 0, 0, 100, 36, 160, 36, 4, 0, 100, 36, 36, 68, 0, 70, 0, 192, 164, 64,
      0, 176, 0, 0,
    ],
    [
      0, 0, 0, 39, 36, 56, 36, 36, 0, 71, 0, 0, 87, 18, 71, 160, 3, 0, 177, 192,
      248, 0, 0,
    ],
    [
      0, 0, 16, 18, 18, 19, 18, 18, 2, 19, 18, 26, 3, 0, 7, 24, 68, 0, 120, 0,
      184, 0, 0,
    ],
    [
      0, 0, 0, 94, 9, 9, 9, 70, 0, 0, 9, 9, 9, 9, 71, 0, 25, 26, 1, 0, 184, 0,
      0,
    ],
    [0, 0, 0, 8, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 24, 0, 0],
  ]);
  let cols = $derived(data[0].length);
  let rows = $derived(data.length);
  let width = $derived(cols * 2);
  let height = $derived(rows * 4);

  const oninput = (e: { currentTarget: HTMLInputElement }) => {
    const target = e.currentTarget;
    const value = Number(target.value);
    const id = target.dataset.id!;
    switch (id) {
      case "cols": {
        if (value < cols) {
          data.forEach((row) => {
            row.length = value;
          });
        } else if (value > cols) {
          data.forEach((row) => {
            for (let i = cols; i < value; i++) row.push(0);
          });
        }
        return;
      }
      case "rows": {
        if (value < rows) {
          data.length = value;
        } else if (value > rows) {
          for (let i = rows; i < value; i++)
            data.push(([] as number[]).fill(0, 0, cols));
        }
        return;
      }
    }
  };
</script>

<main>
  <label>
    cols
    <input data-id="cols" type="number" value={cols} {oninput} />
  </label>
  <label>
    rows
    <input data-id="rows" type="number" value={rows} {oninput} />
  </label>
  <Moji bind:data {cols} {rows} />
  <Dots bind:data {width} {height} />
</main>

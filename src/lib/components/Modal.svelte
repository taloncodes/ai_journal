<script>

let { visible = $bindable(), deleteEntry } = $props();

async function handleDelete(){
    await deleteEntry();
    visible = false;
}

</script>

<main>

{#if visible}

<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="p-6 rounded-xl shadow-lg max-w-md w-full text-center"
         style="background-color: var(--color-surface); border: 1px solid var(--color-accent); color: var(--color-text);">
      <h1 class="text-xl font-semibold text-primary mb-4">This will permanently delete your entry</h1>
      <p class="mb-6">This action cannot be undone. Are you sure you want to continue?</p>
      <div class="flex justify-center gap-4">
        <button
          class="bg-red-400 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
          onclick={handleDelete}>
          Yes, delete it
        </button>
        <button
          class="bg-gray-300 text-text px-4 py-2 rounded-xl hover:bg-gray-400 transition"
          onclick={visible = false}>
          Cancel
        </button>
      </div>
    </div>
  </div>
  {/if}
  


</main>




<script>
    let selectedDate = $state('');
    let entries = $state([]);
  
    async function fetchEntries() {
      const res = await fetch('/api/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: selectedDate })
      });
  
      const data = await res.json();
      entries = data.entries;
    }
  </script>
  
  <input type="date" bind:value={selectedDate} onchange={fetchEntries} />
  
  {#if entries.length}
    <ul>
      {#each entries as entry}
        <li class="mb-4 border-b pb-2">
          <p><strong>Gratitude:</strong> {entry.gratitude}</p>
          <p><strong>Challenge:</strong> {entry.challenge}</p>
          <p><strong>Reflection:</strong> {entry.reflection}</p>
          <p><strong>Feeling:</strong> {entry.feeling}</p>
          <p><strong>AI Response:</strong> {entry.aiResponse}</p>
        </li>
      {/each}
    </ul>
  {:else if selectedDate}
    <p>No entries found for that date.</p>
  {/if}
  
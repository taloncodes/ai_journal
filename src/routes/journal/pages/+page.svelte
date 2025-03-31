<script>
	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	import Modal from '$lib/components/Modal.svelte';


	let entries = $state([]);
	let isModalOpen = $state(false);

	function formatDateLocal(date) {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	const today = formatDateLocal(new Date());
	let selectedDate = $state(today);

	const fetchEntries = async function () {
		const res = await fetch('/api/entries', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ date: selectedDate })
		});

		const data = await res.json();
		entries = data.entries;
	}

  async function handleSubmit(){
    
    await fetch('/api/update', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				review: review.value,
        		selectedDate
			})
		});

    await fetchEntries();
  }

  function confirmDelete(){
	isModalOpen = true;
  }

  async function deleteEntry(){
	await fetch('/api/delete', {
		method: 'POST',
		headers: {'Content-Type': 'application/json' },
		body: JSON.stringify({
			selectedDate
		})
	});

	await fetchEntries();
	await invalidateAll();
  }

	onMount(fetchEntries);

	$effect(() => {
	if (isModalOpen) {
		document.body.classList.add('no-scroll');
	} else {
		document.body.classList.remove('no-scroll');
	}
	});
	
</script>

<main class="min-h-screen pb-20 text-[var(--color-text)]" style="background-color: var(--color-background);">

	<Modal bind:visible={isModalOpen} { deleteEntry }/>

	{#if !isModalOpen}
	<section class="max-w-3xl mx-auto px-6 pt-8 flex flex-col gap-6">
		<p class="text-xl font-semibold text-primary text-center">
			Choose a different date to view previous entries
		</p>

		<div class="flex justify-center">
			<input
				type="date"
				bind:value={selectedDate}
				onchange={fetchEntries}
				class="border rounded-md p-2 bg-white text-text"
				style="border-color: var(--color-accent);"
			/>
		</div>

		

		{#if entries.length}

		<h1 class="text-2xl font-semibold text-primary text-center">
			Journal Entry: {selectedDate}
		</h1>
			<div class="space-y-6 mt-6">
					<div
						class="p-6 rounded-xl shadow border"
						style="background-color: var(--color-surface); border-color: var(--color-accent);">
						<ul class="space-y-2">
							<li><strong>Gratitude:</strong> {entries[0].gratitude}</li>
							<li><strong>Challenge:</strong> {entries[0].challenge}</li>
							<li><strong>Reflection:</strong> {entries[0].reflection}</li>
							<li><strong>Feeling:</strong> {entries[0].feeling}</li>
							<li><strong>AI Summary:</strong> {entries[0].aiResponse}</li>
						</ul>
					</div>
			</div>

      	<div class="space-y-6 mt-6">

			<h2 class="text-2xl font-semibold text-primary text-center">
				Reflection
			</h2>
				<div class="p-6 rounded-xl shadow border" style="background-color: var(--color-surface); border-color: var(--color-accent);">

				

				{#if !entries[0].review}
				<form onsubmit={handleSubmit}>
				<label for="review"> Would you like to add any retrospective thoughts to this entry?</label>
				<input id="review" name="review" type="textarea" placeholder="e.g. how you have progressed or reponsded to feedback" style="width: 100%; height:150px">
				<button type="submit">Add review</button>
				<input type="hidden" id="selectedEntry" name="selectedEntry" value={selectedDate}/>
				</form>
				
				{:else}

				<p>{entries[0].review}</p>

				{/if}
			</div>

			<button class="p-2 !border-[var(--color-text)] bg-red-400 rounded-xl block m-auto transition-all hover:scale-110" onclick={confirmDelete}>
				<strong>DELETE ENTRY</strong>
			</button>
		</div>


		{:else if selectedDate}
			<p class="text-center text-accent mt-4">No entries found for that date.</p>
		{/if}
	</section>
	{/if}
</main>

<style>
	:global(.no-scroll){
		overflow: hidden !important;
	}
</style>

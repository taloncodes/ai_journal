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
		
		{#if entries.length}

		<h1 class="text-2xl font-semibold text-primary text-center">
			Journal Entry: {selectedDate}
		</h1>

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
			<div class="space-y-6 mt-2">
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

      	<div class="space-y-6">

			<h2 class="text-2xl font-semibold text-primary text-center">
				Reflection
			</h2>
				<div class="p-6 rounded-xl shadow border" style="background-color: var(--color-surface); border-color: var(--color-accent);">

				

					{#if !entries[0].review}
					<form
					  onsubmit={handleSubmit}
					  class="flex flex-col gap-4 mt-4">
					  <label
						for="review"
						class="text-lg"
						style="color: var(--color-primary-dark);">
						Would you like to add any retrospective thoughts to this entry?
					  </label>
					
					  <textarea
						id="review"
						name="review"
						bind:this={review}
						placeholder="e.g. how you have progressed or responded to feedback"
						required
						class="w-full p-3 border rounded-md resize-none"
						style="height: 150px; border-color: var(--color-accent); background-color: white; color: var(--color-text);"
					  ></textarea>
					
					  <button
						type="submit"
						class="px-4 py-2 rounded-lg self-start transition-colors text-white"
						style="background-color: var(--color-primary);"
					  >
						Add review
					  </button>
					
					  <input type="hidden" name="selectedEntry" value={selectedDate} />
					</form>
					
				
				{:else}

				<p class="retrospect">{entries[0].review}</p>

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

	li strong{
		color: var(--color-primary);
		font-family: "playwrite-cc-gb-j", sans-serif;
		font-weight: 400;
		font-style: normal;
		font-size: larger;
	}

	label {
		font-weight: 400;
	}

	.retrospect{
		font-family: "adelle-sans", sans-serif;
		font-weight: 100;
		font-style: normal;

	}
</style>

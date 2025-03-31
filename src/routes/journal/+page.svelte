<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { invalidateAll } from '$app/navigation';

	let { data } = $props();
	let gratitude = $state('');
	let challenge = $state('');
	let reflection = $state('');
	let feeling = $state(5);
	let aiResponse = $state('');
	let userId = data.userId;
	let alreadySubmitted = $state(data.alreadySubmitted);
	let entry = $state(data.entry);
	let loading = $state(false);

	async function handleSubmit() {
		aiResponse = '';
		loading = true;
		const prompt = `
    You are a journaling assistant. Based on the user's entries, write a kind and positive reflection on the day. End with one small suggestion for tomorrow.

    Gratitude: ${gratitude}
    Challenge: ${challenge}
    Reflection: ${reflection}
    Mood (0-10): ${feeling}
    `;

		const res = await fetch('/api/advice', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ prompt })
		});

		const data = await res.json();
		aiResponse = data.choices[0].message.content;

		await fetch('/api/save-journal', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				gratitude,
				challenge,
				reflection,
				feeling,
				aiResponse
			})
		});

		await invalidateAll();
		loading = false;

	}
</script>

<main class="min-h-screen pb-20 text-[var(--color-text)]" style="background-color: var(--color-background);">
	

	<section class="max-w-3xl mx-auto px-6">
		{#if alreadySubmitted}

		<h1 class="text-2xl font-semibold text-primary text-center mb-8 mt-8"> You've already submitted an entry today, come back tomorrow to add a new one!</h1>
			<div class="p-6 rounded-xl shadow-md border" style="background-color: var(--color-surface); border-color: var(--color-accent);">
				<h2 class="text-xl font-semibold mb-4" style="color: var(--color-primary);">Today's entry...</h2>
				<ul class="space-y-2">
					<li><strong>Gratitude:</strong> {entry.gratitude}</li>
					<li><strong>Challenge:</strong> {entry.challenge}</li>
					<li><strong>Reflection:</strong> {entry.reflection}</li>
					<li><strong>Feeling:</strong> {entry.feeling}</li>
					<li><strong>AI Summary:</strong> {entry.aiResponse}</li>
				</ul>
			</div>

			<button onclick={goto('/journal/pages')} class="viewmoreBtn block m-auto transition-all hover:scale-110">
				View Previous Entries
			</button>
		{:else}

		<h1 class="text-xl font-semibold text-primary text-center mb-8 mt-8"> Add a journal entry for today</h1>
			<form onsubmit={handleSubmit}
				class="p-6 rounded-xl shadow-md border flex flex-col gap-4"
				style="background-color: var(--color-surface); border-color: var(--color-accent);">
				
				<div>
					<label for="gratitude" class="text-lg" style="color: var(--color-primary-dark);">
						What are you grateful for today?
					</label>
					<input
						id="gratitude"
						name="gratitude"
						type="text"
						bind:value={gratitude}
						placeholder="Write something that you're grateful for..."
						required
						class="w-full p-2 border rounded-md mt-1"
						style="border-color: var(--color-accent); background-color: white; color: var(--color-text);" />
				</div>

				<div>
					<label for="challenge" class="text-lg" style="color: var(--color-primary-dark);">
						What was a difficult situation or feeling you experienced today?
					</label>
					<input
						id="challenge"
						name="challenge"
						type="text"
						bind:value={challenge}
						placeholder="Describe a challenge you faced..."
						required
						class="w-full p-2 border rounded-md mt-1"
						style="border-color: var(--color-accent); background-color: white; color: var(--color-text);" />
				</div>

				<div>
					<label for="reflection" class="text-lg" style="color: var(--color-primary-dark);">
						What is something you've learned or want to reflect on today?
					</label>
					<input
						id="reflection"
						name="reflection"
						type="text"
						bind:value={reflection}
						placeholder="Reflect on the day..."
						required
						class="w-full p-2 border rounded-md mt-1"
						style="border-color: var(--color-accent); background-color: white; color: var(--color-text);" />
				</div>

				<div>
					<label for="feeling" class="text-lg" style="color: var(--color-primary-dark);">
						How are you feeling?
					</label>
					<input
						type="range"
						id="feeling"
						name="feeling"
						bind:value={feeling}
						min="0"
						max="10"
						step="1"
						class="w-full mt-1"
						style="accent-color: var(--color-primary);" />
					<p class="text-sm mt-1" style="color: var(--color-accent);">Mood: {feeling}/10</p>
				</div>

				<button
					type="submit"
					class="px-4 py-2 rounded-lg self-start transition-colors mt-2 text-white disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading || aiResponse}
					style="background-color: var(--color-primary);">
					Submit
				</button>
			</form>
		{/if}

		{#if loading}
		<div class="mt-8 p-6 rounded-xl text-center text-accent">
			<p>✨ Generating your AI reflection...</p>
		</div>

		{:else if aiResponse}
			<div class="mt-8 p-6 rounded-xl shadow border"
				style="background-color: var(--color-surface); border-color: var(--color-primary);">
				<h2 class="text-lg font-semibold mb-2" style="color: var(--color-primary);">AI Reflection</h2>
				<p class="ai-response">{aiResponse}</p>
			</div>

			<button onclick={goto('/journal/pages')} class="viewmoreBtn block m-auto transition-all hover:scale-110">
				View Previous Entries
			</button>
		{/if}
	</section>
</main>


<style>
	.viewmoreBtn{
		padding: 10px;
        border-radius: 10px;
        background-color: var(--color-text);
		color: var(--color-accent);
        transition: ease 0.3s;
		margin-top: 32px;
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

	.ai-response{
		font-family: "adelle-sans", sans-serif;
		font-weight: 100;
		font-style: normal;
	}
</style>

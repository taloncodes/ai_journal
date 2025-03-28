<script>
	import { page } from '$app/state';

	let { data } = $props();
	let gratitude = $state('');
	let challenge = $state('');
	let reflection = $state('');
	let feeling = $state(5);
	let aiResponse = $state('');
	let userId = data.userId;
	let alreadySubmitted = data.alreadySubmitted;
	let entry = data.entry;

	async function handleSubmit() {
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
	}
</script>

<main class="min-h-screen pb-20 text-[var(--color-text)] font-sans" style="background-color: var(--color-background);">
	<header class="px-8 py-6 shadow-md mb-8 text-white" style="background-color: var(--color-primary);">
		<h1 class="text-2xl font-semibold">Welcome to your journal</h1>
		<p class="text-sm opacity-90">Logged in as: {userId}</p>
	</header>

	<section class="max-w-3xl mx-auto px-6">
		{#if alreadySubmitted}
			<div class="p-6 rounded-xl shadow-md border" style="background-color: var(--color-surface); border-color: var(--color-accent);">
				<h2 class="text-lg font-semibold mb-4" style="color: var(--color-primary);">You've already submitted today's entry:</h2>
				<ul class="space-y-2">
					<li><strong>Gratitude:</strong> {entry.gratitude}</li>
					<li><strong>Challenge:</strong> {entry.challenge}</li>
					<li><strong>Reflection:</strong> {entry.reflection}</li>
					<li><strong>Feeling:</strong> {entry.feeling}</li>
					<li><strong>AI Summary:</strong> {entry.aiResponse}</li>
				</ul>
			</div>
		{:else}
			<form on:submit|preventDefault={handleSubmit}
				class="p-6 rounded-xl shadow-md border flex flex-col gap-4"
				style="background-color: var(--color-surface); border-color: var(--color-accent);">
				
				<div>
					<label for="gratitude" class="text-sm" style="color: var(--color-accent);">
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
					<label for="challenge" class="text-sm" style="color: var(--color-accent);">
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
					<label for="reflection" class="text-sm" style="color: var(--color-accent);">
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
					<label for="feeling" class="text-sm" style="color: var(--color-accent);">
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
					class="px-4 py-2 rounded-lg self-start transition-colors mt-2 text-white"
					style="background-color: var(--color-primary);">
					Submit
				</button>
			</form>
		{/if}

		{#if aiResponse}
			<div class="mt-8 p-6 rounded-xl shadow border"
				style="background-color: var(--color-surface); border-color: var(--color-primary);">
				<h2 class="text-lg font-semibold mb-2" style="color: var(--color-primary);">AI Reflection</h2>
				<p>{aiResponse}</p>
			</div>
		{/if}
	</section>
</main>

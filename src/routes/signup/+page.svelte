<script>
	let { form } = $props();
	let email = $state('');
	let password = $state('');
</script>

<main class="flex justify-center items-center h-dvh bg-background text-text font-sans">
	<div class="card w-[500px] h-[500px] bg-surface rounded-2xl border-[var(--color-primary-dark)] border-1 shadow-md p-8 flex flex-col justify-center gap-6">
		<h1 class="text-2xl font-semibold text-primary text-center">Create an Account</h1>

		<form method="POST" class="flex flex-col gap-4 w-full">
			<div class="flex flex-col gap-1">
				<label for="email" class="text-accent text-sm">Email</label>
				<input
					id="email"
					type="email"
					name="email"
					bind:value={email}
					required
					class="p-2 border border-accent rounded-md bg-white text-text focus:outline-primary"
				/>
			</div>

			<div class="flex flex-col gap-1">
				<label for="password" class="text-accent text-sm">Password</label>
				<input
					id="password"
					type="password"
					name="password"
					bind:value={password}
					required
					class="p-2 border border-accent rounded-md bg-white text-text focus:outline-primary"
				/>
			</div>

			<button
				type="submit"
				class="mt-4 bg-primary hover:bg-primary-dark text-accent px-4 py-2 rounded-lg self-center transition-colors"
			>
				Sign up
			</button>
		</form>

		{#if form?.error}
			<p class="text-red-600 text-center">{form.error}</p>
		{/if}
	</div>
</main>

<style>
	main {
		background-color: var(--color-background);
	}

	.card {
		background-color: var(--color-surface);
	}
</style>

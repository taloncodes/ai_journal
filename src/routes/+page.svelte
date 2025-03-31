<script>
	import { goto } from '$app/navigation';
</script>

<main class="flex justify-center items-center h-dvh bg-background text-text px-3 md:px-0">
	<div class="card w-[500px] h-[500px] bg-surface rounded-2xl border-[var(--color-primary-dark)] border-1 shadow-md p-8 flex flex-col justify-center gap-6">
		<h1 class="text-2xl font-semibold text-primary text-center">Welcome to Your Journal</h1>
		<p class="text-center text-accent">Start your journey today!</p>

		<div class="flex flex-col gap-4 items-center">
			<button
				on:click={() => goto('/login')}
				class="bg-primary hover:bg-primary-dark text-accent px-4 py-2 rounded-lg transition-colors w-1/2"
			>
				Login
			</button>

			<button
				on:click={() => goto('/signup')}
				class="bg-primary hover:bg-primary-dark text-accent px-4 py-2 rounded-lg transition-colors w-1/2"
			>
				Sign Up
			</button>
		</div>
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

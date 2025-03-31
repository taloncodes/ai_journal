<script>
	let { form } = $props();
</script>

<main class="flex justify-center items-center h-dvh bg-background text-text px-3 md:px-0">
	<div class="card w-[500px] h-[500px] bg-surface rounded-2xl border-[var(--color-primary-dark)] border-1 shadow-md p-8 flex flex-col justify-center gap-6">

		<h1 class="text-2xl font-semibold text-primary text-center">Welcome Back</h1>

		<form method="POST" class="flex flex-col gap-4">
			<div class="flex flex-col gap-1">
				<label for="email" class="text-accent text-sm">Email</label>
				<input
					id="email"
					type="email"
					name="email"
					required
					class="p-2 border border-accent rounded-md bg-white text-text focus:outline-primary"/>
			</div>

			<div class="flex flex-col gap-1">
				<label for="password" class="text-accent text-sm">Password</label>
				<input
					id="password"
					type="password"
					name="password"
					required
					class="p-2 border border-accent rounded-md bg-white text-text focus:outline-primary"/>
			</div>

			<button
				type="submit"
				class="mt-4 bg-primary hover:bg-primary-dark text-accent px-4 py-2 rounded-lg self-center transition-colors">
				Log in
			</button>
		</form>
    

		{#if form?.error}
			<p class="text-center">{form.error}</p>
		{/if}

    <div class="text-center"><p>Don't have an account yet? <a class="!text-[var(--color-primary-dark)]" href="/signup">Create one here</a></p></div>
	</div>
</main>

<style>
  main{
    background-color: var(--color-background);
  }

  .card{
    background-color: var(--color-surface);
  }


</style>

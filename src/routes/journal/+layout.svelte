<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import '../../app.css';

	let showMobileMenu = $state(false);

	const currentPath = $derived(page.url.pathname);

	let { children, data } = $props();
	let userId = data.userId;
</script>

<header class="px-8 py-6 shadow-md flex justify-between items-center flex-wrap" style="background-color: var(--color-primary)">
	<div class="headerText">
		<h1 class="text-2xl font-semibold">Welcome to your journal</h1>
		<p class="text-md lg:text:sm opacity-90">Reflect and reset with your AI powered journal</p>
	</div>


	<button 
	class="lg:hidden w-10 h-10 flex items-center justify-center rounded-md bg-[var(--color-text)]"
	onclick={() => showMobileMenu = !showMobileMenu}>
	<img src="/icons/menu_icon.svg" alt="Menu" class="w-6 h-6" />
</button>



	<nav class={`headerBtns w-full lg:w-auto flex flex-col lg:flex-row ${showMobileMenu ? 'flex' : 'hidden'} lg:flex`}>
		<button
			onclick={() => goto('/journal')}
			class:selected={currentPath === '/journal'}>
			New
		</button>

		<button
			onclick={() => goto('/journal/pages')}
			class:selected={currentPath === '/journal/pages'}>
			Pages
		</button>

		<button onclick={() => goto('/logout')}>
			Log Out
		</button>
	</nav>
</header>

{@render children()}

<style>
	.headerBtns button {
		padding: 10px;
		border-radius: 10px;
		background-color: var(--color-text);
		color: var(--color-accent);
		transition: ease 0.3s;
		margin: 5px;
	}

  @media (min-width: 1024px) {
	.headerBtns button:hover {
		transform: scale(1.1);
	}
}


	.headerBtns button.selected {
		background-color: var(--color-accent);
		color: var(--color-text);
	}
</style>

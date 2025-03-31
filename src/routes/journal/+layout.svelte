<script>
    import { goto } from '$app/navigation';
	  import '../../app.css';
    import { page } from '$app/state';

    const currentPath = $derived(page.url.pathname);


    let { children, data } = $props();
    let userId = data.userId;
    

</script>


<header class="px-8 py-6 shadow-md flex justify-between" style="background-color: var(--color-primary)">
    <div class="headerText">
		<h1 class="text-2xl font-semibold">Welcome to your journal</h1>
		<p class="text-sm opacity-90">Logged in as: {userId} </p>
  </div>
  <div class="headerBtns">
    <button onclick={() => goto('/journal')}
      class:selected={currentPath === '/journal'}
      >
      New
    </button>
    <button 
      onclick={() => goto('/journal/pages')}
      class:selected={currentPath === '/journal/pages'}
      >
      Pages
    </button>
    <button onclick={() => goto('/logout')}>
      Log Out
    </button>
  </div>
</header>

{@render children()}

<style>
    .headerBtns Button{
        padding: 10px;
        border-radius: 10px;
        background-color: var(--color-text);
        color: var(--color-accent);
        transition: ease 0.3s;
        margin-left: 5px;
        margin-right: 5px;
    }

    .headerBtns Button:hover{
        transform: scale(1.1);
    }

    .headerBtns button.selected {
    background-color: var(--color-accent);
    color: var(--color-text);
}
</style>
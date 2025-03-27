<script>
    let { form } = $props();
    let email = $state('');
    let password = $state('');
  </script>
  
  <form method="POST">
    <label>Email:
      <input type="email" name="email" bind:value={email} required />
    </label>
    <label>Password:
      <input type="password" name="password" bind:value={password} required />
    </label>
    <button type="submit">Sign up</button>
  </form>

  {#if form?.error}
  <p style="color: red;">{form.error}</p>
{/if}


  
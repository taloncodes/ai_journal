<script>
    let { form } = $props();
  </script>
  
  <form method="POST">
    <label>Email:
      <input type="email" name="email" required />
    </label>
    <label>Password:
      <input type="password" name="password" required />
    </label>
    <button type="submit">Log in</button>
  </form>
  
  {#if form?.error}
    <p style="color: red;">{form.error}</p>
  {/if}
  
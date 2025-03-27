<script>
  let { data } = $props();
  console.log(data.userId);
</script>
  
<h1>Welcome to your journal</h1>
<p>Logged in as: {data.userId}</p>

<form method="POST">

  <div class="formWrapper flex flex-col">

  <label for="prompt1">Prompt 1</label>
  <input name="prompt1" type="text">

  <label for="prompt2">Prompt 2</label>
  <input name="prompt2" type="text">

  <label for="prompt3">Prompt 3</label>
  <input name="prompt3" type="text">

  <button type="submit">Submit</button>

</div>

</form>
  
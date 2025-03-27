<script>
  let { data } = $props();
  console.log(data.userId);
  let gratitude = $state('');
  let challenge = $state('');
  let reflection = $state('');
  let feeling = $state(5);
  let aiResponse = $state('');

  async function handleSubmit(){

    const prompt = `
    You are a journaling assistant. Based on the user's entries, write a kind and positive reflection on the day. End with one small suggestion for tomorrow.

    Gratitude: ${gratitude}
    Challenge: ${challenge}
    Reflection: ${reflection}
    Mood (0-10): ${feeling}
    `;

    const res = await fetch('/api/advice', {

      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ prompt })

    });

    const data = await res.json();
    aiResponse = data.choices[0].message.content;
  };


</script>
  
<h1>Welcome to your journal</h1>
<p>Logged in as: {data.userId}</p>

<form onsubmit={handleSubmit}>


  <div class="formWrapper flex flex-col">

  <label for="gratitude">What are you grateful for today?</label>
  <input id="gratitude" name="gratitude" type="text" bind:value={gratitude} placeholder="Write something that you're grateful for..." required>

  <label for="challenge">What was a difficult situation or feeling you experienced today?</label>
  <input id="challenge" name="challenge" type="text" bind:value={challenge} placeholder="Describe a challenge you faced..." required>

  <label for="reflection">What is something you've learned or want to reflect on today?</label>
  <input id="reflection" name="reflection" type="text" bind:value={reflection} placeholder="Reflect on the day..." required>

  <label for="feeling">How are you feeling?</label>
  <input type="range" id="feeling" name="feeling" bind:value={feeling} min="0" max="10" step="1"/>

  <button type="submit">Submit</button>

</div>

</form>

{#if aiResponse}

  <div class="ai-response">
    <h2>AI Reflection</h2>
    <p>{aiResponse}</p>
  </div>

{/if }
  
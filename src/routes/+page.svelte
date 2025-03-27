<script>
    import { goto } from '$app/navigation';
  </script>
  
  <h1>Welcome to Your Journal</h1>
  <p>Start your journey today!</p>
  <button onclick={goto('/login')}>Login</button>
  <button onclick={goto('/signup')}>Sign Up</button>
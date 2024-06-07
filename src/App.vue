<template>
    <AppLayout :page-title="pageTitle">
      <div class="homepage">
          <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2 text-center">
        <h1>Welcome to Task Management</h1>
        <p class="lead">Manage your tasks efficiently with our simple task management application.</p>
        <p>Whether you're organizing your personal tasks or coordinating a team project, our platform offers the tools you need to stay organized and productive.</p>
        <p>Sign up now to get started!</p>
        <a href="#" class="btn btn-primary btn-lg">Sign Up</a>
      </div>
    </div>
  </div>
      </div>
    </AppLayout>
</template>

<script>

import AppLayout from './components/layouts/AppLayout.vue';

export default {
    components:{
        AppLayout,
    },
    setup() {
        const pageTitle = 'Gestion des taches';

        return {
            pageTitle
        }
    },
}
</script>

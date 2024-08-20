<template>
    <DashLayout page-title="Home Admin panel">
    
    <div class="homePanel">
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <SideBar />
                </div>
                <div class="col-md-9">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="mb-0">Admin panel!</h5>
                        </div>
                        <div class="card-body">
                            Welcome!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    </DashLayout>
</template>


<script>

import DashLayout from '../layouts/DashLayout.vue';
import SideBar from './SideBar.vue';

export default {
  props: {
  },
    components:{
        DashLayout,
        SideBar
    },
    setup() {
    },
}
</script>

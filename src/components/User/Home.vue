<template>
    <DashLayout page-title="Home">
     <div class="topAnalyses">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h2 class="mb-3">Dashboard  </h2>
                </div>
            </div>
            <div class="row analyseRow" >
                <div class="col-md-4">
                    <div class="analyseItem">
                        <h5 class="d-block">11</h5>
                        <span class="text-muted">Tasks In Waiting</span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="analyseItem">
                        <h5 class="d-block"> 3 </h5>
                        <span class="text-muted">Tasks Disapproved</span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="analyseItem">
                        <h5 class="d-block">25</h5>
                        <span class="text-muted">Tasks Completed</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="homePanel">
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                <!-- links -->
                <ul class="list-unstyled px-0 links">
                    <li class="active">
                        <a href="#">
                            Tasks In Progess
                        </a>
                    </li>
                    <li>
                        <a href="#">
                           Tasks Disapproved
                        </a>
                    </li>
                     <li>
                        <a href="#">
                           Tasks In Waiting
                        </a>
                    </li>
                     <li>
                        <a href="#">
                           Tasks Completed
                        </a>
                    </li>
                    
                </ul>
                <!-- end links -->
            </div>
            <div class="col-md-9">
                <TasksTable />
            </div>
        </div>
    </div>
</div>


    </DashLayout>
</template>


<script>

import DashLayout from '../layouts/DashLayout.vue';
import { computed } from "vue";
import { useStore } from "vuex";
import TasksTable from   './Tasks/TasksTable.vue'
export default {
    components:{
        DashLayout,
        TasksTable
    },
    setup() {
        const store = useStore();
        
        return {
            user: computed(() => store.getters['userModule/getUser']),
        }
    },
}
</script>

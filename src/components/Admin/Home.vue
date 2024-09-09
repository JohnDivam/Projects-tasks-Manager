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
              <div class="card-body">
                <div class="filters mb-3">
                  <div class="row">
                    <div class="col-md-3">
                        <select  class="form-control" v-model="selectedMonth" @change="setupChart">
                            <option value="">All Months</option>
                            <option v-for="month in months" :key="month.value" :value="month.value">
                            {{ month.name }}
                            </option>
                        </select>
                    </div>
                    <div class="col-md-3">
                          <select  class="form-control" v-model="selectedYear" @change="setupChart">
                            <option value="">All Years</option>
                            <option v-for="year in years" :key="year" :value="year">
                            {{ year }}
                            </option>
                        </select>
                    </div>
                  </div>
                </div>
                <canvas id="taskChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashLayout>
</template>

<script>
import { ref, onMounted } from "vue";
import { Chart } from "chart.js/auto"; 
import DashLayout from "../layouts/DashLayout.vue";
import SideBar from "./SideBar.vue";
import axios from "./../../services/axios";

export default {
  components: {
    DashLayout,
    SideBar,
  },
    setup() {
    // Reactive variables for month and year
    const months = ref([
      { value: 1, name: "January" },
      { value: 2, name: "February" },
      { value: 3, name: "March" },
      { value: 4, name: "April" },
      { value: 5, name: "May" },
      { value: 6, name: "June" },
      { value: 7, name: "July" },
      { value: 8, name: "August" },
      { value: 9, name: "September" },
      { value: 10, name: "October" },
      { value: 11, name: "November" },
      { value: 12, name: "December" },
    ]);

    const years = ref([2023, 2024, 2025]); // Example years, adjust as needed
    const selectedMonth = ref("");
    const selectedYear = ref("");

    // Store the chart instance
    let chartInstance = null;

    // Fetch tasks by employee and set up the chart
    const setupChart = async () => {
      try {
        // API request with month and year filters
        const response = await axios.get("/getApprovedTasksByEmployee", {
          params: {
            month: selectedMonth.value,
            year: selectedYear.value,
          },
        });

        const employees = response.data.map((item) => item.employee);
        const taskCounts = response.data.map((item) => item.taskCount);

        const ctx = document.getElementById("taskChart").getContext("2d");

        // Destroy the previous chart instance if it exists
        if (chartInstance) {
          chartInstance.destroy();
        }

        // Create a new chart
        chartInstance = new Chart(ctx, {
          type: "bar", // Chart type
          data: {
            labels: employees, // Employee names as labels
            datasets: [
              {
                label: "Approved tasks by Employee",
                data: taskCounts, // Task counts for each employee
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      } catch (error) {
        console.error("Error fetching tasks by employee:", error);
      }
    };

    onMounted(() => {
      setupChart(); // Call the function once the component is mounted
    });

    return {
      months,
      years,
      selectedMonth,
      selectedYear,
      setupChart,
    };
  },
};
</script>

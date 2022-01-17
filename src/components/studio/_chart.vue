<script lang="ts">
import { Line } from "vue-chartjs";

export default {
    props: ["game", "date"],
    extends: Line,
    mounted() {
        //@ts-ignore
        this.fetchChart();
    },
    methods: {
        //@ts-ignore
        fetchChart() {
            //@ts-ignore
            this.renderChart(
                {
                    labels: [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                    ],
                    datasets: [
                        {
                            label: "Plays",
                            //ga 데이터 넣어야함
                            data: [2, 1, 5, 9, 0, 6, 20],
                            backgroundColor: "transparent",
                            borderColor: "rgba(1, 116, 188, 0.50)",
                            pointBackgroundColor: "rgba(171, 71, 188, 1)",
                        },
                    ],
                },
                {
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                        display: false,
                        text: "Plays",
                    },
                }
            );
        },
    },
    watch: {
        //@ts-ignore
        game: function () {
            console.log("game in watch", this.game);
            //@ts-ignore
            this.fetchChart();
        },

        date: function () {
            console.log("date in watch", this.date);
            //@ts-ignore
            this.fetchChart();
        },
    },
};
</script>
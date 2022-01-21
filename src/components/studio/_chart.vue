<script>
import {Line} from "vue-chartjs";
import moment from "moment";

export default {
    props: ['game', 'date'],
    extends: Line,
    data() {
        return {
            moment: moment,
        }
    },
    mounted() {

        const labels = this.calculateLabel(this.date);
        const data = this.getData(this.date);
        console.log("labels", labels, data)
        this.fetchChart(labels, data);
    },
    methods: {
        //@ts-ignore
        fetchChart(labels, data) {
            //@ts-ignore
            this.renderChart(
                {
                    labels: labels,
                    datasets: [
                        {
                            label: "Plays",
                            //ga 데이터 넣어야함
                            data: data,
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
                },
            );
        },
        //API 연결 후 날짜랑 데이터 확인
        calculateLabel(date) {
            let dateArr = [];
            let total = 7;
            let today = this.moment();
            switch (date) {
                case 'today':
                    return ['today'];
                    break;
                case '7':
                    let dayOfToday = today.day();
                    while (total > 0) {
                        dateArr.unshift(this.moment().day(dayOfToday).format('ddd '));
                        total--;
                        dayOfToday--;
                    }
                    return dateArr
                case '30':
                    console.log(date)
                    total = 30
                    while (total > 0) {
                        if (total % 6 === 0) {
                            dateArr.unshift(today.format('MMM DD'))
                        } else {
                            dateArr.unshift('')
                        }
                        total--;
                        today.subtract(1, 'days')
                    }
                    return dateArr
                default:
                    break;

            }
        },
        getData(date) {
            let data = [];
            switch (date) {
                case 'today':
                    data = [2];
                    break;
                case '7':
                    data = [1, 3, 2, 4, 5, 3, 6];
                case '30':
                    data = [1, 3, 1, 3, 2, 4, 5, 3, 6, 1, 3, 2, 4, 5, 3, 6, 2, 4, 5, 3, 6, 1, 3, 12, 3, 2, 4, 5, 3, 6];
                default:
                    break;

            }
            return data;
        }
    },
    watch: {
        game: function () {
            const labels = this.calculateLabel(this.date)
            const data = this.getData(this.date);
            console.log("game in watch", this.game);
            //@ts-ignore
            this.fetchChart(labels, data);
        },
        date: function () {
            console.log("date in watch", this.date);
            const labels = this.calculateLabel(this.date)
            const data = this.getData(this.date);
            //@ts-ignore
            this.fetchChart(labels, data);
        },
    },
};
</script>
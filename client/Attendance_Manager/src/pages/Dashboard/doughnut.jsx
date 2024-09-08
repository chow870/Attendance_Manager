import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({rec,percentage}) => {
  useEffect(()=>{
    console.log(rec);
    console.log(percentage);

  },[])

  // Data for Doughnut chart
  const data = {
    labels: ['Yes', 'No'], // Example labels
    datasets: [
      {
        label: 'Attendance',
        data: rec, // Corresponding data values for each label
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
        cutout: '50%', // Doughnut style
      },
    ],
  };

  // Custom plugin to render percentage in the center
  const centerTextPlugin = {
    id: 'centerTextPlugin',
    afterDraw: (chart) => {
      const { ctx, width, height } = chart;
      ctx.save();
      const fontSize = (height / 114).toFixed(2);
      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = 'middle';
      // const percentage=65;
      const text = `${percentage}%`; // Using the percentage prop
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2;

      ctx.fillText(text, textX, textY);
      ctx.restore();
    },
  };

  // Chart options
  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    maintainAspectRatio: false, // This allows you to control the size
  };

  return (
    <div style={{ width: '300px', height: '300px' }} >
      <Doughnut data={data} options={options} plugins={[centerTextPlugin]} width={300} height={300}  />
    </div>
  );
};

export default DonutChart;

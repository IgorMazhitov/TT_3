import { Doughnut } from 'react-chartjs-2';
import { IParticipant } from '../src/app/interfaces/participants/participant.interface';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, plugins } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.defaults.plugins.legend.position = 'right'

interface ParticipationPieChartProps {
    participants: IParticipant[];
}

function ParticipationPieChart({ participants }: ParticipationPieChartProps) {
  
  const participationData = {
    labels: participants.map(participant => `${participant.name} ${participant.familyName}`),
    datasets: [
      {
        data: participants.map(participant => participant.participation),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        hoverBackgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ]
      },
    ],
  };


  return (
    <div className='w-full md:w-1/2 h-1/2'>
      <Doughnut data={participationData} />
    </div>
  );
}

export default ParticipationPieChart;

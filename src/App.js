import React, { useState, useEffect } from 'react';

const Home = () => {
  const [current_points, setCurrentPoints] = useState(0);
  const [time_left, setTimeLeft] = useState('');

  const points_checks = [
    new Date('2024-08-27T11:15:00'),
    new Date('2024-09-13T23:59:00'),
    new Date('2024-09-30T23:59:00'),
    new Date('2024-11-04T23:59:00'),
    new Date('2024-11-22T23:59:00')
  ];

  function calculateTimeLeft() {
    const now = new Date();
    const end = points_checks[4];
    const diff = end - now;


    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const days = Math.floor((diff / (1000 * 60 * 60 * 24)));

    let string_build = "";
    if (days > 0) string_build += (`${days} day${days !== 1 ? 's' : ''}`) + " ";
    if (hours > 0) string_build += (`${hours} hour${hours !== 1 ? 's' : ''}`) + " ";
    if (minutes > 0) string_build += (`${minutes} minute${minutes !== 1 ? 's' : ''}`) + " ";
    if (seconds > 0) string_build += (`${seconds} second${seconds !== 1 ? 's' : ''}`) + " ";

    return string_build;
  }
  

  useEffect(() => {
    const interval = setInterval(() => {
      const x = mapDateToRange();
      const points = calculatePoints(x);
      setCurrentPoints(points);
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  

  function mapDateToRange() {
    const current_date = new Date();
    
    if (current_date < points_checks[0]) return 0.0;
    if (current_date > points_checks[points_checks.length - 1]) return 4.0;
    
    for (let i = 0; i < points_checks.length - 1; i++) {
      if (current_date >= points_checks[i] && current_date < points_checks[i + 1]) {
        const totalSeconds = (points_checks[i + 1] - points_checks[i]) / 1000;
        const elapsedSeconds = (current_date - points_checks[i]) / 1000;
        return i + elapsedSeconds / totalSeconds;
      }
    }
    return 4.0;
  }

  function calculatePoints(x) {
    return 1730.9 * Math.pow(2.10794, 1.03921 * x);
  }

  useEffect(() => {
    const x = mapDateToRange();
    const points = calculatePoints(x);
    setCurrentPoints(points);
    setTimeLeft(calculateTimeLeft());
  });
  
  console.log("setup")

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-6xl font-bold mb-6 text-black">Work harder!</h1>
      <p className="text-8xl font-bold text-black mb-4">{current_points.toFixed(2)}</p>
      <p className="text-xl text-gray-600">{time_left}</p>
    </div>
  );
};

export default Home;
'use client';

import { Card, Title, Text, Button} from '@tremor/react';

export default function PlaygroundPage() {
  // Set the date we're counting down to
  var countDownDate = new Date().getTime()+(45*60*1000);
  var days, hours, minutes, seconds;
  // Update the count down every 1 second
  var x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    days = Math.floor(distance / (1000 * 60 * 60 * 24));
    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // If the count down is over, write some text 
    if (distance < 0) {
      clearInterval(x);
    }
  }, 1000);

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Pomodoro</Title>
      <Card>
        <Text>{days} days {hours}:{minutes}:{seconds}</Text>
        
        <Button onClick={
            countDownDate = new Date().getTime()+(45*60*1000)
        }>Begin</Button>
      </Card>
    </main>
  );
}

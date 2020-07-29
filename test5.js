let success = 0;
let HowMuch = 25;
let errorsCount = 0;
let dt2;
while (success < HowMuch && errorsCount < 500) {
  try {
    dt2 = Date.now().toString();
    dt2 = dt2.substr(11, 4);
    console.log(dt2);

    if (dt2 > 90) {
      console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
      success++;
      console.log('ERROR', errorsCount);
    } else {
      throw new Error('NO SUCCESS');
    }
  } catch (error) {
    console.log('ERROR', errorsCount);
    errorsCount++;
  }
}

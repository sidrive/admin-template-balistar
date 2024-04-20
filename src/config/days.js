/* eslint import/prefer-default-export: 0 */
/* eslint no-plusplus: 0 */
const days = [];
const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
let j = 0;
for (let i = 1; i <= 30; i++) {
  days.push({
    date: i,
    day: dayName[j],
  });
  j++;
  if (j > 6) {
    j = 0;
  }
}

export const calendar = days;

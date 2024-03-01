const {
  buildForEachSuite,
  buildMapSuite,
  buildReduceSuite,
  buildReduceWithMutationSuite
} = require("./benchmarks");

function runSuite(suite) {
  console.log(`\nBenchmarking ${suite.name}:`);

  suite
    .on("cycle", function (event) {
      console.log(String(event.target));
    })
    .on("complete", function () {
      console.log(this.filter("fastest").map("name") + " is faster");
    })
    .run();
}

function generateTestHolidayArray(){
    const example = {
      _id: '6420689d0669295c015ed643',
      dayType: 1,
      isMandatoryLeave: false
    };

    const variations = [];
    const uniqueDates = new Set();

    for (let i = 0; i < 100; i++) {
      let randomDate;

      // Ensure 50% repeating dates
      if (i % 2 === 0 && uniqueDates.size > 0) {
        const randomIndex = Math.floor(Math.random() * uniqueDates.size);
        randomDate = Array.from(uniqueDates)[randomIndex];
      } else {
        randomDate = getRandomDate();
        uniqueDates.add(randomDate);
      }

      const variation = {
        ...example,
        _id: `variation_${i}_${example._id}`,
        date: randomDate,
      };

      variations.push(variation);
    }
    return variations;
}
// Function to generate random date within a range (for demonstration purposes)
function getRandomDate() {
	const startDate = new Date('2028-04-14');
	const endDate = new Date('2028-04-24');
	const randomTimestamp = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
	const randomDate = new Date(randomTimestamp);

	// Format the date as 'yyyy-MM-dd'
	const formattedDate = `${randomDate.getFullYear()}-${(randomDate.getMonth() + 1).toString().padStart(2, '0')}-${randomDate.getDate().toString().padStart(2, '0')}`;

	return formattedDate;
}

const testHolidayArray = generateTestHolidayArray();

// runSuite(buildForEachSuite(testArray));
// runSuite(buildMapSuite(testArray));
runSuite(buildReduceWithMutationSuite(testHolidayArray));

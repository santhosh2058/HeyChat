export default {
  transform: {}, 
  collectCoverageFrom: ['tests/**/*.test.js'], // or wherever your code lives
   coverageDirectory: "coverage", // Output coverage reports to 'coverage' folder
  coverageReporters: ["text", "html"], // Generate text and HTML reports
};
console.log(`Username: ${process.env.USER || process.env.USERNAME}`);
console.log(`Current directory: ${process.cwd()}`);
console.log(`Node.js version: ${process.version}`);
console.log(`Platform: ${process.platform}`);
console.log('Memory usage:', process.memoryUsage());

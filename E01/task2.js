const os = require('os');

function getSystemInfo(){
    return{
        uptime: os.uptime(),
        totalMemory: os.totalmem(),
        platform: os.platform(),
        cpuArchitecture: os.arch()
    };
}

const systemInfo = getSystemInfo();
console.log(systemInfo);
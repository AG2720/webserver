export function formatSystemInfo(uptime, totalMemory){
    return {
        uptime: `${uptime} seconds`,
        totalMemory: `${(totalMemory / (1024*1024)).toFixed(2)} MB`
    };
}

//module.exports={formatSystemInfo};


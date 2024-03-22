const { rejects } = require('assert');
const {exec} = require('child_process');
const { error } = require('console');
const fs = require('fs')
const path = require('path');
const { stderr, stdout } = require('process');
const outputPath = path.join(__dirname,"outputs")
if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath ,{recursive:true});
}
   
const executeCpp = (filepath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath,`${jobId}.out`);

    return new Promise((resolve, reject) => {
        exec(
            `g++ ${filepath} -o ${outPath}`,
            (compileError, compileStdout, compileStderr) => {
                if (compileError || compileStderr) {
                    reject({ error: compileError, stderr: compileStderr });
                    return;
                }

                exec(
                    `${outputPath}\\${jobId}.out`,
                    (runError, runStdout, runStderr) => {
                        if (runError || runStderr) {
                            reject({ error: runError, stderr: runStderr });
                            return;
                        }

                        resolve(runStdout);
                    }
                );
            }
        );
    });
};

module.exports = {
    executeCpp,
}
// const { exec } = require("child_process");
// const fs = require("fs");
// const path = require("path");

// const outputPath = path.join(__dirname, "outputs");

// if (!fs.existsSync(outputPath)) {
//   fs.mkdirSync(outputPath, { recursive: true });
// }

// const executeCpp = (filepath) => {
//   const jobId = path.basename(filepath).split(".")[0];
//   const outPath = path.join(outputPath, `${jobId}.out`);

//   return new Promise((resolve, reject) => {
//     exec(
//       `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out`,
//       (error, stdout, stderr) => {
//         error && reject({ error, stderr });
//         stderr && reject(stderr);
//         resolve(stdout);
//       }
//     );
//   });
// };

// module.exports = {
//   executeCpp,
// };
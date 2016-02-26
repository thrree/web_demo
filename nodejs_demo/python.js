var util     =   require('util');
var spawn    =   require('child_process').spawn;
function Python(cmd, callback){
  // var child    =   spawn('python',['-u','-i','-c',cmd]);
  var py    =   spawn('python',
    ['-u','-c','import main;main.main("'+cmd+'")'],
    {cwd:"./py_logic"}
    );
  var std_output = [];
  py.stdout.on('data', (stdout_str) => {
    // console.log('>>>'+stdout_str);
    stdout_str.toString().split('\n').forEach(
      (each)=>{
      std_output.push({
        type :'out', 
        content : each
      });
    });
  });
  py.stderr.on('data', (stderr_str) => {
    // console.log('xxx'+stderr_str);
    stderr_str.toString().split('\n').forEach(
      (each)=>{
      std_output.push({
        type :'err', 
        content : each
      });
    });
  });
  py.on('close', (exit_code) => {
    // console.log('child process exited with code ' + exit_code);
    callback(std_output);
  });
}

module.exports = Python
var testsContext = require.context('./test', true, /test\.js$/);
testsContext.keys().forEach(testsContext);

var srcContext = require.context('./test', true, /^((?!test).)*.js$/);
srcContext.keys().forEach(srcContext);

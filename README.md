maybabel
========

Drop-in replacement for babel-register that turns into a no-op if the running
node.js version is >= the node.js version listed in your project's `.nvmrc`.

This allows you to avoid transpilation in node.js versions that you deem
"good enough" to support the feature set required by your project.

The rationale is described here: https://github.com/babel/babel/issues/6163

I hope babel-preset-env or babel-register adopts this capability so this
module won't have to exist :)

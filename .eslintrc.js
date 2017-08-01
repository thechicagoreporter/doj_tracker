module.exports = {
  "extends": ["airbnb-base", "plugin:react/recommended"],
  "rules": {
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": true,
        "optionalDependencies": false,
        "peerDependencies": false
      }
    ]
  },
  "plugins": ["react"],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "settings": {
    "import/extensions": ["js", "jsx"]
  }
};

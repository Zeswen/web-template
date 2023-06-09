module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-namastay`
  extends: ['@namastay'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
};

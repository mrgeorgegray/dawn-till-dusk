const getVersion: () => never = () => {
  console.log(process.env.npm_package_version);
  process.exit(0);
};

export default getVersion;

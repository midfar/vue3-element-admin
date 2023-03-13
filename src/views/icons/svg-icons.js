const modules = import.meta.glob('../../icons/svg/*.svg', { eager: true });

// const mockModules = {};
const nameArr = [];
Object.keys(modules).forEach((key) => {
  const name = key.split('/').pop().split('.').shift();
  nameArr.push(name);
  // mockModules[name] = modules[key].default;
});

export default nameArr;

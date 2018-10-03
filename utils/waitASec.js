const waitASec = () => {
  return new Promise((res, reject) => {
    setTimeout(() => {
      res(null);
    }, 1000);
  });
};

module.exports = {
  waitASec
};

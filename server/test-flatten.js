const req = {
  body: {
    site: {
      title: 'Mazlum Ummah',
      logo: '123'
    }
  }
};
const entries = Object.entries(req.body);
console.log(entries);

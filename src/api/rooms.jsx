const fetchData = async (node) => {
  const res = await fetch(`http://localhost:4000/api${node}`);
  const { data} = await res.json();

  return await data;
};

export { fetchData };

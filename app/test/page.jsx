async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!res.ok) {
    throw new Error("Failure fetching");
  }

  return res.json();
}

const Page = async () => {
  const data = await getData();
  //   console.log(data);
  return (
    <div className="h-[600px]">
      test
      {data.map((item) => (
        <div className="bg-red-500 h-[100px]" key={item.id}>
          {item.title}
          <p>{item.body}hello</p>
        </div>
      ))}
    </div>
  );
};

export default Page;

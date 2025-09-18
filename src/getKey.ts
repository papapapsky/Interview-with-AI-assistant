type dataType = {
  key: string;
};

export const getKey = async () => {
  console.log("get");
  try {
    const response = await fetch("http://31.169.124.125:3000/getApiKey");
    if (!response.ok) {
      throw new Error("failed to fetch");
    }
    const data: dataType = await response.json();
    console.log(data);
    const userKey = data.key;

    return userKey;
  } catch (err) {
    console.log(err);
  }
};

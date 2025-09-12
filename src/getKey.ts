type dataType = {
  key: string;
};

export const getKey = async () => {
  try {
    const response = await fetch("http://localhost:3000/getApiKey");
    if (!response.ok) {
      throw new Error("failed to fetch");
    }
    const data: dataType = await response.json();
    const userKey = data.key;

    return userKey;
  } catch (err) {
    console.log(err);
  }
};

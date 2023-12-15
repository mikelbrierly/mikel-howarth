const baseURL = "https://random-word-api.vercel.app/api?words=1&length=5";

import React from "react";

export default function FetchWord(): string {
  const [word, setWord] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await (await fetch(baseURL)).json();
      setWord(data[0]);
    };

    fetchData();
    // fetch(baseURL, {
    //   method: "GET",
    //   mode: "cors",
    // })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setWord(data[0]);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

  return word.toUpperCase();
}

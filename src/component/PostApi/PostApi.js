import { useState } from "react";
import instance from "../ApiConfig/ApiConfig";


export default function Post(){
    const [post, setPost] = useState('');

    useEffect(() => {
        const article = {title:'trending'};
        instance.post("/3/movie/articles", article).then(
          (res) => {
            setMoviesHere(res.data.results);
            setLoading();
          },
          (error) => {
            console.log(error); // To catch error
          }
        );
      }, []);
}
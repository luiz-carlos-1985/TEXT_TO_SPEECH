/* eslint-disable import/no-anonymous-default-export */
import { useState } from "react";
import axios from "axios";

// Hooks para manejar os comentários e comunicar com a APi.
// retorna um objeto {comments, fetchComments, addComment, playComment}

export default () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //Configuração da API:
  const API = axios.create({
    baseURL: `http://localhost:4000/`,
  });

  return {
    comments,
    fetchComments: async () => {
      await API.get("comments").then((res) => setComments(res.data));
    },
    addComment: (newText) => {
      API.post(`comments/add?text=${newText}`).then((res) => {
        setComments(res.data);
      });
    },
    playComment: async (text, id) => {
      setIsLoading(id);
      await axios({
        method: "get",
        url: `http://localhost:4000/synthesize?text=${text}`,
        responseType: "blob",
      })
        .then((response) => {
          var blob = new Blob([response.data], { type: "audio/webm" });
          var url = window.URL.createObjectURL(blob);
          window.audio = new Audio();
          window.audio.src = url;
          window.audio.play();
        })
        .catch((error) => {
          console.log(error);
        });
      setIsLoading(false);
    },
    isLoading,
  };
};

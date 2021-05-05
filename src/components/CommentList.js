import React from "react";

//Dependencias do Material UI
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Comment from "../components/Comment";
import CircularProgress from "@material-ui/core/CircularProgress";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export default function ComentList({
  comments,
  fetchComments,
  playComment,
  isLoading,
}) {
  // Pega todos os cometários !
  if (!comments.length) {
    fetchComments();
  }

  return (
    <Paper>
      <List>
      
        {comments.length <= 0 ? (
          <ListItem><ListItemText>SEM COMENTÁRIOS ADICIONADOS !</ListItemText></ListItem>
        ) : isLoading === "all" ? (
          <CircularProgress />
        ) : (
          comments.map((comment, i) => (
            <div key={`${comment.id}-container`}>
              {/* // Comentario */}
              <Comment
                {...comment}
                key={comment.id}
                playComment={playComment}
                isLoading={isLoading}
                id={comment.id}
              />
              {/* Barra de divisão */}
              {i < comments.length - 1 && (
                <Divider key={`${comment.id}-divider`} />
              )}
            </div>
          ))
        )}
      </List>
    </Paper>
  );
}

import React from "react";

//dependencias do Material UI
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";


export default function Comment({ text, playComment, isLoading, id }) {
  return (
    <div>
      <ListItem style={{ minHeight: "64px" }}>
        {/* Texto do comentário inserido pelo usuário. */}
        <ListItemText style={{ width: "80%" }}>{text}</ListItemText>
        <div style={{ display: "inline-block" }}>
          {/* Botao ouvir */}
          {isLoading === id ? (
            <Button
              style={{ marginLeft: "1rem" }}
              variant="contained"
              color="default"
              size="small"
              endIcon={<CircularProgress size={18} aria-label="CARREGANDO !!! ..." />}
            >
              Ouvir 
            </Button>
          ) : (
            <Button
              onClick={() => playComment(text, id)}
              style={{ marginLeft: "1rem" }}
              variant="contained"
              color="default"
              size="small"
              endIcon={<PlayArrowIcon aria-label="OUVIR" />}
            >
              Ouvir
            </Button>
          )}
        </div>
      </ListItem>
    </div>
  );
}

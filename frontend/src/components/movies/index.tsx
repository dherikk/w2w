import * as React from "react";
import { useSelector } from "react-redux";
import "./index.css";
import { selectMovies } from "../../pages/selectors";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import BaseModalWrapper from "../moviedetail/BaseModalWrapper";
import {
  formatDateAsString,
  convertUnixDateToDate,
} from "../../util/dateConverter";

interface MovieTableProps {
  onBackDropClick: () => void;
  isModalVisible: boolean;
}

const MovieTable: React.FC<MovieTableProps> = ({
  isModalVisible,
  onBackDropClick,
}) => {
  const movies = useSelector(selectMovies);
  const [favorited, setFavorited] = useState(false);
  const [modalMovie, setModalMovie] = useState(null!);

  if (movies !== null) {
    movies.forEach((movie: any) => console.log(movie))
  }
  

  return (
    <div>
      <BaseModalWrapper
        isModalVisible={isModalVisible}
        movie={modalMovie!}
        onCloseClick={onBackDropClick}
      />
      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        columns={{ xs: 2, sm: 8, md: 12 }}
      >
        {movies?.map((movie: any) => (
          <Grid item xs={2} sm={4} md={4} key={movie.title}>
            <Card sx={{ maxWidth: 345, height: "100%" }}>
              <CardActionArea
                onClick={() => {
                  setModalMovie(movie);
                  onBackDropClick();
                }}
              >
                <CardMedia
                  component="img"
                  height="auto"
                  width="auto"
                  image={movie?.poster}
                  alt="Movie poster"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {movie?.title}
                  </Typography>
                  <IconButton>
                    {favorited ? (
                      <FavoriteIcon color="error" />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                  <Typography variant="body2" color="text.secondary">
                    {formatDateAsString(
                      convertUnixDateToDate(movie?.release_date)
                    )}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {movie?.genres.join(", ")}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MovieTable;

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch } from 'react-redux';
import { addCart } from '../store/modules/cartFoodStore';
export default function ImgMediaCard({name,description,img,id,price}) {
  const dispatch = useDispatch();
  return (
    <Card sx={{ maxWidth:200 }}>
      <CardMedia
        component="img"
        image={img}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          ${price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
      <IconButton color="primary" aria-label="add to shopping cart" onClick={()=>dispatch(addCart({
              id:id,
              img:img,
              name:name,
              price:price
            }))}>
        <AddShoppingCartIcon/>
      </IconButton>
      </CardActions>
    </Card>
  );
}
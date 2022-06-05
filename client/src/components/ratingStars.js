import React from 'react';
import {Rating} from "@mui/material";



const RatingStars = ({ratingChanged, ratingVal, isAuth, isAccessRating}) => {
    if(isAuth  && !isAccessRating) {
        console.log("можно поставить рейтинг")

        return (
            <Rating
                name="simple-controlled"
                onChange={(event, newValue) => {
                    ratingChanged(newValue);
                }}
                precision={1}
                size="large"
            />

        )
    } else {
        console.log("рейтинг поставлен")

        return (
            <Rating
        name="read-only"
        value={ratingVal}
        readOnly
        size="large"
            />
        )
    }


};

export default RatingStars;
import React from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';

const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  });

function RenderDish({detailDish}) {
    return (
        <Card>
        <CardImg top src={detailDish.image} alt={detailDish.name} />
        <CardBody>
        <CardTitle>{detailDish.name}</CardTitle>
        <CardText>{detailDish.description}</CardText>
        </CardBody>
        </Card>   
    );
}

function RenderComments({dishComments}) {
    if (dishComments != null) {

        const myDishComments = dishComments.map((myComment) => {
            return (
                <div id={myComment.id} className="li text-left">
                    <p>{ myComment.comment }</p>
                    <p>-- { myComment.author }, {formatter.format(new Date(myComment.date))} </p>
                </div>
            );
        });

        return (
            <div>
                <h4 className="text-left">Comments</h4>
                <div className="ul text-left">
                    { myDishComments }
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        );
    }
}

function DishDetail(props) {

    console.log('DishDetailComponent was rendered')
    if (props.dish != null) {
        return (
            <div className="row">
                <div  className="col-12 col-md-5 m-1">
                    <RenderDish detailDish={props.dish}/>                   
                </div>
                <div  className="col-12 col-md-5 m-1">
                    <RenderComments dishComments={props.dish.comments}/>
                </div>
            </div>
        );
    } else {
        return (
            <div>
            </div>
        )
    }
}

export default DishDetail;
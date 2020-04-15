import React from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, BreadcrumbItem, Breadcrumb } from 'reactstrap';
import { Link } from 'react-router-dom';

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

    console.log('DishDetailComponent was rendered, props: ' + props);
    if (props.dish != null) {
        return (
            <div className="Container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                    </div>
                </div>
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        <RenderDish detailDish={props.dish}/>                   
                    </div>
                    <div  className="col-12 col-md-5 m-1">
                        <RenderComments dishComments={props.comments}/>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                no data in props
            </div>
        )
    }
}

export default DishDetail;
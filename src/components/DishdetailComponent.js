import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDish: null
        };
    }

    formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit"
      });

    renderComments(dishComments) {
        if (dishComments != null) {

            const myDishComments = dishComments.map((myComment) => {
                return (
                    <div id={myComment.id} className="li text-left">
                        <p>{ myComment.comment }</p>
                        <p>-- { myComment.author }, {this.formatter.format(new Date(myComment.date))} </p>
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

    renderDish(detailDish) {
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
    
    render() {
        
        if (this.props.selectedDetailDish != null) {
            const comments = this.props.selectedDetailDish.comments.map((dishComment) => {
                return (
                    <div id={dishComment.id} className="cardText">
                        <div className="li">{dishComment.comment}</div>
                        <p>-- {dishComment.author}, {dishComment.date}</p>
                    </div>
                )
            });
            return (
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        { this.renderDish(this.props.selectedDetailDish) }                      
                    </div>
                    <div  className="col-12 col-md-5 m-1">
                        { this.renderComments(this.props.selectedDetailDish.comments) } 
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
}

export default DishDetail;
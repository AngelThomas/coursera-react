import React, { Component} from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, BreadcrumbItem, Breadcrumb } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            isModalOpen: false
        };
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
          });
      }    

    handleSubmit(values) {
        console.log("Current state: " + JSON.stringify(values));
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)
        // alert("Current state: " + JSON.stringify(values));
        this.toggleModal();
    }      

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span>Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm  onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={10}>Rating</Label>
                                <Col md={10}>
                                    <Control.select model=".rating" 
                                    id="rating"
                                    name="rating" 
                                    className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={10}>Author</Label>
                                <Col md={10}>
                                    <Control.text model=".author" 
                                    id="author"
                                    name="author"
                                    className="form-control"
                                    placeholder="Author"  
                                    validators={{ minLength: minLength(3), maxLength: maxLength(15)}}
                                    />
                                    <Errors 
                                        className="text-danger" 
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            minLength: 'must be greater than 2 characters',
                                            maxLength: 'must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-Group">
                                <Label htmlFor="comment" md={10}>Your Comment</Label>
                                <Col md={10}>
                                    <Control.textarea
                                        model=".comment"
                                        id="comment"
                                        name="comment"
                                        className="form-control"
                                        rows={6}
                                        placeholder="Please leave us your comment"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 10 }}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
            )
    };
}

const formatter = new Intl.DateTimeFormat("de-DE", {
    year: "numeric",
    month: "short",
    day: "2-digit"
});

function RenderDish({ detailDish }) {
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

function RenderComments({ dishComments, addComment, dishId }) {
    if (dishComments != null) {

        const myDishComments = dishComments.map((myComment) => {
            return (
                <div id={myComment.id} className="li text-left">
                    <p>{myComment.comment}</p>
                    <p>-- {myComment.author}, {formatter.format(new Date(myComment.date))} </p>
                </div>
            );
        });

        return (
            <div>
                <h4 className="text-left">Comments</h4>
                <div className="ul text-left">
                    {myDishComments}
                </div>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        )
    } else {
        return (
            <div></div>
        );
    }
}

function DishDetail(props) {
    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                    </div>

                    <div className="col-12 col-md-5 m-2">
                        <RenderDish detailDish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-2">
                        <RenderComments dishComments={props.comments} 
                        addComment={props.addComment}
                        dishId={props.dish.id}
                        />
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
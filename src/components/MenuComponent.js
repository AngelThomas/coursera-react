import React from 'react';
// import { Media } from 'reactstrap';
import { Link } from 'react-router-dom';

import { Card, CardTitle, CardImg, CardImgOverlay, Breadcrumb, BreadcrumbItem } from 'reactstrap';

  function RenderMenuItem ({dish}) {
    console.log("dishId: " + dish.id);
    return (
      <Card>
      <Link to={`/menu/${dish.id}`} >
      <CardImg width="100%" src={dish.image} alt={dish.name} />
      <CardImgOverlay>
          <CardTitle>{dish.name}</CardTitle>
      </CardImgOverlay>
      </Link>
    </Card>
    );
  }

  const Menu = (props) => {
  
      const menu = props.dishes.map((dish) => {
        console.log('dish.id in menu: ' + dish.id);
        return (
            <div  className="col-12 col-md-5 m-1" key={dish.id}>
              <RenderMenuItem dish={dish}/>
            </div>
          );
      });
  
      return (
          <div className="container">
              <div className="row">
                <Breadcrumb>
                  <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                  <BreadcrumbItem active>Menu</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                  <h3>Menu</h3>
                </div>
              </div>
              <div className="row">
                  {menu}
              </div>
          </div>
      );
  }


export default Menu;
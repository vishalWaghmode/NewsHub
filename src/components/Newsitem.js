// import React, { Component } from "react"; component is been removed for the function based components
import React from "react";

// export class Newsitem extends Component {  //this is the classs based component which we will convert into the function baesd components

const Newsitem = (props) =>{
  //in function based components the this.props is converted to the simple props
    //props in thr class based components are been given by the "this"
    let { title, desciption, imageUrl, newsUrl, Author, date , source} = props;
    return (
      <div className="my-3">
        <div className="card">
          <img
            src={
              !imageUrl
                ? "https://www.cnet.com/a/img/resize/69fbf5aa50f6094aca915eb243f73c3a17c31beb/hub/2023/01/05/c0d087c4-03cb-422e-a2fd-f73f43f9da58/samsung-flex-hybrid-new-promo.png?auto=webp&fit=crop&height=630&width=1200"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div style={{display: 'flex',justifyContent: 'flex-end',position: 'absolute',right: '0'}}>
          <span class="badge rounded-pill bg-danger" >
                {source}
              </span>
            
          </div>
          <div className="card-body">
            <h5 className="card-title">
              {title}
            </h5>
            <p className="card-text">{desciption}</p>
            {/* when we use the target = blank the whole article will open in the new tab */}
            <a href={newsUrl} target="blank" className="btn btn-dark">
              Read More
            </a>
            <p className="card-text">
              <small class="text-muted">
                By {!Author ? "Unknown" : Author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
          </div>
        </div>
      </div>
    );
  }


export default Newsitem;

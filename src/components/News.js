import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  //in function based components the defaultpropas and proptypes are eritten at the end.
  // static defaultProps = {
  //   country: "in",
  //   pageSize: 8,
  //   category: "Science",
  // };
  // static propTypes = {
  //   country: PropTypes.string,
  //   pageSize: PropTypes.number,
  //   category: PropTypes.string,
  // };

 
 //for class based components and below it that is the function based component 
  // constructor(props) {
  //   super(props);
  //   console.log("hello i am a constructor from the news item");

  //   this.state = {
  //     articles: [],
  //     loading: true,
  //     page: 1,
  //     totalResults: 0,
  //   };
  //   document.title = `${this.capitalizefirstletter(
  //     this.props.category
  //   )} - NewsHub`;
  // }
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
  // document.title = `${this.capitalizefirstletter(
  //   this.props.category
  // )} - NewsHub`;

  const capitalizefirstletter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const updateNews = async()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    // this.setState({ loading: true });
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    console.log(parsedData);
    props.setProgress(50);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // });

    setArticles(parsedData.articles);
    settotalResults(parsedData.totalResults)
    setLoading(false)


    props.setProgress(100);
  }
  //componentdidMount is the life cycle method
  //it will run after the running of render
  // async will give the permission gfor the await system
  // async componentDidMount() {
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=813e4a403cf449dda8b1c2578b0fae32&page=1&pageSize=${this.props.pageSize}`;
  //   // this.setState({ loading: true });
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // console.log(parsedData);
  //   // this.setState({
  //   //   articles: parsedData.articles,
  //   //   totalResults: parsedData.totalResults,
  //   //   loading: false,
  //   // });
  //   this.updateNews();
  // }

  useEffect(() => {
  updateNews();
  }, [])

  //writing the function for the next and orev click so that we acn go on the next page of the news
//  const  handlePrevClick = async () => {
//     // console.log("Prev click");
//     // let url = `https://newsapi.org/v2/top-headlines?country=${
//     //   this.props.country
//     // }&category=${
//     //   this.props.category
//     // }&apiKey=813e4a403cf449dda8b1c2578b0fae32&page=${
//     //   this.state.page - 1
//     // }&pageSize=${this.props.pageSize}`;
//     // this.setState({ loading: true });
//     // let data = await fetch(url);
//     // let parsedData = await data.json();
//     // console.log(parsedData);
//     // this.setState({
//     //   page: this.state.page - 1,
//     //   articles: parsedData.articles,
//     //   loading: false,
//     // });

//     // this.setState({ page: this.state.page - 1 });
//     setPage(page-1)
//     // this.updateNews();
//     updateNews();
//   };

//  const handleNextClick = async () => {
//     // console.log("Next click");
//     // //math.ceil will give the next digit of the fraction like 4.6 will be given as 5
//     // //this.state.totalResults/this.props.pageSize this will give the total no. of pages
//     // if (
//     //   !(
//     //     this.state.page + 1 >
//     //     Math.ceil(this.state.totalResults / this.props.pageSize)
//     //   )
//     // ) {
//     //   let url = `https://newsapi.org/v2/top-headlines?country=${
//     //     this.props.country
//     //   }&category=${
//     //     this.props.category
//     //   }&apiKey=813e4a403cf449dda8b1c2578b0fae32&page=${
//     //     this.state.page + 1
//     //   }&pageSize=${this.props.pageSize}`;
//     //   this.setState({ loading: true });
//     //   let data = await fetch(url);
//     //   let parsedData = await data.json();
//     //   console.log(parsedData);
//     //   this.setState({
//     //     page: this.state.page + 1,
//     //     articles: parsedData.articles,
//     //     loading: false,
//     //   });
//     // }

//     //insted of writing the the three different code we willl just make one function names as updateNews .
//     // this.setState({ page: this.state.page + 1 });
//     setPage(page+1)
//     // this.updateNews();
//     updateNews();
//   };
 const fetchMoreData = async () => {
   const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
   // this.setState({ page: this.state.page + 1 });
   setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    // this.setState({
    //   articles: this.state.articles.concat(parsedData.articles),
    //   totalResults: parsedData.totalResults,
    
    // });
    setArticles(articles.concat(parsedData.articles));
    settotalResults(parsedData.totalResults)
  };

  // render() {
    return (
      <>
        <h2 className="text-center" style={{ margin: "35px 0px", marginTop: "90px" }}>
          NewsHub - Top headlines on{" "}
          {capitalizefirstletter(props.category)}
        </h2>
        {/* loading the spinner component */}
        {/* below syntex say that if this.state.loading is true then show the spinner */}
        {loading && <Spinner />}

        {/* this is used to do the infinite scroll */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      // ya kardo ? :"warna ya kardo"
                      title={element.title ? element.title : " "}
                      //slice is been used to cut the description soo that it can be seen uniformly
                      desciption={
                        element.description ? element.description : " "
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      Author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
// }

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "Science",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
